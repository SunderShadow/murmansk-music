<script lang="ts" module>
  import type {Band, Music} from "$lib/types"

  export type Props = {
    group: Band;
    music: Array<Music>;
  }
</script>
<script lang="ts">
  import MusicTrack from "$lib/components/MusicTrack/MusicTrack.svelte"
  let {
    group,
    music
  }: Props = $props()
</script>

<div class="group_music">
  <div class="group">
    <h3><a href="/src/routes/bands/{group.slug}">{group.name}</a></h3>
    <div class="genres">
      {#each group.genres as genre}
        <span>{genre.name}</span>
      {/each}
    </div>
  </div>
  <div class="music">
    {#each music as item}
      <MusicTrack {...item} />
    {/each}
  </div>
</div>

<style lang="scss">
  :global .group_music + .group_music {
    margin-top: 16px;
  }

  .group_music {
    display: flex;
    width: 100%;
    min-width: 0;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    hyphens: auto;
  }

  .group {
    text-align: right;
    border-right: 1px solid rgba(#fff, .1);
    padding-right: 8px;
    width: 100px;
    flex-shrink: 0;
  }

  .music {
    margin-left: 16px;
    min-width: 0;
    flex-grow: 1;
  }

  .genres {
    display: flex;
    gap: 4px;
    justify-content: flex-end;

    text-wrap: wrap;
    font-size: 12px;
    font-weight: 200;
    opacity: .65;

    > span + span::before {
      content: '/ ';
    }
  }
</style>