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

						<form class="authorization__form" @submit.prevent="registerUser">
							<h3 class="__title">Sign Up</h3>

                            <div class="input-wrp">
								<input class="textfield" type="text" v-model="first_name" placeholder="First Name" />
							</div>

                            <div class="input-wrp">
								<input class="textfield" type="text" v-model="last_name" placeholder="Last Name" />
							</div>

							<div class="input-wrp">
								<input class="textfield" type="text" v-model="email" placeholder="Email" />
							</div>

							<div class="input-wrp">
								<i class="textfield-ico fontello-eye"></i>
								<input class="textfield" type="password" v-model="password" placeholder="Password" />
							</div>

                            <div class="input-wrp">
								<i class="textfield-ico fontello-eye"></i>
								<input class="textfield" type="password" v-model="confirm_password" placeholder="Confrim Password" />
							</div>

							<p>

								<button class="custom-btn custom-btn--medium custom-btn--style-2 wide" type="submit" role="button" id="sign_in">Submit</button>
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
import { mapMutations } from 'vuex';

export default {
    layout: "login_default",
    middleware: 'guest',
    head() {
        return {
        title: 'Register'
        }
    },

    data() {
        return{
            first_name: '',
            last_name: '',
			email: '',
			password: '',
			confirm_password: ''
        }
    },

    methods: {
        async registerUser() {
            document.getElementById('sign_in').disabled = true
            document.querySelector('#sign_in').innerHTML = 'Signing up...'

			if(this.first_name == "" || this.last_name == "" || this.email == "" || this.password == "") {
				this.$swal("", 'All Fields are required', "error");
				document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Register'
				return 0;
			}

			if(this.password != this.confirm_password) {
				this.$swal("",'Passwords do not match', "error");
				document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Register'
				return;
			}
            //console.log(this.email)

			const data = {
				first_name: this.first_name,
				last_name: this.last_name,
				email: this.email,
				password: this.password,
				password_confirmation: this.confirm_password
			}
            try {
                const register = await this.$axios.$post('/auth/register', data);

				console.log(register)

				if(register.status == 'success') {
					this.$swal("",'Registration Successful!! Check your Email for Verification Code', "success");
					this.$router.push('/verify')
				}
				else {
					this.$swal("",'Registration Failed!!!', "error");
				}
            } catch(e) {
                document.getElementById('sign_in').disabled = false
                document.querySelector('#sign_in').innerHTML = 'Register'
                this.$swal("",'An Error Occurred !!!', "error");
            }
        }
    }
}
</script>
