<template>
  <div class="field">
    <label v-if="label" class="field-label">{{ label }}</label>
    <div class="select" :class="{ 'is-open': isOpen, 'has-error': error }">
      <button
        class="select-trigger"
        type="button"
        :disabled="disabled"
        @click="toggle"
      >
        <span class="select-value" :class="{ 'is-placeholder': !selectedLabel }">
          {{ selectedLabel || placeholder }}
        </span>
        <Icon size="sm" class="select-arrow" :class="{ 'is-open': isOpen }">
          <path d="M7 10l5 5 5-5z"/>
        </Icon>
      </button>
      
      <div v-if="isOpen" class="select-menu">
        <div
          v-for="option in options"
          :key="option.value"
          class="select-option"
          :class="{ 'is-selected': modelValue === option.value }"
          @click="select(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
    <p v-if="hint || error" class="field-hint" :class="{ 'is-error': error }">
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options: Option[]
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const option = props.options.find(o => o.value === props.modelValue)
  return option?.label
})

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const select = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const closeOnClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.select')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  position: relative;
}

.field-label {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
}

.select {
  position: relative;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 var(--gap-3);
  font-size: var(--font-base);
  color: var(--ink-primary);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-md);
  cursor: pointer;
  transition: all var(--ease-quick);
  outline: none;
}

.select-trigger:hover:not(:disabled) {
  border-color: var(--cinnabar-light);
}

.select.is-open .select-trigger {
  border-color: var(--cinnabar);
}

.select-trigger:disabled {
  background: var(--paper-hover);
  color: var(--ink-muted);
  cursor: not-allowed;
}

.select-value {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-value.is-placeholder {
  color: var(--ink-muted);
}

.select-arrow {
  color: var(--ink-tertiary);
  transition: transform var(--ease-quick);
}

.select-arrow.is-open {
  transform: rotate(180deg);
}

.select-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-md);
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
  animation: slideIn var(--ease-quick);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.select-option {
  padding: var(--gap-3);
  font-size: var(--font-base);
  color: var(--ink-primary);
  cursor: pointer;
  transition: all var(--ease-quick);
}

.select-option:hover {
  background: var(--cinnabar-ghost);
  color: var(--cinnabar);
}

.select-option.is-selected {
  background: var(--cinnabar-pale);
  color: var(--cinnabar);
  font-weight: 500;
}

.field-hint {
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
  margin: 0;
}

.field-hint.is-error {
  color: var(--error);
}

.select.has-error .select-trigger {
  border-color: var(--error);
}
</style>
