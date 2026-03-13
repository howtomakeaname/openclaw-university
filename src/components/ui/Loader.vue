<template>
  <span class="loader">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </span>
</template>

<script setup lang="ts">
// 中国风格加载器 - 三个圆点依次跳动
</script>

<style scoped>
.loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 20px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--cinnabar);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

.dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
