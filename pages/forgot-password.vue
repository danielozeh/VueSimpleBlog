<template>
    <!-- start main -->
		<main role="main">
			<!-- start section -->
			<section class="section section--no-pt section--no-pb section--light-bg">
				<div class="grid grid--container">
					<div class="authorization authorization--login">
						<nuxt-link class="site-logo" to="/">
							<img class="img-responsive" width="175" height="42" src="/logo.png" alt="demo">
						</nuxt-link>

						<form class="authorization__form" action="#">
							<h3 class="__title">Forgot Password</h3>

							<div class="input-wrp">
								<input class="textfield" type="text" value="" placeholder="Email" />
							</div>

							<p>
								<button class="custom-btn custom-btn--medium custom-btn--style-2 wide" type="submit" role="button">Submit</button>
							</p>

							<p class="text--center"><nuxt-link to="/login">Sign In</nuxt-link> if you already have an account</p>
						</form>
					</div>
				</div>
			</section>
			<!-- end section -->
		</main>
		<!-- end main -->
</template>

<script>
    export default {
		layout: "login_default",
        head() {
            return {
                title: 'Forgot Password'
            }
        }
    }
</script>
