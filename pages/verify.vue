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

						<form class="authorization__form">
							<h3 class="__title">Verify My Account</h3>

                            <div class="input-wrp">
								<input class="textfield" type="text" v-model="email" placeholder="Email Address"/>
							</div>

                            <div class="input-wrp">
								<input class="textfield" type="text" v-model="verification_code" placeholder="Verification Code" />
							</div>

							<p>

								<button class="custom-btn custom-btn--medium custom-btn--style-2 wide" type="button" role="button" id="sign_in" @click="verifyUser">Submit</button>

                                <br><br>

                                <button class="custom-btn custom-btn--small custom-btn--style-1 wide" type="button" role="button" id="sign_in2" @click="resendVerificationCode">Resend Verification Code</button>
							</p>

							<p class="text--center"><nuxt-link to="/login">Sign In</nuxt-link> if you already verified your account</p>
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
        title: 'Verify My Account'
        }
    },

    data() {
        return{
            email: '',
            verification_code: '',
        }
    },

    methods: {
        async verifyUser() {
            document.getElementById('sign_in').disabled = true
            document.querySelector('#sign_in').innerHTML = 'Verifying...'

			if(this.verification_code == "" || this.email == "") {
				this.$swal("", 'All Fields are required', "error");
				document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Submit'
				return 0;
			}
            //console.log(this.email)
            try {
                const data = {
                    verification_code: this.verification_code
                }
                const verify = await this.$axios.$post('/auth/verify-user/' + this.email, data);

                //console.log(verify.status)

				if(verify.status == 'success') {
					this.$swal("", verify.message, "success");
					this.$router.push('/login')
				}
                else {
					this.$swal("", verify.message, "error");
				}
            } catch(e) {
                document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Submit'
                this.$swal("", 'An Error Occured !!!', "error");
            }
        },

        async resendVerificationCode() {
            document.getElementById('sign_in2').disabled = true
            document.querySelector('#sign_in2').innerHTML = 'Resending...'

			if(this.email == "") {
				this.$swal("", 'All Fields are required', "error");
				document.getElementById('sign_in2').disabled = false
                document.querySelector('#sign_in2').innerHTML = 'Resend Verification Code'
				return 0;
			}
            //console.log(this.email)
            try {
                const data = {
                    email: this.email
                }
                const verify = await this.$axios.$post('/auth/resend-verification-code', data);

				if(verify.status == 'success') {
					this.$swal("", verify.message, "success");
				}
                else {
					this.$swal("", verify.message, "error");
				}
            } catch(e) {
                document.getElementById('sign_in2').disabled = false
                document.querySelector('#sign_in2').innerHTML = 'Resend Verification Code'
                this.$swal("", 'An Error Occured !!!', "error");
            }
        }
    }
}
</script>
