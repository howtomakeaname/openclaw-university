<template>
  <div class="major-card" @click="navigateToDetail">
    <div class="card-cover">
      <img :src="major.cover" :alt="major.name" />
      <div class="card-badge">
        <span class="difficulty" :style="{ color: difficultyColor }">
          {{ difficultyLabel }}
        </span>
      </div>
    </div>
    <div class="card-content">
      <div class="card-category" :style="{ color: categoryColor }">
        <Icon size="xs" :color="categoryColor">
          <path :d="categoryIcon" />
        </Icon>
        {{ categoryLabel }}
      </div>
      <h3 class="card-title">{{ major.name }}</h3>
      <p class="card-desc">{{ truncatedDescription }}</p>
      <div class="card-meta">
        <span class="meta-item">
          <Icon size="xs" color="var(--ink-muted)">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </Icon>
          {{ skillCount }} 技能
        </span>
        <span class="meta-item">
          <Icon size="xs" color="var(--ink-muted)">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </Icon>
          {{ major.duration }}
        </span>
        <span class="meta-item rating">
          <Icon size="xs" color="#d4776a">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </Icon>
          {{ major.rating }}
        </span>
      </div>
      <div class="card-footer">
        <div class="card-tags">
          <span v-for="tag in displayTags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <span class="enrollment">{{ formatEnrollment }}人</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Major } from '@/types'
import { CATEGORY_MAP, DIFFICULTY_MAP } from '@/constants/categories'
import Icon from '../ui/Icon.vue'

interface Props {
  major: Major
}

const props = defineProps<Props>()
const router = useRouter()

// 计算属性
const categoryInfo = computed(() => CATEGORY_MAP[props.major.category])
const categoryLabel = computed(() => categoryInfo.value?.name || props.major.category)
const categoryIcon = computed(() => categoryInfo.value?.icon || '')
const categoryColor = computed(() => categoryInfo.value?.color || 'var(--cinnabar)')

const difficultyInfo = computed(() => DIFFICULTY_MAP[props.major.difficulty])
const difficultyLabel = computed(() => difficultyInfo.value?.name || props.major.difficulty)
const difficultyColor = computed(() => difficultyInfo.value?.color || 'var(--cinnabar)')

const skillCount = computed(() => props.major.skills.length)

const truncatedDescription = computed(() => {
  if (props.major.description.length <= 60) return props.major.description
  return props.major.description.slice(0, 60) + '...'
})

const displayTags = computed(() => props.major.tags.slice(0, 3))

const formatEnrollment = computed(() => {
  if (props.major.enrollment >= 10000) {
    return (props.major.enrollment / 10000).toFixed(1) + 'w'
  }
  return props.major.enrollment.toLocaleString()
})

const navigateToDetail = () => {
  router.push(`/major/${props.major.id}`)
}
</script>

<style scoped>
.major-card {
  background: var(--paper-card);
  border-radius: var(--corner-lg);
  border: 1px solid var(--border-default);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--ease-standard);
  display: flex;
  flex-direction: column;
}

.major-card:hover {
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

.major-card:hover .card-cover img {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: var(--gap-2);
  right: var(--gap-2);
}

.difficulty {
  background: var(--paper-card);
  padding: 2px 8px;
  border-radius: var(--corner-full);
  font-size: var(--font-xs);
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: var(--gap-3);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-category {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  font-weight: 500;
  margin-bottom: var(--gap-1);
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

.card-meta {
  display: flex;
  gap: var(--gap-3);
  margin-bottom: var(--gap-3);
  padding-bottom: var(--gap-3);
  border-bottom: 1px solid var(--border-light);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
}

.meta-item.rating {
  font-weight: 500;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-2);
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

.enrollment {
  font-size: var(--font-xs);
  color: var(--ink-muted);
  flex-shrink: 0;
}
</style>
