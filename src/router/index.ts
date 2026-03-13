import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MajorsView from '@/views/MajorsView.vue'
import MajorDetailView from '@/views/MajorDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/majors',
      name: 'majors',
      component: MajorsView,
      meta: { title: '全部专业' }
    },
    {
      path: '/major/:id',
      name: 'major-detail',
      component: MajorDetailView,
      meta: { title: '专业详情' },
      props: true
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/ExploreView.vue'),
      meta: { title: '探索' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: '关于我们' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = `${title} - Openclaw 技能大学`
  } else {
    document.title = 'Openclaw 技能大学 - 专为 AI 自动化代理设计的技能学习平台'
  }
  next()
})

export default router
