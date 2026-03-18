<template>
  <svg
    class="icon"
    :width="sizeMap[size]"
    :height="sizeMap[size]"
    :fill="color || 'currentColor'"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl'
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeMap = {
  xs: 12,
  sm: 16,
  base: 18,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48
}
</script>

<style scoped>
.icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: text-bottom;
  opacity: 0.85;
}
</style>
