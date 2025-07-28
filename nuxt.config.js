import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',

  head: {
    titleTemplate: '%s - map-leaflet-app',
    title: 'map-leaflet-app',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['@mdi/font/css/materialdesignicons.min.css'],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv'
  ],

  axios: {
    baseURL: '/'
  },

  auth: {
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        codeChallengeMethod: '',
        responseType: 'token id_token',
        redirectUri: process.env.GOOGLE_CLIENT_URL,
        scope: ['openid', 'profile', 'email']
      },
      discord: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://discord.com/api/oauth2/authorize',
          token: 'https://discord.com/api/oauth2/token',
          userInfo: 'https://discord.com/api/users/@me'
        },
        token: {
          property: 'access_token',
          type: 'Bearer'
        },
        responseType: 'token',
        grantType: 'authorization_code',
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        redirectUri: process.env.DISCORD_REDIRECT_URI,
        scope: ['identify', 'email']
      }
    },
    redirect: {
      login: '/auth/signin',
      logout: '/',
      callback: '/auth/callback',
      home: '/'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.indigo.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {},

  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_URL: process.env.GOOGLE_CLIENT_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI
  }
}
