<template>
  <div class="input-wrap">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :class="['input', { 'has-error': error }]"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <p v-if="hint || error" class="input-hint" :class="{ 'is-error': error }">
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
.input-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}

.input-label {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--text-main);
}

.input {
  height: 40px;
  padding: 0 var(--gap-3);
  font-size: var(--font-base);
  color: var(--text-main);
  background: var(--bg-card);
  border: 1px solid var(--line-default);
  border-radius: var(--corner-md);
  outline: none;
  transition: border-color var(--ease-quick), box-shadow var(--ease-quick);
}

.input::placeholder {
  color: var(--text-faint);
}

.input:hover:not(:disabled) {
  border-color: var(--text-faint);
}

.input:focus {
  border-color: var(--text-main);
  box-shadow: 0 0 0 3px var(--bg-hover);
}

.input:disabled {
  background: var(--bg-hover);
  color: var(--text-faint);
  cursor: not-allowed;
}

.input.has-error {
  border-color: var(--error-text);
}

.input.has-error:focus {
  box-shadow: 0 0 0 3px var(--error-bg);
}

.input-hint {
  font-size: var(--font-xs);
  color: var(--text-subtle);
  margin: 0;
}

.input-hint.is-error {
  color: var(--error-text);
}
</style>
