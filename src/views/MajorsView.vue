<template>
  <div class="majors-view">
    <header class="page-header">
      <h1 class="page-title">全部专业</h1>
      <!--
      <p class="page-desc">探索 {{ allMajors.length }} 个专业方向，开启你的职业成长之旅</p>
      -->
      <div class="search-bar">
        <Search
          v-model="searchQuery"
          placeholder="搜索专业、技能或关键词..."
        />
      </div>
      <div class="category-nav">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="category-btn"
          :class="{ active: selectedCategory === cat.key }"
          @click="selectedCategory = cat.key"
        >
          {{ cat.name }}
        </button>
      </div>
    </header>
    <div class="results-info">
      <span v-if="searchQuery">搜索 "{{ searchQuery }}" 的结果</span>
      <span v-else-if="selectedCategory">{{ categoryName }} 专业</span>
      <span v-else>全部专业</span>
      <span class="count">共 {{ filteredMajors.length }} 个</span>
    </div>
    <div v-if="loading" class="loading-state">
      <Loader />
      <p>加载中...</p>
    </div>
    <div v-else-if="filteredMajors.length === 0" class="empty-state">
      <Icon size="lg" color="var(--ink-muted)">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </Icon>
      <p>没有找到相关专业</p>
      <Button kind="outline" @click="clearFilters">清除筛选</Button>
    </div>
    <div v-else class="majors-grid">
      <OutlineMajorCard
        v-for="major in filteredMajors"
        :key="major.id"
        :major="major"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { OutlineMajor } from '@/types'
import { outlineService } from '@/services/outlineService'
import Search from '@/components/ui/Search.vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'
import OutlineMajorCard from '@/components/major/OutlineMajorCard.vue'

const loading = ref(false)
const allMajors = ref<OutlineMajor[]>([])
const searchQuery = ref('')
const selectedCategory = ref<string>('')

const CATEGORY_NAMES: Record<string, string> = {
  finance: '金融',
  business: '商业',
  hr: '人力资源',
  content: '内容创作',
  research: '学术研究',
  marketing: '市场营销',
  sales: '销售'
}

const categories = [
  { key: '', name: '全部' },
  { key: 'finance', name: '金融' },
  { key: 'business', name: '商业' },
  { key: 'hr', name: '人力资源' },
  { key: 'content', name: '内容创作' },
  { key: 'research', name: '学术研究' },
  { key: 'marketing', name: '市场营销' },
  { key: 'sales', name: '销售' }
]

const categoryName = computed(() => CATEGORY_NAMES[selectedCategory.value] || '')

const filteredMajors = computed(() => {
  let result = [...allMajors.value]
  if (selectedCategory.value) {
    result = result.filter(m => m.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }
  return result
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

const loadData = async () => {
  loading.value = true
  try {
    allMajors.value = await outlineService.getAllMajors()
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.majors-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-5) var(--gap-4);
}

.page-header {
  text-align: center;
  margin-bottom: var(--gap-5);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-primary);
  margin-bottom: var(--gap-2);
}

.page-desc {
  font-size: var(--font-base);
  color: var(--ink-tertiary);
  margin-bottom: var(--gap-4);
}

.search-bar {
  max-width: 500px;
  margin: 0 auto var(--gap-4);
}

.search-input {
  width: 100%;
}

.category-nav {
  display: flex;
  gap: var(--gap-2);
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-default);
  border-radius: var(--corner-full);
  background: var(--paper-card);
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  cursor: pointer;
  transition: all 200ms ease;
}

.category-btn:hover {
  border-color: var(--cinnabar-light);
  color: var(--cinnabar);
}

.category-btn.active {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
  color: #fff;
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-3) var(--gap-2);
  margin-bottom: var(--gap-3);
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  border-bottom: 1px solid var(--border-light);
}

.results-info .count {
  color: var(--ink-tertiary);
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--gap-8);
  gap: var(--gap-3);
}

.loading-state p,
.empty-state p {
  font-size: var(--font-base);
  color: var(--ink-tertiary);
}

.majors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap-4);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .majors-grid {
    grid-template-columns: 1fr;
  }
}
</style>