import { ref, watch, onScopeDispose, type Ref } from 'vue'

export interface TocItem {
  id: string
  level: number
  text: string
  anchor: string
}

/**
 * 解析 Markdown 目录
 */
export function useMarkdownToc(contentRef: Ref<string>) {
  const items = ref<TocItem[]>([])
  const activeId = ref<string>('')
  let stopWatch: (() => void) | null = null

  const parseToc = (markdown: string) => {
    // 使用 try-catch 防止正则表达式错误
    try {
      const result: TocItem[] = []
      const headingRegex = /^(#{1,6})\s+(.+)$/gm
      let match

      while ((match = headingRegex.exec(markdown)) !== null) {
        const levelStr = match[1]
        const textStr = match[2]
        if (!levelStr || !textStr) continue

        const level = levelStr.length
        const text = textStr.trim()
        const anchor = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        const id = `heading-${anchor}-${result.length}`
        result.push({ id, level, text, anchor })
      }

      items.value = result
    } catch (e) {
      console.error('Failed to parse TOC:', e)
      items.value = []
    }
  }

  const setActiveId = (id: string) => {
    activeId.value = id
  }

  const scrollToHeading = (item: TocItem) => {
    // 使用 setTimeout 避免在过渡动画期间操作 DOM
    setTimeout(() => {
      const element = document.getElementById(item.id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        activeId.value = item.id
      }
    }, 0)
  }

  // 初始化 watch
  stopWatch = watch(
    contentRef,
    (newContent) => {
      parseToc(newContent)
    },
    { immediate: true }
  )

  // 组件卸载时清理
  onScopeDispose(() => {
    if (stopWatch) {
      stopWatch()
      stopWatch = null
    }
    items.value = []
    activeId.value = ''
  })

  return {
    items,
    activeId,
    setActiveId,
    scrollToHeading
  }
}
