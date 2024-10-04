// @ts-expect-error bad types from inertia
import { createInertiaApp } from '@inertiajs/svelte'

export default function render(page: any) {
  return createInertiaApp({
    page,
    resolve: (name: string) => {
      // @ts-ignore bad types from inertia
      const pages = import.meta.glob('../pages/**/*.svelte', { eager: true })
      return pages[`../pages/${name}.svelte`]
    },
  })
}
