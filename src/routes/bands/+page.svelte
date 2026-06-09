<script>
  import BandBadge from "$lib/components/BandBadge/BandBadge.svelte"
  import GenreTag from "$lib/components/GenreTag.svelte"
</script>

<div class="search">
  <div class="page-container">
    <input type="text">
    <div class="genre-tags">
      {#each Array(5) as _}
        <GenreTag genre={{id: 0, name: 'Метал'}}/>
        <GenreTag genre={{id: 1, name: 'Рок'}}/>
        <GenreTag genre={{id: 2, name: 'Инди'}}/>
      {/each}
    </div>
  </div>
</div>

<section class="groups page-container">
  <h2 style="display: none;">Группы</h2>
  {#each Array(10) as _}
    <BandBadge slug="123" name="Смерть генерала кастера" miniImg="/test-data/band-badge.png" genres={[{id: 0, name: 'Метал'}]}></BandBadge>
  {/each}
</section>

<style lang="scss">
  .groups {
    display: flex;
    flex-direction: column;
    gap: 16px;
    --band-badge-img-size: 60px;
    font-size: 1.25rem;
    margin-top: 16px;
  }

  .genre-tags {
    margin-top: 8px;
    position: relative;
    display: flex;
    gap: 8px;
    z-index: 1;
    width: 100%;
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>