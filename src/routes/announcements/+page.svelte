<script lang="ts">
  import {slide} from "svelte/transition"
  import Filter from "$lib/icons/Filter.svelte"
  import DateSelector from "$lib/components/DateSelector/DateSelector.svelte"
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCardTransition.svelte"
  import {onMount} from "svelte"

  let selectedArticleI = $state(-1)
  let shrinkForArticle = $state(false)

  let {
    data
  } = $props()

  let navigation = $state(false)
  let selectedI = $state(-1)
  onMount(() => {
    console.log()
  })
</script>

<main class:shrink-article={shrinkForArticle}>
  {#if !shrinkForArticle}
    <div class="filters" transition:slide={{duration: 500}}>
      <div class="page-container">
        <a id="filter">
          <Filter />
          Фильтры
        </a>

        <div class="date-wrapper">
          <DateSelector />
        </div>
      </div>
    </div>
  {/if}

  <div class="announces page-container">
    {#each data.events as announce, i}
      <div class="card-page-container" class:hidden={selectedI !== -1 && selectedI !== i}>
        <AnnounceCard
            {...announce}
            beforeNavigate={() => {navigation = true; selectedI = i}}
            announcePage={selectedArticleI === i}
            loading={i > 3 ? 'lazy' : 'eager'}
        />
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  .card-page-container.hidden {
    opacity: 0;
    transition: opacity 500ms;
  }

  .announces {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;

    transition: gap 500ms;
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
    padding-bottom: 16px;
    @include bg.section-start;

    > .page-container {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      justify-content: space-between;
    }
  }
</style>