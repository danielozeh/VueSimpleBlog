<template>
    <div>
        <MainHeader page_title="homepage" />
        <Nuxt />
        <MainFooter />
        <BackToTop />
    </div>
</template>

<script>
import MainHeader from "~/components/MainHeader.vue";
import MainFooter from "~/components/MainFooter.vue";
import BackToTop from "~/components/BackToTop.vue";

import { mapState } from "vuex";

export default {
    //middleware: "auth",
    components: {
        MainHeader,
        MainFooter,
        BackToTop
    },

    computed: {
        //...mapState(["page_title"]),
    },
};
</script>
