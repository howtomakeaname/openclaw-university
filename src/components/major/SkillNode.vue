<template>
  <div 
    class="skill-node" 
    :class="{ 
      'is-expanded': isExpanded, 
      'is-completed': isCompleted,
      'has-children': hasChildren,
      'is-leaf': !hasChildren
    }"
    :style="{ '--level': level }"
  >
    <!-- 节点内容 -->
    <div class="node-content" @click="handleClick">
      <!-- 连接线 -->
      <div v-if="level > 0" class="node-connector">
        <div class="connector-line"></div>
      </div>
      
      <!-- 展开/折叠按钮 -->
      <button 
        v-if="hasChildren" 
        class="expand-btn"
        @click.stop="toggle"
      >
        <Icon size="xs" color="var(--ink-tertiary)">
          <path v-if="isExpanded" d="M7 10l5 5 5-5z"/>
          <path v-else d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </Icon>
      </button>
      <div v-else class="expand-placeholder"></div>
      
      <!-- 完成状态标记 -->
      <div 
        class="status-dot"
        :class="{ 'is-completed': isCompleted }"
        @click.stop="toggleComplete"
      >
        <Icon v-if="isCompleted" size="xs" color="#fff">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </Icon>
      </div>
      
      <!-- 节点图标 -->
      <div class="node-icon" :style="iconStyle">
        <Icon v-if="skill.icon" size="sm" :color="iconColor">
          <path :d="skill.icon"/>
        </Icon>
        <span v-else class="icon-text">{{ level + 1 }}</span>
      </div>
      
      <!-- 节点信息 -->
      <div class="node-info">
        <div class="info-header">
          <span class="skill-name">{{ skill.name }}</span>
          <span 
            v-if="skill.level" 
            class="skill-level"
            :style="levelStyle"
          >
            {{ levelLabel }}
          </span>
        </div>
        <p class="skill-desc">{{ skill.description }}</p>
        <div v-if="skill.estimatedTime" class="skill-meta">
          <Icon size="xs" color="var(--ink-muted)">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </Icon>
          <span>{{ skill.estimatedTime }}</span>
        </div>
      </div>
    </div>
    
    <!-- 子节点 -->
    <Transition name="tree-expand">
      <div v-if="hasChildren && isExpanded" class="children-container">
        <div class="children-line"></div>
        <div class="children-list">
          <SkillNode
            v-for="child in skill.children"
            :key="child.id"
            :skill="child"
            :level="level + 1"
            :expanded-ids="expandedIds"
            :completed-ids="completedIds"
            @toggle="$emit('toggle', $event)"
            @select="$emit('select', $event)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Skill, Difficulty } from '@/types'
import { DIFFICULTY_MAP } from '@/constants/categories'
import Icon from '../ui/Icon.vue'

interface Props {
  skill: Skill
  level: number
  expandedIds: Set<string>
  completedIds: Set<string>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  toggle: [id: string]
  select: [skill: Skill]
  'update:completed': [id: string, completed: boolean]
}>()

const hasChildren = computed(() => {
  return props.skill.children && props.skill.children.length > 0
})

const isExpanded = computed(() => {
  return props.expandedIds.has(props.skill.id)
})

const isCompleted = computed(() => {
  return props.completedIds.has(props.skill.id) || props.skill.isCompleted
})

const toggle = () => {
  emit('toggle', props.skill.id)
}

const handleClick = () => {
  emit('select', props.skill)
}

const toggleComplete = () => {
  emit('update:completed', props.skill.id, !isCompleted.value)
}

// 样式计算
const iconStyle = computed(() => {
  const levelColors: Record<number, string> = {
    0: 'var(--cinnabar)',
    1: '#d4776a',
    2: '#e8958a',
    3: '#f0b0a8'
  }
  return {
    background: (levelColors[props.level] || levelColors[3]) + '20',
    borderColor: levelColors[props.level] || levelColors[3]
  }
})

const iconColor = computed(() => {
  const levelColors: Record<number, string> = {
    0: 'var(--cinnabar)',
    1: '#d4776a',
    2: '#e8958a',
    3: '#f0b0a8'
  }
  return levelColors[props.level] || levelColors[3]
})

const levelStyle = computed(() => {
  const color = DIFFICULTY_MAP[props.skill.level]?.color || 'var(--cinnabar)'
  return {
    color,
    background: color + '15'
  }
})

const levelLabel = computed(() => {
  return DIFFICULTY_MAP[props.skill.level]?.name || props.skill.level
})
</script>

<style scoped>
.skill-node {
  position: relative;
}

.node-content {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-2);
  padding: var(--gap-3);
  border-radius: var(--corner-lg);
  transition: all var(--ease-quick);
  cursor: pointer;
  position: relative;
}

.node-content:hover {
  background: var(--cinnabar-ghost);
}

.node-content:hover .skill-name {
  color: var(--cinnabar);
}

/* 连接线 */
.node-connector {
  position: absolute;
  left: calc(var(--level) * -20px);
  top: 50%;
  width: 20px;
  height: 2px;
  background: var(--border-default);
}

.connector-line {
  width: 100%;
  height: 100%;
  background: var(--border-default);
}

/* 展开按钮 */
.expand-btn {
  width: 20px;
  height: 20px;
  border-radius: var(--corner-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper-hover);
  border: none;
  cursor: pointer;
  transition: all var(--ease-quick);
  flex-shrink: 0;
  margin-top: 4px;
}

.expand-btn:hover {
  background: var(--cinnabar-ghost);
}

.expand-placeholder {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 4px;
}

/* 状态标记 */
.status-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--border-default);
  background: var(--paper-card);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: all var(--ease-quick);
  margin-top: 4px;
}

.status-dot:hover {
  border-color: var(--cinnabar);
}

.status-dot.is-completed {
  background: var(--success-main);
  border-color: var(--success-main);
}

/* 节点图标 */
.node-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--corner-md);
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--ease-quick);
}

.icon-text {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--ink-secondary);
}

/* 节点信息 */
.node-info {
  flex: 1;
  min-width: 0;
}

.info-header {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  margin-bottom: 4px;
}

.skill-name {
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--ink-primary);
  transition: color var(--ease-quick);
}

.skill-level {
  font-size: var(--font-xs);
  font-weight: 500;
  padding: 2px 8px;
  border-radius: var(--corner-full);
}

.skill-desc {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  line-height: 1.5;
  margin-bottom: var(--gap-1);
}

.skill-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  color: var(--ink-muted);
}

/* 子节点容器 */
.children-container {
  position: relative;
  margin-left: 28px;
  padding-left: var(--gap-4);
}

.children-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 20px;
  width: 2px;
  background: var(--border-light);
}

.children-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-1);
}

/* 展开动画 */
.tree-expand-enter-active,
.tree-expand-leave-active {
  transition: all 0.2s ease;
}

.tree-expand-enter-from,
.tree-expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
