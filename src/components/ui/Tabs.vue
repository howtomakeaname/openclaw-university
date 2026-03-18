<template>
  <div class="ios-segmented-control">
    <div class="segments-container">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :class="['segment', { active: modelValue === tab.key }]"
        :style="getSegmentStyle()"
        @click="handleSelect(tab.key)"
      >
        <span class="segment-label">{{ tab.label }}</span>
      </div>
      <!-- 滑动指示器 -->
      <div class="selection-indicator" :style="indicatorStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TabItem {
  key: string
  label: string
}

interface Props {
  tabs: TabItem[]
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [key: string]
  change: [key: string]
}>()

// 当前选中索引
const activeIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.key === props.modelValue)
})

// 指示器位置样式
const indicatorStyle = computed(() => {
  const index = activeIndex.value
  const total = props.tabs.length
  if (index === -1 || total === 0) return {}
  
  const percentage = (index / total) * 100
  const width = (1 / total) * 100
  
  return {
    transform: `translateX(${percentage}%)`,
    width: `${width}%`
  }
})

// 每个 segment 的样式
const getSegmentStyle = () => {
  const total = props.tabs.length
  return {
    width: `${100 / total}%`
  }
}

const handleSelect = (key: string) => {
  emit('update:modelValue', key)
  emit('change', key)
}
</script>

<style scoped>
/* iOS 18 风格分段控制器 */
.ios-segmented-control {
  display: inline-flex;
  align-items: center;
}

.segments-container {
  position: relative;
  display: flex;
  background: rgba(120, 120, 128, 0.16);
  border-radius: 9px;
  padding: 2px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .segments-container {
    background: rgba(120, 120, 128, 0.24);
  }
}

.segment {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-secondary);
  cursor: pointer;
  border-radius: 7px;
  transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  user-select: none;
  white-space: nowrap;
}

.segment:hover {
  color: var(--ink-primary);
}

.segment.active {
  color: var(--ink-primary);
  font-weight: 590;
}

.segment-label {
  position: relative;
  z-index: 1;
}

/* 滑动指示器 - iOS 风格 */
.selection-indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: calc(100% - 4px);
  background: var(--paper-card);
  border-radius: 7px;
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
  z-index: 1;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .segment {
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
  }
  
  .segments-container {
    border-radius: 8px;
  }
  
  .segment,
  .selection-indicator {
    border-radius: 6px;
  }
}
</style>