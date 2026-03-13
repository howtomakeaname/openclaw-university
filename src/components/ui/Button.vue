<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-disabled': disabled, 'btn-full': fullWidth }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}

defineProps<Props>()
defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
  font-size: var(--text-sm);
  line-height: 1;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-full {
  width: 100%;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: 10px 16px;
}

.btn-primary:hover:not(:disabled) {
  background-color: #374151;
}

.btn-secondary {
  background-color: var(--color-background-secondary);
  color: var(--color-primary);
  padding: 10px 16px;
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-border);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  padding: 9px 15px;
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--color-background-secondary);
  border-color: var(--color-secondary);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-primary);
  padding: 10px 16px;
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-background-secondary);
}

.btn-danger {
  background-color: var(--color-danger);
  color: white;
  padding: 10px 16px;
}

.btn-danger:hover:not(:disabled) {
  background-color: #b91c1c;
}

/* Sizes */
.btn-sm {
  padding: 6px 12px;
  font-size: var(--text-xs);
}

.btn-lg {
  padding: 14px 24px;
  font-size: var(--text-base);
}
</style>