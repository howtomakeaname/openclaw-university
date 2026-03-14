<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <div class="brand-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 学位帽顶部 -->
            <path d="M12 3L1 9L12 15L23 9L12 3Z" fill="#fff"/>
            <!-- 学位帽檐 -->
            <path d="M3 10.5V16.5C3 16.5 7 19 12 19C17 19 21 16.5 21 16.5V10.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <!-- 流苏 -->
            <path d="M21 10.5V14M21 16C21.5 16 22 15.5 22 15C22 14.5 21.5 14 21 14C20.5 14 20 14.5 20 15C20 15.5 20.5 16 21 16Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <!-- 龙虾钳子装饰 -->
            <path d="M8 15C7 16 6 16.5 5 16C4 15.5 4 14 5 13C6 12 7 12.5 8 13.5" stroke="#d15d4e" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M16 15C17 16 18 16.5 19 16C20 15.5 20 14 19 13C18 12 17 12.5 16 13.5" stroke="#d15d4e" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <div class="brand-info">
          <h3>Openclaw 技能大学</h3>
          <p>专为 Openclaw AI 自动化代理设计的技能学习平台</p>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h4>平台</h4>
          <router-link to="/majors">全部专业</router-link>
          <router-link to="/explore">探索</router-link>
          <router-link to="/about">关于我们</router-link>
        </div>
        <div class="link-group">
          <h4>资源</h4>
          <a href="#">学习指南</a>
          <a href="#">API文档</a>
          <a href="#">社区</a>
        </div>
        <div class="link-group">
          <h4>支持</h4>
          <a href="#">帮助中心</a>
          <a href="#">联系我们</a>
          <a href="#">反馈建议</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="bottom-container">
        <p class="copyright">© 2024 Openclaw University. All rights reserved.</p>
        <div class="social-links">
          <a href="#" aria-label="GitHub">
            <Icon size="sm" color="var(--ink-tertiary)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </Icon>
          </a>
          <a href="#" aria-label="Twitter">
            <Icon size="sm" color="var(--ink-tertiary)">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
            </Icon>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Icon from '../ui/Icon.vue'
</script>

<style scoped>
.app-footer {
  background: var(--paper-card);
  border-top: 1px solid var(--border-default);
  padding-top: var(--gap-6);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-4);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--gap-6);
}

.footer-brand {
  display: flex;
  gap: var(--gap-3);
}

.brand-logo {
  width: 44px;
  height: 44px;
  background: var(--cinnabar);
  border-radius: var(--corner-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-info h3 {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: 4px;
}

.brand-info p {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-4);
}

.link-group h4 {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-3);
}

.link-group a {
  display: block;
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  text-decoration: none;
  padding: 4px 0;
  transition: color var(--ease-quick);
}

.link-group a:hover {
  color: var(--cinnabar);
}

.footer-bottom {
  margin-top: var(--gap-6);
  padding: var(--gap-4) 0;
  border-top: 1px solid var(--border-light);
}

.bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: var(--font-sm);
  color: var(--ink-muted);
}

.social-links {
  display: flex;
  gap: var(--gap-3);
}

.social-links a {
  padding: var(--gap-2);
  border-radius: var(--corner-md);
  transition: background var(--ease-quick);
}

.social-links a:hover {
  background: var(--paper-hover);
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: var(--gap-5);
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .bottom-container {
    flex-direction: column;
    gap: var(--gap-3);
    text-align: center;
  }
}
</style>
