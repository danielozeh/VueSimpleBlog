<template>
    <div class="content-body">
        <div class="container-fluid">
            <div class="row page-titles mx-0">
                <div class="col-sm-6 p-md-0">
                    <div class="welcome-text">
                        <h4></h4>
                        <span></span>
                    </div>
                </div>
                <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
                        <li class="breadcrumb-item"><nuxt-link to="/office">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item"><nuxt-link to="/office/blog/">Blog</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Blog Comments</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->
            <div class="row" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2">
                <div class="col-xl-12 col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">All Comments in <b style="color: #083040"> {{ blog_title }} </b></h4>

                            <div style="float:right;">
                                <nuxt-link :to="`/office/blog/${ $route.params.id }/${ blog_slug }/likes/`" class="btn btn-sm btn-primary"  v-if="$store.state.auth.user.role_id == '1' | $store.state.auth.user.role_id == '2'">Blog Likes</nuxt-link> 
                            </div>
                        </div>
                        <div class="card-body">

                            <template v-if="$fetchState.pending">
                                <PendingPlaceholder/>
                            </template>

                            <template v-else-if="$fetchState.error">
                                <ErrorPlaceholder message="Failed to Load Resource"/> 
                                <center>
                                    <button class="btn btn-danger btn-block" @click="$fetch">Try Again</button>
                                </center>                        
                            </template>

                            <template v-else>

                                <v-client-table :data="blog_info.message.comments" :columns="blog_details_columns" :options="blog_details_table_options" class="table-responseive">
                                    <template v-slot:action="item">

                                        <!--<nuxt-link :to="`/office/blog/${ item.row['id'] }/${ blog_slug }/edit-comment/`" class="btn btn-primary btn-xxs" title="Edit" v-if="$store.state.auth.user.role_id == '1' | $store.state.auth.user.role_id == '2'"><i class="fa fa-edit"></i></nuxt-link> -->

                                        <button class="btn btn-primary btn-xxs" data-toggle="modal" :data-target="`#moderateComment_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['status'] == 0">Approve</button>

                                        <button class="btn btn-danger btn-xxs" data-toggle="modal" :data-target="`#unmoderateComment_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['status'] == 1">Unapprove</button>

                                        <button class="btn btn-danger btn-xxs" data-toggle="modal" :data-target="`#deleteComment_${ item.row['id'] }`" title="Delete" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2"><i class="fa fa-trash"></i></button>

                                        <div class="modal fade" :id="`moderateComment_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to approve this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="moderateComment(item.row['id'])">Moderate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`unmoderateComment_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to unapprove this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="unmoderateComment(item.row['id'])">Unmoderate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`deleteComment_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to delete this Comment?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="deleteComment(item.row['id'])">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                    <template v-slot:full_name="item">
                                        {{ item.row['first_name'] }} {{ item.row['last_name'] }}
                                    </template>


                                    <template v-slot:status="item">
                                        <label class="badge badge-success" v-if="item.row['status'] == 1">Active</label>
                                        <label class="badge badge-danger" v-if="item.row['status'] == 0">Not Active</label>
                                    </template>


                                </v-client-table>
                                
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card" v-else>
                <div class="card-body">
                    <div class="alert alert-danger" role="alert">
                        <center> <h2> You are Not Authorized to View this Page </h2> </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

import blog from "~/mixins/blog.js";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
    layout: "dashboard/main_default",

    mixins: [blog],

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("Blog Comments");
  },

  head() {
    return {
      title: "Blog Comments",
    };
  },

  data() {
        return {
            detail_type: '',
            blog_title: '',
            blog_info: [],
            blog_slug: '',
        }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async moderateComment(id) {
        try{
            const data = {
                status: 1,
                id: id
            }
            let res = this.$store.dispatch("blog/moderateComment", data);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Approved", "success")
                this.$fetch();
                $("#moderateComment_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to moderate", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async unmoderateComment(id) {
        try{
            const data = {
                status: 0,
                id: id
            }
            let res = this.$store.dispatch("blog/moderateComment", data);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Unapproved", "success")
                this.$fetch();
                $("#unmoderateComment_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to unmoderate", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async deleteComment(id) {
        try{
            let res = this.$store.dispatch("blogs/deleteComment", id);
            //console.log(res)
            if(res) {
                this.$swal("", "Comment Deleted", "success")
                this.$fetch();
                $("#deleteComment_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to delete", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    }

    
  },

    async fetch() {
        const data = {
		    id: this.$route.params.id,
	    }

        this.blog_info = await this.$store.dispatch("blog/getBlogPostDetails", data);
        this.blog_title = this.blog_info.message.title
        this.blog_slug = this.blog_info.message.slug
    },
};
</script>