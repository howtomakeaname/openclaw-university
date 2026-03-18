<template>
  <div class="ios-segmented-control" ref="containerRef">
    <div class="segments-container">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        ref="segmentRefs"
        :class="['segment', { active: modelValue === tab.key }]"
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
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

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

const containerRef = ref<HTMLElement | null>(null)
const segmentRefs = ref<HTMLElement[]>([])

// 当前选中索引
const activeIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.key === props.modelValue)
})

// 指示器位置和宽度
const indicatorPos = ref({ left: 0, width: 0 })

const updateIndicator = async () => {
  await nextTick()
  const index = activeIndex.value
  if (index === -1 || !segmentRefs.value[index]) {
    indicatorPos.value = { left: 0, width: 0 }
    return
  }

  const segment = segmentRefs.value[index]
  const container = containerRef.value?.querySelector('.segments-container') as HTMLElement | undefined
  
  if (!container || !segment) return

  const segmentRect = segment.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  // 计算相对于 container 的位置
  indicatorPos.value = {
    left: segmentRect.left - containerRect.left,
    width: segmentRect.width
  }
}

// 指示器样式
const indicatorStyle = computed(() => {
  return {
    transform: `translateX(${indicatorPos.value.left}px)`,
    width: `${indicatorPos.value.width}px`
  }
})

const handleSelect = (key: string) => {
  emit('update:modelValue', key)
  emit('change', key)
}

// 监听选中变化
watch(() => props.modelValue, updateIndicator, { immediate: true })

// 监听 tabs 变化
watch(() => props.tabs.length, updateIndicator)

// 窗口大小变化时更新
const handleResize = () => {
  updateIndicator()
}

onMounted(() => {
  updateIndicator()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
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
  flex-shrink: 0;
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
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), width 0.35s cubic-bezier(0.32, 0.72, 0, 1);
  z-index: 1;
  pointer-events: none;
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
