<script lang="ts" module>
  export type Props = {
    title: string,
  }
</script>
<script lang="ts">
  let {
    title,
  }: Props = $props()
</script>

<div class="tag">{title}</div>

<style lang="scss">
  .tag {
    position: relative;

    letter-spacing: 4%;
    font-size: 13px;
    font-weight: var(--tag-font-weight, 400);
    padding: .5px 6px;

    &::before {
      content: '';
      position: absolute;
      left: 0; top: 0; right: 0; bottom: 0;
      z-index: -1;

      border-radius: 4px;

      background: var(--tag-background-color, #505050);
      opacity: calc(1.65 - var(--tag-liquid-glass, 0));
    }
  }
</style>