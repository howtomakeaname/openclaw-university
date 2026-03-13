<template>
  <div class="list-group">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.list-group {
  background: var(--bg-card);
  border-radius: var(--corner-lg);
  border: 1px solid var(--line-default);
  padding: var(--gap-2) var(--gap-3);
}
</style>
