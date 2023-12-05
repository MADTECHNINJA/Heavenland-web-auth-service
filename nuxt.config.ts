import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

    css: ['@/styles/swv.css', '@/styles/style.css', '@/styles/form.css', '@/styles/oruga.css'],

    app: {
        head: {
            title: 'Heavenauth',
            charset: 'UTF-8',
            meta: [],
            link: [
                { rel: 'icon', href: '/favicon.ico' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Courier+Prime&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap',
                },
            ],
        },
    },

    vite: {
        build: {
            target: 'es2020',
        },
        optimizeDeps: {
            esbuildOptions: {
                target: 'es2020',
                define: {
                    global: 'globalThis',
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                ],
            },
        },
    },

    ssr: false,
});
