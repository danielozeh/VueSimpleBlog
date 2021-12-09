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
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">All Categories</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->


            <div class="row" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">All Categories</h4>

                            <div style="float: right;">
                                <nuxt-link to="/office/category/add" class="btn btn-primary btn-sm">Add Category</nuxt-link>
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

                                <v-client-table :data="all_categories.message" :columns="all_categories_columns" :options="all_categories_table_options" class="table-responseive">

                                    <template v-slot:view_options="item">
                                        <nuxt-link class="btn btn-info btn-square btn-xxs" :to="`/office/category/${ item.row['id'] }/${ item.row['slug'] }/posts/`">Blog Posts</nuxt-link>
                                    </template>

                                    <template v-slot:action="item">

                                        <nuxt-link class="btn btn-primary btn-square btn-xxs" :to="`/office/category/${ item.row['id'] }/${ item.row['slug'] }/edit/`">Edit</nuxt-link>

                                        <button class="btn btn-danger btn-square btn-xxs" data-toggle="modal" :data-target="`#deleteCategory_${ item.row['id'] }`" title="Delete Category"><i class="fa fa-trash"></i></button>

                                        <div class="modal fade" :id="`deleteCategory_${ item.row['id'] }`">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">{{ item.row['title'] }}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to delete this category?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" @click="deleteCategory(item.row['id'])">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                    <template v-slot:thumbnail="item">
                                        <img :src="`${ image_path }/${ item.row['thumbnail'] }`" class="img-responsive" width="50">
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

import Categories from "~/mixins/blog.js";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
  layout: "dashboard/main_default",

  mixins: [Categories],

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("All Categories");
  },

  head() {
    return {
      title: "All Categories",
      link: [
        {
          rel: "stylesheet",
          href: "/vendor/datatables/css/jquery.dataTables.min.css",
        },
        {
          rel: "stylesheet",
          href: "/vendor/bootstrap-select/dist/css/bootstrap-select.min.css",
        },
      ],

      script: [],
    };
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async deleteCategory(id) {
        try{
            let res = this.$store.dispatch("blog/deleteCategory", id);
            console.log(res)
            if(res) {
                this.$swal("", "Category Deleted", "success")
                this.$fetch();
                $("#deleteCategory_" + id + " .close").click();
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
    let res = await this.$store.dispatch("blog/getAllCategories");
    //console.log(res)
    this.image_path = res.image_path
    this.all_categories = res;
  },
};
</script>