<script lang="ts">
  import AlbumCard from "$lib/components/AlbumCard/AlbumCard.svelte"
</script>

<section class="albums">
  <h2 style="display: none">Альбомы</h2>
  <AlbumCard />
  <hr>
  <AlbumCard />
  <hr>

  <AlbumCard />
</section>

<style lang="scss">
  .albums {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  hr {
    width: 30%;
    margin: 0;
    opacity: .2;
  }
</style>