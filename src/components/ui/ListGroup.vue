<template>
  <div class="list-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 列表组容器组件
</script>

<style scoped>
.list-group {
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 0 var(--spacing-md);
}

.list-group > *:last-child .list-item-bordered {
  border-bottom: none;
}
</style>