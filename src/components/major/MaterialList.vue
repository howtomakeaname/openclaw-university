<template>
  <div class="material-list">
    <ListGroup>
      <ListItem
        v-for="material in materials"
        :key="material.id"
        clickable
        class="material-item"
        @click="openMaterial(material)"
      >
        <template #lead>
          <div class="material-icon" :class="material.type">
            <Icon size="md" :color="getIconColor(material.type)">
              <path :d="getIconPath(material.type)" />
            </Icon>
          </div>
        </template>
        <template #title>{{ material.title }}</template>
        <template #desc>{{ material.description }}</template>
        <template #trail>
          <div class="material-meta">
            <span class="material-source">{{ material.source }}</span>
            <span v-if="material.stars" class="material-stars">
              <Icon size="xs" color="#d4776a">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </Icon>
              {{ formatStars(material.stars) }}
            </span>
          </div>
        </template>
      </ListItem>
    </ListGroup>
  </div>
</template>

<script setup lang="ts">
import type { Material, MaterialType } from '@/types'
import { MATERIAL_TYPE_MAP } from '@/constants/categories'
import ListGroup from '../ui/ListGroup.vue'
import ListItem from '../ui/ListItem.vue'
import Icon from '../ui/Icon.vue'

interface Props {
  materials: Material[]
}

defineProps<Props>()

const getIconPath = (type: MaterialType) => {
  return MATERIAL_TYPE_MAP[type]?.icon || ''
}

const getIconColor = (type: MaterialType) => {
  const colors: Record<string, string> = {
    repository: '#5a8c5a',
    documentation: '#5a6c8c',
    tutorial: '#8c7b5a',
    book: '#c45c48',
    video: '#8c5a7a',
    article: '#6b5a8c'
  }
  return colors[type] || 'var(--cinnabar)'
}

const formatStars = (stars: number) => {
  if (stars >= 10000) {
    return (stars / 1000).toFixed(1) + 'k'
  }
  if (stars >= 1000) {
    return (stars / 1000).toFixed(1) + 'k'
  }
  return stars.toString()
}

const openMaterial = (material: Material) => {
  if (material.url) {
    window.open(material.url, '_blank')
  }
}
</script>

<style scoped>
.material-item {
  border-bottom: 1px solid var(--border-light);
}

.material-item:last-child {
  border-bottom: none;
}

.material-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--corner-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.material-icon.repository { background: #5a8c5a15; }
.material-icon.documentation { background: #5a6c8c15; }
.material-icon.tutorial { background: #8c7b5a15; }
.material-icon.book { background: #c45c4815; }
.material-icon.video { background: #8c5a7a15; }
.material-icon.article { background: #6b5a8c15; }

.material-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.material-source {
  font-size: var(--font-xs);
  color: var(--ink-muted);
}

.material-stars {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-xs);
  font-weight: 500;
  color: #d4776a;
}
</style>
