<script lang="ts">
	import '$lib/scss/global.scss'
  import {PUBLIC_FEEDBACK_EMAIL} from "$env/static/public"

  import BottomNav from "./+layout/BottomNav.svelte"
  import Header from "./+layout/Header.svelte"
  import navLinks from "./bottom-nav-links"

	let { children } = $props();

</script>

<div id="stop-user-if-not-mobile">
  <p>Прр, погоди, версии для ПК пока что нет.</p>
  <p>Если интересна версия для ПК, то напиши мне <a href="mailto:{PUBLIC_FEEDBACK_EMAIL}">сюда</a> ({PUBLIC_FEEDBACK_EMAIL}) что-то типа "Привет, очень хочу ПК версию"</p>
</div>

<div id="page-wrapper">
  <Header />

  <div id="main-view">
    {@render children()}
  </div>

  <BottomNav links={navLinks} />
</div>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  #stop-user-if-not-mobile {
    display: none;
  }

  @media (min-width: 450px) {
    #stop-user-if-not-mobile {
      padding: 20px;
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 999;

      font-size: 40px;

      @include bg.page-gradient;
    }
    #page-wrapper {
      display: none;
    }
  }

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