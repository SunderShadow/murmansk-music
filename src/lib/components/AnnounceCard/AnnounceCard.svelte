<script lang="ts" module>
  import {scale} from "svelte/transition"

  import type {SvelteHTMLElements} from "svelte/elements"
  import type {MusicEvent} from "$lib/types"

  export type Props = {
    title: MusicEvent['title']
    slug: MusicEvent['slug']
    imgSrc: MusicEvent['imgSrc']
    genres: MusicEvent['genres']
    address: MusicEvent['address']['coords']
    date: MusicEvent['date']
    loading?: SvelteHTMLElements["img"]["loading"],
    announcePage: boolean
  }
</script>
<script lang="ts">
  import Tag from "$lib/components/Tag.svelte"
  import GenreTag from "$lib/components/GenreTag.svelte"

  const dateFormatterForURL = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short"
  })

  const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  })

  let {
    slug,
    title,
    imgSrc,
    genres,
    address,
    date,
    announcePage = false,
    loading = 'lazy'
  }: Props = $props()

  const href = $derived(`/announcements/${dateFormatterForURL.format(date).replaceAll('.', '-')}/${slug}`)
</script>

<svelte:head>
  {#if loading !== 'lazy'}
    <link rel="preload" as="image" href={imgSrc}>
  {/if}
</svelte:head>

<article class="announce-card" class:announce-page={announcePage}>

  <!-- Left top -->
  {#if !announcePage}
    <div class="announce-type" transition:scale={{duration: 500}}>
      <Tag title="Концерт"/>
    </div>
  {/if}

  <!-- Text -->
  {#if !announcePage}
    <div class="body" transition:scale={{duration: 500}}>
      <h3><a {href}>{title}</a></h3>
      <address>{address}</address>
    </div>
  {/if}

  <!-- BG image -->
  <img src={imgSrc} alt="" {loading}>

  <!-- Genres -->
  <div class="genres">
    {#each genres as genre}
      <GenreTag {genre}></GenreTag>
    {/each}
  </div>

  <!-- Date -->
  {#if !announcePage}
    <time datetime={date.toISOString()} transition:scale={{duration: 500}}>
      <Tag title={dateFormatter.format(date)}></Tag>
    </time>
  {/if}
</article>

<style lang="scss">
  .announce-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px;
    position: relative;
    aspect-ratio: 377 / 220;

    img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      width: 100%;
      border-radius: 8px;
      transition: border-radius 300ms;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      background: linear-gradient(70.43deg, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 0) 100%);
      border-radius: 8px;
      transition: opacity 300ms, border-radius 300ms;
      z-index: 1;
    }
  }

  .announce-card.announce-page {
    img {
      border-radius: 0;
    }

    &::before {
      opacity: 0;
    }
  }

  .announce-type {
    --tag-background-color: var(--color-accent);
    --tag-liquid-glass: 1;

    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
  }

  .body {
    margin-bottom: 8px;
    margin-left: 8px;
    z-index: 2;

    h3 {
      margin: 0;
      font-weight: 500;
      font-size: 1rem;
      a {
        &::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          top: 0;
          right: 0;
          z-index: 2;
        }
        color: inherit;
      }
    }

    address {
      margin-top: 2px;
      font-size: 12px;
      font-style: normal;
      font-weight: 300;
    }
  }

  .genres {
    position: absolute;
    left: 12px;
    display: flex;
    gap: 4px;
    top: 100%;
    transform: translateY(-50%);
    z-index: 2;
  }

  time {
    --tag-background-color: var(--color-accent);
    --tag-liquid-glass: 1;

    position: absolute;
    top: 100%;
    right: 20px;

    transform: translateY(-50%);

    z-index: 2;
  }
</style>