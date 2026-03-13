<template>
  <div class="container">
    <header class="header">
      <h1>UI 组件库</h1>
      <p class="subtitle">简洁统一的界面组件系统</p>
    </header>

    <section class="section">
      <h2 class="section-title">按钮组件</h2>
      <div class="button-grid">
        <Button variant="primary">主要按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="outline">边框按钮</Button>
        <Button variant="ghost">幽灵按钮</Button>
        <Button variant="danger">危险按钮</Button>
        <Button variant="primary" disabled>禁用按钮</Button>
        <Button variant="primary" size="sm">小型按钮</Button>
        <Button variant="primary" size="lg">大型按钮</Button>
        <Button variant="primary" full-width>全宽按钮</Button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">图标组件</h2>
      <div class="icon-grid">
        <Icon size="xs">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </Icon>
        <Icon size="sm">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </Icon>
        <Icon size="md">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </Icon>
        <Icon size="lg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </Icon>
        <Icon size="xl" color="var(--color-accent)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </Icon>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">加载器组件</h2>
      <div class="loader-grid">
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
        <Loader size="lg" color="var(--color-success)" />
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">列表组件</h2>
      <ListGroup>
        <ListItem clickable>
          <template #prefix>
            <Icon size="sm">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </Icon>
          </template>
          <template #title>单行列表项</template>
          <template #suffix>
            <Icon size="sm">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </Icon>
          </template>
        </ListItem>
        <ListItem clickable>
          <template #prefix>
            <div class="avatar">A</div>
          </template>
          <template #title>多行列表项</template>
          <template #subtitle>这是列表项的辅助说明文字</template>
          <template #suffix>
            <span class="badge">新</span>
          </template>
        </ListItem>
        <ListItem>
          <template #prefix>
            <div class="avatar image">
              <img src="https://picsum.photos/id/64/40/40" alt="头像" />
            </div>
          </template>
          <template #title>带图片的列表项</template>
          <template #subtitle>使用外部图片作为前缀</template>
        </ListItem>
      </ListGroup>
    </section>

    <section class="section">
      <h2 class="section-title">横向滚动列表</h2>
      <HorizontalScrollList>
        <div v-for="i in 6" :key="i" class="card">
          <div class="card-image">
            <img :src="`https://picsum.photos/id/${i + 20}/300/200`" alt="卡片图片" />
          </div>
          <div class="card-content">
            <h3 class="card-title">卡片 {{ i }}</h3>
            <p class="card-desc">卡片内容描述</p>
          </div>
        </div>
      </HorizontalScrollList>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from './components/ui/Button.vue'
import Icon from './components/ui/Icon.vue'
import Loader from './components/ui/Loader.vue'
import ListItem from './components/ui/ListItem.vue'
import ListGroup from './components/ui/ListGroup.vue'
import HorizontalScrollList from './components/ui/HorizontalScrollList.vue'
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-md);
}

.header {
  margin-bottom: var(--spacing-2xl);
  text-align: center;
}

.header h1 {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  color: var(--color-secondary);
  font-size: var(--text-base);
}

.section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.icon-grid {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.loader-grid {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--text-sm);
}

.avatar.image {
  overflow: hidden;
  padding: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  background-color: var(--color-accent);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

.card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: var(--spacing-md);
}

.card-title {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.card-desc {
  font-size: var(--text-xs);
  color: var(--color-secondary);
}
</style>