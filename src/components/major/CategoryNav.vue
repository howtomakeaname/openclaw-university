<template>
  <nav class="category-nav">
    <div
      v-for="cat in categories"
      :key="cat.key"
      :class="['cat-item', { active: modelValue === cat.key }]"
      :style="activeStyle(cat.key)"
      @click="select(cat.key)"
    >
      <div class="cat-icon" :style="iconStyle(cat.key)">
        <Icon size="md" :color="modelValue === cat.key ? '#fff' : cat.color">
          <path :d="cat.icon" />
        </Icon>
      </div>
      <span class="cat-name">{{ cat.name }}</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { CATEGORIES } from '@/constants/categories'
import type { MajorCategory } from '@/types'
import Icon from '../ui/Icon.vue'

interface Props {
  modelValue: MajorCategory | ''
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: MajorCategory | '']
}>()

interface CatItem {
  key: MajorCategory | ''
  name: string
  icon: string
  color: string
}

const categories: CatItem[] = [
  { key: '', name: '全部', icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z', color: 'var(--ink-secondary)' },
  ...CATEGORIES as CatItem[]
]

const select = (key: MajorCategory | '') => {
  emit('update:modelValue', key)
}

const activeStyle = (key: string) => {
  if (props.modelValue !== key) return {}
  const cat = CATEGORIES.find(c => c.key === key)
  return {
    background: cat?.color || 'var(--cinnabar)',
    borderColor: cat?.color || 'var(--cinnabar)',
    color: '#fff'
  }
}

const iconStyle = (key: string) => {
  const cat = CATEGORIES.find(c => c.key === key)
  if (!cat) return {}
  if (props.modelValue === key) {
    return { background: 'rgba(255,255,255,0.2)' }
  }
  return { background: cat.color + '15' }
}
</script>

<style scoped>
.category-nav {
  display: flex;
  gap: var(--gap-2);
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.cat-item {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  padding: 6px 12px;
  border: 1px solid var(--border-default);
  border-radius: var(--corner-full);
  cursor: pointer;
  transition: all var(--ease-quick);
  background: var(--paper-card);
  flex-shrink: 0;
}

.cat-item:not(.active):hover {
  border-color: var(--cinnabar-light);
  background: var(--paper-hover);
}

.cat-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease-quick);
}

.cat-name {
  font-size: var(--font-sm);
  font-weight: 500;
}
</style>
