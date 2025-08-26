// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        'nuxtjs-naive-ui',
        '@nuxt/ui'
    ],
    fonts: {
        provider: 'bunny'
    },
    build: {
        transpile: [
            'naive-ui',
            'vueuc',
            '@vicons/ionicons5',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
        ]
    },
    nitro: {
        routeRules: {
            '/api/**': { proxy: 'http://localhost:3001/**' }
        }
    }
})