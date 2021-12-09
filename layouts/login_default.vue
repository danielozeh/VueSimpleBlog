<template>
    <div>
        <Nuxt />
    </div>
</template>

<script>

import { mapState } from "vuex";

export default {
    //middleware: "auth",

    computed: {
        //...mapState(["page_title"]),
    },

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
};
</script>
