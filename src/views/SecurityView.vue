<template>
  <div class="security-view">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">安全中心</h1>
        <p class="page-desc">查看和管理所有技能的安全扫描状态与详细报告</p>
      </div>
    </div>

    <div class="page-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <Loader size="lg" text="正在加载安全数据..." />
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <Icon size="xl" color="var(--error)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </Icon>
        <p class="error-text">{{ error }}</p>
        <Button kind="primary" @click="loadData">重新加载</Button>
      </div>

      <!-- 数据展示 -->
      <template v-else>
        <!-- 统计面板 -->
        <SecurityStatsPanel :stats="stats" />

        <!-- 筛选和搜索工具栏 -->
        <div class="toolbar">
          <div class="filter-group">
            <Button
              v-for="filter in filterOptions"
              :key="filter.value"
              :kind="currentFilter === filter.value ? 'primary' : 'quiet'"
              size="sm"
              @click="setFilter(filter.value)"
            >
              {{ filter.label }}
            </Button>
          </div>
          <div class="search-box">
            <Input
              v-model="searchQuery"
              placeholder="搜索技能名称、作者..."
              size="sm"
            >
              <template #prefix>
                <Icon size="sm" color="var(--ink-muted)">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </Icon>
              </template>
            </Input>
          </div>
        </div>

        <!-- 技能列表 -->
        <div class="skills-list">
          <div class="list-header">
            <span class="list-title">技能列表</span>
            <span class="list-count">共 {{ filteredSkills.length }} 个</span>
          </div>
          
          <!-- 虚拟滚动列表 -->
          <VirtualList
            v-if="filteredSkills.length > 0"
            :items="virtualListItems"
            :estimated-item-height="180"
            :overscan="3"
            class="virtual-list-wrapper"
          >
            <template #default="{ item }">
              <div class="skill-item">
                <SkillSecurityCard :data="item.data" />
              </div>
            </template>
          </VirtualList>
          
          <div v-else class="empty-state">
            <Icon size="xl" color="var(--ink-muted)">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </Icon>
            <p>没有找到匹配的技能</p>
            <Button kind="quiet" @click="resetFilters">清除筛选</Button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { SkillSecurity, SecurityStats } from '@/types/security'
import {
  fetchSkillsSecurity,
  calculateSecurityStats,
  filterSkillsByStatus,
  searchSkills
} from '@/services/securityService'
import Icon from '@/components/ui/Icon.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Loader from '@/components/ui/Loader.vue'
import VirtualList from '@/components/ui/VirtualList.vue'
import SecurityStatsPanel from '@/components/security/SecurityStatsPanel.vue'
import SkillSecurityCard from '@/components/security/SkillSecurityCard.vue'

interface VirtualListItem {
  id: string
  data: SkillSecurity
}

// 数据状态
const skills = ref<SkillSecurity[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// 筛选和搜索
const currentFilter = ref('all')
const searchQuery = ref('')

const filterOptions = [
  { value: 'all', label: '全部' },
  { value: 'clean', label: '安全' },
  { value: 'suspicious', label: '可疑' },
  { value: 'malicious', label: '恶意' }
]

// 计算属性
const stats = computed<SecurityStats>(() => calculateSecurityStats(skills.value))

const filteredSkills = computed(() => {
  let result = skills.value

  // 状态筛选
  if (currentFilter.value !== 'all') {
    result = filterSkillsByStatus(result, currentFilter.value)
  }

  // 搜索
  if (searchQuery.value.trim()) {
    result = searchSkills(result, searchQuery.value)
  }

  return result
})

const virtualListItems = computed<VirtualListItem[]>(() => {
  return filteredSkills.value.map((skill, index) => ({
    id: `skill-${skill.name}-${index}`,
    data: skill
  }))
})

// 方法
const loadData = async () => {
  loading.value = true
  error.value = null
  try {
    skills.value = await fetchSkillsSecurity()
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载数据失败'
  } finally {
    loading.value = false
  }
}

const setFilter = (value: string) => {
  currentFilter.value = value
}

const resetFilters = () => {
  currentFilter.value = 'all'
  searchQuery.value = ''
}

// 生命周期
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.security-view {
  min-height: 100vh;
  background: var(--paper-bg);
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, var(--paper-card) 0%, var(--cinnabar-ghost) 100%);
  border-bottom: 1px solid var(--border-default);
  padding: var(--gap-6) 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-4);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-primary);
  margin: 0 0 var(--gap-2);
  letter-spacing: -0.5px;
}

.page-desc {
  font-size: var(--font-base);
  color: var(--ink-secondary);
  margin: 0;
  max-width: 600px;
  line-height: 1.6;
}

/* 页面内容 */
.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-5) var(--gap-4);
}

/* 加载和错误状态 */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--gap-6) 0;
  gap: var(--gap-4);
}

.error-text {
  font-size: var(--font-base);
  color: var(--ink-secondary);
  margin: 0;
}

/* 工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-4);
  margin: var(--gap-5) 0;
  padding: var(--gap-3) var(--gap-4);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
}

/* 技能列表 */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--gap-2);
}

.list-title {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
}

.list-count {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

/* 虚拟列表容器 */
.virtual-list-wrapper {
  height: 600px;
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  background: var(--paper-card);
}

.skill-item {
  padding: var(--gap-3);
  border-bottom: 1px solid var(--border-light);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--gap-6) 0;
  gap: var(--gap-3);
  color: var(--ink-tertiary);
}

.empty-state p {
  margin: 0;
  font-size: var(--font-base);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    justify-content: center;
  }

  .search-box {
    max-width: none;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-1);
  }
  
  .virtual-list-wrapper {
    height: 400px;
  }
}
</style>
