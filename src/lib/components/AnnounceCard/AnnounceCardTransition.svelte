<script lang="ts" module>
  import type {Props as AnnounceCardProps} from "$lib/components/AnnounceCard/AnnounceCard.svelte"
  type Props = AnnounceCardProps & {
    beforeNavigate?: Function
  }
</script>
<script lang="ts">
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCard.svelte"
  import {tick} from "svelte"
  import {goto} from "$app/navigation"

  let showTransitionCard = $state(false)
  let announcePage = $state(false)

  let transitionCard = $state.raw({
    left: 0,
    top: 0
  })

  let cardToHide: HTMLElement = $state()

  let {
    beforeNavigate,
    ...props
  }: Props = $props()

  function startTransform() {
    beforeNavigate?.()

    const top = cardToHide.getBoundingClientRect().top
    const left = cardToHide.getBoundingClientRect().left

    transitionCard = {top, left}

    showTransitionCard = true
    tick().then(() => {
      announcePage = true
    })
  }

  let resolvedLinkHref = ''
  function detectClick(e) {
    e.preventDefault()
    e.stopPropagation()

    startTransform()
    resolvedLinkHref = e.currentTarget.attributes.href.value
  }
</script>


<div class="announce-card-transition-wrapper">
  {#if showTransitionCard}
    <div
        class="card-for-transition"
        style:--animation-top-init="{transitionCard.top}px"
        onanimationend={() => {goto(resolvedLinkHref)}}
    >
      <AnnounceCard {...props} {announcePage} />
    </div>
  {/if}
  <div class="card-to-hide" class:hidden={showTransitionCard} bind:this={cardToHide}>
    <AnnounceCard onClick={detectClick} {...props}/>
  </div>
</div>

<style lang="scss">
  @keyframes slide {
    0% {
      top: var(--animation-top-init);
      left: var(--animation-left-init);
      width: var(--animation-width-init);
    }
    100% {
      top: var(--animation-top-end);
      left: var(--animation-left-end);
      width: var(--animation-width-end);
    }
  }

  .card-to-hide.hidden {
    opacity: 0;
  }

  .card-for-transition {
    --animation-top-end: 53px;
    --animation-left-init: 12px;
    --animation-left-end: 0;
    --animation-width-init: calc(100% - 24px);
    --animation-width-end: 100%;

    top: var(--animation-top-end);
    position: fixed;
    width: var(--animation-width-end);
    left: var(--animation-left-end);
    z-index: var(--announce-card-z-index, calc(var(--nav-z-index) - 5));

    animation: var(--announce-card-transition-animation-duration, 500ms) slide ease-in-out;
  }
</style>