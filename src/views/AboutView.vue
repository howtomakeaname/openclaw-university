<template>
  <div class="about-view">
    <div class="about-header">
      <h1>关于 Openclaw 技能大学</h1>
      <p>赋能 AI 自动化代理，掌握智能任务执行能力</p>
    </div>

    <div class="about-content">
      <section class="about-section">
        <h2>我们的使命</h2>
        <p>
          Openclaw 技能大学是一个专为 Openclaw AI 自动化代理设计的技能学习平台。
          我们相信每个 AI 代理都可以通过系统化的技能培养，成为高效的智能助手，
          帮助用户自动化日常任务，提升工作效率。
        </p>
      </section>

      <section class="about-section">
        <h2>什么是 Openclaw？</h2>
        <p>
          <strong>Openclaw</strong> 是一款开源、本地优先的 AI 自动化代理，
          能够在用户电脑或云端自主执行任务。它不仅能对话，还能直接操作系统、浏览器和应用程序，
          实现从"对话式建议"到"自动化执行"的跨越。
        </p>
      </section>

      <section class="about-section">
        <h2>平台特色</h2>
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">
              <Icon size="lg" color="var(--cinnabar)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </Icon>
            </div>
            <h3>系统化技能培养</h3>
            <p>从系统操作到浏览器自动化，从编程辅助到任务规划</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <Icon size="lg" color="var(--cinnabar)">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </Icon>
            </div>
            <h3>权威技能资源</h3>
            <p>精选 Skills 仓库、API 文档、最佳实践指南</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <Icon size="lg" color="var(--cinnabar)">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </Icon>
            </div>
            <h3>Skill 扩展生态</h3>
            <p>学习如何开发和扩展 Openclaw 技能插件</p>
          </div>
        </div>
      </section>

      <section class="about-section team-section">
        <h2>核心概念</h2>
        <div class="concept-cards">
          <div class="concept-card">
            <h4>专业 Major</h4>
            <p>以能力维度/使用场景为粒度的教程集合。每个专业包含完整的技能路径和配套资源，帮助 Openclaw 系统掌握一个领域的能力。</p>
          </div>
          <div class="concept-card">
            <h4>技能 Skill</h4>
            <p>Openclaw 可执行的具体操作能力，如文件管理、浏览器控制、API 调用等，按学习顺序排列。</p>
          </div>
          <div class="concept-card">
            <h4>资源 Material</h4>
            <p>Skills 仓库、API 文档、配置指南等学习材料，以官方资源为主，确保内容的权威性和时效性。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
</script>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--gap-6) var(--gap-4);
}

.about-header {
  text-align: center;
  margin-bottom: var(--gap-6);
  padding-bottom: var(--gap-6);
  border-bottom: 1px solid var(--border-light);
}

.about-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-primary);
  margin-bottom: var(--gap-2);
}

.about-header p {
  font-size: var(--font-lg);
  color: var(--ink-tertiary);
}

.about-section {
  margin-bottom: var(--gap-6);
}

.about-section h2 {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-3);
}

.about-section p {
  font-size: var(--font-base);
  color: var(--ink-secondary);
  line-height: 1.8;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-4);
  margin-top: var(--gap-4);
}

.feature-item {
  text-align: center;
  padding: var(--gap-4);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: var(--cinnabar-ghost);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--gap-3);
}

.feature-item h3 {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-2);
}

.feature-item p {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

.concept-cards {
  display: grid;
  gap: var(--gap-3);
}

.concept-card {
  padding: var(--gap-4);
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
}

.concept-card h4 {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--cinnabar);
  margin-bottom: var(--gap-2);
}

.concept-card p {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .feature-list {
    grid-template-columns: 1fr;
  }

  .about-header h1 {
    font-size: 24px;
  }
}
</style>
