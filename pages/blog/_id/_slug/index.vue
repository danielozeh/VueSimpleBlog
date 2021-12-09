<template>
    <div>
        <!-- start intro -->
		<div id="intro" class="jarallax" data-speed="0.5" style="background-image: url(/img/intro_img/1.jpg);">
			<div class="grid grid--container">
				<div class="row row--xs-middle">
					<div class="col col--lg-5 text--center">
						<!--<h1 class="__title">Blog Post</h1> -->
						<p>{{ title }}</p>
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
						<div class="row row--xs-middle">
							<div class="col col--md-10 col--lg-8">
								<!-- start posts -->
								<div class="posts">
									<!-- start item -->
									<div class="__item">
										<!--<img class="img-responsive  lazy" width="100%" src="/img/blank.gif" data-src="/img/posts_img/5.jpg" alt="demo" /> -->

										<div class="__content">
											<p class="__category"><a href="#">Blockchain</a></p>

											<h3 class="__title h4">{{ blog_details.message.title }}</h3>

											<span class="__date-post">{{ blog_details.message.created_at }}</span>

											<p class="__text">
												{{ blog_details.message.content }}
											</p>

											
										</div>

										<div class="__content">

											<div class="__meta">
												<div class="social-btns">
													<a class="fontello-twitter" href="#"></a>
													<a class="fontello-facebook" href="#"></a>
													<a class="fontello-linkedin-squared" href="#"></a>
													<a class="fontello-gplus" href="#"></a>
													<a class="fontello-instagram" href="#"></a>
													<a class="fontello-youtube" href="#"></a>
													<a class="fontello-vkontakte" href="#"></a>
													<a class="fontello-bitcoin" href="#"></a>
												</div>
											</div>
										</div>
									</div>
									<!-- end item -->
								</div>
								<!-- end posts -->

								<div class="posts-feedback">
									<h3>{{ blog_details.total_active_comments }} Comments</h3>

									<!-- start comments list -->
									<ul class="comments-list">
										<li class="comment" v-for="comment in blog_details.message.comments" :key="comment.id">
											<div v-if="comment.status == 1">
												<div class="comment__author-img">
													<img class="img-responsive circled" src="/avatar.png" data-src="/avatar.png" alt="demo" />
												</div>

												<div class="comment__text">
													<div>
														<a class="comment__reply" href="#">REPLY</a>

														<span class="comment__author-name">{{ comment.first_name }} {{ comment.last_name }} </span>
														<span class="comment__date-post">{{ comment.created_at }}</span>
													</div>

													<p>
														{{ comment.comment }}
													</p>
												</div>
											</div>

										</li>

									</ul>
									<!-- end comments list -->

									<h3>Comment</h3>

									<form action="#">
										<div class="row">
											<div class="col col--sm-6">
												<div class="input-wrp">
													<input class="textfield" type="text" value="" placeholder="Name" />
												</div>
											</div>

											<div class="col col--sm-6">
												<div class="input-wrp">
													<input class="textfield" type="text" value="" placeholder="E-mail" />
												</div>
											</div>
										</div>

										<div class="input-wrp">
											<textarea class="textfield" placeholder="Comments"></textarea>
										</div>

										<button class="custom-btn custom-btn--medium custom-btn--style-2" type="submit" role="button">Send a message</button>
									</form>
								</div>
							</div>
						</div>
					</template>
				</div>
			</section>
			<!-- end section -->
		</main>
		<!-- end main -->
    </div>
</template>

<script>
export default {
  layout: "main_default",

  data() {
	  return {
		  blog_details: '',
		  title: ''
	  }
  },

  head() {
	  return {
		  title: this.title,
			meta: [
				{ hid: 'description', name: 'description', content: this.title }
			]
	  }
  },

  async fetch() {
	  const data = {
		  id: this.$route.params.id,
	  }

	  this.blog_details = await this.$store.dispatch("blog/getBlogPostDetails", data);
	  this.title = this.blog_details.message.title
	  //console.log(this.blog_details)
  }
}
</script>