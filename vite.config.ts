import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Paths to watch and reload the browser on file change
       */
      entrypoints: [],
      reload: ['resources/views/**/*.edge'],
    }),
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    svelte({ compilerOptions: { hydratable: true }, preprocess: [vitePreprocess()] }),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
  ],
})
