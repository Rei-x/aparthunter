<script lang="ts">
  import type ScrapersController from '#controllers/scrapers_controller'
  import type { InferPageProps } from '@adonisjs/inertia/types'
  import { Link } from 'lucide-svelte'
  import { router } from '@inertiajs/core'
  export let props: InferPageProps<ScrapersController, 'index'>['props']

  // 1000000 -> 1 000 000
  const formatPrice = (price: number) => {
    return price.toLocaleString('pl', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  setInterval(() => {
    if (typeof window === 'undefined') {
      return
    }
    router.reload()
  }, 1000)
</script>

<svelte:head>
  <title>Homepage</title>
</svelte:head>

<div class="p-4">
  <div class="text-4xl">aparthunter???</div>
  <div class="flex flex-wrap gap-4">
    {#each props.apartments as apartment}
      <div class="flex flex-col gap-2 rounded-md bg-slate-50 p-4 shadow-sm">
        <div class="flex items-center gap-2">
          <div class="flex flex-col">
            <div class="text-xl font-bold">{formatPrice(apartment.price)}</div>
            <div class="text-sm text-gray-500">
              {apartment.cityName}
            </div>
          </div>
          <a href={apartment.url} target="_blank" rel="noopener noreferrer">
            <Link />
          </a>
        </div>
      </div>
    {/each}
  </div>
  <button
    class="rounded-sm bg-slate-300 px-4 py-2 text-sm shadow-sm hover:bg-slate-400"
    on:click={() => {
      fetch('/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }}
  >
    Submit
  </button>
</div>
