<template>
    <div class="content-body">
        <div class="container-fluid">
            <div class="row page-titles mx-0">
                <div class="col-sm-6 p-md-0">
                    <div class="welcome-text">
                        <h4>Hi, welcome back!</h4>
                        <span>{{ $store.state.auth.user.first_name }}  {{ $store.state.auth.user.last_name }}</span>
                    </div>
                </div>
                <div
                    class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex"
                >
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <nuxt-link to="/">Home</nuxt-link>
                        </li>
                        <li class="breadcrumb-item active">
                            <a href="javascript:void(0)">Dashboard</a>
                        </li>
                    </ol>
                </div>
            </div>

            <template v-if="$fetchState.pending">
                <PendingPlaceholder />
            </template>

            <template v-else-if="$fetchState.error">
                <ErrorPlaceholder message="Failed to Load Resource" />
                <center>
                    <button class="btn btn-danger btn-block" @nclick="$fetch">
                        Try Again
                    </button>
                </center>
            </template>

            <template v-else>
                
                <!-- row -->
                <div class="row">
                    <div class="col-xl-3 col-md-6" v-if="$store.state.auth.user.role_id == 1 | $store.state.auth.user.full_name == 2">
                        <div class="ms-card card-gradient-success ms-widget ms-infographics-widget">
                            <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Posts</h6>
                                <p class="ms-card-change"> {{ dashboard_info.totalBlogPost }}</p>
                                <p class="fs-12">Total Post</p>
                            </div>
                            </div>
                            <i class="fa fa-book"></i>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-lg-6 col-sm-6" v-if="$store.state.auth.user.role_id == 1 | $store.state.auth.user.full_name == 2">
                        <div class="ms-card card-gradient-secondary ms-widget ms-infographics-widget">
                            <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Comments</h6>
                                <p class="ms-card-change"> {{ dashboard_info.totalBlogComments }}</p>
                                <p class="fs-12">Total Comments</p>
                            </div>
                            </div>
                            <i class="fa fa-building"></i>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6" v-if="$store.state.auth.user.role_id == 1 | $store.state.auth.user.full_name == 2">
                        <div class="ms-card card-gradient-warning ms-widget ms-infographics-widget">
                            <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Active Posts</h6>
                                <p class="ms-card-change"> {{ dashboard_info.activeBlogPost }}</p>
                                <p class="fs-12">Active Posts</p>
                            </div>
                            </div>
                            <i class="flaticon-reuse"></i>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6" v-if="$store.state.auth.user.role_id == 1 | $store.state.auth.user.full_name == 2">
                        <div class="ms-card card-gradient-secondary ms-widget ms-infographics-widget">
                            <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Inactive Posts</h6>
                                <p class="ms-card-change"> {{ dashboard_info.inactiveBlogPost }}</p>
                                <p class="fs-12">Inactive Posts</p>
                            </div>
                            </div>
                            <i class="flaticon-reuse"></i>
                        </div>
                    </div>
                   

                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

import PendingPlaceholder from "~/components/PendingPlaceholder.vue";
import ErrorPlaceholder from "~/components/FailedPlaceholder.vue";

export default {
    layout: "dashboard/main_default",

    components: {
        PendingPlaceholder,
        ErrorPlaceholder,
    },

    mounted() {
        this.SET_PAGE_TITLE("Dashboard");
    },

    head() {
        return {
            title: "Dashboard",
        };
    },

    data() {
        return {
            all_donations: [],
            dashboard_info: [],
            //page_title: "Dashboard"
            status_id: 1,
            all_forum: [],
            all_forum_columns: ["featured_image", "title", "added_by", "status", "created_at", "action"],
            all_forum_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [5, 10, 25, 50],
                preserveState: true,
                headings: {}
            },
        };
    },

    methods: {
        ...mapMutations(["SET_PAGE_TITLE"]),

         toCurrencyString(number){
            return number.toLocaleString('en-UK', { style: 'currency', currency: 'NGN' })
          }
    },

    async fetch() {
        let info = await this.$axios.$get('/dashboard');
        this.dashboard_info = info;
        //console.log(this.dashboard_info)
    },
};
</script>
