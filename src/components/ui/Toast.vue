<template>
  <Teleport to="body">
    <div class="toast-container" :class="position">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="[toast.type, { 'has-action': toast.action }]"
          @mouseenter="pauseTimer(toast.id)"
          @mouseleave="resumeTimer(toast.id)"
        >
          <!-- 图标 -->
          <div class="toast-icon">
            <Icon :size="iconSize" :color="iconColor(toast.type)">
              <path :d="iconPath(toast.type)"/>
            </Icon>
          </div>

          <!-- 内容 -->
          <div class="toast-content">
            <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>
            <div class="toast-message">{{ toast.message }}</div>
          </div>

          <!-- 操作按钮 -->
          <button
            v-if="toast.action"
            class="toast-action"
            @click="handleAction(toast)"
          >
            {{ toast.action.text }}
          </button>

          <!-- 关闭按钮 -->
          <button
            v-if="toast.closable !== false"
            class="toast-close"
            @click="remove(toast.id)"
            aria-label="关闭"
          >
            <Icon size="sm" color="var(--ink-muted)">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </Icon>
          </button>

          <!-- 进度条 -->
          <div
            v-if="toast.duration && toast.duration > 0 && toast.showProgress !== false"
            class="toast-progress"
            :style="progressStyle(toast)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { useToast, type ToastItem, type ToastType } from '@/composables/useToast'

type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface Props {
  position?: ToastPosition
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top-right',
  iconSize: 'md'
})

const { toasts, remove, pauseTimer, resumeTimer } = useToast()

const position = computed(() => props.position)

const iconPath = (type: string) => {
  const paths: Record<string, string> = {
    success: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    error: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    loading: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z'
  }
  return paths[type] || paths.info
}

const iconColor = (type: ToastType) => {
  const colors: Record<ToastType, string> = {
    success: 'var(--success-main)',
    error: 'var(--error-main)',
    warning: 'var(--warning-main)',
    info: 'var(--info-main)',
    loading: 'var(--cinnabar)'
  }
  return colors[type] || colors.info
}

const progressStyle = (toast: ToastItem) => {
  const duration = toast.duration || 0
  if (duration <= 0) return {}
  const elapsed = Date.now() - toast.startTime
  const remaining = Math.max(0, duration - elapsed + (toast.pausedTime || 0))
  const percent = (remaining / duration) * 100
  return {
    width: `${percent}%`,
    transition: toast.isPaused ? 'none' : `width ${remaining}ms linear`
  }
}

const handleAction = (toast: ToastItem) => {
  if (toast.action?.onClick) {
    toast.action.onClick()
  }
  remove(toast.id)
}
</script>

<style scoped>
/* 容器定位 */
.toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  padding: var(--gap-4);
  pointer-events: none;
}

.toast-container.top-left {
  top: 0;
  left: 0;
}

.toast-container.top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.toast-container.top-right {
  top: 0;
  right: 0;
  align-items: flex-end;
}

.toast-container.bottom-left {
  bottom: 0;
  left: 0;
  flex-direction: column-reverse;
}

.toast-container.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  flex-direction: column-reverse;
}

.toast-container.bottom-right {
  bottom: 0;
  right: 0;
  align-items: flex-end;
  flex-direction: column-reverse;
}

/* Toast 项 */
.toast-item {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-3);
  padding: var(--gap-3) var(--gap-4);
  background: var(--paper-card);
  border-radius: var(--corner-lg);
  box-shadow: var(--shadow-lg);
  min-width: 280px;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
  border-left: 4px solid transparent;
}

/* 类型样式 */
.toast-item.success {
  border-left-color: var(--success-main);
}

.toast-item.error {
  border-left-color: var(--error-main);
}

.toast-item.warning {
  border-left-color: var(--warning-main);
}

.toast-item.info {
  border-left-color: var(--info-main);
}

.toast-item.loading {
  border-left-color: var(--cinnabar);
}

/* 图标 */
.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 内容 */
.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: 2px;
}

.toast-message {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  line-height: 1.5;
}

/* 操作按钮 */
.toast-action {
  padding: 4px 12px;
  font-size: var(--font-xs);
  font-weight: 500;
  color: var(--cinnabar);
  background: var(--cinnabar-ghost);
  border: none;
  border-radius: var(--corner-sm);
  cursor: pointer;
  transition: all var(--ease-quick);
  flex-shrink: 0;
}

.toast-action:hover {
  background: var(--cinnabar);
  color: #fff;
}

/* 关闭按钮 */
.toast-close {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease-quick);
  flex-shrink: 0;
  margin-left: var(--gap-1);
}

.toast-close:hover {
  background: var(--paper-hover);
}

/* 进度条 */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.3;
}

/* 动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .toast-container {
    left: 0 !important;
    right: 0 !important;
    transform: none !important;
    align-items: stretch !important;
    padding: var(--gap-2);
  }

  .toast-item {
    min-width: auto;
    max-width: none;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateY(-100%) scale(0.9);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateY(-100%) scale(0.9);
  }
}
</style>
