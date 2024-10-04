/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
// @ts-expect-error bad types from inertia
import { createInertiaApp } from '@inertiajs/svelte'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

// @ts-ignore bad types from inertia
const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title: string) => `${title} - ${appName}`,

  resolve: (name: string) => {
    // @ts-ignore bad types from inertia
    return resolvePageComponent(`../pages/${name}.svelte`, import.meta.glob('../pages/**/*.svelte'))
  },

  // @ts-expect-error bad types from inertia
  setup({ el, App, props }) {
    new App({ target: el, props, hydrate: true })
  },
})
