<script lang="ts">
  import Filter from "$lib/icons/Filter.svelte"
  import DateSelector from "$lib/components/DateSelector/DateSelector.svelte"
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCard.svelte"

  let {
    data
  } = $props()
</script>

<main class="page-container">
  <div class="filters">
    <a id="filter">
      <Filter />
      Фильтры
    </a>

    <div class="date-wrapper">
      <DateSelector />
    </div>
  </div>

  <div class="announces">
    {#each data.events as event, i}
      <AnnounceCard {...event} loading={i > 3 ? 'lazy' : 'eager'}/>
    {/each}
  </div>
</main>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  .announces {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;

    margin-top: 16px;
  }

  #filter {
    --color: #fff;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    text-decoration: none;

    margin-top: 8px;

    color: var(--color);

    :global svg {
      *[fill] {
        fill: var(--color);
      }
      *[stroke] {
        stroke: var(--color);
      }
    }

  }

  .date-wrapper {
    max-width: 255px;
    width: 100%;
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    justify-content: space-between;

  }

  .page-container {
    @include bg.section-start
  }
</style>