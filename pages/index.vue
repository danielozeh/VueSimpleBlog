<template>

  <div>
    <!-- start start screen -->
		<div id="start-screen" class="start-screen--light start-screen--style-2">
			<div class="start-screen__static-bg jarallax" data-speed="0.3" style="background-image: url(img/bg_3.jpg);">

				<div class="start-screen__content">
					<div class="start-screen__content__inner">
						<div class="grid grid--container">
							<div class="row row--xs-center">
								<div class="col col--md-7">
									<h1 class="__title">Simple Blog</h1>

									<div class="row">
										<div class="col col--lg-11 col--xl-9">
											<div class="col-MB-25">
												Simple Blog 
											</div>

											<div class="row row--xs-center">
												<div class="col col--xs-auto">
													<a class="custom-btn custom-btn--medium custom-btn--style-2" style="margin-top: 20px;" href="/register">Get Started</a>
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

			<span class="scroll-discover hide show--md">scroll down <b></b></span>

		</div>
		<!-- end start screen -->

  </div>
  
</template>

<script>
export default {
  layout: "main_default",

  head() {
    return {
      title: 'Home',
	  meta: [
		  { hid:'description', name: 'description', content: this.site_description }
	  ]
    }
  },

  data() {
	  return {
		  all_faq: [],
		  settings: '',
		  site_title: '',
		  site_description: '',
		  all_team: [],
		  all_roadmap: [],
		  roadmap_length: '',
		  home_title: '',
		  all_product: [],
		  user_email: ''
	  }
  },
  methods: {
	  
  }
}
</script>
