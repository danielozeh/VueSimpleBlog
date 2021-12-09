<template>
	<div>

  <aside id="ms-side-nav" class="side-nav fixed ms-aside-scrollable ms-aside-left">

    <!-- Logo -->
    <div class="logo-sn ms-d-block-lg">
      <nuxt-link to="/" class="pl-0 ml-0 text-center"> <img src="/logo.png" alt="logo"> </nuxt-link>
    </div>

    <!-- Navigation -->
    <ul class="accordion ms-main-aside fs-14" id="side-nav-accordion">
      <!-- Dashboard -->


    </ul>


  </aside>
		<!-- Sidebar Navigation Left -->
  <aside id="ms-side-nav" class="side-nav fixed ms-aside-scrollable ms-aside-left">

    <!-- Logo -->
    <div class="logo-sn ms-d-block-lg" style="background-color: #fff;">
      <nuxt-link to="/" class="pl-0 ml-0 text-center"> <img src="/logo.png" alt="Simple Blog"> </nuxt-link>
    </div>

    <!-- Navigation -->
    <ul class="accordion ms-main-aside fs-14" id="side-nav-accordion">
      <!-- Dashboard -->
      <li class="menu-item">
        <nuxt-link to="/office/">
          <span><i class="material-icons fs-16">dashboard</i>Dashboard </span>
        </nuxt-link>
      </li>


      <li class="menu-item">
        <a href="#" class="has-chevron" data-toggle="collapse" data-target="#blog" aria-expanded="false" aria-controls="blog">
          <span><i class="fas fa-book"></i>Blog</span>
        </a>
        <ul id="blog" class="collapse" aria-labelledby="kpis" data-parent="#side-nav-accordion">
            <li><nuxt-link to="/office/category/add/" v-if="$store.state.auth.user.role_id == 1">Add Category</nuxt-link></li>
            <li><nuxt-link to="/office/category/" v-if="$store.state.auth.user.role_id == 1">View All Category</nuxt-link></li>
            <li><nuxt-link to="/office/blog/add/">Add Post</nuxt-link></li>
            <li><nuxt-link to="/office/blog/">All Posts</nuxt-link></li>
        </ul>
      </li>

      

      <li class="menu-item">
        <nuxt-link to="/logout">
          <span><i class="fas fa-lock"></i>Logout</span>
        </nuxt-link>
      </li>

      <div class="plus-box" v-if="$store.state.auth.user.role_id == 1">
          <p class="fs-13 font-w300 mb-4">Manage Users on a Go!!</p>
          <nuxt-link class="btn bg-white text-black btn-rounded d-block" to="/office/">App Users</nuxt-link>
      </div>


    </ul>


  </aside>
	</div>
</template>