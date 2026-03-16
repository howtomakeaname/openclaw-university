<template>
  <button
    :class="['btn', `btn-${kind}`, { 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  kind?: 'fill' | 'quiet' | 'outline' | 'ghost' | 'primary'
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
  border: 1px solid transparent;
  border-radius: var(--corner-md);
  cursor: pointer;
  transition: all var(--ease-quick);
  outline: none;
}

.btn:focus-visible {
  box-shadow: 0 0 0 2px var(--paper-bg), 0 0 0 4px var(--cinnabar);
}

/* Fill - 深墨色 */
.btn-fill {
  background: var(--ink-primary);
  color: var(--paper-card);
}

.btn-fill:hover:not(:disabled) {
  background: var(--ink-secondary);
}

/* Primary - 朱砂红 */
.btn-primary {
  background: var(--cinnabar);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: var(--cinnabar-light);
}

/* Quiet - 宣纸灰 */
.btn-quiet {
  background: var(--paper-hover);
  color: var(--ink-primary);
}

.btn-quiet:hover:not(:disabled) {
  background: var(--paper-active);
}

/* Outline - 线框 */
.btn-outline {
  border-color: var(--border-default);
  color: var(--ink-primary);
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--cinnabar);
  color: var(--cinnabar);
}

/* Ghost - 幽灵 */
.btn-ghost {
  color: var(--ink-primary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--paper-hover);
}

/* Disabled */
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
