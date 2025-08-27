/*
 *   Copyright (C) 2025 huangdihd
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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