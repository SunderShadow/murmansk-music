<script lang="ts">
  import {page} from "$app/state"
  import {afterNavigate} from "$app/navigation"
  import {onMount} from "svelte"
  import {setBandLayoutContext} from "./context"

  const links = $state([
    {
      relHref: '/', // От текущей страницы
      title: 'О группе',
      active: checkIsLinkActive('/'),
    },
    {
      relHref: '/music',
      title: 'Музыка',
      active: checkIsLinkActive('/music')
    },
    {
      relHref: '/albums',
      title: 'Альбомы',
      active: checkIsLinkActive('/albums')
    },
    {
      relHref: '/announcements',
      title: 'Анонсы',
      active: checkIsLinkActive('/announcements')
    }
  ])

  function getFullPath(relPath: string) {
    return '/bands/' + page.params.slug + relPath
  }

  function checkIsLinkActive(relPath: string) {
    return getFullPath(relPath === '/' ? '' : relPath) === page.url.pathname
  }

  let {
    children
  } = $props()

  let bandInfoMinifyTopOffset = 53 // header height
  let bandInfoHTML: HTMLElement = $state()
  let bandInfoMinify = $state(false)

  let bandIconMinifyPercent = $state(0)
  afterNavigate(() => {
    for (let link of links) {
      link.active = checkIsLinkActive(link.relHref)
    }
  })


  let hidden = $state(false)

  setBandLayoutContext({
    hide() {
      hidden = true
    }
  })

  function calcbandIconMinifyPercent() {
    const bandInfoScrollTop = (bandInfoHTML?.getBoundingClientRect()?.top ?? 0)
    bandIconMinifyPercent = Math.max(bandInfoMinifyTopOffset / bandInfoScrollTop, 0.5) * 2 - 1
  }

  onMount(() => {
    calcbandIconMinifyPercent()
    document.getElementById('main-view').addEventListener('scroll', e => {
      calcbandIconMinifyPercent()
    })
  })
</script>

<svelte:head>
  <title>Александр Шведов</title>
</svelte:head>

<div id="band-page">
  <header class:hidden>
    <div class="thumbnails">
      <img src="/test-data/band-thumb.png" alt="">
    </div>
  </header>

  <div class="band-info" class:hidden style:--minify-percent={bandIconMinifyPercent} class:minified={bandInfoMinify} bind:this={bandInfoHTML}>
    <img id="band-icon" src="/test-data/band-badge.png" alt="">
    <div class="page-container">
      <div class="band-text">
        <h1>Штаны карго</h1>
        <div class="genres">
          <data>Metalcore</data>
          <data>Metal</data>
          <data>Indie</data>
        </div>
      </div>
      <nav>
        {#each links as link}
          <a href="{getFullPath(link.relHref)}" class:active={link.active}>{link.title}</a>
        {/each}
      </nav>
    </div>
  </div>

  <div>
    {@render children()}
  </div>
</div>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  #band-page {
    --announce-card-z-index: calc(var(--nav-z-index) - 2);
    --band-info-z-index: calc(var(--nav-z-index) - 2);
  }

  .band-info.hidden,
  header.hidden {
    opacity: 0;

    transition: opacity 500ms;
  }

  .thumbnails {
    img {
      display: block;
      width: 100%;
      aspect-ratio: 393 / 207;
    }
  }

  #band-icon {
    position: absolute;
    top: calc(0px + 10px * var(--minify-percent));
    left: 50%;

    transform: translate(-50%, calc(-50% + 50% * var(--minify-percent)));
    width: var(--band-icon-size, 100px);
    height: var(--band-icon-size, 100px);

    object-fit: cover;
  }

  .band-info {
    --band-icon-size: 60px;
    --band-icon-left: 20px;
    position: sticky;
    top: 0;

    padding-bottom: 8px;
    margin-bottom: 8px;

    text-align: center;
    z-index: calc(var(--band-info-z-index) + var(--minify-percent));

    @include bg.section-start;

    padding-top: 34px;

    .band-text {
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      //top: calc(14px * var(--minify-percent));
      text-align: center;
      z-index: 2;
      backdrop-filter: blur(1px);
    }
    h1 {
      font-size: 20px;
      margin: 0;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: red;
      z-index: -1;
      opacity: calc(1 * var(--minify-percent));
      @include bg.navigation;
    }
  }

  .genres {
    display: flex;
    gap: 4px;
    justify-content: center;

    text-wrap: wrap;
    font-size: 12px;
    font-weight: 200;
    opacity: .65;

    > data + data::before {
      content: '/ ';
    }
  }

  nav {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;

    a:not(.active) {
      opacity: .5;
    }
  }
</style>