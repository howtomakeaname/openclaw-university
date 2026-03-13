<template>
  <div class="list">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.list {
  background: var(--paper-card);
  border-radius: var(--corner-lg);
  border: 1px solid var(--border-default);
  padding: var(--gap-2) var(--gap-3);
}
</style>
