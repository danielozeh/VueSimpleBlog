<template>
    <div class="content-body">
        <div class="container-fluid">
            <div class="row page-titles mx-0">
                <div class="col-sm-6 p-md-0">
                    <div class="welcome-text">
                        <h4></h4>
                        <p class="mb-0">My Profile</p>
                    </div>
                </div>
                <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
                        <li class="breadcrumb-item"><nuxt-link to="/office/">Dashboard</nuxt-link></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Profile</a></li>
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
                <div class="row">
                    <div class="col-lg-12">
                        <div class="profile card card-body px-3 pt-3 pb-0">
                            <div class="profile-head">
                                <div class="photo-content">
                                    
                                    <div class="cover-photo" :style="`background: url('${user_profile.image_path}/${ user_profile.user_profile.cover_photo }');`"></div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-photo">
                                        <img :src="`${ user_profile.image_path }/${ user_profile.user_profile.avatar }`" class="img-fluid rounded-circle" alt="" width="100">
                                    </div>
                                    <div class="profile-details">
                                        <div class="profile-name px-3 pt-2">
                                            <h4 class="text-primary mb-0">{{ user_full_name }}</h4>
                                            <label for="" class="label label-success" v-if="user_profile.user.is_online == 1">Online</label>
                                            <label for="" class="label label-danger" v-if="user_profile.user.is_online == 0">Offile</label>
                                        </div>
                                        <div class="profile-email px-2 pt-2">
                                            <h4 class="text-muted mb-0">{{ user_profile.user.email }}</h4>
                                            <a :href="`mailto:${ user_profile.user.email }`" target="_blank" class="btn btn-primary btn-xxs">Send Email</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-statistics mb-5">
                                    <div class="text-center">
                                        <!--<div class="row">
                                            <div class="col">
                                                <h3 class="m-b-0">150</h3><span>Follower</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">140</h3><span>Place Stay</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">45</h3><span>Reviews</span>
                                            </div>
                                        </div> -->
                                        <div class="mt-4">
                                            <a :href="`tel:${ user_profile.user_profile.phone_number }`" class="btn btn-primary btn-sm mb-1 mr-1">Call</a> 
                                            <a :href="`mailto:${ user_profile.user.email }`" target="_blank" class="btn btn-primary btn-sm mb-1">Send Email</a>
                                            <button class="btn btn-info btn-sm mb-1" v-if="user_profile.user.role_id == 1">Admin Role</button>
                                            <button class="btn btn-warning btn-sm mb-1" v-if="user_profile.user.role_id == 2">Moderator Role</button>
                                            <button class="btn btn-primary btn-sm mb-1" v-if="user_profile.user.role_id == 3">User Role</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-news">
                                    <!--<h5 class="text-primary d-inline">Recent Forum Posts</h5> -->
                                    <!--<div class="media pt-3 pb-3">
                                        <img src="images/profile/5.jpg" alt="image" class="mr-3 rounded" width="75">
                                        <div class="media-body">
                                            <h5 class="m-b-5">Collection of textile samples</h5>
                                            <p class="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-tab">
                                    <div class="custom-tab-1">
                                        <ul class="nav nav-tabs">
                                            <!--<li class="nav-item"><a href="#my-posts" data-toggle="tab" class="nav-link active show">Testimonies</a>
                                            </li> -->
                                            <li class="nav-item"><a href="#about-me" data-toggle="tab" class="nav-link active">About Me</a>
                                            </li>
                                            <li class="nav-item"><a href="#profile-settings" data-toggle="tab" class="nav-link">Setting</a>
                                            </li>
                                            <li class="nav-item"><a href="#change-password" data-toggle="tab" class="nav-link">Change Password</a>
                                            </li>
                                            <li class="nav-item"><a href="#change-profile-picture" data-toggle="tab" class="nav-link">Profile Picture</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div id="about-me" class="tab-pane fade active show">
                                                <div class="profile-about-me">
                                                    <div class="pt-4 border-bottom-1 pb-3">
                                                        <h4 class="text-primary">About Me</h4>
                                                        <p class="mb-2">{{ user_profile.user_profile.about }}</p>
                                                    </div>
                                                </div>
                                                
                                                <div class="profile-personal-info">
                                                    <h4 class="text-primary mb-4">Personal Information</h4>
                                                    <div class="row mb-2">
                                                        <div class="col-3">
                                                            <h5 class="f-w-500">Name <span class="pull-right">:</span>
                                                            </h5>
                                                        </div>
                                                        <div class="col-9"><span>{{ user_full_name }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-2">
                                                        <div class="col-3">
                                                            <h5 class="f-w-500">Email <span class="pull-right">:</span>
                                                            </h5>
                                                        </div>
                                                        <div class="col-9"><span>{{ user_profile.user.email }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-2">
                                                        <div class="col-3">
                                                            <h5 class="f-w-500">Phone Number <span class="pull-right">:</span></h5>
                                                        </div>
                                                        <div class="col-9"><span>{{ user_profile.user_profile.phone_number }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-2">
                                                        <div class="col-3">
                                                            <h5 class="f-w-500">Date of Birth <span class="pull-right">:</span>
                                                            </h5>
                                                        </div>
                                                        <div class="col-9"><span>{{ user_profile.user_profile.date_of_birth }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-2">
                                                        <div class="col-3">
                                                            <h5 class="f-w-500">Location <span class="pull-right">:</span></h5>
                                                        </div>
                                                        <div class="col-9"><span>{{ user_profile.user_profile.address }}, {{ user_profile.user_profile.state }}, {{ user_profile.user_profile.country }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-2">
                                                        <div class="col-3">
                                                            <h5 class="f-w-500">Gender <span class="pull-right">:</span></h5>
                                                        </div>
                                                        <div class="col-9"><span>{{ user_profile.user_profile.gender }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="profile-settings" class="tab-pane fade">
                                                <div class="pt-3">
                                                    <div class="settings-form">
                                                        <h4 class="text-primary">Account Setting</h4>
                                                        <form>
                                                            <div class="form-row">
                                                                <div class="form-group col-md-6">
                                                                    <label>First Name</label>
                                                                    <input type="text" id="first_name" placeholder="First Name" class="form-control" v-model="user_profile.user.first_name">
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label>Last Name</label>
                                                                    <input type="text" id="last_name" v-model="user_profile.user.last_name" placeholder="Last Name" class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="form-row">
                                                                <div class="form-group col-md-6">
                                                                    <label>Email</label>
                                                                    <input type="email" placeholder="Email" class="form-control" v-model="user_profile.user.email" readonly>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label>Phone Number</label>
                                                                    <input type="number" id="phone_number" v-model="user_profile.user_profile.phone_number" placeholder="Phone Number" class="form-control">
                                                                </div>
                                                            </div>
                                                            <div class="form-row">
                                                                <div class="form-group col-md-6">
                                                                    <label>Gender</label>
                                                                    <select class="form-control" v-model="user_profile.user_profile.gender" id="gender">
                                                                        <option value="Male">Male</option>
                                                                        <option value="Female">Female</option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label>Date of Birth</label>
                                                                    <input type="date" id="date_of_birth" v-model="user_profile.user_profile.date_of_birth" class="form-control" >
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label>Address</label>
                                                                <input type="text" id="address" v-model="user_profile.user_profile.address" placeholder="1234 Main St" class="form-control">
                                                            </div>
                                                            <div class="form-row">
                                                                <div class="form-group col-md-6">
                                                                    <label>State</label>
                                                                    <input type="text" id="state" v-model="user_profile.user_profile.state" class="form-control">
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label>Country</label>
                                                                    <input type="text" id="country" v-model="user_profile.user_profile.country" class="form-control">
                                                                </div>
                                                            </div>
                                                            <button class="btn btn-primary btn-block" type="submit" @click="updateProfile()">Update Profile</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="change-password" class="tab-pane fade">
                                                <div class="pt-3">
                                                    <div class="settings-form">
                                                        <h4 class="text-primary">Change Password</h4>
                                                        <form @submit.prevent="changePassword">
                                                            <div class="form-row">
                                                                <div class="form-group col-md-12">
                                                                    <label>Old Password</label>
                                                                    <input type="password" placeholder="" class="form-control" v-model="old_password">
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label>New Password</label>
                                                                    <input type="password" v-model="new_password" placeholder="" class="form-control">
                                                                </div>
                                                                <div class="form-group col-md-6">
                                                                    <label>Confirm Password</label>
                                                                    <input type="password" v-model="confirm_password" placeholder="" class="form-control">
                                                                </div>
                                                            </div>
                                                            <button class="btn btn-primary btn-block" type="submit">Change Password</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="change-profile-picture" class="tab-pane fade">
                                                <div class="pt-3">
                                                    <div class="settings-form">
                                                        <h4 class="text-primary">Change Password</h4>
                                                        <form @submit.prevent="updateProfilePicture">
                                                            <div class="form-row">
                                                                <div class="form-group col-md-12">
                                                                    <label>Image</label>
                                                                    <span class="text-danger">Max: 2mb</span>
                                                                    <div class="custom-file">
                                                                        <input type="file" id="avatar" class="custom-file-input">
                                                                        <label class="custom-file-label">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button class="btn btn-primary btn-block" type="submit">Upload</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

import Users from "~/mixins/users.js";

import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/FailedPlaceholder.vue'

export default {
  layout: "dashboard/main_default",

  mixins: [Users],

    components: {
        PendingPlaceholder,
        ErrorPlaceholder
    },

  mounted() {
    this.SET_PAGE_TITLE("User Profile");
  },

  head() {
    return {
      title: "User Profile",
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
          user_profile: '',
          user_full_name: '',
          old_password: '',
          new_password: '',
          confirm_password: ''
      }
  },

  methods: {
    ...mapMutations(["SET_PAGE_TITLE"]),

    async blockUser(id) {
        try{
            let res = this.$store.dispatch("users/blockUser", id);
            this.$swal("", "User Blocked", "success")
            this.$fetch();

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async unblockUser(id) {
       try{
            let res = this.$store.dispatch("users/unblockUser", id);
            this.$swal("", "User unBlocked", "success")
            this.$fetch();

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async updateProfile() {
        var phone_number = document.getElementById('phone_number').value;
        var address = document.getElementById('address').value;
        var state = document.getElementById('state').value;
        var country = document.getElementById('country').value;
        var gender = document.getElementById('gender').value;
        var date_of_birth = document.getElementById('date_of_birth').value;
        var first_name = document.getElementById('first_name').value;
        var last_name = document.getElementById('last_name').value;

        const data = {
            phone_number: phone_number,
            address: address,
            state: state,
            country: country,
            gender: gender,
            date_of_birth: date_of_birth,
            first_name: first_name,
            last_name: last_name
        }

        try{
            let res = await this.$store.dispatch("users/updateProfile", data);
            //console.log(res)
            this.$swal("", "User Profile Updated", "success")
            this.$fetch();

        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async changePassword() {
        const data = {
            old_password: this.old_password,
            new_password: this.new_password,
            confirm_password: this.confirm_password
        }
        try{
            let res = await this.$store.dispatch("users/changePassword", data)
            if(res.status == "success") {
                this.$swal("", res.message, "success")
                this.$fetch();
            }
            else {
                this.$swal("", res.message, "error")
            }
        }catch(e){
            this.$swal("", "An Error Occured", "error")
        }
    },

    async updateProfilePicture() {
        var fd = new FormData();
            fd.append('avatar', document.getElementById('avatar').files[0]);
            try {
                let res = await this.$store.dispatch("users/updateProfilePicture", fd)
                if(res.status == "success") {
                    this.$swal("", res.message, "success")
                    this.$fetch();
                }
                else {
                    this.$swal("", res.message, "error")
                }
            }catch(e){
                this.$swal("", "An Error Occured", "error")
            }
    }
  },

  async fetch() {
      let res = await this.$store.dispatch("users/viewProfile");

      this.user_profile = res;
      this.user_full_name = res.user.first_name + ' ' + res.user.last_name

      //console.log(res)
  },
};
</script>