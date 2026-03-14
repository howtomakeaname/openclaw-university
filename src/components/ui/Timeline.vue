<template>
  <div class="timeline" :class="{ 'is-alternate': alternate }">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
      :class="[
        `is-${item.type || 'default'}`,
        { 'is-active': item.active, 'is-last': index === items.length - 1 }
      ]"
    >
      <div class="timeline-dot">
        <div class="dot-inner"></div>
      </div>
      <div class="timeline-line" v-if="index !== items.length - 1"></div>
      <div class="timeline-content">
        <div class="content-time" v-if="item.time">{{ item.time }}</div>
        <div class="content-title">{{ item.title }}</div>
        <div class="content-desc" v-if="item.description">{{ item.description }}</div>
        <div class="content-extra" v-if="item.extra">
          <slot name="extra" :item="item" :index="index">
            {{ item.extra }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TimelineItem {
  title: string
  description?: string
  time?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  active?: boolean
  extra?: string
}

interface Props {
  items: TimelineItem[]
  alternate?: boolean
}

withDefaults(defineProps<Props>(), {
  alternate: false
})
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: var(--gap-2) 0;
}

.timeline-item {
  position: relative;
  padding-left: 32px;
  padding-bottom: var(--gap-5);
  display: flex;
  align-items: flex-start;
}

.timeline-item.is-last {
  padding-bottom: 0;
}

/* 时间线节点 */
.timeline-dot {
  position: absolute;
  left: 0;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--paper-card);
  border: 2px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all var(--ease-quick);
}

.dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-default);
  transition: all var(--ease-quick);
}

/* 时间线连接线 */
.timeline-line {
  position: absolute;
  left: 7px;
  top: 20px;
  bottom: 0;
  width: 2px;
  background: var(--border-light);
  z-index: 1;
}

.timeline-item.is-last .timeline-line {
  display: none;
}

/* 内容区域 */
.timeline-content {
  flex: 1;
  min-width: 0;
  padding-top: 0;
}

.content-time {
  font-size: var(--font-xs);
  color: var(--cinnabar);
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: var(--gap-2);
}

.content-title {
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--ink-primary);
  line-height: 1.4;
  margin-bottom: 4px;
}

.content-desc {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  line-height: 1.5;
}

.content-extra {
  margin-top: var(--gap-2);
  font-size: var(--font-sm);
  color: var(--ink-secondary);
}

/* 不同类型状态 */
.timeline-item.is-primary .timeline-dot {
  border-color: var(--cinnabar);
}

.timeline-item.is-primary .dot-inner {
  background: var(--cinnabar);
}

.timeline-item.is-success .timeline-dot {
  border-color: var(--success-main);
}

.timeline-item.is-success .dot-inner {
  background: var(--success-main);
}

.timeline-item.is-warning .timeline-dot {
  border-color: var(--warning-main);
}

.timeline-item.is-warning .dot-inner {
  background: var(--warning-main);
}

.timeline-item.is-error .timeline-dot {
  border-color: var(--error-main);
}

.timeline-item.is-error .dot-inner {
  background: var(--error-main);
}

/* 激活状态 */
.timeline-item.is-active .timeline-dot {
  border-color: var(--cinnabar);
  background: var(--cinnabar);
  box-shadow: 0 0 0 4px var(--cinnabar-ghost);
}

.timeline-item.is-active .dot-inner {
  background: #fff;
}

.timeline-item.is-active .content-title {
  color: var(--cinnabar);
  font-weight: 600;
}

/* 交替布局 */
.timeline.is-alternate .timeline-item {
  padding-left: 0;
  padding-right: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--gap-4);
}

.timeline.is-alternate .timeline-dot {
  position: relative;
  left: auto;
  top: 2px;
}

.timeline.is-alternate .timeline-line {
  left: 50%;
  transform: translateX(-50%);
}

.timeline.is-alternate .timeline-content {
  text-align: right;
}

.timeline.is-alternate .timeline-item:nth-child(even) .timeline-content {
  text-align: left;
  order: 3;
}

.timeline.is-alternate .timeline-item:nth-child(even) .timeline-dot {
  order: 2;
}

@media (max-width: 768px) {
  .timeline.is-alternate .timeline-item {
    grid-template-columns: auto 1fr;
    gap: var(--gap-3);
  }

  .timeline.is-alternate .timeline-content,
  .timeline.is-alternate .timeline-item:nth-child(even) .timeline-content {
    text-align: left;
    order: 2;
  }

  .timeline.is-alternate .timeline-dot {
    order: 1;
  }

  .timeline.is-alternate .timeline-line {
    left: 7px;
    transform: none;
  }
}
</style>
