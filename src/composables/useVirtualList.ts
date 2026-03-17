import { ref, computed, watch, onMounted, onUnmounted, type Ref } from 'vue'

export interface VirtualListOptions {
  itemHeight: number
  overscan?: number
}

export interface VirtualListState<T> {
  containerRef: Ref<HTMLElement | null>
  visibleItems: Ref<T[]>
  totalHeight: Ref<number>
  offset: Ref<number>
  scrollToIndex: (index: number) => void
}

export function useVirtualList<T extends { id: string }>(
  items: Ref<T[]>,
  options: VirtualListOptions
): VirtualListState<T> {
  const { itemHeight, overscan = 3 } = options

  const containerRef = ref<HTMLElement | null>(null)
  const scrollTop = ref(0)
  const containerHeight = ref(600)

  // 计算总高度
  const totalHeight = computed(() => {
    const len = items.value?.length ?? 0
    return len * itemHeight
  })

  // 计算可见区域
  const visibleRange = computed(() => {
    const totalItems = items.value?.length ?? 0
    if (totalItems === 0) return { start: 0, end: 0 }

    const visibleCount = Math.ceil(containerHeight.value / itemHeight)
    const start = Math.max(0, Math.floor(scrollTop.value / itemHeight) - overscan)
    const end = Math.min(totalItems, start + visibleCount + overscan * 2)

    return { start, end }
  })

  // 可见项目
  const visibleItems = computed(() => {
    const { start, end } = visibleRange.value
    return items.value?.slice(start, end) ?? []
  })

  // 偏移量
  const offset = computed(() => {
    return visibleRange.value.start * itemHeight
  })

  // 滚动处理
  const handleScroll = () => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop
    }
  }

  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = index * itemHeight
    }
  }

  // 更新容器高度
  const updateContainerHeight = () => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight
    }
  }

  // ResizeObserver
  let resizeObserver: ResizeObserver | null = null

  onMounted(() => {
    updateContainerHeight()

    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })

      if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(updateContainerHeight)
        resizeObserver.observe(containerRef.value)
      }
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }

    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })

  // 当items变化时，重置滚动位置
  watch(() => items.value?.length, () => {
    if (containerRef.value) {
      containerRef.value.scrollTop = 0
      scrollTop.value = 0
    }
  })

  return {
    containerRef,
    visibleItems,
    totalHeight,
    offset,
    scrollToIndex
  }
}
