export default {
  server: {
    port: 9001,
  },
  telemetry: false,
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'invest-nuxt-turkey',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],
  loading: {
    color: '#583FB5',
    height: '5px',
    continuous: true
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/i18n',
    '@/plugins/mixin',
    '@/plugins/vuelidate',
    '@/plugins/svg-icon',
    '@/assets/icons',
    {
      src: "@/plugins/ctk-date-picker",
      ssr: false
    },
    {
      src: "@/plugins/progress-circle",
      ssr: false
    },
    {
      src: "@/plugins/chart",
      ssr: false
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
  ],
  moment: {
    defaultLocale: 'tr',
    locales: ['tr']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/apollo',
    'vue-social-sharing/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  apollo: {
    clientConfigs: {
      default: "~/plugins/apollo-config.js"
    },
  },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  // styleResources: {
  //   scss: ['~/assets/scss/main.scss']
  // },
}
