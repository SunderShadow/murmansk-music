<script lang="ts" module>
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
  }
</script>
<script lang="ts">
  import Tag from "$lib/components/Tag.svelte"
  import GenreTag from "$lib/components/GenreTag.svelte"

  const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  })

  let {
    title,
    imgSrc,
    genres,
    address,
    date,
    loading = 'lazy'
  }: Props = $props()
</script>

<svelte:head>
  {#if loading !== 'lazy'}
    <link rel="preload" as="image" href={imgSrc}>
  {/if}
</svelte:head>

<article class="announce-card">
  <!-- Left top -->
  <div class="announce-type">
    <Tag title="Концерт"/>
  </div>

  <!-- Text -->
  <div class="body">
    <h3>{title}</h3>
    <address>{address}</address>
  </div>

  <!-- BG image -->
  <img src={imgSrc} alt="" {loading}>

  <div class="genres">
    {#each genres as genre}
      <GenreTag {genre}></GenreTag>
    {/each}
  </div>

  <data value="">
    <Tag title={dateFormatter.format(date)}></Tag>
  </data>
</article>

<style lang="scss">
  .announce-card {
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
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      background: linear-gradient(70.43deg, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 0) 100%);

      z-index: 1;
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
    position: absolute;
    bottom: 16px;
    left: 20px;
    z-index: 2;

    h3 {
      margin: 0;
      font-weight: 500;
      font-size: 1rem;
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

  data {
    --tag-background-color: var(--color-accent);
    --tag-liquid-glass: 1;

    position: absolute;
    top: 100%;
    right: 20px;

    transform: translateY(-50%);

    z-index: 2;
  }
</style>