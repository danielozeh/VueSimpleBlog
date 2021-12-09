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

						<form class="authorization__form" @submit.prevent="loginUser">
							<h3 class="__title">Sign In</h3>

							<div class="input-wrp">
								<input class="textfield" type="text" v-model="email" placeholder="Email" />
							</div>

							<div class="input-wrp">
								<i class="textfield-ico fontello-eye"></i>
								<input class="textfield" type="password" v-model="password" placeholder="Password" />
							</div>

							<p>
								<nuxt-link to="forgot-password">I forgot my password</nuxt-link>

								<button class="custom-btn custom-btn--medium custom-btn--style-2 wide" type="submit" role="button" id="sign_in">Submit</button>
							</p>

                            <p class="text--center"><nuxt-link to="/verify">Verify My Account</nuxt-link> </p>

							<p class="text--center"><nuxt-link to="/register">Sign Up</nuxt-link> if you don’t have an account</p>
						</form>
					</div>
				</div>
			</section>
			<!-- end section -->
		</main>
		<!-- end main -->
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    layout: "login_default",
    middleware: 'guest',
    head() {
        return {
        title: 'Login'
        }
    },

    data() {
        return{
            email: '',
            password: ''
        }
    },

    methods: {
        async loginUser() {
            document.getElementById('sign_in').disabled = true
            document.querySelector('#sign_in').innerHTML = 'Logging in..'
            //console.log(this.email)
            try {
                await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                if (this.$auth.loggedIn) {
                    this.$router.push('/office/');
                }else{
                    document.getElementById('sign_in').disabled = false
                    document.querySelector('#sign_in').innerHTML = 'Sign Me In'
                    this.$swal("",'Wrong Login Credentials or Account Not Verified !!!', "error");
                }
            } catch(e) {
                document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Sign Me In'
                this.$swal("",'An Error Occured !!!', "error");
            }
        }
    }
}
</script>
