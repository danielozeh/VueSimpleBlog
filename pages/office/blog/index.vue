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
                        <li class="breadcrumb-item"><nuxt-link to="/office/">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">All Posts</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->


            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">All Blog Posts </h4>

                            <div style="float:right;">
                                <nuxt-link to="/office/blog/add" class="btn btn-primary">Add Blog Post</nuxt-link>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <select class="form-control" v-model="status_id">
                                        <option value="all">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <button class="btn btn-primary btn-block" @click="$fetch">Filter </button>
                                </div>
                            </div>
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

                                <v-client-table :data="all_blogs" :columns="all_blogs_columns" :options="all_blogs_table_options" class="table-responseive">
                                    <template v-slot:action="item">
                                        <nuxt-link class="btn btn-primary btn-xxs" :to="`/office/blog/${ item.row['id'] }/${ item.row['slug'] }/edit/`" v-if="$store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2">Edit</nuxt-link>

                                        <nuxt-link class="btn btn-info btn-xxs" :to="`/office/blog/${ item.row['id'] }/${ item.row['slug'] }/comments/`" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2">Comments</nuxt-link>

                                        <button class="btn btn-danger btn-xxs" data-toggle="modal" :data-target="`#moderatePost_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['status'] == 0">Moderate</button>

                                        <button class="btn btn-danger btn-xxs" data-toggle="modal" :data-target="`#unmoderatePost_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['status'] == 1">Unmoderate</button>

                                        <button class="btn btn-secondary btn-xxs" data-toggle="modal" :data-target="`#featurePost_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['featured'] == 0">Feature</button>

                                        <button class="btn btn-secondary btn-xxs" data-toggle="modal" :data-target="`#unfeaturePost_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['featured'] == 1">Unfeature</button>

                                        <button class="btn btn-warning btn-xxs" data-toggle="modal" :data-target="`#pinPost_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['pinned'] == 0">Pin</button>

                                        <button class="btn btn-warning btn-xxs" data-toggle="modal" :data-target="`#unpinPost_${ item.row['id'] }`" v-if="($store.state.auth.user.role_id == 1 | $store.state.auth.user.role_id == 2) & item.row['pinned'] == 1">Unpin</button>
                                        

                                        <button class="btn btn-danger btn-xxs" data-toggle="modal" :data-target="`#deletePost_${ item.row['id'] }`" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2">Delete</button>

                                        <div class="modal fade" :id="`moderatePost_${ item.row['id'] }`">
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
                                                        <button type="button" class="btn btn-primary" @click="moderatePost(item.row['id'])">Moderate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`unmoderatePost_${ item.row['id'] }`">
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
                                                        <button type="button" class="btn btn-primary" @click="unmoderatePost(item.row['id'])">Unmoderate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`featurePost_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to feature this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="featurePost(item.row['id'])">Feature</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`unfeaturePost_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to unfeature this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="unfeaturePost(item.row['id'])">Unfeature</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`pinPost_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to pin this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="pinPost(item.row['id'])">Pin</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`unpinPost_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to unpin this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="unpinPost(item.row['id'])">Unpin</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" :id="`deletePost_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to delete this post?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="deletePost(item.row['id'])">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                    <template v-slot:author="item">
                                        {{ item.row.user['first_name'] }} {{item.row.user['last_name']  }}
                                    </template>

                                    <template v-slot:featured_image="item">
                                        <img :src="`${ image_path }/${ item.row['featured_image'] }`" class="img-responsive" width="50">
                                    </template>

                                    <template v-slot:url="item">
                                        <a :href="`${ item.row['url'] }`" target="_blank" class="badge badge-success">Open</a>
                                    </template>

                                    <template v-slot:status="item">
                                        <label class="badge badge-success" v-if="item.row['status'] == 1">Active</label>
                                        <label class="badge badge-primary" v-if="item.row['status'] == 0">Not Active</label>
                                    </template>

                                    <template v-slot:created_date="item">
                                        {{ item.row['created_at'] }}
                                    </template>

                                    <template v-slot:added_by="item">
                                        {{ item.row.user['full_name'] }}
                                    </template>


                                </v-client-table>
                                
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

import Articles from "~/mixins/blog.js";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
  layout: "dashboard/main_default",

  mixins: [Articles],

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("All Posts");
  },

  head() {
    return {
      title: "All Posts",
      link: [
        {
          rel: "stylesheet",
          href: "/dashboard/vendor/datatables/css/jquery.dataTables.min.css",
        },
        {
          rel: "stylesheet",
          href: "/dashboard/vendor/bootstrap-select/dist/css/bootstrap-select.min.css",
        },
      ],

      script: [],
    };
  },

  data() {
      return {
          status_id: 'all',
          category_title: ''
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async moderatePost(id) {
        try{
            const data = {
                status: 1,
                id: id
            }
            let res = this.$store.dispatch("blog/moderatePost", data);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Approved", "success")
                this.$fetch();
                $("#moderatePost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to moderate", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async unmoderatePost(id) {
        try{
            const data = {
                status: 0,
                id: id
            }
            let res = this.$store.dispatch("blog/moderatePost", data);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Unapproved", "success")
                this.$fetch();
                $("#unmoderatePost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to unmoderate", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async pinPost(id) {
        try{
            let res = this.$store.dispatch("blog/pinPost", id);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Pinned", "success")
                this.$fetch();
                $("#pinPost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to pin post", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async unpinPost(id) {
        try{
            let res = this.$store.dispatch("blog/unpinPost", id);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Unpinned", "success")
                this.$fetch();
                $("#unpinPost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to unpin post", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async featurePost(id) {
        try{
            let res = this.$store.dispatch("blog/featurePost", id);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Featured", "success")
                this.$fetch();
                $("#featurePost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to feature post", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async unfeaturePost(id) {
        try{
            let res = this.$store.dispatch("blog/unfeaturePost", id);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Unfeatured", "success")
                this.$fetch();
                $("#unfeaturePost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to unfeature post", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async deletePost(id) {
        try{
            let res = this.$store.dispatch("blog/deletePost", id);
            //console.log(res)
            if(res) {
                this.$swal("", "Post Deleted", "success")
                this.$fetch();
                $("#deletePost_" + id + " .close").click();
            }
            else {
                this.$swal("", "failed to delete post", "error")
            }

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    }
  },

  async fetch() {
        var category_id = this.$route.params.id
        const data = {
		    id: this.$route.params.id,
            status: this.status_id
	    }

        let res = await this.$store.dispatch("blog/getBlogPosts", data);
        //console.log(res.message)
        this.all_blogs = res.message;
        this.image_path = res.image_path
  },
};
</script>