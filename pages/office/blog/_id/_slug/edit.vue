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
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Edti Blog</a></li>
                    </ol>
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

                <!-- row -->
                <div class="row" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2">
                    <div class="col-xl-12 col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Edit blog</h4>
                            </div>
                            <div class="card-body">
                                <div class="basic-form">
                                    <form class="row" @submit.prevent="editblog">

                                        <div class="form-group col-md-8">
                                            <label>Category</label>
                                            <select class="form-control input-default" v-model="category_id" id="category_id">
                                                <option :value="`${ category.id }`" v-for="category in all_categories.message" :key="category.id"> {{ category.title }}</option>
                                            </select>
                                        </div>

                                        <div class="form-group col-md-8">
                                            <label>Title</label>
                                            <input type="text" class="form-control input-default" placeholder="Title" :value="`${ blog_info.title }`" id="title">
                                        </div>

                                        <div class="form-group col-md-8">
                                            <label>Content</label>
                                            <wysiwyg v-model="content" />
                                            <!--<textarea class="form-control input-default" placeholder="Description" :value="`${ blog_info.content }`" id="content"></textarea> -->
                                        </div>

                                        <div class="form-group col-md-8">
                                            <label>Status</label>
                                            <select class="form-control input-default" v-model="status" id="status">
                                                <option value="1">Active</option>
                                                <option value="0">Not Active</option>
                                            </select>
                                        </div>

                                        <div class="form-group col-md-8">
                                            <label for="">Featured Image</label>
                                            <div class="custom-file">
                                                <input type="file" id="cover_photo" class="custom-file-input">
                                                <label class="custom-file-label">Choose file</label>
                                            </div>                                        
                                        </div>

                                        <button class="btn btn-primary btn-block">Edit Blog Post</button>

                                    </form>
                                </div>
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
            
            </template>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
    layout: "dashboard/main_default",

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("Edit Blog Post");
  },

  head() {
    return {
      title: "Edit Blog Post",
    };
  },

  data() {
      return {
          blog_info: [],
          blog_title: '',
          content: '',
          category_id: '',
          status:''
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async editblog() {
        var category_id = document.getElementById('category_id').value;
        var title = document.getElementById('title').value;
        //var content = document.getElementById('content').value;
        var status = document.getElementById('status').value;

        if(category_id == "" || title == "" || this.content == "") {
            this.$swal("", "All Fields are Required", "error")
            return;
        }

        var fd = new FormData();
            fd.append('category_id', category_id);
            fd.append('title', title);
            fd.append('content', this.content);
            fd.append('status', status);
            fd.append('featured_image', document.getElementById('cover_photo').files[0]);

            const blog_id = this.$route.params.id

            const data = {
                fd: fd,
                blog_id: blog_id
            }

            try{
                let res = this.$store.dispatch("blog/editBlogPost", data);
                this.$swal("", "blog Edited Successfully!", "success")
                this.$router.push('/office/blog');

            }catch(e){
                this.$swal("", "An Error Occured", "error")
            }
        }
  },

    async fetch() {
        let res = await this.$store.dispatch("blog/getAllCategories");
        this.all_categories = res;

        const data = {
		    id: this.$route.params.id,
	    }

        let details = await this.$store.dispatch("blog/getBlogPostDetails", data);
        //console.log(details)
        this.blog_info = details.message
        this.content = this.blog_info.content
        this.category_id = this.blog_info.category_id
        this.status = this.blog_info.status
    },
};
</script>