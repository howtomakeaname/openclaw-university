<template>
  <div class="skill-security-card" :class="{ 'is-expanded': isExpanded }">
    <!-- 卡片头部 -->
    <div class="card-header" @click="toggleExpand">
      <div class="header-left">
        <div class="skill-icon">
          <Icon size="lg" color="var(--cinnabar)">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </Icon>
        </div>
        <div class="skill-info">
          <h4 class="skill-name">{{ data.name }}</h4>
          <div class="skill-meta">
            <span class="author">@{{ data.author }}</span>
            <span class="divider">·</span>
            <span class="installs">{{ data.installs }} 安装</span>
            <span class="divider">·</span>
            <span class="stars">★ {{ data.stars }}</span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <SecurityStatusBadge :status="data.security_status" />
        <button class="expand-btn" :class="{ 'is-expanded': isExpanded }">
          <Icon size="md" color="var(--ink-tertiary)">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </Icon>
        </button>
      </div>
    </div>

    <!-- 卡片内容（展开时显示） -->
    <div v-show="isExpanded" class="card-body">
      <p class="skill-description">{{ data.description }}</p>
      
      <div class="scan-details-section">
        <h5 class="section-title">
          <Icon size="sm" color="var(--cinnabar)">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </Icon>
          扫描详情
        </h5>
        <div class="scan-details-grid">
          <ScanDetailItem
            v-for="(detail, index) in data.scan_details"
            :key="index"
            :scanner="detail.scanner"
            :status="detail.status"
            :text="detail.text"
          />
        </div>
      </div>

      <div class="card-footer">
        <a :href="data.url" target="_blank" rel="noopener" class="source-link">
          <Icon size="sm" color="var(--cinnabar)">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </Icon>
          查看来源
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SkillSecurity } from '@/types/security'
import Icon from '../ui/Icon.vue'
import SecurityStatusBadge from './SecurityStatusBadge.vue'
import ScanDetailItem from './ScanDetailItem.vue'

interface Props {
  data: SkillSecurity
}

defineProps<Props>()

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.skill-security-card {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  overflow: hidden;
  transition: all var(--ease-standard);
}

.skill-security-card:hover {
  border-color: var(--cinnabar-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.skill-security-card.is-expanded {
  border-color: var(--cinnabar);
  box-shadow: 0 4px 12px rgba(196, 92, 72, 0.1);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-4);
  padding: var(--gap-4);
  cursor: pointer;
  transition: background var(--ease-quick);
}

.card-header:hover {
  background: var(--paper-hover);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  flex: 1;
  min-width: 0;
}

.skill-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--corner-md);
  background: var(--cinnabar-ghost);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--ink-primary);
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-meta {
  display: flex;
  align-items: center;
  gap: var(--gap-1);
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
  flex-wrap: wrap;
}

.divider {
  color: var(--border-default);
}

.author {
  color: var(--cinnabar);
  font-weight: 500;
}

.stars {
  color: #d4a574;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  flex-shrink: 0;
}

.expand-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--corner-md);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease-quick);
}

.expand-btn:hover {
  background: var(--paper-active);
}

.expand-btn :deep(svg) {
  transition: transform var(--ease-standard);
}

.expand-btn.is-expanded :deep(svg) {
  transform: rotate(180deg);
}

/* 卡片内容 */
.card-body {
  padding: 0 var(--gap-4) var(--gap-4);
  border-top: 1px solid var(--border-light);
  animation: slideDown 200ms ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-description {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  line-height: 1.7;
  margin: var(--gap-3) 0;
}

/* 扫描详情区域 */
.scan-details-section {
  margin-top: var(--gap-4);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--ink-primary);
  margin: 0 0 var(--gap-3);
}

.scan-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--gap-3);
}

/* 卡片底部 */
.card-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--gap-4);
  padding-top: var(--gap-3);
  border-top: 1px solid var(--border-light);
}

.source-link {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-2);
  font-size: var(--font-sm);
  color: var(--cinnabar);
  text-decoration: none;
  padding: var(--gap-2) var(--gap-3);
  border-radius: var(--corner-md);
  transition: all var(--ease-quick);
}

.source-link:hover {
  background: var(--cinnabar-ghost);
  color: var(--cinnabar-light);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .card-header {
    padding: var(--gap-3);
  }
  
  .header-left {
    gap: var(--gap-2);
  }
  
  .skill-icon {
    width: 36px;
    height: 36px;
  }
  
  .header-right {
    gap: var(--gap-2);
  }
  
  .expand-btn {
    display: none;
  }
  
  .card-body {
    padding: 0 var(--gap-3) var(--gap-3);
  }
  
  .scan-details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
