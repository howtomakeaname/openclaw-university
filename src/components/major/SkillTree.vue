<template>
  <div class="skill-tree">
    <div class="tree-line"></div>
    <div
      v-for="(skill, index) in sortedSkills"
      :key="skill.id"
      class="skill-node"
      :class="{ active: index <= activeIndex }"
    >
      <div class="node-marker" :style="markerStyle(skill.level)">
        <span class="node-number">{{ index + 1 }}</span>
      </div>
      <div class="node-content">
        <h4 class="skill-name">{{ skill.name }}</h4>
        <p class="skill-desc">{{ skill.description }}</p>
        <span class="skill-level" :style="levelStyle(skill.level)">
          {{ levelLabel(skill.level) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Skill, Difficulty } from '@/types'
import { DIFFICULTY_MAP } from '@/constants/categories'

interface Props {
  skills: Skill[]
  activeIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  activeIndex: -1
})

const sortedSkills = computed(() => {
  return [...props.skills].sort((a, b) => a.order - b.order)
})

const markerStyle = (level: Difficulty) => {
  const color = DIFFICULTY_MAP[level]?.color || 'var(--cinnabar)'
  return { borderColor: color }
}

const levelStyle = (level: Difficulty) => {
  const color = DIFFICULTY_MAP[level]?.color || 'var(--cinnabar)'
  return { color, background: color + '15' }
}

const levelLabel = (level: Difficulty) => {
  return DIFFICULTY_MAP[level]?.name || level
}
</script>

<style scoped>
.skill-tree {
  position: relative;
  padding-left: 24px;
}

.tree-line {
  position: absolute;
  left: 15px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  background: var(--border-default);
}

.skill-node {
  display: flex;
  gap: var(--gap-3);
  padding: var(--gap-3) 0;
  position: relative;
}

.node-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--paper-card);
  border: 2px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
  transition: all var(--ease-quick);
}

.skill-node.active .node-marker {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
}

.node-number {
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--ink-tertiary);
}

.skill-node.active .node-number {
  color: #fff;
}

.node-content {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--ink-primary);
  margin-bottom: 4px;
}

.skill-desc {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  margin-bottom: var(--gap-2);
  line-height: 1.5;
}

.skill-level {
  font-size: var(--font-xs);
  font-weight: 500;
  padding: 2px 8px;
  border-radius: var(--corner-full);
}
</style>
