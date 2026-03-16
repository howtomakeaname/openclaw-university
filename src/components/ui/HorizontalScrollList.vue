<template>
  <div class="scroll">
    <div class="scroll-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.scroll {
  margin: 0 calc(-1 * var(--gap-4));
  padding: 0 var(--gap-4);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--gap-2);
  margin-bottom: calc(-1 * var(--gap-2));
}

/* 滚动条样式 */
.scroll::-webkit-scrollbar {
  height: 6px;
}

.scroll::-webkit-scrollbar-track {
  background: var(--border-light);
  border-radius: 3px;
}

.scroll::-webkit-scrollbar-thumb {
  background: var(--ink-muted);
  border-radius: 3px;
  transition: background var(--ease-standard);
}

.scroll::-webkit-scrollbar-thumb:hover {
  background: var(--ink-tertiary);
}

/* Firefox 滚动条 */
.scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--ink-muted) var(--border-light);
}

.scroll-content {
  display: flex;
  gap: var(--gap-3);
  width: fit-content;
}

.scroll-content > * {
  flex-shrink: 0;
  width: 180px;
  background: var(--paper-card);
  border-radius: var(--corner-md);
  border: 1px solid var(--border-default);
  overflow: hidden;
}
</style>