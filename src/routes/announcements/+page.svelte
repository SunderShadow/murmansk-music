<script lang="ts">
  import Filter from "$lib/icons/Filter.svelte"
  import DateSelector from "$lib/components/DateSelector/DateSelector.svelte"
</script>

<main class="page-container">
  <div class="filters">
    <a id="filter">
      <Filter />
      Фильтры
    </a>

    <DateSelector />
  </div>
</main>

<style lang="scss">
  #filter {
    --color: #fff;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    text-decoration: none;

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

  .filters {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }
</style>