<script lang="ts">
  import {page} from "$app/state"
  import {afterNavigate} from "$app/navigation"
  import {onMount} from "svelte"

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

  afterNavigate(() => {
    for (let link of links) {
      link.active = checkIsLinkActive(link.relHref)
    }
  })
  onMount(() => {
    document.getElementById('main-view').addEventListener('scroll', e => {
      if (userInfoMinifyTopOffset >= userInfoHTML.getBoundingClientRect().top) {
        userInfoMinify = true
      } else {
        userInfoMinify = false
      }
    })
  })
</script>

<svelte:head>
  <title>Александр Шведов</title>
</svelte:head>

<header>
  <div class="thumbnails">
    <img src="/test-data/user-thumb.png" alt="">
  </div>
</header>

<div class="user-info" class:minified={userInfoMinify} bind:this={userInfoHTML}>
  <img id="user-icon" src="/test-data/user-icon.png" alt="">
  <div class="page-container">
    <h1>Александр Шведов</h1>
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

{@render children()}

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  img {
    width: 100%;
    aspect-ratio: 393 / 207;
  }

  .thumbnails {
    position: relative;
  }

  #user-icon {
    position: absolute;
    top: 0;
    left: 20px;

    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    object-fit: cover;
    z-index: calc(var(--nav-z-index) + 1);
  }

  h1 {
    font-size: 20px;
    margin: 0;
  }

  .user-info {
    position: sticky;
    top: -1px;

    padding-bottom: 8px;
    margin-bottom: 8px;

    text-align: right;

    @include bg.section-start;
    z-index: 10;

    &.minified {
      width: 100%;
      left: 0;
      @include bg.navigation;

      nav {
      }

      #user-icon {
        top: 10px;

        width: 70px;
        height: 70px;
        transform: translateY(0);
      }
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
    margin-top: 28px;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;

    a:not(.active) {
      opacity: .5;
    }
  }
</style>