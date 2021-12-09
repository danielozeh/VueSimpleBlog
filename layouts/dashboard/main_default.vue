<template>
    <div>
        <body class="ms-body ms-aside-left-open ms-primary-theme ">
            <!-- Preloader -->
              

              <!-- Overlays -->
              <div class="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
              <div class="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>
            <MainSidebar />
            <MainHeader />
            <main class="body-content">
                <Nuxt />
            </main>
            <MainFooter />
            <BackToTop />
        </body>
    </div>
</template>

<script>
import MainHeader from "~/components/dashboard/MainHeader.vue";
import MainSidebar from "~/components/dashboard/MainSidebar"
import MainFooter from "~/components/dashboard/MainFooter.vue";

import { mapState } from "vuex";

export default {
    middleware: "auth",
    components: {
        MainHeader,
        MainSidebar,
        MainFooter,
    },

    computed: {
        //...mapState(["page_title"]),
    },

    head() {
        return {
            link: [
                { rel: 'icon', href: '/guinea-logo.png' },
                { rel: 'stylesheet', href:"https://fonts.googleapis.com/icon?family=Material+Icons"},
                { rel: 'stylesheet', href:"/dashboard/vendors/iconic-fonts/font-awesome/css/all.min.css"},

                /////////ICONIC FONTS
                { rel: 'stylesheet', href:"/dashboard/vendors/iconic-fonts/cryptocoins/cryptocoins.css"},
                { rel: 'stylesheet', href:"/dashboard/vendors/iconic-fonts/flat-icons/flaticon.css"},
                { rel: 'stylesheet', href:"/dashboard/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css"},

                ////////////BOOTSTRAP CORE CSS
                { rel: 'stylesheet', href:"/dashboard/assets/css/bootstrap.min.css"},

                //////////JQUERY UI
                { rel: 'stylesheet', href:"/dashboard/assets/css/jquery-ui.min.css"},

                //////PAGE SPECIFIC CSS (SLICK SLIDER CSS)
                { rel: 'stylesheet', href:"/dashboard/assets/css/slick.css"},

                ///////MAIN CSS
                { rel: 'stylesheet', href:"/dashboard/assets/css/style.css"},
            ],
            script: [
                /////GLOBAL REQUIRED SCRIPT
                { src: "/dashboard/assets/js/jquery-3.3.1.min.js", body: true, async: true },
                { src: "/dashboard/assets/js/popper.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/bootstrap.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/perfect-scrollbar.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/jquery-ui.min.js", body: true, async: true, defer: true },


                /////PAGE SPECIFIC SCRIPT
                { src: "/dashboard/assets/js/moment.j", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/jquery.webticker.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/Chart.bundle.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/Chart.Financial.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/table-line.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/index-chart.js", body: true, async: true, defer: true },

                { src: "/dashboard/assets/js/d3.v3.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/topojson.v1.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/datamaps.all.min.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/index-map.js", body: true, async: true, defer: true },

                //////CORE JAVASCRIPT
                { src: "/dashboard/assets/js/framework.js", body: true, async: true, defer: true },
                { src: "/dashboard/assets/js/settings-map.js", body: true, async: true, defer: true },
            ]
        }
    }
};
</script>
