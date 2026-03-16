<template>
  <div v-if="major" class="major-detail">
    <!-- 封面区域 -->
    <section class="detail-hero">
      <div class="hero-cover">
        <img :src="major.cover" :alt="major.name" />
        <div class="cover-overlay">
          <div class="overlay-content">
            <div class="meta-row">
              <span class="category-badge" :style="categoryStyle">
                <Icon size="xs" color="#fff">
                  <path :d="categoryIcon" />
                </Icon>
                {{ categoryName }}
              </span>
              <span class="difficulty-badge" :style="difficultyStyle">
                {{ difficultyName }}
              </span>
            </div>
            <h1 class="major-title">{{ major.name }}</h1>
            <p class="major-desc">{{ major.description }}</p>
            <div class="major-stats">
              <div class="stat">
                <Icon size="md" color="#fff">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </Icon>
                <div class="stat-content">
                  <span class="stat-value">{{ major.enrollment.toLocaleString() }}</span>
                  <span class="stat-label">人在学</span>
                </div>
              </div>
              <div class="stat">
                <Icon size="md" color="#fff">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </Icon>
                <div class="stat-content">
                  <span class="stat-value">{{ major.duration }}</span>
                  <span class="stat-label">学习周期</span>
                </div>
              </div>
              <div class="stat">
                <Icon size="md" color="#d4776a">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </Icon>
                <div class="stat-content">
                  <span class="stat-value">{{ major.rating }} 分</span>
                  <span class="stat-label">学员评分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Material Design 浮动操作按钮 -->
      <div class="hero-actions">
        <Button kind="primary" class="action-btn enroll-btn">
          <Icon size="sm" color="#fff">
            <path d="M8 5v14l11-7z"/>
          </Icon>
          开始学习
        </Button>
        <Button kind="outline" class="action-btn save-btn">
          <Icon size="sm" color="var(--cinnabar)">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </Icon>
          收藏专业
        </Button>
      </div>
    </section>

    <!-- 主要内容 -->
    <div class="detail-content">
      <div class="content-main">
    <!-- 技能树 -->
        <section class="content-section">
          <div class="section-header">
            <h2>
              <Icon size="md" color="var(--cinnabar)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </Icon>
              技能学习路径
            </h2>
            <span class="skill-count">{{ major.skills.length }} 个技能点</span>
          </div>
          <SkillTree :skills="major.skills" @select="handleSkillSelect" />
        </section>

        <!-- 教材资源 -->
        <section class="content-section">
          <div class="section-header">
            <h2>
              <Icon size="md" color="var(--cinnabar)">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </Icon>
              教材资源
            </h2>
            <span class="material-count">{{ major.materials.length }} 个资源</span>
          </div>
          <MaterialList :materials="major.materials" />
        </section>

        <!-- 标签 -->
        <section class="content-section">
          <div class="section-header">
            <h2>
              <Icon size="md" color="var(--cinnabar)">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
              </Icon>
              相关标签
            </h2>
          </div>
          <div class="tags-list">
            <span v-for="tag in major.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </section>
      </div>

      <!-- 侧边栏 - Material Design 风格 -->
      <aside class="content-sidebar">
        <div class="sidebar-card info-card">
          <h3>专业信息</h3>
          <div class="info-row">
            <span class="info-label">专业代码</span>
            <span class="info-value">{{ major.code }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">学习周期</span>
            <span class="info-value">{{ major.duration }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">难度等级</span>
            <span class="info-value" :style="{ color: difficultyColor }">{{ difficultyName }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">学员评分</span>
            <span class="info-value rating">{{ major.rating }} / 5.0</span>
          </div>
          <div class="info-row">
            <span class="info-label">更新时间</span>
            <span class="info-value">{{ formatDate(major.updatedAt) }}</span>
          </div>
        </div>

        <div class="sidebar-card share-card">
          <h3>分享专业</h3>
          <div class="share-buttons">
            <Button kind="ghost" class="share-btn">
              <Icon size="md" color="var(--ink-secondary)">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </Icon>
            </Button>
            <Button kind="ghost" class="share-btn">
              <Icon size="md" color="var(--ink-secondary)">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </Icon>
            </Button>
          </div>
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
    <p>专业不存在或已下架</p>
    <Button kind="outline" @click="router.push('/majors')">返回列表</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Major, Skill } from '@/types'
import { CATEGORY_MAP, DIFFICULTY_MAP } from '@/constants/categories'
import { majorService } from '@/services/majorService'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'
import SkillTree from '@/components/major/SkillTree.vue'
import MaterialList from '@/components/major/MaterialList.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const major = ref<Major | null>(null)

const categoryInfo = computed(() => {
  if (!major.value) return null
  return CATEGORY_MAP[major.value.category]
})

const categoryName = computed(() => categoryInfo.value?.name || '')
const categoryIcon = computed(() => categoryInfo.value?.icon || '')
const categoryStyle = computed(() => ({
  background: categoryInfo.value?.color || 'var(--cinnabar)'
}))

const difficultyInfo = computed(() => {
  if (!major.value) return null
  return DIFFICULTY_MAP[major.value.difficulty]
})

const difficultyName = computed(() => difficultyInfo.value?.name || '')
const difficultyColor = computed(() => difficultyInfo.value?.color || 'var(--cinnabar)')
const difficultyStyle = computed(() => ({
  background: difficultyInfo.value?.color + '30',
  color: difficultyInfo.value?.color
}))

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

// 处理技能选择
const handleSkillSelect = (skill: Skill) => {
  console.log('选中技能:', skill.name)
  // 可以在这里添加跳转逻辑，如打开技能详情抽屉等
}

const loadMajor = async () => {
  const id = route.params.id as string
  if (!id) return

  loading.value = true
  try {
    major.value = await majorService.getMajorById(id)
  } finally {
    loading.value = false
  }
}

onMounted(loadMajor)
</script>

<style scoped>
.major-detail {
  padding-bottom: var(--gap-6);
}

/* 封面区域 - Material Design 风格 */
.detail-hero {
  position: relative;
  height: 420px;
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
  transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-cover:hover img {
  transform: scale(1.03);
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
  display: flex;
  gap: var(--gap-2);
  margin-bottom: var(--gap-3);
}

.category-badge,
.difficulty-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: var(--corner-full);
  font-size: var(--font-xs);
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.category-badge {
  color: #fff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.major-title {
  font-size: 40px;
  font-weight: 500;
  color: #fff;
  margin-bottom: var(--gap-3);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.major-desc {
  font-size: var(--font-base);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: var(--gap-5);
}

.major-stats {
  display: flex;
  gap: var(--gap-5);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  font-size: var(--font-sm);
  color: #fff;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: var(--font-lg);
  font-weight: 500;
  color: #fff;
}

.stat-label {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.02em;
}

/* 操作按钮 - Material Design 风格 */
.hero-actions {
  position: absolute;
  bottom: -28px;
  right: var(--gap-5);
  display: flex;
  gap: var(--gap-3);
  z-index: 10;
}

.action-btn {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
              0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
              0 8px 10px 1px rgba(0, 0, 0, 0.14),
              0 3px 14px 2px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.action-btn:active {
  box-shadow: 0 8px 10px -6px rgba(0, 0, 0, 0.2),
              0 12px 17px 2px rgba(0, 0, 0, 0.14),
              0 4px 22px 4px rgba(0, 0, 0, 0.12);
  transform: translateY(0);
}

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-4);
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--gap-5);
}

.content-section {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  padding: var(--gap-4);
  margin-bottom: var(--gap-4);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-4);
  padding-bottom: var(--gap-3);
  border-bottom: 1px solid var(--border-light);
}

.section-header h2 {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  margin: 0;
}

.skill-count,
.material-count {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-2);
}

.tag {
  background: var(--paper-hover);
  color: var(--ink-secondary);
  font-size: var(--font-sm);
  padding: 6px 12px;
  border-radius: var(--corner-full);
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

.enroll-btn,
.save-btn {
  width: 100%;
  margin-bottom: var(--gap-2);
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

.info-value.rating {
  color: #d4776a;
}

.share-card h3 {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-3);
}

.share-buttons {
  display: flex;
  gap: var(--gap-2);
}

.share-btn {
  flex: 1;
}

.detail-loading,
.detail-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--gap-8);
  gap: var(--gap-3);
}

.detail-loading p,
.detail-error p {
  font-size: var(--font-base);
  color: var(--ink-tertiary);
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
    padding: 0 var(--gap-3);
  }

  .content-sidebar {
    order: -1;
  }

  .major-stats {
    flex-wrap: wrap;
    gap: var(--gap-2);
  }
}
</style>
