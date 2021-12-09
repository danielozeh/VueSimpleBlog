<template>
    <div>
        <!-- start intro -->
		<div id="intro" class="jarallax" data-speed="0.5" style="background-image: url(/img/intro_img/1.jpg);">
			<div class="grid grid--container">
				<div class="row row--xs-middle">
					<div class="col col--lg-5 text--center">
						<h3 class="__title">Posts in {{ category_title }}</h3>
						<p></p>
					</div>
				</div>
			</div>
		</div>
		<!-- end intro -->

		<!-- start main -->
		<main role="main">
			<!-- start section -->
			<section class="section section--light-bg">
				<div class="grid grid--container">

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
						<!-- start posts -->
						<div class="posts">
							<div class="__inner">
								<div class="row  js-masonry"
									data-masonry-options='{
										"itemSelector": ".js-masonry__item",
										"transitionDuration": "0.8s",
										"percentPosition": "true",
										"masonry": { "columnWidth": ".js-masonry__sizer" }
									}'>

									<!-- start item -->
									<div class="col col--sm-6 col--lg-4" v-for="blog in blog_posts.message" :key="blog.id">
										<!--<div data-aos="zoom-in-up" data-aos-delay="100" data-aos-offset="0"> -->
										<div >
											<div class="__item __item--preview">
												<figure class="__image">
													<img :src="`${ blog_posts.image_path }/${ blog.featured_image }`" :data-src="`${ blog_posts.image_path }/${ blog.featured_image }`" :alt="`${ blog.title }`" />
												</figure>

												<div class="__content">
													<!--<p class="__category"><nuxt-link :to="`/category/${ blog.category_id }`">{{ blog.category.title }}</nuxt-link></p> -->

													<h3 class="__title h4"><nuxt-link :to="`/post/${ blog.slug }`">{{ blog.title }}</nuxt-link></h3>

													<!--<p class="__text">
														{{ blog.content | truncate(30) }}
													</p> -->

													<span class="__date-post">{{ blog.created_at }}</span>
												</div>
											</div>
										</div>
									</div>
									<!-- end item -->

									
								</div>
							</div>

							<div class="text--center" data-aos="fade">
								<a id="posts-previous-btn" class="custom-btn custom-btn--medium custom-btn--style-1" href="javascript:void(0);" @click="previousPage()" v-if="current_offset > 0"> << Previous</a>
								<a id="posts-next-btn" class="custom-btn custom-btn--medium custom-btn--style-2" href="javascript:void(0);" @click="nextPage()" v-if="blog_posts.message.length >= 9">Next >> </a>
							</div>
						</div>
						<!-- end posts -->
					</template>
				</div>
			</section>
			<!-- end section -->
		</main>
		<!-- end main -->
    </div>
</template>

<script>
import PendingPlaceholder from '~/components/PendingPlaceholder.vue'
import ErrorPlaceholder from '~/components/ErrorPlaceholder.vue'

export default {
  layout: "main_default",

  components: {
        PendingPlaceholder,
        ErrorPlaceholder
   },

  head() {
    return {
      title: this.category_title,
    }
  },

  data() {
	  return {
		  status: 1,
		  blog_posts: [],
          category_title: '',
          current_page: 1,
          from: 0,
          limit: 9,
          blog_count: 0,
          current_offset: 0,
	  }
  },

  filters: {
	truncate(string, value) {
		return string.substring(0, value) + '…';
	}
  },

  async fetch() {
	  const data = {
		  slug: this.$route.params.slug,
          status: 1,
          current_page: this.current_page,
          from: this.from,
          limit: this.limit
	  }

	  this.blog_posts = await this.$store.dispatch("blog/getBlogPostsByCategorySlug", data);
	  if(this.blog_posts.message != '') {
      	this.category_title = this.blog_posts.message[0].category.title
	  }
      this.blog_count = this.blog_posts.blog_count
      this.current_offset = this.blog_posts.current_offset

  },

  methods: {
      async nextPage() {
		  if(this.current_page == -1) {
              this.current_page = this.current_page + 2
          }
		  if(this.current_page == 0) {
              this.current_page = this.current_page + 1
          }
          const data = {
            slug: this.$route.params.slug,
            status: 1,
            current_page: this.current_page + 1,
            from: this.from,
            limit: this.limit
        }

        document.getElementById('posts-next-btn').disabled = true
        document.querySelector('#posts-next-btn').innerHTML = 'Loading...'

        this.blog_posts = await this.$store.dispatch("blog/getBlogPostsByCategorySlug", data);
        this.current_offset = this.blog_posts.current_offset
        //this.category_title = this.blog_posts.message[0].category.title

        if(this.blog_posts.message.length > 0) {
            this.current_page = this.current_page + 1
        }

        document.getElementById('posts-next-btn').disabled = false
        document.querySelector('#posts-next-btn').innerHTML = 'Next >>'

		//console.log(this.current_page)
      },

      async previousPage() {
          if(this.blog_posts.message.length == 0) {
              this.current_page = this.current_page
          }
		  if(this.blog_posts.message.length < 9) {
              this.current_page = this.current_page - 1
          }
          else {
              //this.current_page = this.current_page - 1
          }
          const data = {
            slug: this.$route.params.slug,
            status: 1,
            current_page: this.current_page,
            from: this.from,
            limit: this.limit
        }

        document.getElementById('posts-previous-btn').disabled = true
        document.querySelector('#posts-previous-btn').innerHTML = 'Loading...'

        this.blog_posts = await this.$store.dispatch("blog/getBlogPostsByCategorySlug", data);
        this.current_offset = this.blog_posts.current_offset
        //this.category_title = this.blog_posts.message[0].category.title

        this.current_page = this.current_page - 1

		//console.log(this.current_page)

        document.getElementById('posts-previous-btn').disabled = false
        document.querySelector('#posts-previous-btn').innerHTML = '<< Previous'
      }
  }
}
</script>