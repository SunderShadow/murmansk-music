<script lang="ts">
  import {slide, scale} from "svelte/transition"
  import Filter from "$lib/icons/Filter.svelte"
  import DateSelector from "$lib/components/DateSelector/DateSelector.svelte"
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCard.svelte"
  import {onNavigate} from "$app/navigation"
  import {onMount, tick} from "svelte"

  let selectedArticleI = $state(-1)
  let shrinkForArticle = $state(false)

  const dateFormatterForURL = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short"
  })

  let resolveNavigate
  onNavigate(async (navigation) => {
    for (let eventI in data.events) {
      const event = data.events[Number(eventI)]
      if (
        event.slug === navigation.to.params.slug
        && dateFormatterForURL.format(event.date).replaceAll('.', '-') === navigation.to.params.date
      ) {
        selectedArticleI = Number(eventI)
        pinSelectedArticleToTop()

        return new Promise(res => {
          resolveNavigate = res
        })
      }
    }
  })

  function onCardInPosition(e: TransitionEvent) {
    if (e.propertyName === 'top') {
      resolveNavigate()
    }
  }
  let {
    data
  } = $props()

  let selectedCardRect = $state({
    top: 0,
    left: 0,
    width: 0
  })

  let selectedCardVisible = $state(false)
  let selectedCardTransformed = $state(false)
  let HTMLEvents: Array<HTMLElement> = $state([])

  function pinSelectedArticleToTop() {
    const articleWrapper = HTMLEvents[selectedArticleI]
    const articleWrapperRect = articleWrapper.getBoundingClientRect()

    selectedCardRect.width = articleWrapperRect.width + 'px'
    selectedCardRect.top = articleWrapperRect.top + 'px'
    selectedCardRect.left = articleWrapperRect.left + 'px'

    selectedCardVisible = true
    tick().then(() => {
      selectedCardTransformed = true
      tick().then(() => {
        shrinkForArticle = true
        selectedCardRect.width = '100%'
        selectedCardRect.top = '53px'
        selectedCardRect.left = '0px'
      })
    })
  }
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

  {#if selectedCardVisible}
    <div class="page-container" class:extend={shrinkForArticle}>
        <div
            style:top={selectedCardRect.top}
            style:left={selectedCardRect.left}
            style:width={selectedCardRect.width}
            style:visibility={selectedCardVisible ? 'visible' : 'hidden'}
            class="selected-card" ontransitionend={onCardInPosition}>
          <AnnounceCard
              {...data.events[selectedArticleI]}
              announcePage={selectedCardTransformed}
          />
        </div>
    </div>
  {/if}

  <div class="announces page-container">
    {#each data.events as announce, i}
      {#if !shrinkForArticle}
        <div bind:this={HTMLEvents[i]} transition:scale={{duration: 500}}>
          <AnnounceCard
              {...announce}
              announcePage={selectedArticleI === i}
              loading={i > 3 ? 'lazy' : 'eager'}
          />
        </div>
      {/if}
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

  .selected-card {
    position: fixed;
    z-index: calc(var(--nav-z-index) - 1);
    width: 100%;
    top: 61px;
    left: 0;
    transition: top 500ms 500ms, left 500ms 500ms, width 500ms 500ms;
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