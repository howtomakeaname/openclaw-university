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
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.scroll::-webkit-scrollbar {
  display: none;
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
