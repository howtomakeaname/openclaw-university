<template>
  <button
    :class="[
      'btn',
      `btn-${kind}`,
      { 'btn-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  kind?: 'fill' | 'quiet' | 'outline' | 'ghost' | 'danger'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  kind: 'fill'
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-2);
  height: 36px;
  padding: 0 var(--gap-4);
  font-size: var(--font-sm);
  font-weight: 450;
  color: var(--text-main);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--corner-md);
  cursor: pointer;
  transition: all var(--ease-quick);
  outline: none;
}

.btn:focus-visible {
  box-shadow: 0 0 0 2px var(--bg-page), 0 0 0 4px var(--focus-ring);
}

/* Fill - 默认样式 */
.btn-fill {
  background: var(--text-main);
  color: var(--bg-card);
}

.btn-fill:hover:not(:disabled) {
  background: var(--text-subtle);
}

/* Quiet - 低调样式 */
.btn-quiet {
  background: var(--bg-hover);
  color: var(--text-main);
}

.btn-quiet:hover:not(:disabled) {
  background: var(--bg-active);
}

/* Outline - 边框样式 */
.btn-outline {
  border-color: var(--line-default);
  color: var(--text-main);
}

.btn-outline:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--text-faint);
}

/* Ghost - 幽灵样式 */
.btn-ghost {
  color: var(--text-main);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--bg-hover);
}

/* Danger - 危险样式 */
.btn-danger {
  color: var(--error-text);
  background: var(--error-bg);
  border-color: transparent;
}

.btn-danger:hover:not(:disabled) {
  background: #fecaca;
}

/* Disabled */
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
