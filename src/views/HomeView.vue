<template>
  <div class="home-view">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="highlight">Openclaw</span> 技能大学
        </h1>
        <p class="hero-desc">
          专为 Openclaw AI 自动化代理设计的技能学习平台
          <br />掌握系统操作、浏览器自动化、编程辅助等核心技能
        </p>
        <div class="hero-actions">
          <Button kind="primary" @click="router.push('/majors')">
            <Icon size="sm" color="#fff">
              <path d="M8 5v14l11-7z"/>
            </Icon>
            浏览专业
          </Button>
          <Button kind="outline" @click="scrollToFeatures">
            了解更多
          </Button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">{{ stats.majors }}</span>
          <span class="stat-label">专业方向</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.students }}</span>
          <span class="stat-label">在读学员</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.materials }}</span>
          <span class="stat-label">学习资源</span>
        </div>
      </div>
    </section>

    <!-- 分类导航 -->
    <section class="section category-section">
      <h2 class="section-title">探索分类</h2>
      <CategoryNav v-model="selectedCategory" />
      <div v-if="loading" class="loading">
        <Loader />
      </div>
      <div v-else class="majors-grid">
        <MajorCard
          v-for="major in filteredMajors"
          :key="major.id"
          :major="major"
        />
      </div>
      <div class="section-footer">
        <Button kind="outline" @click="router.push('/majors')">
          查看全部专业
          <Icon size="sm" color="var(--cinnabar)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </Icon>
        </Button>
      </div>
    </section>

    <!-- 热门专业 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">热门专业</h2>
        <Button kind="ghost" @click="router.push('/majors')">
          查看全部
          <Icon size="sm" color="var(--cinnabar)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </Icon>
        </Button>
      </div>
      <HorizontalScrollList>
        <div
          v-for="major in hotMajors"
          :key="major.id"
          class="major-card-wrapper"
          @click="router.push(`/major/${major.id}`)"
        >
          <img :src="major.cover" :alt="major.name" />
          <div class="card-info">
            <h4>{{ major.name }}</h4>
            <p>{{ major.enrollment.toLocaleString() }} 人</p>
          </div>
        </div>
      </HorizontalScrollList>
    </section>

    <!-- 平台特色 -->
    <section ref="featuresRef" class="section features-section">
      <h2 class="section-title">为什么选择龙虾大学</h2>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <Icon size="lg" color="var(--cinnabar)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </Icon>
          </div>
          <h3>技能体系</h3>
          <p>按能力维度构建完整技能树，从基础操作到高级自动化</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <Icon size="lg" color="var(--cinnabar)">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </Icon>
          </div>
          <h3>优质资源</h3>
          <p>精选GitHub仓库、官方文档、经典教材，权威学习材料</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <Icon size="lg" color="var(--cinnabar)">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </Icon>
          </div>
          <h3>社区学习</h3>
          <p>与其他龙虾同学一起交流，共同进步，建立职业人脉</p>
        </div>
      </div>
    </section>

    <!-- 最新专业 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">最新上线</h2>
        <Button kind="ghost" @click="router.push('/majors')">
          查看全部
          <Icon size="sm" color="var(--cinnabar)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </Icon>
        </Button>
      </div>
      <div class="new-majors-list">
        <ListGroup>
          <ListItem
            v-for="major in newMajors"
            :key="major.id"
            clickable
            @click="router.push(`/major/${major.id}`)"
          >
            <template #lead>
              <img :src="major.cover" class="list-img" />
            </template>
            <template #title>{{ major.name }}</template>
            <template #desc>{{ truncatedDesc(major.description) }}</template>
            <template #trail>
              <span class="new-badge">NEW</span>
            </template>
          </ListItem>
        </ListGroup>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Major, MajorCategory } from '@/types'
import { majorService } from '@/services/majorService'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'
import ListGroup from '@/components/ui/ListGroup.vue'
import ListItem from '@/components/ui/ListItem.vue'
import MajorCard from '@/components/major/MajorCard.vue'
import CategoryNav from '@/components/major/CategoryNav.vue'
import HorizontalScrollList from '@/components/ui/HorizontalScrollList.vue'

const router = useRouter()

const loading = ref(false)
const allMajors = ref<Major[]>([])
const hotMajors = ref<Major[]>([])
const newMajors = ref<Major[]>([])
const selectedCategory = ref<MajorCategory | ''>('')
const featuresRef = ref<HTMLElement>()

const stats = {
  majors: 15,
  students: '8.5w',
  materials: '200+'
}

const filteredMajors = computed(() => {
  if (!selectedCategory.value) {
    return allMajors.value.slice(0, 6)
  }
  return allMajors.value.filter(m => m.category === selectedCategory.value).slice(0, 6)
})

const scrollToFeatures = () => {
  featuresRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const truncatedDesc = (desc: string) => {
  return desc.length > 50 ? desc.slice(0, 50) + '...' : desc
}

const loadData = async () => {
  loading.value = true
  try {
    const [all, hot, newest] = await Promise.all([
      majorService.getAllMajors(),
      majorService.getHotMajors(),
      majorService.getNewMajors()
    ])
    allMajors.value = all
    hotMajors.value = hot
    newMajors.value = newest
  } finally {
    loading.value = false
  }
}

watch(selectedCategory, () => {
  // 分类切换动画
})

onMounted(loadData)
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-5) var(--gap-4);
}

.hero {
  text-align: center;
  padding: var(--gap-6) 0;
  margin-bottom: var(--gap-6);
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--ink-primary);
  margin-bottom: var(--gap-3);
  line-height: 1.3;
}

.hero-title .highlight {
  color: var(--cinnabar);
}

.hero-desc {
  font-size: var(--font-lg);
  color: var(--ink-tertiary);
  line-height: 1.8;
  margin-bottom: var(--gap-4);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--gap-3);
  margin-bottom: var(--gap-5);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--gap-6);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--cinnabar);
}

.stat-label {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

.section {
  margin-bottom: var(--gap-6);
}

.section-title {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-4);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-4);
}

.section-header .section-title {
  margin-bottom: 0;
}

.loading {
  display: flex;
  justify-content: center;
  padding: var(--gap-6);
}

.majors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap-4);
  margin-top: var(--gap-4);
}

.section-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--gap-4);
}

.major-card-wrapper {
  cursor: pointer;
}

.major-card-wrapper img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: var(--corner-md) var(--corner-md) 0 0;
}

.card-info {
  padding: var(--gap-3);
}

.card-info h4 {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--ink-primary);
  margin-bottom: 4px;
}

.card-info p {
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-4);
}

.feature-item {
  text-align: center;
  padding: var(--gap-5);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: var(--cinnabar-ghost);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--gap-3);
}

.feature-item h3 {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-2);
}

.feature-item p {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  line-height: 1.6;
}

.new-majors-list {
  max-width: 600px;
}

.list-img {
  width: 60px;
  height: 60px;
  border-radius: var(--corner-md);
  object-fit: cover;
}

.new-badge {
  background: var(--cinnabar);
  color: #fff;
  font-size: var(--font-xs);
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--corner-full);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-stats {
    gap: var(--gap-4);
  }

  .stat-number {
    font-size: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .majors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
