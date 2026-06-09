<script lang="ts">
  import {page} from "$app/state"
  import {afterNavigate} from "$app/navigation"
  import {onMount} from "svelte"
  import {setUserLayoutContext} from "./context"

  const links = $state([
    {
      relHref: '/', // От текущей страницы
      title: 'О себе',
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
    return '/user/' + page.params.slug + relPath
  }

  function checkIsLinkActive(relPath: string) {
    return getFullPath(relPath === '/' ? '' : relPath) === page.url.pathname
  }

  let {
    children
  } = $props()

  let userInfoMinifyTopOffset = 53 // header height
  let userInfoHTML: HTMLElement = $state()
  let userInfoMinify = $state(false)

  let userIconMinifyPercent = $state(0)
  afterNavigate(() => {
    for (let link of links) {
      link.active = checkIsLinkActive(link.relHref)
    }
  })


  let hidden = $state(false)

  setUserLayoutContext({
    hide() {
      hidden = true
    }
  })

  function calcUserIconMinifyPercent() {
    const userInfoScrollTop = (userInfoHTML?.getBoundingClientRect()?.top ?? 0)
    userIconMinifyPercent = Math.max(userInfoMinifyTopOffset / userInfoScrollTop, 0.5) * 2 - 1
  }

  onMount(() => {
    calcUserIconMinifyPercent()
    document.getElementById('main-view').addEventListener('scroll', e => {
      calcUserIconMinifyPercent()
    })
  })
</script>

<svelte:head>
  <title>Александр Шведов</title>
</svelte:head>

<div id="user-page">
  <header class:hidden>
    <div class="thumbnails">
      <img src="/test-data/user-thumb.png" alt="">
    </div>
  </header>

  <div class="user-info" class:hidden style:--minify-percent={userIconMinifyPercent} class:minified={userInfoMinify} bind:this={userInfoHTML}>
    <img id="user-icon" src="/test-data/user-icon.png" alt="">
    <div class="page-container">
      <h1>Шведов Александр Николаевич</h1>
      <div class="genres">
        <data>Metalcore</data>
        <data>Metal</data>
        <data>Indie</data>
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

  #user-page {
    --announce-card-z-index: calc(var(--nav-z-index) - 2);
    --user-info-z-index: calc(var(--nav-z-index) - 2);
  }

  .user-info.hidden,
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

  #user-icon {
    position: absolute;
    top: calc(0 + 10px * var(--minify-percent));
    left: var(--user-icon-left, 20px);

    transform: translateY(calc(-50% + 50% * var(--minify-percent)));
    width: var(--user-icon-size, 100px);
    height: var(--user-icon-size, 100px);
    z-index: calc(var(--nav-z-index) + 1);

    object-fit: cover;
  }

  h1 {
    font-size: 20px;
    margin: 0;
  }

  .user-info {
    --user-icon-size: calc(100px - 30px * var(--minify-percent));
    --user-icon-left: 20px;
    position: sticky;
    top: 0;

    padding-bottom: 8px;
    margin-bottom: 8px;

    text-align: right;
    z-index: calc(var(--user-info-z-index) + var(--minify-percent));

    @include bg.section-start;

    h1 {
      width: calc(100% - var(--user-icon-left) - 100px);
      margin-left: auto;
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
    justify-content: flex-end;

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