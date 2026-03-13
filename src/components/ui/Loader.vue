<template>
  <div
    :class="['loader', `loader-${size}`]"
    :style="{ borderColor: `${color} transparent ${color} ${color}` }"
  />
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'var(--color-accent)'
})
</script>

<style scoped>
.loader {
  border-radius: 50%;
  border-style: solid;
  animation: spin 1s linear infinite;
}

.loader-sm {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.loader-md {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.loader-lg {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>