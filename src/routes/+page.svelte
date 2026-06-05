<script lang="ts">
  import ChevronRightIcon from "$lib/icons/ChevronRight.svelte"

  import GroupMusic from "$lib/components/GroupMusic/GroupMusic.svelte"

  let {data} = $props()
</script>

<main class="page-container">
  <h1>Доска</h1>

  <section>
    <h2>
      <a href="/">
        <span>Новое</span> на этой неделе
        <ChevronRightIcon />
      </a>
    </h2>
    {#each data.weekNew as item}
      <GroupMusic {...item}/>
    {/each}
  </section>

  <section>
    <h2>
      <a href="/">
        Подборка
        <ChevronRightIcon />
      </a>
    </h2>
    {#each data.weekNew as item}
      <GroupMusic {...item}/>
    {/each}
  </section>

</main>

<style lang="scss">
  h1 {
    // Индексация поисковых систем
    display: none;
  }

  h2 span {
    color: var(--color-accent);
  }
</style>