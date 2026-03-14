<template>
  <div class="ui-test-view">
    <div class="test-header">
      <h1>UI 组件测试</h1>
      <p>测试和展示所有 UI 组件的各种状态</p>
      <router-link to="/about" class="back-link">
        <Icon size="sm"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></Icon>
        返回关于页面
      </router-link>
    </div>

    <div class="test-content">
      <!-- Button 组件测试 -->
      <section class="test-section">
        <h2>Button 按钮</h2>
        <div class="test-group">
          <div class="test-row">
            <span class="test-label">Fill</span>
            <Button kind="fill" size="sm">Small</Button>
            <Button kind="fill" size="md">Medium</Button>
            <Button kind="fill" size="lg">Large</Button>
          </div>
          <div class="test-row">
            <span class="test-label">Primary</span>
            <Button kind="primary" size="sm">Small</Button>
            <Button kind="primary" size="md">Medium</Button>
            <Button kind="primary" size="lg">Large</Button>
          </div>
          <div class="test-row">
            <span class="test-label">Quiet</span>
            <Button kind="quiet" size="sm">Small</Button>
            <Button kind="quiet" size="md">Medium</Button>
            <Button kind="quiet" size="lg">Large</Button>
          </div>
          <div class="test-row">
            <span class="test-label">Outline</span>
            <Button kind="outline" size="sm">Small</Button>
            <Button kind="outline" size="md">Medium</Button>
            <Button kind="outline" size="lg">Large</Button>
          </div>
          <div class="test-row">
            <span class="test-label">Ghost</span>
            <Button kind="ghost" size="sm">Small</Button>
            <Button kind="ghost" size="md">Medium</Button>
            <Button kind="ghost" size="lg">Large</Button>
          </div>
          <div class="test-row">
            <span class="test-label">Disabled</span>
            <Button kind="primary" disabled>Disabled</Button>
            <Button kind="outline" disabled>Disabled</Button>
            <Button kind="ghost" disabled>Disabled</Button>
          </div>
          <div class="test-row">
            <span class="test-label">Loading</span>
            <Button kind="primary" loading>Loading</Button>
            <Button kind="outline" loading>Loading</Button>
          </div>
        </div>
      </section>

      <!-- Input 组件测试 -->
      <section class="test-section">
        <h2>Input 输入框</h2>
        <div class="test-group">
          <div class="test-row input-row">
            <Input v-model="inputValue" placeholder="普通输入框" />
            <Input v-model="inputValue" placeholder="带标签" label="用户名" />
          </div>
          <div class="test-row input-row">
            <Input v-model="inputValue" placeholder="错误状态" error="请输入有效内容" />
            <Input v-model="inputValue" placeholder="禁用状态" disabled />
          </div>
          <div class="test-row input-row">
            <Input v-model="inputValue" placeholder="带前缀">
              <template #prefix>
                <Icon size="sm"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></Icon>
              </template>
            </Input>
            <Input v-model="inputValue" placeholder="带后缀">
              <template #suffix>
                <Icon size="sm"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></Icon>
              </template>
            </Input>
          </div>
        </div>
      </section>

      <!-- Select 组件测试 -->
      <section class="test-section">
        <h2>Select 选择器</h2>
        <div class="test-group">
          <div class="test-row input-row">
            <Select v-model="selectValue" :options="selectOptions" placeholder="请选择" />
            <Select v-model="selectValue" :options="selectOptions" placeholder="禁用状态" disabled />
          </div>
        </div>
      </section>

      <!-- Search 组件测试 -->
      <section class="test-section">
        <h2>Search 搜索框</h2>
        <div class="test-group">
          <div class="test-row input-row">
            <Search v-model="searchValue" placeholder="搜索..." />
            <Search v-model="searchValue" placeholder="禁用状态" disabled />
          </div>
          <div class="test-row input-row">
            <Search v-model="searchValue" placeholder="带搜索建议" :suggestions="searchSuggestions" @search="handleSearch" />
          </div>
        </div>
      </section>

      <!-- Icon 组件测试 -->
      <section class="test-section">
        <h2>Icon 图标</h2>
        <div class="test-group">
          <div class="test-row icon-row">
            <Icon size="xs" color="var(--cinnabar)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></Icon>
            <Icon size="sm" color="var(--cinnabar)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></Icon>
            <Icon size="md" color="var(--cinnabar)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></Icon>
            <Icon size="lg" color="var(--cinnabar)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></Icon>
            <Icon size="xl" color="var(--cinnabar)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></Icon>
          </div>
        </div>
      </section>

      <!-- ListGroup & ListItem 组件测试 -->
      <section class="test-section">
        <h2>List 列表</h2>
        <div class="test-group">
          <div class="test-row list-row">
            <ListGroup>
              <ListItem title="列表项 1" subtitle="这是描述文字" />
              <ListItem title="列表项 2" subtitle="这是描述文字" />
              <ListItem title="列表项 3" subtitle="这是描述文字" />
            </ListGroup>
          </div>
          <div class="test-row list-row">
            <ListGroup>
              <ListItem title="带图标的列表项">
                <template #prefix>
                  <Icon size="md" color="var(--cinnabar)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></Icon>
                </template>
              </ListItem>
              <ListItem title="带操作的列表项">
                <template #suffix>
                  <Button kind="ghost" size="sm">操作</Button>
                </template>
              </ListItem>
            </ListGroup>
          </div>
        </div>
      </section>

      <!-- HorizontalScrollList 组件测试 -->
      <section class="test-section">
        <h2>HorizontalScrollList 横向滚动</h2>
        <div class="test-group">
          <HorizontalScrollList>
            <div v-for="i in 10" :key="i" class="scroll-item">
              Item {{ i }}
            </div>
          </HorizontalScrollList>
        </div>
      </section>

      <!-- Timeline 组件测试 -->
      <section class="test-section">
        <h2>Timeline 时间线</h2>
        <div class="test-group">
          <Timeline :items="timelineItems" />
        </div>
      </section>

      <!-- Toast 组件测试 -->
      <section class="test-section">
        <h2>Toast 提示</h2>
        <div class="test-group">
          <div class="test-row">
            <Button kind="outline" @click="showToast('success')">成功提示</Button>
            <Button kind="outline" @click="showToast('error')">错误提示</Button>
            <Button kind="outline" @click="showToast('warning')">警告提示</Button>
            <Button kind="outline" @click="showToast('info')">信息提示</Button>
            <Button kind="outline" @click="showToast('loading')">加载提示</Button>
          </div>
        </div>
      </section>

      <!-- Dialog 组件测试 -->
      <section class="test-section">
        <h2>Dialog 对话框</h2>
        <div class="test-group">
          <div class="test-row">
            <Button kind="outline" @click="showDialog = true">打开对话框</Button>
          </div>
        </div>
        <Dialog v-model="showDialog" title="测试对话框">
          <p>这是一个测试对话框的内容。</p>
          <template #footer>
            <Button kind="ghost" @click="showDialog = false">取消</Button>
            <Button kind="primary" @click="showDialog = false">确认</Button>
          </template>
        </Dialog>
      </section>

      <!-- Loader 组件测试 -->
      <section class="test-section">
        <h2>Loader 加载</h2>
        <div class="test-group">
          <div class="test-row icon-row">
            <Loader size="sm" />
            <Loader size="md" />
            <Loader size="lg" />
            <Loader size="sm" color="var(--cinnabar)" />
            <Loader size="md" color="var(--success-main)" />
          </div>
        </div>
      </section>

      <!-- MajorCard 组件测试 -->
      <section class="test-section">
        <h2>MajorCard 专业卡片</h2>
        <div class="test-group">
          <div class="test-row card-row">
            <MajorCard :major="mockMajor" />
          </div>
        </div>
      </section>

      <!-- SkillCard 组件测试 -->
      <section class="test-section">
        <h2>SkillCard 技能卡片</h2>
        <div class="test-group">
          <div class="test-row card-row">
            <SkillCard 
              :skill="mockSkill" 
              :is-completed="false" 
              :is-locked="false"
              :order-number="1"
              @click="console.log('click')"
              @toggle-complete="console.log('toggle')"
            />
          </div>
          <div class="test-row card-row">
            <SkillCard 
              :skill="mockSkill" 
              :is-completed="true" 
              :is-locked="false"
              :order-number="2"
            />
          </div>
          <div class="test-row card-row">
            <SkillCard 
              :skill="mockSkill" 
              :is-completed="false" 
              :is-locked="true"
              :order-number="3"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- 全局 Toast 组件 -->
    <Toast position="top-right" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Search from '@/components/ui/Search.vue'
import ListGroup from '@/components/ui/ListGroup.vue'
import ListItem from '@/components/ui/ListItem.vue'
import HorizontalScrollList from '@/components/ui/HorizontalScrollList.vue'
import Timeline from '@/components/ui/Timeline.vue'
import Toast from '@/components/ui/Toast.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Loader from '@/components/ui/Loader.vue'
import MajorCard from '@/components/major/MajorCard.vue'
import SkillCard from '@/components/major/SkillCard.vue'
import { useToast } from '@/composables/useToast'
import type { Major, Skill } from '@/types'
import type { TimelineItem } from '@/components/ui/Timeline.vue'

const inputValue = ref('')
const selectValue = ref('')
const searchValue = ref('')
const showDialog = ref(false)

const selectOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
]

const searchSuggestions = ['Vue', 'React', 'Angular', 'Svelte', 'Solid']

const handleSearch = (value: string) => {
  console.log('搜索:', value)
}

const { success, error, warning, info, loading } = useToast()

const showToast = (type: string) => {
  switch (type) {
    case 'success':
      success('操作成功完成！')
      break
    case 'error':
      error('操作失败，请重试')
      break
    case 'warning':
      warning('请注意这个警告信息')
      break
    case 'info':
      info('这是一条提示信息')
      break
    case 'loading':
      loading('正在加载中...')
      setTimeout(() => {
        success('加载完成！')
      }, 2000)
      break
  }
}

const timelineItems: TimelineItem[] = [
  { time: '2024-01', title: '项目启动', description: '开始构建项目', type: 'success' },
  { time: '2024-02', title: '开发阶段', description: '核心功能开发', type: 'primary', active: true },
  { time: '2024-03', title: '测试阶段', description: '功能测试与优化' },
  { time: '2024-04', title: '正式上线', description: '项目正式发布' }
]

const mockMajor: Major = {
  id: 'test-major',
  code: 'test',
  name: '测试专业',
  category: 'engineering',
  description: '这是一个用于测试的专业卡片组件，展示专业信息、技能数量和学习资源。',
  cover: '',
  difficulty: 'beginner',
  duration: '10小时',
  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  color: 'var(--cinnabar)',
  tags: ['测试', '示例', '开发'],
  skillCount: 12,
  materialsCount: 8,
  skills: [],
  materials: [],
  enrollment: 100,
  rating: 4.5,
  createdAt: '2024-01-01',
  updatedAt: '2024-03-14'
}

const mockSkill: Skill = {
  id: 'test-skill',
  name: '测试技能',
  description: '这是一个用于测试的技能卡片组件，展示技能信息和学习状态。',
  level: 'intermediate',
  estimatedTime: '2小时',
  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
  order: 1,
  children: []
}
</script>

<style scoped>
.ui-test-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-6) var(--gap-4);
}

.test-header {
  text-align: center;
  margin-bottom: var(--gap-6);
  padding-bottom: var(--gap-6);
  border-bottom: 1px solid var(--border-light);
}

.test-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-primary);
  margin-bottom: var(--gap-2);
}

.test-header p {
  font-size: var(--font-lg);
  color: var(--ink-tertiary);
  margin-bottom: var(--gap-3);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-1);
  color: var(--cinnabar);
  text-decoration: none;
  font-size: var(--font-sm);
  transition: all var(--ease-quick);
}

.back-link:hover {
  color: var(--cinnabar-dark);
}

.test-content {
  display: flex;
  flex-direction: column;
  gap: var(--gap-6);
}

.test-section {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-xl);
  padding: var(--gap-5);
}

.test-section h2 {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-4);
  padding-bottom: var(--gap-3);
  border-bottom: 1px solid var(--border-light);
}

.test-group {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
}

.test-row {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  flex-wrap: wrap;
}

.test-row.input-row {
  align-items: flex-start;
}

.test-row.input-row > * {
  flex: 1;
  min-width: 200px;
}

.test-row.list-row {
  flex-direction: column;
  align-items: stretch;
}

.test-row.list-row > * {
  width: 100%;
}

.test-row.card-row {
  flex-direction: column;
  align-items: stretch;
}

.test-row.card-row > * {
  max-width: 400px;
}

.test-label {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  min-width: 80px;
}

.test-row.icon-row {
  gap: var(--gap-4);
}

.scroll-item {
  min-width: 120px;
  height: 80px;
  background: var(--cinnabar-ghost);
  border-radius: var(--corner-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-sm);
  color: var(--cinnabar);
  font-weight: 500;
}

@media (max-width: 768px) {
  .test-header h1 {
    font-size: 24px;
  }

  .test-section {
    padding: var(--gap-4);
  }

  .test-row {
    flex-direction: column;
    align-items: stretch;
  }

  .test-label {
    min-width: auto;
  }
}
</style>
