<script lang="ts">
  import { page } from '$app/state';
</script>

<div id="error-wrapper">
  <h1>
    <span id="error-status">{page.status}</span>
    <span id="error-message">{page.error.message}</span>
  </h1>
</div>

<style lang="scss">
  #error-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(0% - 50% - 61px + 53px));
  }

  h1 {
    color: #fff;
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  #error-status {
    font-size: 2em;
  }
</style>