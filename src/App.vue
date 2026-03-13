<template>
  <div class="app">
    <header class="header">
      <h1>UI 组件库</h1>
      <p class="desc">简洁的界面组件系统</p>
    </header>

    <section class="section">
      <h2 class="section-title">按钮</h2>
      <div class="button-row">
        <Button kind="fill">Fill</Button>
        <Button kind="quiet">Quiet</Button>
        <Button kind="outline">Outline</Button>
        <Button kind="ghost">Ghost</Button>
        <Button kind="danger">Danger</Button>
        <Button kind="fill" disabled>Disabled</Button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">图标</h2>
      <div class="icon-row">
        <Icon size="sm">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </Icon>
        <Icon size="md">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </Icon>
        <Icon size="lg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </Icon>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">加载器</h2>
      <div class="loader-row">
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">列表</h2>
      <ListGroup>
        <ListItem clickable>
          <template #before>
            <Icon size="md"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></Icon>
          </template>
          <template #title>列表项标题</template>
          <template #after>
            <Icon size="sm"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></Icon>
          </template>
        </ListItem>
        <ListItem clickable>
          <template #before>
            <div class="avatar">A</div>
          </template>
          <template #title>带描述的列表项</template>
          <template #text>这是辅助说明文字</template>
          <template #after>
            <span class="badge">2</span>
          </template>
        </ListItem>
        <ListItem>
          <template #before>
            <div class="avatar img">
              <img src="https://picsum.photos/id/64/40/40" alt="">
            </div>
          </template>
          <template #title>图片前缀</template>
          <template #text>使用图片作为前缀</template>
        </ListItem>
      </ListGroup>
    </section>

    <section class="section">
      <h2 class="section-title">横向滚动</h2>
      <HorizontalScrollList>
        <div v-for="i in 5" :key="i" class="card">
          <div class="card-img">
            <img :src="`https://picsum.photos/id/${i + 20}/200/120`" alt="">
          </div>
          <div class="card-body">
            <div class="card-title">Card {{ i }}</div>
            <div class="card-desc">Description</div>
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
.app {
  max-width: 680px;
  margin: 0 auto;
  padding: var(--gap-6) var(--gap-4);
}

.header {
  margin-bottom: var(--gap-6);
}

.header h1 {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: var(--gap-1);
}

.desc {
  color: var(--text-subtle);
  font-size: var(--font-sm);
}

.section {
  margin-bottom: var(--gap-6);
}

.section-title {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--gap-3);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-2);
}

.icon-row {
  display: flex;
  align-items: center;
  gap: var(--gap-4);
}

.loader-row {
  display: flex;
  align-items: center;
  gap: var(--gap-4);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--corner-full);
  background: var(--bg-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--text-main);
}

.avatar.img {
  overflow: hidden;
  padding: 0;
}

.avatar.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: var(--corner-full);
  background: var(--bg-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-xs);
  font-weight: 500;
  color: var(--text-subtle);
}

.card {
  background: var(--bg-card);
  border-radius: var(--corner-md);
  border: 1px solid var(--line-default);
  overflow: hidden;
}

.card-img {
  height: 100px;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: var(--gap-3);
}

.card-title {
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--text-main);
  margin-bottom: 2px;
}

.card-desc {
  font-size: var(--font-xs);
  color: var(--text-subtle);
}
</style>
