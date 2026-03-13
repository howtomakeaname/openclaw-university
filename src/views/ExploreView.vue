<template>
  <div class="explore-view">
    <div class="explore-header">
      <h1>探索发现</h1>
      <p>发现更多学习路径和职业发展机会</p>
    </div>

    <div class="explore-content">
      <div class="coming-soon">
        <Icon size="xl" color="var(--cinnabar)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </Icon>
        <h2>功能开发中</h2>
        <p>探索功能即将上线，敬请期待</p>
        <Button kind="primary" @click="router.push('/majors')">
          先去看看专业
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'

const router = useRouter()
</script>

<style scoped>
.explore-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-6) var(--gap-4);
}

.explore-header {
  text-align: center;
  margin-bottom: var(--gap-6);
}

.explore-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-primary);
  margin-bottom: var(--gap-2);
}

.explore-header p {
  font-size: var(--font-base);
  color: var(--ink-tertiary);
}

.explore-content {
  display: flex;
  justify-content: center;
}

.coming-soon {
  text-align: center;
  padding: var(--gap-8);
}

.coming-soon h2 {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--ink-primary);
  margin: var(--gap-4) 0 var(--gap-2);
}

.coming-soon p {
  font-size: var(--font-base);
  color: var(--ink-tertiary);
  margin-bottom: var(--gap-4);
}
</style>
