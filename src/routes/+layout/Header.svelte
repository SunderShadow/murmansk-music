<script lang="ts">
  import AccountIcon from "$lib/icons/Account.svelte"
</script>

<header>
  <AccountIcon />
</header>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  header {
    position: relative;
    z-index: var(--nav-z-index);

    padding: 12px;
    @include bg.navigation;
  }
</style>