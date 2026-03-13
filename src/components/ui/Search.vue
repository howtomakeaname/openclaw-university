<template>
  <div class="search" :class="{ 'is-active': isFocused }">
    <Icon size="md" class="search-icon">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </Icon>
    <input
      class="search-input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keyup.enter="$emit('search', modelValue)"
    />
    <button
      v-if="modelValue"
      class="search-clear"
      @click="clear"
      type="button"
    >
      <Icon size="sm">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
      </Icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from './Icon.vue'

interface Props {
  modelValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '搜索...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const isFocused = ref(false)

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const clear = () => {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  height: 40px;
  padding: 0 var(--gap-3);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-full);
  transition: all var(--ease-quick);
}

.search:hover {
  border-color: var(--cinnabar-light);
}

.search.is-active {
  border-color: var(--cinnabar);
  background: var(--paper-card);
}

.search-icon {
  color: var(--ink-tertiary);
  flex-shrink: 0;
}

.search.is-active .search-icon {
  color: var(--cinnabar);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--font-base);
  color: var(--ink-primary);
  outline: none;
  min-width: 0;
}

.search-input::placeholder {
  color: var(--ink-muted);
}

.search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: var(--paper-hover);
  border-radius: 50%;
  cursor: pointer;
  color: var(--ink-tertiary);
  transition: all var(--ease-quick);
}

.search-clear:hover {
  background: var(--cinnabar);
  color: #fff;
}
</style>
