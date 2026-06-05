<script lang="ts" module>
  import type {Music} from "$lib/types"


  export type Props = Music & {
    active?: boolean
  }
</script>
<script lang="ts">
  let {
    name,
    previewImg,
    genres,
    active = false
  }: Props = $props()
</script>

<article class="music-track" class:active>
  <img src={previewImg} alt="/no-track-preview.jpg">
  <div class="meta">
    <h3>{name}</h3>
    <div class="genres">
      {#each genres as {name}}
        <span>{name}</span>
      {/each}
    </div>
  </div>
</article>

<style lang="scss">
  :global .music-track + .music-track {
    margin-top: 12px;
  }

  .meta {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-width: 0;
  }

  article {
    --track-preview-size: 44px;
    width: 100%;
    display: flex;
    gap: 8px;
    opacity: .9;
  }

  img {
    display: block;
    width: var(--track-preview-size);
    height: var(--track-preview-size);
    background-color: #D9D9D9;
    flex-shrink: 0;
  }

  h3 {
    margin: 0;
    font-weight: 500;
    font-size: 16px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .genres {
    display: flex;
    gap: 4px;
    font-weight: 200;
    font-size: 13px;
    opacity: .65;

    > span + span::before {
      content: '/';
      margin-right: 4px;
    }
  }

  article.active h3 {
    color: var(--color-accent);
    opacity: 1;
  }
</style>