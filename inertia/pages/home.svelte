<script lang="ts">
  import type SalesApartmentController from '#controllers/scrapers_controller'
  import type { InferPageProps } from '@adonisjs/inertia/types'
  import { LinkIcon } from 'lucide-svelte'
  import { Link } from '@inertiajs/svelte'
  export let props: InferPageProps<SalesApartmentController, 'index'>['props']

  const formatPrice = (price: number) => {
    return price.toLocaleString('pl', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }
</script>

<svelte:head>
  <title>Homepage</title>
</svelte:head>

<div class="p-4">
  <div class="text-4xl">aparthunter???</div>
  <Link href="/fails">Fails</Link>
  <iframe
    src="http://metabase.suzuya.dev/public/dashboard/e71d10dc-6920-41d3-8fe4-91478d93d5ec"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
    title="Aparthunter"
  />
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
            <LinkIcon />
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
