<template>
    <div>
        <!-- start intro -->
		<div id="intro" class="jarallax" data-speed="0.5" style="background-image: url(/img/intro_img/1.jpg);">
			<div class="grid grid--container">
				<div class="row row--xs-middle">
					<div class="col col--lg-5 text--center">
						<h4 class="__title">Posts in {{ category_title }}</h4>
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
					<!-- start posts -->
					<div class="posts">
						<div class="__inner">
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
										<div data-aos-delay="100" data-aos-offset="0">
											<div class="__item __item--preview">
												<figure class="__image">
													<img :src="`${ blog_posts.image_path }/${ blog.featured_image }`" :data-src="`${ blog_posts.image_path }/${ blog.featured_image }`" :alt="`${ blog.title }`" />
												</figure>

												<div class="__content">
													<!--<p class="__category"><nuxt-link :to="`/category/${ blog.category_id }`">{{ blog.category.title }}</nuxt-link></p> -->

													<h3 class="__title h4"><nuxt-link :to="`/post/${ blog.slug }`">{{ blog.title }}</nuxt-link></h3>

													<p class="__text">
														{{ blog.content | truncate(30) }}
													</p>

													<span class="__date-post">{{ blog.created_at }}</span>
												</div>
											</div>
										</div>
									</div>
									<!-- end item -->

									
								</div>
							</template>
						</div>

						<div class="text--center">
							<a id="posts-more-btn" class="custom-btn custom-btn--medium custom-btn--style-2" href="javascript:void(0);">Show more</a>
						</div>
					</div>
					<!-- end posts -->
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
      title: 'Blog'
    }
  },

  data() {
	  return {
		  status: 1,
		  blog_posts: [],
          category_title: ''
	  }
  },

  filters: {
	truncate(string, value) {
		return string.substring(0, value) + '…';
	}
  },

  async fetch() {
	  const data = {
		  id: this.$route.params.id,
          status: 1
	  }

	  this.blog_posts = await this.$store.dispatch("blog/getBlogPostsByCategory", data);
      this.category_title = this.blog_posts.message[0].category.title

	  //console.log(this.blog_posts)
  }
}
</script>