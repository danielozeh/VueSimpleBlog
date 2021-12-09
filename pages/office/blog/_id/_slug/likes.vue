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
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Blog Likes</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->
            <div class="row" v-if="$store.state.auth.user.role_id == 1 || $store.state.auth.user.role_id == 2">
                <div class="col-xl-12 col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">All Likes in <b style="color: #083040"> {{ blog_title }} </b></h4>

                            <div style="float:right;">
                                <nuxt-link :to="`/office/blog/${ $route.params.id }/${ blog_slug }/comments/`" class="btn btn-sm btn-primary"  v-if="$store.state.auth.user.role_id == '1' | $store.state.auth.user.role_id == '2'">Blog Comments</nuxt-link> 
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

                                <v-client-table :data="blog_info.message.likes" :columns="blog_likes_columns" :options="blog_likes_table_options" class="table-responseive">

                                    <template v-slot:full_name="item">
                                        {{ item.row['first_name'] }} {{ item.row['last_name'] }}
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

import articles from "~/mixins/blog.js";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
    layout: "dashboard/main_default",

    mixins: [articles],

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("Blog Likes");
  },

  head() {
    return {
      title: "Blog Likes",
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