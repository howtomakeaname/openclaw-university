<template>
  <div class="markdown-toc">
    <div class="toc-header">
      <Icon size="sm" color="var(--ink-secondary)">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
      </Icon>
      <span class="toc-title">目录</span>
    </div>
    <div class="toc-list" v-if="items.length">
      <button
        v-for="item in items"
        :key="item.id"
        class="toc-item"
        :class="{ active: activeId === item.id }"
        :style="{ paddingLeft: `${(item.level - 1) * 16}px` }"
        @click="onItemClick(item)"
      >
        <span class="toc-dot" v-if="item.level > 1"></span>
        <span class="toc-text">{{ item.text }}</span>
      </button>
    </div>
    <div class="toc-empty" v-else>
      <span class="empty-text">暂无目录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TocItem } from '@/composables/useMarkdownToc'
import Icon from '@/components/ui/Icon.vue'

interface Props {
  items: TocItem[]
  activeId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  itemClick: [item: TocItem]
}>()

const onItemClick = (item: TocItem) => {
  emit('itemClick', item)
}
</script>

<style scoped>
.markdown-toc {
  background: var(--paper-card);
  border-radius: var(--corner-lg);
}

.toc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: var(--gap-3);
  padding-bottom: var(--gap-3);
  border-bottom: 1px solid var(--border-light);
}

.toc-title {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--ink-primary);
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: var(--gap-2);
  border: none;
  background: none;
  border-radius: var(--corner-sm);
  cursor: pointer;
  text-align: left;
  transition: all 150ms ease;
}

.toc-item:hover {
  background: var(--paper-hover);
}

.toc-item.active {
  background: var(--cinnabar-ghost);
}

.toc-item.active .toc-text {
  color: var(--cinnabar);
  font-weight: 500;
}

.toc-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--border-default);
  flex-shrink: 0;
}

.toc-text {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-empty {
  padding: var(--gap-3) 0;
  text-align: center;
}

.empty-text {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}
</style>