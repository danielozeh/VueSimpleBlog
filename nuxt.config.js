const env = require('dotenv').config();

const webpack = require("webpack");

export default {
  env: env.parsed,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Vue Simple Blog',
    htmlAttrs: {
      lang: 'en',
      class: 'no-js'
    },
    meta: [
      { charset: 'utf-8', content: 'text/html' },
      { name: 'viewport', content: 'initial-scale=1.0, user-scalable=no' },
      { name: 'viewport', content: 'user-scalable=no, width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Blockchain Remark' },
      { name: 'theme-color', content: '#3F6EBF' },
      { name: 'msapplication-navbutton-color', content: '#3F6EBF' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#3F6EBF' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],

    script: [
    ]
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    //'~/assets/css/style.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-content-placeholder.js'},
    { src: '~/plugins/vue-tables-2.js', ssr: false },
    { src: '~/plugins/vue-wysiwyg.js', ssr: false },
    { src: '~/plugins/bootstrap.js' },
    //{ src: '~/plugins/paystack.js', ssr: false },
    { src: '~/plugins/flutterwave.js', ssr:false },
    { src: '~/plugins/v-line-clamp.js', ssr:false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/date-fns',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-sweetalert2',
    // https://go.nuxtjs.dev/pwa
    //'@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    //'@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  auth: {

    redirect: {
      login: '/login',
      logout: false,
      callback: false,
      home: false
    },

    localStorage: false,
    cookie: {
        options: {
            expires: 7
        }
    },

    strategies: {
        local: {
            endpoints: {
                login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
                logout: { url: '/auth/logout', method: 'post', propertyName: '' },
                user: { url: '/user/profile', method: 'get', propertyName: 'user' }
            },
            tokenRequired: true,
            tokenType: 'Bearer',
            //tokenName: 'Authorization',
        }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: "jquery",
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** Run ESLint on save
    */
    /*extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }*/
  }
}
