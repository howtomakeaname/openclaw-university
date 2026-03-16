<template>
  <div class="skill-tree">
    <!-- 工具栏 -->
    <div class="tree-toolbar">
      <div class="progress-info">
        <div class="progress-ring">
          <svg viewBox="0 0 36 36">
            <path
              class="progress-ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="progress-ring-fill"
              :stroke-dasharray="`${progressPercent}, 100`"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span class="progress-text">{{ completedCount }}/{{ totalCount }}</span>
        </div>
        <span class="progress-label">学习进度</span>
      </div>
      <div class="toolbar-actions">
        <button class="toolbar-btn" @click="expandAll" title="展开全部">
          <Icon size="sm"><path d="M12 4l-8 8h5v8h6v-8h5z"/></Icon>
        </button>
        <button class="toolbar-btn" @click="collapseAll" title="折叠全部">
          <Icon size="sm"><path d="M12 20l8-8h-5V4h-6v8H4z"/></Icon>
        </button>
      </div>
    </div>

    <!-- 技能树画布 -->
    <div class="tree-canvas" ref="canvasRef">
      <div class="tree-levels">
        <div 
          v-for="(level, levelIndex) in levels" 
          :key="levelIndex"
          class="tree-level"
          :class="`level-${levelIndex}`"
        >
          <div class="level-header">
            <span class="level-badge">{{ levelIndex + 1 }}</span>
            <span class="level-name">{{ getLevelName(levelIndex) }}</span>
          </div>
          <div class="level-nodes">
            <SkillCard
              v-for="skill in level"
              :key="skill.id"
              :skill="skill"
              :is-completed="isCompleted(skill.id)"
              :is-locked="isLocked(skill)"
              :is-active="selectedId === skill.id"
              @click="selectSkill(skill)"
              @toggle-complete="toggleComplete(skill.id)"
            />
          </div>
        </div>
      </div>

      <!-- SVG 连接线 -->
      <svg class="tree-connections" v-if="connections.length">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--border-default)" />
          </marker>
        </defs>
        <path
          v-for="(conn, index) in connections"
          :key="index"
          :d="conn.path"
          :class="['connection-line', conn.type]"
          :stroke-dasharray="conn.type === 'locked' ? '5,5' : 'none'"
        />
      </svg>
    </div>

    <!-- 技能详情弹窗 - Material Design 风格 -->
    <Transition name="slide-up">
      <div v-if="selectedSkill" class="skill-detail-panel" @click.self="closeDetail">
        <div class="detail-content">
          <!-- Material Design 拖拽指示条 -->
          <div class="drag-indicator"></div>
          
          <button class="close-btn" @click="closeDetail">
            <Icon size="md"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></Icon>
          </button>
          
          <div class="detail-header">
            <div class="detail-icon" :style="getDetailIconStyle">
              <Icon size="lg" :color="getDetailIconColor">
                <path v-if="selectedSkill.icon" :d="selectedSkill.icon"/>
                <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </Icon>
            </div>
            <div class="detail-title-group">
              <span class="detail-level" :style="getDetailLevelStyle">
                {{ getLevelLabel(selectedSkill.level) }}
              </span>
              <h3>{{ selectedSkill.name }}</h3>
            </div>
          </div>
          
          <p class="detail-desc">{{ selectedSkill.description }}</p>
          
          <div class="detail-meta">
            <div class="meta-item" v-if="selectedSkill.estimatedTime">
              <div class="meta-icon">
                <Icon size="sm" color="var(--ink-tertiary)">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </Icon>
              </div>
              <div class="meta-content">
                <span class="meta-label">预计耗时</span>
                <span class="meta-value">{{ selectedSkill.estimatedTime }}</span>
              </div>
            </div>
            <div class="meta-item" v-if="prereqNames.length">
              <div class="meta-icon">
                <Icon size="sm" color="var(--ink-tertiary)">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </Icon>
              </div>
              <div class="meta-content">
                <span class="meta-label">前置技能</span>
                <span class="meta-value">{{ prereqNames.join('、') }}</span>
              </div>
            </div>
          </div>
          
          <div class="detail-divider"></div>
          
          <div class="detail-actions">
            <Button 
              kind="primary" 
              class="action-btn primary-action"
              :disabled="isLocked(selectedSkill)"
              @click="startLearning"
            >
              <Icon size="sm" color="#fff">
                <path d="M8 5v14l11-7z"/>
              </Icon>
              {{ isLocked(selectedSkill) ? '先完成前置技能' : (isCompleted(selectedSkill.id) ? '重新学习' : '开始学习') }}
            </Button>
            <Button 
              kind="ghost" 
              class="action-btn secondary-action"
              @click="toggleComplete(selectedSkill.id)"
            >
              <Icon size="sm" :color="isCompleted(selectedSkill.id) ? 'var(--success)' : 'var(--ink-secondary)'">
                <path v-if="isCompleted(selectedSkill.id)" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                <circle v-else cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
              </Icon>
              {{ isCompleted(selectedSkill.id) ? '标记为未完成' : '标记为已完成' }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import type { Skill } from '@/types'
import { DIFFICULTY_MAP } from '@/constants/categories'
import Icon from '../ui/Icon.vue'
import Button from '../ui/Button.vue'
import SkillCard from './SkillCard.vue'

interface Props {
  skills: Skill[]
}

const props = defineProps<Props>()

// 响应式状态
const completedIds = ref<Set<string>>(new Set())
const selectedId = ref<string | null>(null)
const canvasRef = ref<HTMLElement>()
const connections = ref<Array<{path: string, type: 'active' | 'completed' | 'locked'}>>([])

// 计算属性
const skillMap = computed(() => {
  const map = new Map<string, Skill>()
  props.skills.forEach(s => map.set(s.id, s))
  return map
})

const parentMap = computed(() => {
  const map = new Map<string, string>()
  props.skills.forEach(s => {
    if (s.parentId) {
      map.set(s.id, s.parentId)
    }
  })
  return map
})

const childrenMap = computed(() => {
  const map = new Map<string, string[]>()
  props.skills.forEach(s => {
    if (s.parentId) {
      const children = map.get(s.parentId) || []
      children.push(s.id)
      map.set(s.parentId, children)
    }
  })
  return map
})

// 按层级分组技能
const levels = computed(() => {
  const levelMap = new Map<number, Skill[]>()
  
  const getLevel = (skill: Skill): number => {
    if (!skill.parentId) return 0
    const parent = skillMap.value.get(skill.parentId)
    return parent ? getLevel(parent) + 1 : 0
  }
  
  props.skills.forEach(skill => {
    const level = getLevel(skill)
    const list = levelMap.get(level) || []
    list.push(skill)
    levelMap.set(level, list)
  })
  
  // 排序
  levelMap.forEach(list => {
    list.sort((a, b) => a.order - b.order)
  })
  
  return Array.from(levelMap.values())
})

const totalCount = computed(() => props.skills.length)
const completedCount = computed(() => completedIds.value.size)
const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

const selectedSkill = computed(() => {
  if (!selectedId.value) return null
  return skillMap.value.get(selectedId.value) || null
})

const prereqNames = computed(() => {
  if (!selectedSkill.value?.parentId) return []
  const parent = skillMap.value.get(selectedSkill.value.parentId)
  return parent ? [parent.name] : []
})

// 方法
const isCompleted = (id: string) => completedIds.value.has(id)

const isLocked = (skill: Skill): boolean => {
  if (!skill.parentId) return false
  return !isCompleted(skill.parentId)
}

const toggleComplete = (id: string) => {
  if (completedIds.value.has(id)) {
    // 取消完成时，递归取消所有子技能
    const toRemove = [id]
    const queue = [id]
    while (queue.length) {
      const current = queue.shift()!
      const children = childrenMap.value.get(current) || []
      children.forEach(childId => {
        toRemove.push(childId)
        queue.push(childId)
      })
    }
    toRemove.forEach(sid => completedIds.value.delete(sid))
  } else {
    completedIds.value.add(id)
  }
  updateConnections()
}

const selectSkill = (skill: Skill) => {
  selectedId.value = skill.id
}

const closeDetail = () => {
  selectedId.value = null
}

const startLearning = () => {
  console.log('开始学习:', selectedSkill.value?.name)
  closeDetail()
}

const expandAll = () => {
  // 所有节点默认展开
}

const collapseAll = () => {
  selectedId.value = null
}

const getLevelName = (index: number): string => {
  const names = ['基础阶段', '进阶阶段', '高级阶段', '专家阶段']
  return names[index] || `阶段 ${index + 1}`
}

const getLevelLabel = (level: string) => {
  return DIFFICULTY_MAP[level as keyof typeof DIFFICULTY_MAP]?.name || level
}

const getDetailIconStyle = computed(() => {
  if (!selectedSkill.value) return {}
  const isComp = isCompleted(selectedSkill.value.id)
  return {
    background: isComp ? 'var(--success-main)' : 'var(--cinnabar-ghost)',
    borderColor: isComp ? 'var(--success-main)' : 'var(--cinnabar)'
  }
})

const getDetailIconColor = computed(() => {
  if (!selectedSkill.value) return 'var(--cinnabar)'
  return isCompleted(selectedSkill.value.id) ? '#fff' : 'var(--cinnabar)'
})

const getDetailLevelStyle = computed(() => {
  if (!selectedSkill.value) return {}
  const color = DIFFICULTY_MAP[selectedSkill.value.level as keyof typeof DIFFICULTY_MAP]?.color || 'var(--cinnabar)'
  return { color, background: color + '15' }
})

// 计算连接线
const calculateConnections = () => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const canvasRect = canvas.getBoundingClientRect()
  const newConnections: Array<{path: string, type: 'active' | 'completed' | 'locked'}> = []
  
  props.skills.forEach(skill => {
    if (!skill.parentId) return
    
    const parentEl = canvas.querySelector(`[data-skill-id="${skill.parentId}"]`) as HTMLElement
    const childEl = canvas.querySelector(`[data-skill-id="${skill.id}"]`) as HTMLElement
    
    if (parentEl && childEl) {
      const parentRect = parentEl.getBoundingClientRect()
      const childRect = childEl.getBoundingClientRect()
      
      const x1 = parentRect.right - canvasRect.left
      const y1 = parentRect.top + parentRect.height / 2 - canvasRect.top
      const x2 = childRect.left - canvasRect.left
      const y2 = childRect.top + childRect.height / 2 - canvasRect.top
      
      const midX = (x1 + x2) / 2
      const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
      
      let type: 'active' | 'completed' | 'locked' = 'locked'
      if (isCompleted(skill.parentId) && isCompleted(skill.id)) {
        type = 'completed'
      } else if (isCompleted(skill.parentId)) {
        type = 'active'
      }
      
      newConnections.push({ path, type })
    }
  })
  
  connections.value = newConnections
}

const updateConnections = () => {
  nextTick(calculateConnections)
}

onMounted(() => {
  updateConnections()
  window.addEventListener('resize', updateConnections)
})

// 监听技能变化
watch(() => props.skills, updateConnections, { deep: true })
</script>

<style scoped>
.skill-tree {
  background: var(--paper-card);
  border-radius: var(--corner-xl);
  border: 1px solid var(--border-default);
  overflow: hidden;
}

/* 工具栏 */
.tree-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-4);
  border-bottom: 1px solid var(--border-light);
  background: var(--paper-default);
}

.progress-info {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
}

.progress-ring {
  position: relative;
  width: 48px;
  height: 48px;
}

.progress-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: none;
  stroke: var(--border-default);
  stroke-width: 3;
}

.progress-ring-fill {
  fill: none;
  stroke: var(--success-main);
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--ink-primary);
}

.progress-label {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
}

.toolbar-actions {
  display: flex;
  gap: var(--gap-2);
}

.toolbar-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--corner-md);
  border: 1px solid var(--border-default);
  background: var(--paper-card);
  color: var(--ink-secondary);
  cursor: pointer;
  transition: all var(--ease-quick);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar-btn:hover {
  border-color: var(--cinnabar);
  color: var(--cinnabar);
  background: var(--cinnabar-ghost);
}

/* 画布 */
.tree-canvas {
  position: relative;
  padding: var(--gap-5);
  overflow-x: auto;
  min-height: 400px;
}

.tree-levels {
  display: flex;
  gap: var(--gap-8);
  min-width: max-content;
}

.tree-level {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
  min-width: 240px;
}

.level-header {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  padding-bottom: var(--gap-3);
  border-bottom: 2px solid var(--border-light);
  margin-bottom: var(--gap-2);
}

.level-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--cinnabar);
  color: #fff;
  font-size: var(--font-sm);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.level-name {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
}

.level-nodes {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
}

/* SVG 连接线 */
.tree-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.connection-line {
  fill: none;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.connection-line.active {
  stroke: var(--cinnabar);
}

.connection-line.completed {
  stroke: var(--success-main);
}

.connection-line.locked {
  stroke: var(--border-default);
}

/* 详情面板 - Material Design 风格 */
.skill-detail-panel {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: var(--gap-4);
  backdrop-filter: blur(4px);
}

.detail-content {
  background: var(--paper-card);
  border-radius: var(--corner-xl) var(--corner-xl) var(--corner-md) var(--corner-md);
  width: 100%;
  max-width: 560px;
  padding: var(--gap-5);
  position: relative;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
              0 16px 24px 2px rgba(0, 0, 0, 0.14),
              0 6px 30px 5px rgba(0, 0, 0, 0.12);
  max-height: 80vh;
  overflow-y: auto;
}

/* Material Design 拖拽指示条 */
.drag-indicator {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 4px;
  background: var(--border-light);
  border-radius: 2px;
}

.close-btn {
  position: absolute;
  top: var(--gap-4);
  right: var(--gap-4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--paper-hover);
  color: var(--ink-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.close-btn:hover {
  background: var(--cinnabar-ghost);
  color: var(--cinnabar);
  transform: rotate(90deg);
}

.detail-header {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-4);
  margin-bottom: var(--gap-5);
  padding-top: var(--gap-2);
}

.detail-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--corner-lg);
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.detail-title-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  margin-top: var(--gap-1);
}

.detail-title-group h3 {
  font-size: 24px;
  font-weight: 500;
  color: var(--ink-primary);
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin: 0;
}

.detail-level {
  font-size: var(--font-xs);
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--corner-full);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  align-self: flex-start;
}

.detail-desc {
  font-size: var(--font-base);
  color: var(--ink-secondary);
  line-height: 1.7;
  margin-bottom: var(--gap-5);
  letter-spacing: 0.01em;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
  margin-bottom: var(--gap-5);
}

.meta-item {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-3);
  padding: var(--gap-3);
  background: var(--paper-hover);
  border-radius: var(--corner-md);
  transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.meta-item:hover {
  background: var(--border-light);
}

.meta-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper-card);
  border-radius: var(--corner-md);
  flex-shrink: 0;
}

.meta-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.meta-label {
  font-size: var(--font-xs);
  color: var(--ink-muted);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.meta-value {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
}

.detail-divider {
  height: 1px;
  background: var(--border-light);
  margin: var(--gap-5) 0;
}

.detail-actions {
  display: flex;
  gap: var(--gap-3);
}

.action-btn {
  flex: 1;
  gap: var(--gap-2);
}

.primary-action {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
              0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.primary-action:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
              0 8px 10px 1px rgba(0, 0, 0, 0.14),
              0 3px 14px 2px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.secondary-action {
  gap: var(--gap-2);
}

/* Material Design 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter-from .detail-content,
.slide-up-leave-to .detail-content {
  transform: translateY(100%);
}

@media (max-width: 768px) {
  .tree-canvas {
    padding: var(--gap-3);
  }
  
  .tree-levels {
    flex-direction: column;
    gap: var(--gap-4);
  }
  
  .tree-level {
    min-width: auto;
  }
  
  .tree-connections {
    display: none;
  }
}
</style>
