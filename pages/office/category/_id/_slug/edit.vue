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
                        <li class="breadcrumb-item"><nuxt-link to="/office/categories/">Categories</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Edit</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->
            <div class="row" v-if="$store.state.auth.user.role_id == 1">
                <div class="col-xl-12 col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Edit Category ({{ title }})</h4>
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
                                <div class="basic-form">
                                    <form class="row" @submit.prevent="editCategory">
                                        <div class="form-group col-md-8">
                                            <label>Title</label>
                                            <input type="text" class="form-control input-default" placeholder="Title" v-model="title">
                                        </div>

                                        <div class="form-group col-md-8">
                                            <label for="">Thumbnail (png or jpg - Max:2mb)</label>
                                            <div class="custom-file">
                                                <input type="file" id="thumbnail" class="custom-file-input">
                                                <label class="custom-file-label">Choose file</label>
                                            </div>                                        
                                        </div>

                                        <button class="btn btn-primary btn-block">Edit Category</button>

                                    </form>
                                </div>
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
    this.SET_PAGE_TITLE("Edit Category");
  },

  head() {
    return {
      title: "Edit Category",
    };
  },

  data() {
      return {
          status_id: 1,
          title: '',
          category_details: ''
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async editCategory() {

        if(this.title == "") {
            this.$swal("", "Title Field is Required", "error")
            return;
        }

        var fd = new FormData();
            fd.append('title', this.title);
            fd.append('thumbnail', document.getElementById('thumbnail').files[0]);

            const data = {
                id: this.$route.params.id,
                fd: fd
            }

            try{
                let res = await this.$store.dispatch("blog/editCategory", data);
                //console.log(res)
                if(res.status == "success") {
                    this.$swal("", res.message, "success")
                    this.$router.push('/office/category/');
                }
                else {
                    this.$swal("", res.message, "error")
                    this.$router.push('/office/category/');
                }

            }catch(e){
                this.$swal("", "An Error Occured", "error")
            }
        }
  },

  async fetch() {
        let res = await this.$store.dispatch("blog/getBlogCategoryDetails", this.$route.params.id);
        //console.log(res)
        this.category_details = res;
        this.title = this.category_details.message.title
  },
};
</script>