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
            class="dialog-content"
            :class="[size, { 'fullscreen': fullscreen }]"
            :style="contentStyle"
            @click.stop
          >
            <!-- 头部 -->
            <div v-if="showHeader" class="dialog-header">
              <div class="header-main">
                <Icon v-if="icon" :size="iconSize" :color="iconColor" class="header-icon">
                  <path :d="icon"/>
                </Icon>
                <div class="header-text">
                  <h3 v-if="title" class="dialog-title">{{ title }}</h3>
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
                  kind="outline"
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
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
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

// ESC 关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    emit('open')
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--gap-4);
}

.dialog-backdrop.clickable {
  cursor: pointer;
}

.dialog-content {
  background: var(--paper-card);
  border-radius: var(--corner-xl);
  box-shadow: var(--shadow-xl);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  cursor: default;
  position: relative;
}

/* 尺寸 */
.dialog-content.sm {
  width: 100%;
  max-width: 360px;
}

.dialog-content.md {
  width: 100%;
  max-width: 480px;
}

.dialog-content.lg {
  width: 100%;
  max-width: 640px;
}

.dialog-content.xl {
  width: 100%;
  max-width: 800px;
}

.dialog-content.fullscreen {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  border-radius: 0;
}

/* 头部 */
.dialog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gap-3);
  padding: var(--gap-5) var(--gap-5) var(--gap-3);
  border-bottom: 1px solid var(--border-light);
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
}

.header-text {
  flex: 1;
  min-width: 0;
}

.dialog-title {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  line-height: 1.4;
}

.dialog-subtitle {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  margin-top: 4px;
  line-height: 1.5;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease-quick);
  flex-shrink: 0;
}

.close-btn:hover {
  background: var(--paper-hover);
}

/* 内容区 */
.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--gap-5);
}

.dialog-body.no-padding {
  padding: 0;
}

/* 底部 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-2);
  padding: var(--gap-3) var(--gap-5) var(--gap-5);
  border-top: 1px solid var(--border-light);
}

/* 动画 */
.dialog-backdrop-enter-active,
.dialog-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-backdrop-enter-from,
.dialog-backdrop-leave-to {
  opacity: 0;
}

.dialog-content-enter-active,
.dialog-content-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dialog-content-enter-from,
.dialog-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .dialog-backdrop {
    padding: 0;
    align-items: flex-end;
  }

  .dialog-content {
    border-radius: var(--corner-xl) var(--corner-xl) 0 0;
    max-height: 85vh;
    animation: slideUp 0.3s ease;
  }

  .dialog-content.sm,
  .dialog-content.md,
  .dialog-content.lg,
  .dialog-content.xl {
    max-width: 100%;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .dialog-content-enter-from,
  .dialog-content-leave-to {
    transform: translateY(100%);
  }
}
</style>
