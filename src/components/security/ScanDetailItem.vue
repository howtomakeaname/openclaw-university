<template>
  <div class="scan-detail-item" :class="`status-${status}`">
    <div class="scanner-info">
      <span class="scanner-name">{{ scanner }}</span>
      <SecurityStatusBadge :status="badgeStatus" />
    </div>
    <p class="scan-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ScannerStatus } from '@/types/security'
import SecurityStatusBadge from './SecurityStatusBadge.vue'

interface Props {
  scanner: string
  status: ScannerStatus
  text: string
}

const props = defineProps<Props>()

// 将 scanner status 映射为 security status
const badgeStatus = computed(() => {
  switch (props.status) {
    case 'clean':
      return 'clean'
    case 'suspicious':
      return 'suspicious'
    case 'malicious':
      return 'malicious'
    case 'error':
    default:
      return 'unknown'
  }
})
</script>

<style scoped>
.scan-detail-item {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-md);
  padding: var(--gap-3);
  transition: all var(--ease-quick);
}

.scan-detail-item:hover {
  border-color: var(--cinnabar-light);
}

/* 状态样式 */
.scan-detail-item.status-clean {
  border-left: 3px solid var(--success);
}

.scan-detail-item.status-suspicious {
  border-left: 3px solid var(--cinnabar);
}

.scan-detail-item.status-malicious {
  border-left: 3px solid var(--error);
}

.scan-detail-item.status-error {
  border-left: 3px solid var(--ink-muted);
}

.scanner-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-2);
  margin-bottom: var(--gap-2);
}

.scanner-name {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
}

.scan-text {
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
  line-height: 1.5;
  margin: 0;
}
</style>
