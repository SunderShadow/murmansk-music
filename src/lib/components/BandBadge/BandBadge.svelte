<script lang="ts" module>
  import type {Band} from "$lib/types"

  export type Props = Band
</script>
<script lang="ts">
  let {
    slug,
    name,
    miniImg,
    genres
  }: Props = $props()
</script>
<article>
  <img src={miniImg} alt="">
  <div>
    <h3><a href="/bands/some-slug">{name}</a></h3>
    <div class="genres">
      {#each genres as genre, i}
        {#if i != 0}
          <span> / </span>
        {/if}
        <data value={genre.id}>{genre.name}</data>
      {/each}
    </div>
  </div>
</article>

<style lang="scss">
  img {
    width: var(--band-badge-img-size, 40px);
    height: var(--band-badge-img-size, 40px);
  }

  article {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h3 {
    font-size: 1em;
    font-weight: 500;
    margin: 0;
    a::before {
      content: '';
      top: 0; left: 0; bottom: 0; right: 0;
    }
  }

  .genres {
    display: flex;
    gap: 4px;
    font-weight: 300;
    font-size: 13px;
  }
</style>