<template>
  <div ref="listRef" class="virtual-list" @scroll="onScroll">
    <div class="phantom" :style="{ height: `${totalHeight}px` }" />
    <div class="content" :style="contentStyle">
      <div
        v-for="(item, idx) in visibleItems"
        :key="getItemKey(item, idx)"
        ref="itemRefs"
        :data-index="startIndex + idx"
        class="virtual-list-item"
      >
        <slot :item="item" :index="startIndex + idx" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: string | number }">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

interface Props<TItem> {
  items: TItem[]
  estimatedItemHeight?: number
  overscan?: number
}

const props = withDefaults(defineProps<Props<T>>(), {
  estimatedItemHeight: 150,
  overscan: 3
})

const listRef = ref<HTMLDivElement | null>(null)
const itemRefs = ref<(HTMLDivElement | null)[]>([])
const scrollTop = ref(0)
const containerHeight = ref(400)
const heights = ref<Record<number, number>>({})

// 计算或估算高度
const getHeight = (index: number) => {
  return heights.value[index] ?? props.estimatedItemHeight
}

// 总高度
const totalHeight = computed(() => {
  return props.items.reduce((acc, _, index) => acc + getHeight(index), 0)
})

// 计算起始偏移
const getStartOffset = (start: number) => {
  let offset = 0
  for (let i = 0; i < start; i++) {
    offset += getHeight(i)
  }
  return offset
}

// 起始索引
const startIndex = computed(() => {
  if (props.items.length === 0) return 0
  
  let offset = 0
  let index = 0
  const target = scrollTop.value
  
  while (index < props.items.length && offset < target) {
    offset += getHeight(index)
    index++
  }
  
  return Math.max(0, index - 1 - props.overscan)
})

// 结束索引
const endIndex = computed(() => {
  if (props.items.length === 0) return 0
  
  const start = startIndex.value
  let visibleHeight = 0
  let index = start
  
  while (index < props.items.length && visibleHeight < containerHeight.value + props.estimatedItemHeight * props.overscan) {
    visibleHeight += getHeight(index)
    index++
  }
  
  return Math.min(props.items.length, index)
})

// 可见项目
const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value)
})

// 内容区域样式
const contentStyle = computed(() => ({
  transform: `translateY(${getStartOffset(startIndex.value)}px)`
}))

// 获取项目 key
const getItemKey = (item: T, idx: number) => {
  return item.id ?? `item-${startIndex.value + idx}`
}

// 更新实际高度
const updateHeights = () => {
  nextTick(() => {
    itemRefs.value.forEach((el, idx) => {
      if (el) {
        const realIndex = startIndex.value + idx
        const rect = el.getBoundingClientRect()
        if (rect.height > 0) {
          heights.value[realIndex] = rect.height
        }
      }
    })
  })
}

// 滚动处理
let rafId: number | null = null
const onScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    if (listRef.value) {
      scrollTop.value = listRef.value.scrollTop
    }
    updateHeights()
    rafId = null
  })
}

// 更新容器高度
const updateContainerHeight = () => {
  if (listRef.value) {
    containerHeight.value = listRef.value.clientHeight
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateContainerHeight()
  updateHeights()
  
  if (listRef.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateContainerHeight()
      updateHeights()
    })
    resizeObserver.observe(listRef.value)
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (resizeObserver) resizeObserver.disconnect()
})

watch(() => props.items.length, () => {
  if (listRef.value) {
    listRef.value.scrollTop = 0
    scrollTop.value = 0
  }
  heights.value = {}
})

watch([startIndex, endIndex], () => {
  updateHeights()
})
</script>

<style scoped>
.virtual-list {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  min-height: 400px;
}

.phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
  pointer-events: none;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  will-change: transform;
}

.virtual-list-item {
  width: 100%;
}
</style>
