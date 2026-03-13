<template>
  <div class="field">
    <label v-if="label" class="field-label">{{ label }}</label>
    <input
      :class="['field-input', { 'has-error': error }]"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <p v-if="hint || error" class="field-hint" :class="{ 'is-error': error }">
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: 'text' | 'password' | 'email' | 'number'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}

.field-label {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
}

.field-input {
  height: 40px;
  padding: 0 var(--gap-3);
  font-size: var(--font-base);
  color: var(--ink-primary);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-md);
  outline: none;
  transition: all var(--ease-quick);
}

.field-input::placeholder {
  color: var(--ink-muted);
}

.field-input:hover:not(:disabled) {
  border-color: var(--cinnabar-light);
}

.field-input:focus {
  border-color: var(--cinnabar);
  box-shadow: 0 0 0 3px var(--cinnabar-ghost);
}

.field-input:disabled {
  background: var(--paper-hover);
  color: var(--ink-muted);
  cursor: not-allowed;
}

.field-input.has-error {
  border-color: var(--error);
}

.field-input.has-error:focus {
  box-shadow: 0 0 0 3px var(--error-bg);
}

.field-hint {
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
  margin: 0;
}

.field-hint.is-error {
  color: var(--error);
}
</style>
