<script lang="ts">
  import AccountIcon from "$lib/icons/Account.svelte"
</script>

<header>
  <a href="/user" class="active"><AccountIcon /></a>
</header>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  a.active {
    color: var(--color-accent);
  }

  header {
    position: relative;
    z-index: var(--nav-z-index);

    padding: 12px;
    @include bg.navigation;
  }
</style>