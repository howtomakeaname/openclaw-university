import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

export interface ToastAction {
  text: string
  onClick: () => void
}

export interface ToastOptions {
  id?: string
  type?: ToastType
  title?: string
  message: string
  duration?: number
  closable?: boolean
  showProgress?: boolean
  action?: ToastAction
}

export interface ToastItem {
  id: string
  type: ToastType
  message: string
  title?: string
  duration: number
  closable: boolean
  showProgress: boolean
  action?: ToastAction
  startTime: number
  isPaused: boolean
  pausedTime: number
  timer?: ReturnType<typeof setTimeout>
}

// 全局状态
const toasts = ref<ToastItem[]>([])

// 生成唯一ID
let idCounter = 0
const generateId = () => `toast-${Date.now()}-${++idCounter}`

export function useToast() {
  // 添加 Toast
  const add = (options: ToastOptions): string => {
    const id = options.id || generateId()
    
    // 移除同类型的旧 toast（可选）
    if (options.type === 'loading') {
      removeByType('loading')
    }
    
    const duration = options.duration ?? 3000
    const toast: ToastItem = {
      id,
      type: options.type || 'info',
      message: options.message,
      title: options.title,
      duration: duration,
      closable: options.closable ?? true,
      showProgress: options.showProgress ?? true,
      action: options.action,
      startTime: Date.now(),
      isPaused: false,
      pausedTime: 0
    }
    
    toasts.value.push(toast)
    
    // 自动关闭
    if (duration > 0) {
      toast.timer = setTimeout(() => {
        remove(id)
      }, duration)
    }
    
    return id
  }
  
  // 移除 Toast
  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      const item = toasts.value[index]!
      if (item.timer) {
        clearTimeout(item.timer)
      }
      toasts.value.splice(index, 1)
    }
  }
  
  // 按类型移除
  const removeByType = (type: ToastType) => {
    const toRemove = toasts.value.filter(t => t.type === type)
    toRemove.forEach(t => remove(t.id))
  }
  
  // 暂停计时
  const pauseTimer = (id: string) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast && toast.timer && !toast.isPaused) {
      toast.isPaused = true
      clearTimeout(toast.timer)
      toast.pausedTime += Date.now() - toast.startTime
    }
  }
  
  // 恢复计时
  const resumeTimer = (id: string) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast && toast.isPaused && toast.duration > 0) {
      toast.isPaused = false
      toast.startTime = Date.now()
      const remaining = toast.duration - toast.pausedTime
      if (remaining > 0) {
        toast.timer = setTimeout(() => {
          remove(id)
        }, remaining)
      }
    }
  }
  
  // 清空所有
  const clear = () => {
    toasts.value.forEach(t => {
      if (t.timer) clearTimeout(t.timer)
    })
    toasts.value = []
  }
  
  // 快捷方法
  const success = (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => {
    return add({ ...options, type: 'success', message })
  }
  
  const error = (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => {
    return add({ ...options, type: 'error', message })
  }
  
  const warning = (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => {
    return add({ ...options, type: 'warning', message })
  }
  
  const info = (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => {
    return add({ ...options, type: 'info', message })
  }
  
  const loading = (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => {
    return add({ ...options, type: 'loading', message, duration: 0 })
  }
  
  return {
    toasts,
    add,
    remove,
    removeByType,
    pauseTimer,
    resumeTimer,
    clear,
    success,
    error,
    warning,
    info,
    loading
  }
}

// 全局 toast 实例（用于在组件外调用）
let globalToast: ReturnType<typeof useToast> | null = null

export function setGlobalToast(instance: ReturnType<typeof useToast>) {
  globalToast = instance
}

export function getGlobalToast() {
  return globalToast
}
