<template>
  <div class="markdown-renderer">
    <div ref="bodyRef" class="markdown-body" v-html="renderedContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { marked } from 'marked'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import type { TocItem } from '@/composables/useMarkdownToc'

interface Props {
  content: string
  items?: TocItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const emit = defineEmits<{
  activeIdChange: [id: string]
}>()

const bodyRef = ref<HTMLElement>()
let observer: IntersectionObserver | null = null

const renderedContent = computed(() => {
  if (!props.content) return ''
  return marked.parse(props.content) as string
})

const setupObserver = () => {
  if (!bodyRef.value) return

  // 清除旧的 observer
  if (observer) {
    observer.disconnect()
  }

  // 添加 id 到标题
  const headings = bodyRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
  headings.forEach((heading, idx) => {
    const text = heading.textContent || ''
    const item = props.items.find(it => it.text === text)
    if (item) {
      heading.id = item.id
    } else {
      heading.id = `heading-${idx}`
    }
  })

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting)
    if (visibleEntries.length > 0) {
      const id = visibleEntries[0].target.id
      emit('activeIdChange', id)
    }
  }, options)

  // 观察所有标题
  headings.forEach(heading => observer!.observe(heading))
}

onMounted(() => {
  nextTick(() => {
    setupObserver()
  })
})

watch(() => props.content, () => {
  nextTick(() => {
    setupObserver()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.markdown-renderer {
  font-size: var(--font-base);
  line-height: 1.8;
  color: var(--ink-primary);
}

.markdown-body :deep(h1) {
  font-size: var(--font-xl);
  font-weight: 700;
  margin: var(--gap-4) 0 var(--gap-3);
  padding-bottom: var(--gap-2);
  border-bottom: 2px solid var(--border-default);
  color: var(--ink-primary);
}

.markdown-body :deep(h2) {
  font-size: var(--font-lg);
  font-weight: 600;
  margin: var(--gap-4) 0 var(--gap-3);
  color: var(--ink-primary);
}

.markdown-body :deep(h3) {
  font-size: var(--font-base);
  font-weight: 600;
  margin: var(--gap-3) 0 var(--gap-2);
  color: var(--ink-secondary);
}

.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  font-size: var(--font-base);
  font-weight: 500;
  margin: var(--gap-2) 0 var(--gap-1);
  color: var(--ink-secondary);
}

.markdown-body :deep(p) {
  margin: var(--gap-2) 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: var(--gap-4);
  margin: var(--gap-2) 0;
}

.markdown-body :deep(li) {
  margin: var(--gap-1) 0;
  line-height: 1.7;
}

.markdown-body :deep(code) {
  background: var(--paper-hover);
  padding: 2px 6px;
  border-radius: var(--corner-sm);
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--cinnabar);
}

.markdown-body :deep(pre) {
  background: var(--paper-hover);
  padding: var(--gap-3);
  border-radius: var(--corner-md);
  overflow-x: auto;
  margin: var(--gap-3) 0;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--ink-primary);
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid var(--cinnabar);
  padding-left: var(--gap-3);
  margin: var(--gap-3) 0;
  color: var(--ink-tertiary);
  font-style: italic;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--gap-4) 0;
  border-radius: var(--corner-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: var(--gap-3);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.markdown-body :deep(th) {
  background: var(--paper-hover);
  font-weight: 600;
  color: var(--ink-primary);
  font-size: var(--font-sm);
  letter-spacing: 0.02em;
}

.markdown-body :deep(tbody tr:hover) {
  background: var(--paper-hover);
}

.markdown-body :deep(tbody tr:last-child td) {
  border-bottom: none;
}

.markdown-body :deep(td) {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
}

.markdown-body :deep(a) {
  color: var(--cinnabar);
  text-decoration: none;
  transition: color 200ms ease;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-default);
  margin: var(--gap-5) 0;
}

@media (max-width: 768px) {
  .markdown-body :deep(h1) {
    font-size: var(--font-lg);
  }

  .markdown-body :deep(h2) {
    font-size: var(--font-base);
  }
}
</style>