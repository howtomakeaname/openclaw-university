<template>
  <div class="outline-major-card" @click="navigateToDetail">
    <div class="card-cover">
      <img :src="major.coverImage" :alt="major.name" />
    </div>
    <div class="card-content">
      <div class="card-category">{{ categoryLabel }}</div>
      <h3 class="card-title">{{ major.name }}</h3>
      <p class="card-desc">{{ truncatedDescription }}</p>
      <div class="card-tags">
        <span v-for="tag in displayTags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { OutlineMajor } from '@/types'

// 分类名称映射
const CATEGORY_NAMES: Record<string, string> = {
  finance: '金融',
  business: '商业',
  hr: '人力资源',
  content: '内容创作',
  research: '学术研究',
  marketing: '市场营销',
  sales: '销售'
}

interface Props {
  major: OutlineMajor
}

const props = defineProps<Props>()
const router = useRouter()

const categoryLabel = computed(() => CATEGORY_NAMES[props.major.category] || props.major.category)

const truncatedDescription = computed(() => {
  if (props.major.description.length <= 60) return props.major.description
  return props.major.description.slice(0, 60) + '...'
})

const displayTags = computed(() => props.major.tags.slice(0, 3))

const navigateToDetail = () => {
  router.push(`/major/${props.major.id}`)
}
</script>

<style scoped>
.outline-major-card {
  background: var(--paper-card);
  border-radius: var(--corner-lg);
  border: 1px solid var(--border-default);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--ease-standard);
  display: flex;
  flex-direction: column;
}

.outline-major-card:hover {
  border-color: var(--cinnabar-light);
  box-shadow: 0 4px 20px rgba(196, 92, 72, 0.08);
  transform: translateY(-2px);
}

.card-cover {
  position: relative;
  height: 140px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--ease-standard);
}

.outline-major-card:hover .card-cover img {
  transform: scale(1.05);
}

.card-content {
  padding: var(--gap-3);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-category {
  font-size: var(--font-xs);
  font-weight: 500;
  color: var(--cinnabar);
  margin-bottom: var(--gap-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-1);
  line-height: 1.4;
}

.card-desc {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  line-height: 1.5;
  margin-bottom: var(--gap-3);
  flex: 1;
}

.card-tags {
  display: flex;
  gap: var(--gap-1);
  flex-wrap: wrap;
}

.tag {
  background: var(--paper-hover);
  color: var(--ink-secondary);
  font-size: var(--font-xs);
  padding: 2px 6px;
  border-radius: var(--corner-sm);
}
</style>