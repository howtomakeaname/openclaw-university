import { ref, watch, type Ref } from 'vue'

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

  const parseToc = (markdown: string) => {
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
  }

  const setActiveId = (id: string) => {
    activeId.value = id
  }

  const scrollToHeading = (item: TocItem) => {
    const element = document.getElementById(item.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      activeId.value = item.id
    }
  }

  watch(contentRef, (newContent) => {
    parseToc(newContent)
  }, { immediate: true })

  return {
    items,
    activeId,
    setActiveId,
    scrollToHeading
  }
}