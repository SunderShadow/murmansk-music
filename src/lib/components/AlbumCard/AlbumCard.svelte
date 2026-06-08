<script>
  import PlayIcon from "$lib/icons/Play.svelte"
</script>

<article class="album-card">
  <div class="thumbnail">
    <img src="/test-data/album-preview.png" alt="">
    <button class="play">
      <PlayIcon />
    </button>
  </div>
  <h3><a href="">Снимаю штаны карго</a></h3>
  <div class="track-counter">12 треков</div>
</article>

<style lang="scss">
  article {
    max-width: 280px;
    text-align: center;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  .track-counter {
    margin-top: 2px;
  }

  .thumbnail {
    position: relative;
    width: 100%;
    margin-bottom: 12px;
  }

  img {
    display: block;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .play {
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: flex;
    padding: 11px 10px 10px 11px;
    border-radius: 100%;
    border: none;
    outline: none;
    background-color: var(--color-accent);
  }
</style>