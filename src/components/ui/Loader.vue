<template>
  <span class="loader" :style="{ width: sizeMap[size], height: sizeMap[size] }">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="31.4 31.4"
        transform="rotate(-90 12 12)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24
}
</script>

<style scoped>
.loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-subtle);
  opacity: 0.7;
}

.loader svg {
  width: 100%;
  height: 100%;
}
</style>
