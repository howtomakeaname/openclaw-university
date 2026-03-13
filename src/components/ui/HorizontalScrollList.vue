<template>
  <div class="horizontal-scroll-container">
    <div class="horizontal-scroll-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// 横向滚动列表容器组件
</script>

<style scoped>
.horizontal-scroll-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin: 0 -16px;
  padding: 0 16px;
}

.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll-content {
  display: flex;
  gap: var(--spacing-md);
  padding-bottom: 8px;
  width: fit-content;
  min-width: 100%;
}

.horizontal-scroll-content > * {
  flex-shrink: 0;
  width: calc(33.333% - 11px);
  min-width: 140px;
  max-width: 200px;
}
</style>