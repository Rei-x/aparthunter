<script lang="ts">
  import type FailedApartmentsController from '#controllers/failed_apartments_controller'

  import type { InferPageProps } from '@adonisjs/inertia/types'
  export let props: InferPageProps<FailedApartmentsController, 'index'>['props']
</script>

<svelte:head>
  <title>Fails</title>
</svelte:head>
<div>
  <h1>Fails</h1>
  <ul>
    {#each props.failedApartments as failedApartment}
      <li>{failedApartment.url}</li>
    {/each}
  </ul>
</div>
