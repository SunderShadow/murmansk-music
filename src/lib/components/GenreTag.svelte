<script lang="ts" module>
  import type {Genre} from "$lib/types"

  export type Props = {
    genre: Genre
  }
</script>
<script lang="ts">
  import Tag from "$lib/components/Tag.svelte"

  let {
    genre
  }: Props = $props()
</script>

<div class="genre_tag_wrapper _{genre.id}">
  <Tag title={genre.name}></Tag>
</div>

<style lang="scss">
  // Здесь содержатся все цвета тегов
  .genre_tag_wrapper {
    display: contents;
    --tag-background-color: var(--c);

    &._0 {--c: #000000} // Метал
    &._1 {--c: #E38D58} // Рок
    &._2 {--c: #A0A82C} // Инди
  }
</style>