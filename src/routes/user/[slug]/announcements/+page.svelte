<script lang="ts">
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCard.svelte"

  let {
    data
  } = $props()
</script>

<section class="page-container">
  <h2 style="display: none;">Анонсы</h2>
  {#each data.announcements as announce}
    <AnnounceCard {...announce}/>
  {/each}
</section>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>