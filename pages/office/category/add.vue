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
                        <li class="breadcrumb-item"><nuxt-link to="/categories/">Categories</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Add New</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->
            <div class="row" v-if="$store.state.auth.user.role_id == 1">
                <div class="col-xl-12 col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Add New Cetegory</h4>
                        </div>
                        <div class="card-body">
                            <div class="basic-form">
                                <form class="row" @submit.prevent="addNewCategory">
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

                                    <button class="btn btn-primary btn-block">Add New Category</button>

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
    this.SET_PAGE_TITLE("Add New Category");
  },

  head() {
    return {
      title: "Add New Category",
    };
  },

  data() {
      return {
          status_id: 1,
          title: '',
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async addNewCategory() {
        const data = {
            title: this.title,
        }

        if(this.title == "") {
            this.$swal("", "Title Field is Required", "error")
            return;
        }

        var fd = new FormData();
            fd.append('title', this.title);
            fd.append('thumbnail', document.getElementById('thumbnail').files[0]);

            try{
                let res = this.$store.dispatch("blog/addNewCategory", fd);
                this.$swal("", "New Category Added", "success")
                this.$router.push('/office/category/');

            }catch(e){
                this.$swal("", "An Error Occured", "error")
            }
        }
  },

  async fetch() {
  },
};
</script>