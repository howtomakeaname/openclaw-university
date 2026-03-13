<template>
  <div class="majors-view">
    <!-- 页面头部 -->
    <header class="page-header">
      <h1 class="page-title">全部专业</h1>
      <p class="page-desc">探索 {{ allMajors.length }} 个专业方向，开启你的职业成长之旅</p>

      <!-- 搜索栏 -->
      <div class="search-bar">
        <Input
          v-model="searchQuery"
          placeholder="搜索专业、技能或关键词..."
          class="search-input"
        >
          <template #prefix>
            <Icon size="md" color="var(--ink-tertiary)">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </Icon>
          </template>
        </Input>
      </div>

      <!-- 分类筛选 -->
      <CategoryNav v-model="selectedCategory" />
    </header>

    <!-- 结果统计 -->
    <div class="results-info">
      <span v-if="searchQuery">搜索 "{{ searchQuery }}" 的结果</span>
      <span v-else-if="selectedCategory">{{ categoryName }} 专业</span>
      <span v-else>全部专业</span>
      <span class="count">共 {{ filteredMajors.length }} 个</span>
    </div>

    <!-- 瀑布流布局 -->
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

    <div v-else class="majors-waterfall">
      <MajorCard
        v-for="major in filteredMajors"
        :key="major.id"
        :major="major"
        class="waterfall-item"
      />
    </div>

    <!-- 加载更多 -->
    <div v-if="hasMore" class="load-more">
      <Button kind="outline" @click="loadMore">
        加载更多
        <Icon size="sm" color="var(--cinnabar)">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </Icon>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { debounce } from '@/utils/debounce'
import type { Major, MajorCategory } from '@/types'
import { CATEGORY_MAP } from '@/constants/categories'
import { majorService } from '@/services/majorService'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'
import MajorCard from '@/components/major/MajorCard.vue'
import CategoryNav from '@/components/major/CategoryNav.vue'

const loading = ref(false)
const allMajors = ref<Major[]>([])
const searchQuery = ref('')
const selectedCategory = ref<MajorCategory | ''>('')
const pageSize = 12
const currentPage = ref(1)

const categoryName = computed(() => {
  if (!selectedCategory.value) return ''
  return CATEGORY_MAP[selectedCategory.value]?.name || ''
})

const filteredMajors = computed(() => {
  let result = [...allMajors.value]

  // 分类筛选
  if (selectedCategory.value) {
    result = result.filter(m => m.category === selectedCategory.value)
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }

  // 分页
  return result.slice(0, currentPage.value * pageSize)
})

const hasMore = computed(() => {
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

  return result.length > currentPage.value * pageSize
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

const loadMore = () => {
  currentPage.value++
}

const debouncedSearch = debounce(async (query: string) => {
  if (query.trim()) {
    loading.value = true
    try {
      const results = await majorService.searchMajors(query)
      allMajors.value = results
    } finally {
      loading.value = false
    }
  } else {
    await loadAllMajors()
  }
}, 300)

const loadAllMajors = async () => {
  loading.value = true
  try {
    allMajors.value = await majorService.getAllMajors()
  } finally {
    loading.value = false
  }
}

watch(searchQuery, (newQuery) => {
  currentPage.value = 1
  debouncedSearch(newQuery)
})

watch(selectedCategory, async () => {
  currentPage.value = 1
  if (selectedCategory.value) {
    loading.value = true
    try {
      allMajors.value = await majorService.getMajorsByCategory(selectedCategory.value)
    } finally {
      loading.value = false
    }
  } else {
    await loadAllMajors()
  }
})

onMounted(loadAllMajors)
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

.majors-waterfall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap-4);
}

.waterfall-item {
  break-inside: avoid;
  margin-bottom: 0;
}

.load-more {
  display: flex;
  justify-content: center;
  padding: var(--gap-5) 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .majors-waterfall {
    grid-template-columns: 1fr;
  }
}
</style>
