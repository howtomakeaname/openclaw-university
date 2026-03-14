<template>
  <div class="skill-tree">
    <!-- 根技能列表 -->
    <div v-for="skill in rootSkills" :key="skill.id" class="tree-root">
      <SkillNode
        :skill="skill"
        :level="0"
        :expanded-ids="expandedIds"
        :completed-ids="completedIds"
        @toggle="toggleNode"
        @select="selectNode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Skill } from '@/types'
import SkillNode from './SkillNode.vue'

interface Props {
  skills: Skill[]
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: true
})

const emit = defineEmits<{
  select: [skill: Skill]
}>()

// 将扁平的技能列表转换为树形结构
const skillTree = computed(() => {
  const skillMap = new Map<string, Skill & { children: Skill[] }>()
  
  // 初始化所有技能
  props.skills.forEach(skill => {
    skillMap.set(skill.id, { ...skill, children: [] })
  })
  
  const roots: Skill[] = []
  
  // 构建父子关系
  props.skills.forEach(skill => {
    const node = skillMap.get(skill.id)!
    if (skill.parentId && skillMap.has(skill.parentId)) {
      const parent = skillMap.get(skill.parentId)!
      parent.children = parent.children || []
      parent.children.push(node)
    } else {
      roots.push(node)
    }
  })
  
  // 按 order 排序
  const sortByOrder = (items: Skill[]) => {
    items.sort((a, b) => a.order - b.order)
    items.forEach(item => {
      if (item.children?.length) {
        sortByOrder(item.children)
      }
    })
  }
  sortByOrder(roots)
  
  return roots
})

const rootSkills = computed(() => skillTree.value)

// 展开/折叠状态
const expandedIds = ref<Set<string>>(new Set())
// 完成状态
const completedIds = ref<Set<string>>(new Set())

// 初始化展开状态
if (props.defaultExpanded) {
  props.skills.forEach(skill => {
    expandedIds.value.add(skill.id)
  })
}

// 切换节点展开/折叠
const toggleNode = (id: string) => {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
}

// 选择节点
const selectNode = (skill: Skill) => {
  emit('select', skill)
}

// 暴露方法给父组件
defineExpose({
  expandAll: () => {
    props.skills.forEach(skill => expandedIds.value.add(skill.id))
  },
  collapseAll: () => {
    expandedIds.value.clear()
  },
  toggleComplete: (id: string) => {
    if (completedIds.value.has(id)) {
      completedIds.value.delete(id)
    } else {
      completedIds.value.add(id)
    }
  }
})
</script>

<style scoped>
.skill-tree {
  padding: var(--gap-3);
}

.tree-root {
  margin-bottom: var(--gap-4);
}

.tree-root:last-child {
  margin-bottom: 0;
}
</style>
