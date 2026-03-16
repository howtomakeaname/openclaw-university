<template>
  <div
    class="skill-card"
    :class="{ 
      'is-completed': isCompleted, 
      'is-locked': isLocked,
      'is-active': isActive 
    }"
    :data-skill-id="skill.id"
    @click="$emit('click')"
  >
    <!-- 左侧状态指示器 -->
    <div class="card-left">
      <div class="status-icon-container" :class="{ 'is-completed': isCompleted, 'is-locked': isLocked }">
        <Icon v-if="isCompleted" size="md" color="#fff">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </Icon>
        <Icon v-else-if="isLocked" size="md" color="var(--ink-muted)">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </Icon>
        <span v-else class="status-number">{{ orderNumber }}</span>
      </div>
      
      <!-- 孩子指示器 -->
      <div v-if="hasChildren" class="child-indicator">
        <Icon size="xs" color="var(--ink-muted)">
          <path d="M7 10l5 5 5-5z"/>
        </Icon>
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="card-content">
      <div class="content-header">
        <h4 class="skill-name">{{ skill.name }}</h4>
        <span 
          v-if="skill.level" 
          class="difficulty-badge"
          :style="difficultyStyle"
        >
          {{ difficultyLabel }}
        </span>
      </div>
      
      <p class="skill-desc">{{ skill.description }}</p>
      
      <div class="content-footer">
        <div v-if="skill.estimatedTime" class="time-estimate">
          <Icon size="xs" color="var(--ink-muted)">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </Icon>
          <span>{{ skill.estimatedTime }}</span>
        </div>
        
        <!-- 快速操作 -->
        <button 
          v-if="!isLocked"
          class="quick-action"
          :class="{ 'is-completed': isCompleted }"
          @click.stop="$emit('toggle-complete')"
          :title="isCompleted ? '标记为未完成' : '标记为已完成'"
        >
          <Icon size="sm" :color="isCompleted ? 'var(--success)' : 'var(--ink-tertiary)'">
            <path v-if="isCompleted" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            <circle v-else cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          </Icon>
        </button>
      </div>
    </div>

    <!-- 前置技能提示 -->
    <div v-if="isLocked" class="prereq-hint">
      <Icon size="xs" color="var(--ink-muted)">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </Icon>
      <span>需完成前置</span>
    </div>

    <!-- Material Design 波纹效果 -->
    <div class="ripple"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '@/types'
import { DIFFICULTY_MAP } from '@/constants/categories'
import Icon from '../ui/Icon.vue'

interface Props {
  skill: Skill
  isCompleted?: boolean
  isLocked?: boolean
  isActive?: boolean
  orderNumber?: number
}

const props = withDefaults(defineProps<Props>(), {
  isCompleted: false,
  isLocked: false,
  isActive: false,
  orderNumber: 0
})

defineEmits<{
  click: []
  'toggle-complete': []
}>()

const hasChildren = computed(() => {
  return props.skill.children && props.skill.children.length > 0
})

const difficultyStyle = computed(() => {
  const color = DIFFICULTY_MAP[props.skill.level as keyof typeof DIFFICULTY_MAP]?.color || 'var(--cinnabar)'
  return {
    color,
    background: color + '15'
  }
})

const difficultyLabel = computed(() => {
  return DIFFICULTY_MAP[props.skill.level as keyof typeof DIFFICULTY_MAP]?.name || props.skill.level
})
</script>

<style scoped>
.skill-card {
  position: relative;
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  padding: var(--gap-4);
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  gap: var(--gap-3);
  z-index: 1;
  overflow: hidden;
}

.skill-card:hover {
  border-color: var(--cinnabar);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
              0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12);
}

.skill-card.is-active {
  border-color: var(--cinnabar);
  box-shadow: 0 0 0 1px var(--cinnabar),
              0 3px 5px -1px rgba(0, 0, 0, 0.2),
              0 6px 10px 0 rgba(0, 0, 0, 0.14);
}

.skill-card.is-completed {
  border-color: var(--success);
  background: linear-gradient(135deg, var(--paper-card) 0%, rgba(90, 140, 90, 0.05) 100%);
}

.skill-card.is-locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.skill-card.is-locked:hover {
  border-color: var(--border-default);
  box-shadow: none;
}

/* 左侧状态区域 - Material Design 风格 */
.card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);
}

.status-icon-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.status-icon-container.is-completed {
  background: var(--success);
  border-color: var(--success);
}

.status-icon-container.is-locked {
  background: var(--paper-hover);
}

.status-number {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-secondary);
  letter-spacing: 0.02em;
}

.child-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 卡片内容 */
.card-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}

.content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gap-2);
}

.skill-name {
  font-size: var(--font-lg);
  font-weight: 500;
  color: var(--ink-primary);
  line-height: 1.4;
  flex: 1;
  letter-spacing: 0.01em;
}

.difficulty-badge {
  font-size: var(--font-xs);
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--corner-full);
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.skill-desc {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: 0.01em;
}

.content-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--gap-2);
}

.time-estimate {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-sm);
  color: var(--ink-muted);
}

.quick-action {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.skill-card:hover .quick-action {
  opacity: 1;
}

.quick-action:hover {
  background: var(--cinnabar-ghost);
}

.quick-action.is-completed {
  opacity: 1;
  background: rgba(90, 140, 90, 0.1);
}

/* 前置提示 */
.prereq-hint {
  position: absolute;
  top: var(--gap-2);
  right: var(--gap-2);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  color: var(--ink-muted);
  background: var(--paper-hover);
  padding: 4px 10px;
  border-radius: var(--corner-full);
}

/* Material Design 波纹效果 */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: var(--cinnabar);
  opacity: 0.1;
  transform: scale(0);
  animation: ripple 600ms linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .skill-card {
    padding: var(--gap-3);
  }
  
  .quick-action {
    opacity: 1;
  }
  
  .skill-name {
    font-size: var(--font-base);
  }
  
  .status-icon-container {
    width: 36px;
    height: 36px;
  }
}
</style>