<template>
    <div>
        <!-- start header -->
        <header id="top-bar" class="top-bar--light">
            <div id="top-bar__inner">
                <a id="top-bar__logo" class="site-logo" href="/">
                    <img class="img-responsive" width="175" height="42" src="/logo-white.png" alt="demo" />
                    <img class="img-responsive" width="175" height="42" src="/logo.png" alt="demo" />
                </a>

                <a id="top-bar__navigation-toggler" href="javascript:void(0);"><span></span></a>

                <div id="top-bar__navigation-wrap">
                    <div>
                        <nav id="top-bar__navigation" class="navigation" role="navigation">
                            <ul>
                                <li :class="{ 'active': this.$route.name == 'index'}">
                                    <a href="/"><span>Home</span></a>
                                </li>

                                <li :class="{ 'active': this.$route.name == 'blog' | this.$route.name == 'blog-id-slug' | this.$route.name == 'blog-category-id' }">
                                    <a href="/blog"><span>Blog</span></a>
                                </li>

                                <li :class="{ 'active': this.$route.name == 'contact'}">
                                    <a href="/contact"><span>Contact</span></a>
                                </li>

                            </ul>
                        </nav>

                        <br class="hide--lg">

                        <ul id="top-bar__subnavigation">
                            <li>
                                <nuxt-link class="custom-btn custom-btn--small custom-btn--style-3" to="/office/" v-if="$store.state.auth.loggedIn">Dashboard</nuxt-link>
                                <a class="custom-btn custom-btn--small custom-btn--style-3" href="/login" v-else>Login</a>
                            </li>
                            <li><a href="/register" v-if="!$store.state.auth.loggedIn">Sign up</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <!-- end header -->
    </div>
</template>

<script>
export default({
    head() {
        return {
            link: [
                { rel: 'stylesheet', href:"/css/style.min.css"},
            ],

            script: [
                //{ src: "/js/device.min.js", body: true, async: true, defer: true },
                { src: "/js/jquery-2.2.4.min.js", body: true, async: true, defer: true },
                { src: "/js/main.min.js", body: true, async: true, defer: true }
            ]
        }
    }
})
</script>
