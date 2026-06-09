<script lang="ts">
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCardTransition.svelte"
  import {getUserLayoutContext} from "../context"

  const ctx = getUserLayoutContext()
  let selectedI = $state(-1)
  let {
    data
  } = $props()
</script>

<section class="page-container">
  <h2 style="display: none;">Анонсы</h2>
  {#each data.announcements as announce, i}
    <div class="card-container" class:hidden={selectedI !== -1 && selectedI !== i}>
      <AnnounceCard beforeNavigate={() => {selectedI = i; ctx.hide()}} {...announce}/>
    </div>
  {/each}
</section>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-container.hidden {
    opacity: 0;
    transition: opacity 500ms;
  }
</style>