<template>
  <span class="security-badge" :class="`status-${status}`">
    <span class="status-dot" />
    <span class="status-label">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import type { SecurityStatus } from '@/types/security'

interface Props {
  status: SecurityStatus
}

const props = defineProps<Props>()

const labelMap: Record<SecurityStatus, string> = {
  clean: '安全',
  suspicious: '可疑',
  malicious: '恶意',
  unknown: '未知'
}

const label = labelMap[props.status] ?? '未知'
</script>

<style scoped>
.security-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-2);
  padding: 4px 10px;
  border-radius: var(--corner-full);
  font-size: var(--font-xs);
  font-weight: 500;
  transition: all var(--ease-quick);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 安全 - 绿色 */
.status-clean {
  background: rgba(90, 140, 90, 0.12);
  color: var(--success);
}

.status-clean .status-dot {
  background: var(--success);
  box-shadow: 0 0 4px var(--success);
}

/* 可疑 - 橙色 */
.status-suspicious {
  background: rgba(196, 92, 72, 0.12);
  color: var(--cinnabar);
}

.status-suspicious .status-dot {
  background: var(--cinnabar);
  box-shadow: 0 0 4px var(--cinnabar);
}

/* 恶意 - 红色 */
.status-malicious {
  background: rgba(181, 74, 74, 0.12);
  color: var(--error);
}

.status-malicious .status-dot {
  background: var(--error);
  box-shadow: 0 0 4px var(--error);
}

/* 未知 - 灰色 */
.status-unknown {
  background: var(--paper-hover);
  color: var(--ink-tertiary);
}

.status-unknown .status-dot {
  background: var(--ink-muted);
}
</style>
