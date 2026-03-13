<template>
  <div class="scroll-list">
    <div class="scroll-track">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.scroll-list {
  margin: 0 calc(-1 * var(--gap-4));
  padding: 0 var(--gap-4);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.scroll-list::-webkit-scrollbar {
  display: none;
}

.scroll-track {
  display: flex;
  gap: var(--gap-3);
  width: fit-content;
}

.scroll-track > * {
  flex-shrink: 0;
  width: 200px;
}
</style>
