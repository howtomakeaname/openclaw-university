<template>
  <div class="security-stats-panel">
    <div class="stats-header">
      <h3 class="stats-title">
        <Icon size="md" color="var(--cinnabar)">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </Icon>
        安全概览
      </h3>
      <span class="stats-total">共 {{ stats.total }} 个技能</span>
    </div>
    
    <div class="stats-grid">
      <div class="stat-item status-clean">
        <div class="stat-icon">
          <Icon size="lg" color="var(--success)">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </Icon>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.clean }}</span>
          <span class="stat-label">安全</span>
        </div>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: `${getPercentage(stats.clean)}%` }" />
        </div>
      </div>

      <div class="stat-item status-suspicious">
        <div class="stat-icon">
          <Icon size="lg" color="var(--cinnabar)">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </Icon>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.suspicious }}</span>
          <span class="stat-label">可疑</span>
        </div>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: `${getPercentage(stats.suspicious)}%` }" />
        </div>
      </div>

      <div class="stat-item status-malicious">
        <div class="stat-icon">
          <Icon size="lg" color="var(--error)">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </Icon>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.malicious }}</span>
          <span class="stat-label">恶意</span>
        </div>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: `${getPercentage(stats.malicious)}%` }" />
        </div>
      </div>

      <div class="stat-item status-unknown">
        <div class="stat-icon">
          <Icon size="lg" color="var(--ink-tertiary)">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
          </Icon>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats.unknown }}</span>
          <span class="stat-label">未知</span>
        </div>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: `${getPercentage(stats.unknown)}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SecurityStats } from '@/types/security'
import Icon from '../ui/Icon.vue'

interface Props {
  stats: SecurityStats
}

const props = defineProps<Props>()

const getPercentage = (value: number): number => {
  if (props.stats.total === 0) return 0
  return Math.round((value / props.stats.total) * 100)
}
</script>

<style scoped>
.security-stats-panel {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  padding: var(--gap-5);
}

.stats-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--gap-5);
  padding-bottom: var(--gap-4);
  border-bottom: 1px solid var(--border-light);
}

.stats-title {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  margin: 0;
}

.stats-total {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

/* 统计网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--gap-4);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
  padding: var(--gap-4);
  background: var(--paper-bg);
  border-radius: var(--corner-md);
  border: 1px solid transparent;
  transition: all var(--ease-quick);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.stat-item.status-clean:hover {
  border-color: var(--success);
}

.stat-item.status-suspicious:hover {
  border-color: var(--cinnabar);
}

.stat-item.status-malicious:hover {
  border-color: var(--error);
}

.stat-item.status-unknown:hover {
  border-color: var(--ink-muted);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--corner-md);
  background: var(--paper-card);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  display: flex;
  align-items: baseline;
  gap: var(--gap-2);
}

.stat-value {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--ink-primary);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
}

.stat-bar {
  height: 4px;
  background: var(--border-light);
  border-radius: var(--corner-full);
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: var(--corner-full);
  transition: width 300ms ease-out;
}

.status-clean .stat-bar-fill {
  background: var(--success);
}

.status-suspicious .stat-bar-fill {
  background: var(--cinnabar);
}

.status-malicious .stat-bar-fill {
  background: var(--error);
}

.status-unknown .stat-bar-fill {
  background: var(--ink-muted);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .security-stats-panel {
    padding: var(--gap-4);
  }

  .stats-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-2);
    margin-bottom: var(--gap-4);
  }

  .stats-title {
    font-size: var(--font-base);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap-3);
  }

  .stat-item {
    padding: var(--gap-3);
  }

  .stat-icon {
    width: 36px;
    height: 36px;
  }

  .stat-value {
    font-size: var(--font-lg);
  }
}
</style>