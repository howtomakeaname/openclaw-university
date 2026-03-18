<template>
  <div v-if="major" class="major-detail">
    <!-- 注入到AppHeader的开始学习按钮 -->
    <Teleport to="#header-actions-target">
      <transition name="slide-in-right">
        <Button
          v-if="showHeaderAction"
          kind="primary"
          class="header-study-btn"
          @click="openStartDialog"
        >
          <Icon size="sm" color="#fff">
            <path d="M8 5v14l11-7z"/>
          </Icon>
          开始学习
        </Button>
      </transition>
    </Teleport>
    <!-- 封面区域 -->
    <section class="detail-hero">
      <div class="hero-cover">
        <img :src="major.coverImage" :alt="major.name" />
        <div class="cover-overlay">
          <div class="overlay-content">
            <div class="meta-row">
              <span class="category-badge">{{ categoryLabel }}</span>
            </div>
            <h1 class="major-title">{{ major.name }}</h1>
            <p class="major-desc">{{ major.description }}</p>
            <div class="major-tags">
              <span v-for="tag in major.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容 -->
    <div class="detail-content">
      <div class="content-main">
        <!-- 内容区域 -->
        <div class="content-header">
          <Tabs
            v-model="activeContentTab"
            :tabs="contentTabs"
          />
          <Button kind="ghost" size="sm" @click="copyMarkdown">
            <Icon size="sm" :color="copied ? '#4ade80' : 'var(--cinnabar)'">
              <path v-if="copied" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              <path v-else d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </Icon>
            {{ copied ? '已复制' : '复制' }}
          </Button>
        </div>
        <div class="tab-content">
          <MarkdownRenderer
            :content="currentContent"
            :items="items"
            @activeIdChange="setActiveId"
          />
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="content-sidebar">
        <div class="sidebar-card info-card">
          <h3>专业信息</h3>
          <div class="info-row">
            <span class="info-label">专业代码</span>
            <span class="info-value">{{ major.code }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">分类</span>
            <span class="info-value">{{ categoryLabel }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">创建时间</span>
            <span class="info-value">{{ formatDate(major.createdAt) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">更新时间</span>
            <span class="info-value">{{ formatDate(major.updatedAt) }}</span>
          </div>
        </div>

        <div class="sidebar-card actions-card">
          <Button kind="primary" class="full-btn" @click="openStartDialog">
            <Icon size="sm" color="#fff">
              <path d="M8 5v14l11-7z"/>
            </Icon>
            开始学习
          </Button>
          <Button kind="outline" class="full-btn" @click="toggleFavorite">
            <Icon size="sm" :color="isFavorited ? '#ef4444' : 'var(--cinnabar)'">
              <path v-if="isFavorited" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <path v-else d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </Icon>
            {{ isFavorited ? '已收藏' : '收藏专业' }}
          </Button>
        </div>

        <div class="sidebar-card toc-card" v-if="items.length">
          <MarkdownToc
            :items="items"
            :activeId="activeId"
            @item-click="scrollToHeading"
          />
        </div>
      </aside>
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-else-if="loading" class="detail-loading">
    <Loader />
    <p>加载中...</p>
  </div>

  <!-- 错误状态 -->
  <div v-else class="detail-error">
    <Icon size="lg" color="var(--cinnabar)">
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    </Icon>
    <p>专业不存在</p>
    <Button kind="outline" @click="router.push('/majors')">返回列表</Button>
  </div>

  <!-- 开始学习弹窗 -->
  <Dialog v-model="showStartDialog" title="选择你的学习角色">
    <div class="role-selection">
      <p class="role-description">请选择你的身份开始学习：</p>
      <div class="role-options">
        <button class="role-card" @click="selectRole('agent')">
          <Icon size="lg" color="var(--cinnabar)">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </Icon>
          <span class="role-name">我是 Agent</span>
          <span class="role-desc">AI 智能体查看技能分类大纲</span>
        </button>
        <button class="role-card" @click="selectRole('human')">
          <Icon size="lg" color="var(--cinnabar)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </Icon>
          <span class="role-name">我是 Human</span>
          <span class="role-desc">人类用户查看技能培养大纲</span>
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { OutlineMajorDetail } from '@/types'
import { outlineService } from '@/services/outlineService'
import { useMarkdownToc } from '@/composables/useMarkdownToc'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'
import Tabs from '@/components/ui/Tabs.vue'
import Dialog from '@/components/ui/Dialog.vue'
import MarkdownRenderer from '@/components/major/MarkdownRenderer.vue'
import MarkdownToc from '@/components/major/MarkdownToc.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const major = ref<OutlineMajorDetail | null>(null)
const copied = ref(false)
const activeContentTab = ref<'agent' | 'human'>('agent')
const showStartDialog = ref(false)
const isFavorited = ref(false)
const showHeaderAction = ref(false)

const contentTabs = [
  { key: 'agent' as const, label: '我是Agent' },
  { key: 'human' as const, label: '我是Human' }
]

const currentContent = computed(() => {
  if (!major.value) return ''
  return activeContentTab.value === 'agent' 
    ? (major.value.installContent || '') 
    : (major.value.outlineContent || '')
})

// 目录解析
const { items, activeId, setActiveId, scrollToHeading } = useMarkdownToc(currentContent as Ref<string>)

const copyMarkdown = async () => {
  try {
    await navigator.clipboard.writeText(currentContent.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// 开始学习弹窗
const openStartDialog = () => {
  showStartDialog.value = true
}

const selectRole = (role: 'agent' | 'human') => {
  activeContentTab.value = role
  showStartDialog.value = false
  // 滚动到内容区域
  setTimeout(() => {
    const contentElement = document.querySelector('.content-main')
    contentElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

// 收藏功能
const FAVORITES_KEY = 'claw_favorite_majors'

const loadFavoriteStatus = () => {
  if (!major.value) return
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  isFavorited.value = favorites.includes(major.value.id)
}

const toggleFavorite = () => {
  if (!major.value) return
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  const index = favorites.indexOf(major.value.id)
  
  if (index === -1) {
    favorites.push(major.value.id)
    isFavorited.value = true
  } else {
    favorites.splice(index, 1)
    isFavorited.value = false
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

const CATEGORY_NAMES: Record<string, string> = {
  finance: '金融',
  business: '商业',
  hr: '人力资源',
  content: '内容创作',
  research: '学术研究',
  marketing: '市场营销',
  sales: '销售'
}

const categoryLabel = computed(() => major.value ? CATEGORY_NAMES[major.value.category] || major.value.category : '')

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

const loadMajor = async () => {
  const id = route.params.id as string
  if (!id) return

  loading.value = true
  try {
    major.value = await outlineService.getMajorById(id)
    loadFavoriteStatus()
  } finally {
    loading.value = false
  }
}

// 滚动监听
const handleScroll = () => {
  // 滚动超过hero高度时显示header按钮
  const heroHeight = document.querySelector('.detail-hero')?.clientHeight || 380
  showHeaderAction.value = window.scrollY > heroHeight - 76
}

onMounted(() => {
  loadMajor()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.major-detail {
  padding-bottom: var(--gap-6);
  /* 整个页面使用背景色，填充 AppHeader 下方的间隙 */
  background-color: var(--paper-bg);
}

.detail-hero {
  position: relative;
  height: 380px;
  margin-bottom: var(--gap-6);
}

.hero-cover {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  align-items: flex-end;
  padding: var(--gap-5);
}

.overlay-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.meta-row {
  margin-bottom: var(--gap-3);
}

.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: var(--corner-full);
  font-size: var(--font-xs);
  font-weight: 500;
  background: var(--cinnabar);
  color: #fff;
}

.major-title {
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  margin-bottom: var(--gap-3);
  line-height: 1.2;
}

.major-desc {
  font-size: var(--font-base);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: var(--gap-4);
}

.major-tags {
  display: flex;
  gap: var(--gap-2);
  flex-wrap: wrap;
}

.major-tags .tag {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: var(--font-xs);
  padding: 4px 12px;
  border-radius: var(--corner-full);
}

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-4);
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--gap-5);
  /* 添加背景色填充 AppHeader 和 content-header 之间的间距 */
  background-color: var(--paper-bg);
  border-radius: var(--corner-lg);
}

.content-main {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-4);
  border-bottom: 1px solid var(--border-light);
  background-color: #f5f0e8;
  border-radius: var(--corner-lg) var(--corner-lg) 0 0;
}

.tab-content {
  padding: var(--gap-4);
}

.content-title {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  margin: 0;
}

.tab-content {
  padding: var(--gap-4);
}

.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
}

.sidebar-card {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  padding: var(--gap-4);
}

.toc-card {
  position: sticky;
  top: 80px;
}

.info-card h3 {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-3);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: var(--gap-2) 0;
  border-bottom: 1px solid var(--border-light);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

.info-value {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
}

.actions-card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}

.full-btn {
  width: 100%;
}

/* 角色选择弹窗 */
.role-selection {
  padding: var(--gap-4);
}

.role-description {
  text-align: center;
  color: var(--ink-tertiary);
  font-size: var(--font-base);
  margin-bottom: var(--gap-4);
}

.role-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-4);
}

.role-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-2);
  padding: var(--gap-5);
  background: var(--paper-card);
  border: 2px solid var(--border-default);
  border-radius: var(--corner-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.role-card:hover {
  border-color: var(--cinnabar);
  background: var(--paper-hover);
  transform: translateY(-2px);
}

.role-name {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
}

.role-desc {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  text-align: center;
}

@media (max-width: 768px) {
  .detail-hero {
    height: 320px;
  }

  .major-title {
    font-size: 24px;
  }

  .detail-content {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    order: -1;
  }

  .toc-card {
    position: static;
  }

  .role-options {
    grid-template-columns: 1fr;
  }
}

.detail-loading,
.detail-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 76px - var(--gap-6));
  gap: var(--gap-3);
}

.detail-loading p,
.detail-error p {
  font-size: var(--font-base);
  color: var(--ink-tertiary);
}

/* 按钮从右侧平滑滑入滑出动效 */
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-right-enter-from {
  transform: translateX(24px);
  opacity: 0;
}

.slide-in-right-leave-to {
  transform: translateX(24px);
  opacity: 0;
}
</style>