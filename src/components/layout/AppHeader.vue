<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" fill="url(#grad1)"/>
            <path d="M14 5C10 5 7 7 7 10C7 13 10 14.5 14 16.5C18 14.5 21 13 21 10C21 7 18 5 14 5Z" fill="#fff" fill-opacity="0.9"/>
            <path d="M9 8C8.5 7.5 8 7.5 7.5 8C7 8.5 7 9 7.5 9.5C8 10 8.5 10 9 9.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M14 7C13.5 6.5 13 6.5 12.5 7C12 7.5 12 8 12.5 8.5C13 9 13.5 9 14 8.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M19 8C18.5 7.5 18 7.5 17.5 8C17 8.5 17 9 17.5 9.5C18 10 18.5 10 19 9.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <defs>
              <linearGradient id="grad1" x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E64A19"/>
                <stop offset="0.5" stop-color="#D84315"/>
                <stop offset="1" stop-color="#BF360C"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">
          <span class="logo-main">Openclaw</span>
          <span class="logo-sub">University</span>
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="header-nav desktop-only">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item" active-class="active">
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <Button kind="ghost" @click="handleSearch" class="search-btn">
          <Icon size="md" color="var(--ink-secondary)">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </Icon>
        </Button>

        <!-- Mobile Menu Toggle -->
        <Button kind="ghost" @click="toggleMobileMenu" class="mobile-menu-btn mobile-only">
          <Icon size="md" color="var(--ink-secondary)">
            <path v-if="!isMobileMenuOpen" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            <path v-else d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </Icon>
        </Button>

        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="slide-down">
      <nav v-if="isMobileMenuOpen" class="mobile-nav mobile-only">
        <div class="mobile-nav-content">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item"
            active-class="active"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </router-link>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import Icon from '../ui/Icon.vue'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const navItems = [
  { path: '/', label: '探索' },
  { path: '/majors', label: '专业' },
  { path: '/upload', label: '上传' },
  { path: '/security', label: '安全' },
  { path: '/about', label: '关于' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleSearch = () => {
  router.push('/majors')
}

// Close mobile menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.app-header')) {
    isMobileMenuOpen.value = false
  }
}

// Close mobile menu on resize (when switching to desktop)
const handleResize = () => {
  if (window.innerWidth > 768) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
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
  flex-shrink: 0;
}

.logo-icon {
  width: 36px;
  height: 36px;
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
  white-space: nowrap;
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
  flex-shrink: 0;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
}

/* Slide transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    padding: var(--gap-2) var(--gap-3);
    gap: var(--gap-2);
  }

  .logo-text {
    display: none;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-nav {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(250, 247, 242, 0.98);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-default);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .mobile-nav-content {
    padding: var(--gap-3);
    display: flex;
    flex-direction: column;
    gap: var(--gap-1);
  }

  .mobile-nav-item {
    padding: var(--gap-3) var(--gap-4);
    font-size: var(--font-base);
    color: var(--ink-secondary);
    text-decoration: none;
    border-radius: var(--corner-md);
    transition: all var(--ease-quick);
    font-weight: 500;
  }

  .mobile-nav-item:hover {
    color: var(--cinnabar);
    background: var(--cinnabar-ghost);
  }

  .mobile-nav-item.active {
    color: var(--cinnabar);
    background: var(--cinnabar-ghost);
    font-weight: 600;
  }
}

/* Tablet adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .nav-item {
    padding: var(--gap-2) var(--gap-2);
    font-size: var(--font-sm);
  }
}

/* Small mobile adjustments */
@media (max-width: 480px) {
  .header-container {
    padding: var(--gap-2);
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
