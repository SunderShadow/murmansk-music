<script lang="ts">
	import '$lib/scss/global.scss'

  import BottomNav, {type Link as NavLink} from "./+layout/BottomNav.svelte"
  import Header from "./+layout/Header.svelte"
  import navLinks from "./bottom-nav-links"

	let { children } = $props();

</script>

<div id="page-wrapper">
  <Header />

  <div id="main-view">
    {@render children()}
  </div>

  <BottomNav links={navLinks} />
</div>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  #page-wrapper {
    display: flex;
    flex-direction: column;
    height: 100dvh;

    @include bg.page-gradient;
  }

  #main-view {
    overflow: scroll;
    flex-grow: 1;
    padding-bottom: 16px;
  }
</style>