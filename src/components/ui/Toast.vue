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
          <!-- 图标容器 -->
          <div class="toast-icon-wrapper" :class="toast.type">
            <Icon :size="iconSize" color="currentColor">
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
            <Icon size="sm" color="var(--ink-tertiary)">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </Icon>
          </button>

          <!-- 进度条 -->
          <div
            v-if="toast.duration && toast.duration > 0 && toast.showProgress !== false"
            class="toast-progress"
            :class="toast.type"
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
    error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    warning: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    loading: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z'
  }
  return paths[type] || paths.info
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

/* Toast 项 - Material Design 风格 */
.toast-item {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  padding: var(--gap-3) var(--gap-4);
  background: var(--paper-card);
  border-radius: var(--corner-md);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
              0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12);
  min-width: 344px;
  max-width: 672px;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
}

/* 图标容器 - Material Design 风格 */
.toast-icon-wrapper {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-icon-wrapper.success {
  background: var(--success);
  color: #fff;
}

.toast-icon-wrapper.error {
  background: var(--error);
  color: #fff;
}

.toast-icon-wrapper.warning {
  background: #f5a623;
  color: #fff;
}

.toast-icon-wrapper.info {
  background: var(--cinnabar);
  color: #fff;
}

.toast-icon-wrapper.loading {
  background: var(--cinnabar);
  color: #fff;
}

/* 内容 */
.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
  margin-bottom: 2px;
  letter-spacing: 0.01em;
}

.toast-message {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

/* 操作按钮 - Material Design 风格 */
.toast-action {
  padding: 0 var(--gap-3);
  height: 32px;
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--cinnabar);
  background: transparent;
  border: none;
  border-radius: var(--corner-sm);
  cursor: pointer;
  transition: background-color var(--ease-standard);
  flex-shrink: 0;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.toast-action:hover {
  background: var(--cinnabar-ghost);
}

.toast-action:active {
  background: var(--cinnabar-pale);
}

/* 关闭按钮 */
.toast-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--ease-standard);
  flex-shrink: 0;
}

.toast-close:hover {
  background: var(--paper-hover);
}

.toast-close:active {
  background: var(--paper-active);
}

/* 进度条 */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  opacity: 0.2;
}

.toast-progress.success {
  background: var(--success);
}

.toast-progress.error {
  background: var(--error);
}

.toast-progress.warning {
  background: #f5a623;
}

.toast-progress.info {
  background: var(--cinnabar);
}

.toast-progress.loading {
  background: var(--cinnabar);
}

/* Material Design 风格动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
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
    padding: var(--gap-3);
  }

  .toast-icon-wrapper {
    width: 32px;
    height: 32px;
  }
}
</style>