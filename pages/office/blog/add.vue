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
                        <li class="breadcrumb-item"><nuxt-link to="/office/blog/">Blog</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Add Post</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Add Blog Post</h4>
                        </div>
                        <div class="card-body">
                            <div class="basic-form">
                                <form class="row" @submit.prevent="addBlogPost">

                                    <div class="form-group col-md-8">
                                        <label>Category</label>
                                        <select class="form-control input-default" v-model="category_id">
                                            <template v-if="$fetchState.pending">
                                                =====LOADING CATEGORIES=======
                                            </template>

                                            <template v-else-if="$fetchState.error">
                                                =====FAILED TO LOAD CATEGORY=====                       
                                            </template>

                                            <template v-else>
                                                <option :value="`${ category.id }`" v-for="category in all_categories.message" :key="category.id"> {{ category.title }}</option>
                                            </template>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-8">
                                        <label>Title</label>
                                        <input type="text" class="form-control input-default" placeholder="Title" v-model="title">
                                    </div>

                                    <div class="form-group col-md-8">
                                        <label>Content</label>
                                        <wysiwyg v-model="content" />
                                        <!--<textarea class="form-control input-default" placeholder="Content" v-model="content"></textarea> -->
                                    </div>

                                    <div class="form-group col-md-8">
                                        <label for="">Featured Image</label>
                                        <span class="text-danger">Featured Image is IMPORTANT!</span>
                                        <div class="custom-file">
                                            <input type="file" id="cover_photo" class="custom-file-input">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>                                        
                                    </div>

                                    <button class="btn btn-primary btn-block" id="sign_in">Add Blog Post</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    this.SET_PAGE_TITLE("Add Blog Post");
  },

  head() {
    return {
      title: "Add Blog Post",
    };
  },

  data() {
      return {
          status_id: 1,
          title: '',
          category_id: '',
          content: '',
          author: '',
          broadcast: ''
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async addBlogPost() {
        document.getElementById('sign_in').disabled = true
        document.querySelector('#sign_in').innerHTML = 'Submitting...'

        if(this.category_id == "" || this.title == "" || this.content == "") {
            this.$swal("", "All Fields are Required", "error")
            document.getElementById('sign_in').disabled = false
            document.querySelector('#sign_in').innerHTML = 'Add Blog Post'
            return;
        }

        var fd = new FormData();
            fd.append('category_id', this.category_id);
            fd.append('title', this.title);
            fd.append('content', this.content);
            fd.append('featured_image', document.getElementById('cover_photo').files[0]);

            try{
                let res = await this.$store.dispatch("blog/addBlogPost", fd);
                //console.log(res)
                if(res.status == "success") {
                    this.$swal("", res.message, "success")
                    this.$router.push('/office/blog');
                }
                else {
                    this.$swal("", res.message, "error")
                    document.getElementById('sign_in').disabled = false
                    document.querySelector('#sign_in').innerHTML = 'Add Blog Post'
                }
            }catch(e){
                this.$swal("", "An Error Occured", "error")
                document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Add Blog Post'
            }
        }
  },

    async fetch() {
        let res = await this.$store.dispatch("blog/getAllCategories");
        this.all_categories = res;
    },
};
</script>