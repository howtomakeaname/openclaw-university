<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <Icon size="md" color="#fff">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </Icon>
        </div>
        <span class="logo-text">
          <span class="logo-main">Openclaw</span>
          <span class="logo-sub">University</span>
        </span>
      </router-link>

      <nav class="header-nav">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item" active-class="active">
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <Button kind="ghost" @click="handleSearch">
          <Icon size="md" color="var(--ink-secondary)">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </Icon>
        </Button>
        <Button kind="primary">开始学习</Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import Icon from '../ui/Icon.vue'

const router = useRouter()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/majors', label: '专业' },
  { path: '/explore', label: '探索' },
  { path: '/about', label: '关于' }
]

const handleSearch = () => {
  router.push('/majors')
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 247, 242, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-default);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-3) var(--gap-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-4);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: var(--cinnabar);
  border-radius: var(--corner-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-main {
  font-size: var(--font-base);
  font-weight: 700;
  color: var(--cinnabar);
}

.logo-sub {
  font-size: var(--font-xs);
  color: var(--ink-tertiary);
  letter-spacing: 0.5px;
}

.header-nav {
  display: flex;
  gap: var(--gap-1);
}

.nav-item {
  padding: var(--gap-2) var(--gap-3);
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  text-decoration: none;
  border-radius: var(--corner-md);
  transition: all var(--ease-quick);
}

.nav-item:hover {
  color: var(--cinnabar);
  background: var(--cinnabar-ghost);
}

.nav-item.active {
  color: var(--cinnabar);
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
}
</style>
