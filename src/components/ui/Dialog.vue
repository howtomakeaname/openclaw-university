<template>
  <Teleport to="body">
    <Transition name="dialog-backdrop">
      <div
        v-if="modelValue"
        class="dialog-backdrop"
        :class="{ 'clickable': closeOnClickOverlay }"
        @click="handleBackdropClick"
      >
        <Transition name="dialog-content">
          <div
            v-if="modelValue"
            class="dialog-container"
            @click.stop
          >
            <div
              class="dialog-content"
              :class="[size, { 'fullscreen': fullscreen }]"
              :style="contentStyle"
              role="dialog"
              aria-modal="true"
              :aria-labelledby="title ? 'dialog-title' : undefined"
            >
              <!-- 头部 -->
              <div v-if="showHeader" class="dialog-header">
                <div class="header-main">
                  <Icon v-if="icon" :size="iconSize" :color="iconColor" class="header-icon">
                    <path :d="icon"/>
                  </Icon>
                  <div class="header-text">
                    <h3 v-if="title" id="dialog-title" class="dialog-title">{{ title }}</h3>
                    <p v-if="subtitle" class="dialog-subtitle">{{ subtitle }}</p>
                  </div>
                </div>
                <button
                  v-if="showClose"
                  class="close-btn"
                  @click="close"
                  aria-label="关闭"
                >
                  <Icon size="sm" color="var(--ink-secondary)">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </Icon>
                </button>
              </div>

              <!-- 内容区 -->
              <div class="dialog-body" :class="{ 'no-padding': noPadding }">
                <slot />
              </div>

              <!-- 底部 -->
              <div v-if="showFooter || $slots.footer" class="dialog-footer">
                <slot name="footer">
                  <Button
                    v-if="showCancel"
                    kind="ghost"
                    :loading="cancelLoading"
                    @click="handleCancel"
                  >
                    {{ cancelText }}
                  </Button>
                  <Button
                    v-if="showConfirm"
                    :kind="confirmKind"
                    :loading="confirmLoading"
                    @click="handleConfirm"
                  >
                    {{ confirmText }}
                  </Button>
                </slot>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'
import Button from './Button.vue'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type ConfirmKind = 'primary' | 'fill' | 'quiet' | 'outline' | 'ghost'

interface Props {
  modelValue: boolean
  title?: string
  subtitle?: string
  icon?: string
  iconColor?: string
  size?: DialogSize
  fullscreen?: boolean
  width?: string | number
  showHeader?: boolean
  showClose?: boolean
  showFooter?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  confirmKind?: ConfirmKind
  confirmLoading?: boolean
  cancelLoading?: boolean
  closeOnClickOverlay?: boolean
  closeOnEsc?: boolean
  noPadding?: boolean
  destroyOnClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showHeader: true,
  showClose: true,
  showFooter: false,
  showConfirm: true,
  showCancel: true,
  confirmText: '确认',
  cancelText: '取消',
  confirmKind: 'primary',
  closeOnClickOverlay: true,
  closeOnEsc: true,
  noPadding: false,
  destroyOnClose: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  confirm: []
  cancel: []
  open: []
}>()

const iconSize = computed((): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  const map: Record<DialogSize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = {
    sm: 'md',
    md: 'lg',
    lg: 'lg',
    xl: 'xl',
    full: 'xl'
  }
  return map[props.size]
})

const contentStyle = computed(() => {
  if (props.width) {
    return { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
  }
  return {}
})

let lastFocusedElement: HTMLElement | null = null

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnClickOverlay) {
    close()
  }
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  close()
}

// ESC 关闭和焦点管理
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    lastFocusedElement = document.activeElement as HTMLElement
    emit('open')
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
    if (lastFocusedElement) {
      lastFocusedElement.focus()
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* 背景遮罩 */
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--gap-4);
}

.dialog-backdrop.clickable {
  cursor: pointer;
}

/* 容器用于居中 */
.dialog-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* 对话框主体 - Material Design 风格 */
.dialog-content {
  background: var(--paper-card);
  border-radius: var(--corner-lg);
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
              0 24px 38px 3px rgba(0, 0, 0, 0.14),
              0 9px 46px 8px rgba(0, 0, 0, 0.12);
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  cursor: default;
  position: relative;
  overflow: hidden;
}

/* 尺寸 - Material Design 标准尺寸 */
.dialog-content.sm {
  width: 100%;
  max-width: 320px;
}

.dialog-content.md {
  width: 100%;
  max-width: 560px;
}

.dialog-content.lg {
  width: 100%;
  max-width: 720px;
}

.dialog-content.xl {
  width: 100%;
  max-width: 960px;
}

.dialog-content.fullscreen {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  border-radius: 0;
}

/* 头部 - Material Design 风格 */
.dialog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gap-3);
  padding: var(--gap-6) var(--gap-6) var(--gap-4);
  position: relative;
}

.header-main {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-3);
  flex: 1;
  min-width: 0;
}

.header-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.header-text {
  flex: 1;
  min-width: 0;
}

.dialog-title {
  font-size: var(--font-xl);
  font-weight: 500;
  color: var(--ink-primary);
  line-height: 1.3;
  letter-spacing: 0.005em;
}

.dialog-subtitle {
  font-size: var(--font-base);
  color: var(--ink-secondary);
  margin-top: var(--gap-1);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--ease-standard);
  flex-shrink: 0;
  margin: -6px -6px 0 0;
}

.close-btn:hover {
  background: var(--paper-hover);
}

.close-btn:active {
  background: var(--paper-active);
}

/* 内容区 - Material Design 风格 */
.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--gap-6) var(--gap-6);
  color: var(--ink-primary);
  font-size: var(--font-base);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.dialog-body.no-padding {
  padding: 0;
}

/* 底部 - Material Design 风格 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--gap-2);
  padding: var(--gap-3) var(--gap-6) var(--gap-6);
  position: relative;
}

/* 按钮间距调整 */
.dialog-footer .btn {
  min-width: 64px;
  padding: 0 var(--gap-4);
  height: 36px;
}

/* Material Design 风格动画 */
.dialog-backdrop-enter-active,
.dialog-backdrop-leave-active {
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-backdrop-enter-from,
.dialog-backdrop-leave-to {
  opacity: 0;
}

.dialog-content-enter-active {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-content-leave-active {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-content-enter-from,
.dialog-content-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(24px);
}

/* 滚动条美化 */
.dialog-body::-webkit-scrollbar {
  width: 6px;
}

.dialog-body::-webkit-scrollbar-track {
  background: transparent;
}

.dialog-body::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: 3px;
}

.dialog-body::-webkit-scrollbar-thumb:hover {
  background: var(--ink-muted);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .dialog-backdrop {
    padding: var(--gap-2);
  }

  .dialog-content {
    max-height: calc(100vh - 16px);
    border-radius: var(--corner-lg);
  }

  .dialog-content.sm,
  .dialog-content.md,
  .dialog-content.lg,
  .dialog-content.xl {
    max-width: 100%;
  }

  .dialog-header {
    padding: var(--gap-5) var(--gap-5) var(--gap-3);
  }

  .dialog-body {
    padding: 0 var(--gap-5) var(--gap-5);
  }

  .dialog-footer {
    padding: var(--gap-3) var(--gap-5) var(--gap-5);
  }

  .dialog-title {
    font-size: var(--font-lg);
  }
}
</style>