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
                        <li class="breadcrumb-item"><nuxt-link to="/articles/">Article</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Edit Article</a></li>
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
                <div class="row" v-if="$store.state.auth.user.role_id == 0">
                    <div class="col-xl-12 col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Edit Comment</h4>
                            </div>
                            <div class="card-body">
                                <div class="basic-form">
                                    <form class="row" @submit.prevent="editArticle">

                                        <div class="form-group col-md-8">
                                            <label>Comment</label>
                                            <textarea class="form-control input-default" :value="`${ blog_info.title }`" id="title"></textarea>
                                        </div>

                                        <div class="form-group col-md-8">
                                            <label>Status</label>
                                            <select class="form-control input-default" :v-model="`${ blog_info.status }`" id="status">
                                                <option value="1">Active</option>
                                                <option value="0">Not Active</option>
                                            </select>
                                        </div>

                                        <button class="btn btn-primary btn-block">Edit Article</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </template>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

//import Videos from "~/mixins/videos.js";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
    layout: "dashboard/main_default",

    //mixins: [Videos],

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("Edit Comment");
  },

  head() {
    return {
      title: "Edit Comment",
    };
  },

  data() {
      return {
          blog_info: []
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async editArticle() {
        var category_id = document.getElementById('category_id').value;
        var title = document.getElementById('title').value;
        //var content = document.getElementById('content').value;
        var author = document.getElementById('author').value;
        var broadcast = document.getElementById('broadcast').value;
        var status = document.getElementById('status').value;

        if(category_id == "" || title == "" || this.content == "" || author == "" || broadcast == "") {
            this.$swal("", "All Fields are Required", "error")
            return;
        }

        var fd = new FormData();
            fd.append('category_id', category_id);
            fd.append('title', title);
            fd.append('content', this.content);
            fd.append('author', author);
            fd.append('broadcast', broadcast);
            fd.append('status', status);
            fd.append('cover_photo', document.getElementById('cover_photo').files[0]);

            const article_id = this.$route.params.id

            const data = {
                fd: fd,
                article_id: article_id
            }

            try{
                let res = this.$store.dispatch("articles/editArticle", data);
                this.$swal("", "Article Edited Successfully!", "success")
                this.$router.push('/articles');

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