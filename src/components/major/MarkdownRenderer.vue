<template>
  <div class="markdown-renderer" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

interface Props {
  content: string
}

const props = defineProps<Props>()

const renderedContent = computed(() => {
  if (!props.content) return ''
  return marked.parse(props.content) as string
})
</script>

<style scoped>
.markdown-renderer {
  font-size: var(--font-base);
  line-height: 1.8;
  color: var(--ink-primary);
}

.markdown-renderer :deep(h1) {
  font-size: var(--font-xl);
  font-weight: 700;
  margin: var(--gap-4) 0 var(--gap-3);
  padding-bottom: var(--gap-2);
  border-bottom: 2px solid var(--border-default);
  color: var(--ink-primary);
}

.markdown-renderer :deep(h2) {
  font-size: var(--font-lg);
  font-weight: 600;
  margin: var(--gap-4) 0 var(--gap-3);
  color: var(--ink-primary);
}

.markdown-renderer :deep(h3) {
  font-size: var(--font-base);
  font-weight: 600;
  margin: var(--gap-3) 0 var(--gap-2);
  color: var(--ink-secondary);
}

.markdown-renderer :deep(h4),
.markdown-renderer :deep(h5),
.markdown-renderer :deep(h6) {
  font-size: var(--font-base);
  font-weight: 500;
  margin: var(--gap-2) 0 var(--gap-1);
  color: var(--ink-secondary);
}

.markdown-renderer :deep(p) {
  margin: var(--gap-2) 0;
}

.markdown-renderer :deep(ul),
.markdown-renderer :deep(ol) {
  padding-left: var(--gap-4);
  margin: var(--gap-2) 0;
}

.markdown-renderer :deep(li) {
  margin: var(--gap-1) 0;
  line-height: 1.7;
}

.markdown-renderer :deep(code) {
  background: var(--paper-hover);
  padding: 2px 6px;
  border-radius: var(--corner-sm);
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--cinnabar);
}

.markdown-renderer :deep(pre) {
  background: var(--paper-hover);
  padding: var(--gap-3);
  border-radius: var(--corner-md);
  overflow-x: auto;
  margin: var(--gap-3) 0;
}

.markdown-renderer :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--ink-primary);
}

.markdown-renderer :deep(blockquote) {
  border-left: 4px solid var(--cinnabar);
  padding-left: var(--gap-3);
  margin: var(--gap-3) 0;
  color: var(--ink-tertiary);
  font-style: italic;
}

.markdown-renderer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--gap-3) 0;
}

.markdown-renderer :deep(th),
.markdown-renderer :deep(td) {
  border: 1px solid var(--border-default);
  padding: var(--gap-2);
  text-align: left;
}

.markdown-renderer :deep(th) {
  background: var(--paper-hover);
  font-weight: 600;
}

.markdown-renderer :deep(a) {
  color: var(--cinnabar);
  text-decoration: none;
  transition: color 200ms ease;
}

.markdown-renderer :deep(a:hover) {
  text-decoration: underline;
}

.markdown-renderer :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-default);
  margin: var(--gap-5) 0;
}

@media (max-width: 768px) {
  .markdown-renderer :deep(h1) {
    font-size: var(--font-lg);
  }

  .markdown-renderer :deep(h2) {
    font-size: var(--font-base);
  }
}
</style>