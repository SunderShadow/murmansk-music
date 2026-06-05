<script lang="ts" module>
  import type {Component, Snippet} from "svelte"

  export type Link = { icon: Component | Snippet, name: string, href: string }
  export type Props = {
    links: Array<Link>
  }
</script>
<script lang="ts">
  import MagnifierIcon from "$lib/icons/Magnifier.svelte"
  import {page} from "$app/state"

  let { links }: Props = $props()
</script>

<nav>
  <a id="search-btn" href="/search" class:active={page.url.pathname === '/search'}>
    <MagnifierIcon />
    Поиск
  </a>

  {#each links as {icon, href, name}}
    <a {href} class:active={page.url.pathname === href}>
      {@render icon()}
      {name}
    </a>
  {/each}
</nav>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  nav {
    position: relative;
    z-index: var(--nav-z-index);

    display: flex;
    padding: 6px 12px;
    gap: 8px;

    @include bg.navigation;
  }

  a {
    --color: #fff;
    display: flex;
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

    &.active {
      --color: var(--color-accent);
    }
  }

  #search-btn {
    margin-right: auto;
  }
</style>