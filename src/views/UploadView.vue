<template>
  <div class="upload-view">

    <section class="upload-hero">
    </section>

    <div class="upload-container">
      <div class="upload-card">
        <div class="card-header">
          <Icon size="lg" color="var(--cinnabar)">
            <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
          </Icon>
          <div class="header-info">
            <h2>文件上传</h2>
            <p>支持拖拽或点击选择文件</p>
          </div>
        </div>

        <!-- iframe 上传区域 -->
        <div class="upload-area">
          <div class="iframe-wrapper">
            <iframe
              ref="uploadFrame"
              :src="uploadUrl"
              frameborder="0"
              allow="clipboard-write"
              @load="onIframeLoad"
              @error="onIframeError"
            ></iframe>
            <!-- 加载状态 -->
            <div v-if="iframeLoading" class="iframe-loading">
              <Loader />
              <p>正在加载上传组件...</p>
            </div>
          </div>

          <!-- 加载失败提示 -->
          <div v-if="iframeError" class="iframe-error">
            <Icon size="lg" color="var(--cinnabar)">
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </Icon>
            <p>上传组件加载失败</p>
            <Button kind="primary" @click="openUploadPage">
              <Icon size="sm" color="#fff">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </Icon>
              前往上传页面
            </Button>
          </div>
        </div>

        <!-- 备用跳转按钮 -->
        <div class="upload-actions">
          <p class="action-hint">如果上方上传区域无法使用，您可以：</p>
          <Button kind="outline" size="lg" @click="openUploadPage">
            <Icon size="sm" color="var(--cinnabar)">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </Icon>
            在新窗口打开上传页面
          </Button>
        </div>
      </div>

      <!-- 文件要求说明 -->
      <div class="upload-tips">
        <div class="tips-card">
          <h3>
            <Icon size="base" color="var(--cinnabar)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </Icon>
            文件要求
          </h3>
          <ul>
            <li>需要上传两个 Markdown 文件</li>
            <li><strong>【我是Agent】</strong>技能分类大纲（供 AI 智能体使用）</li>
            <li><strong>【我是Human】</strong>技能培养大纲（供人类用户学习）</li>
            <li>文件格式：仅支持 .md 格式</li>
            <li>文件大小：单个文件不超过 5MB</li>
          </ul>
        </div>

        <div class="tips-card">
          <h3>
            <Icon size="base" color="var(--cinnabar)">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </Icon>
            参考模板
          </h3>
          <p>下载参考模板了解文件格式：</p>
          <div class="template-links">
            <Button kind="ghost" size="sm" @click="downloadAgentTemplate">
              <Icon size="sm" color="var(--cinnabar)">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </Icon>
              Agent 大纲模板
            </Button>
            <Button kind="ghost" size="sm" @click="downloadHumanTemplate">
              <Icon size="sm" color="var(--cinnabar)">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </Icon>
              Human 大纲模板
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Loader from '@/components/ui/Loader.vue'

const uploadUrl = import.meta.env.VITE_FRAME_UPLOAD_URL || ''
const uploadFrame = ref<HTMLIFrameElement | null>(null)
const iframeLoading = ref(true)
const iframeError = ref(false)
let loadTimeout: number | null = null

const onIframeLoad = () => {
  if (loadTimeout) {
    clearTimeout(loadTimeout)
  }
  iframeLoading.value = false
}

const onIframeError = () => {
  iframeLoading.value = false
  iframeError.value = true
}

const openUploadPage = () => {
  window.open(uploadUrl, '_blank', 'noopener,noreferrer')
}

const downloadAgentTemplate = () => {
  const templateUrl = '/data/install/内容创作者_技能培养大纲.md'
  const link = document.createElement('a')
  link.href = templateUrl
  link.download = 'Agent_技能分类大纲模板.md'
  link.click()
}

const downloadHumanTemplate = () => {
  const templateUrl = '/data/outline/内容创作者_技能分类大纲_v1_outline.md'
  const link = document.createElement('a')
  link.href = templateUrl
  link.download = 'Human_技能培养大纲模板.md'
  link.click()
}

onMounted(() => {
  // 设置超时，如果 10 秒内没有加载完成，显示错误
  loadTimeout = window.setTimeout(() => {
    if (iframeLoading.value) {
      iframeLoading.value = false
      iframeError.value = true
    }
  }, 10000)
})
</script>

<style scoped>
.upload-view {
  padding-bottom: var(--gap-6);
}

.upload-hero {
  background: var(--paper-card);
  border-bottom: 1px solid var(--border-default);
  padding: var(--gap-8) var(--gap-4);
  margin-bottom: var(--gap-6);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--ink-primary);
  margin: var(--gap-4) 0 var(--gap-3);
}

.hero-desc {
  font-size: var(--font-base);
  color: var(--ink-secondary);
  line-height: 1.7;
}

.hero-desc strong {
  color: var(--cinnabar);
}

.upload-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-4);
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--gap-5);
}

.upload-card {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  padding: var(--gap-5);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--gap-3);
  margin-bottom: var(--gap-5);
  padding-bottom: var(--gap-4);
  border-bottom: 1px solid var(--border-light);
}

.header-info h2 {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--ink-primary);
  margin: 0;
}

.header-info p {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  margin: var(--gap-1) 0 0;
}

.upload-area {
  position: relative;
}

.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 560px;
  border: 2px dashed var(--border-default);
  border-radius: var(--corner-lg);
  overflow: hidden;
  background: var(--paper-bg);
}

.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
}

.iframe-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--paper-bg);
  gap: var(--gap-3);
}

.iframe-loading p {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
}

.iframe-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--gap-6);
  gap: var(--gap-3);
  text-align: center;
}

.iframe-error p {
  font-size: var(--font-base);
  color: var(--ink-secondary);
}

.upload-actions {
  margin-top: var(--gap-5);
  padding-top: var(--gap-4);
  border-top: 1px solid var(--border-light);
  text-align: center;
}

.action-hint {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  margin-bottom: var(--gap-3);
}

.upload-tips {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
}

.tips-card {
  background: var(--paper-card);
  border: 1px solid var(--border-default);
  border-radius: var(--corner-lg);
  padding: var(--gap-4);
}

.tips-card h3 {
  display: flex;
  align-items: center;
  gap: var(--gap-2);
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: var(--gap-3);
}

.tips-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-card li {
  position: relative;
  padding-left: var(--gap-4);
  margin-bottom: var(--gap-2);
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  line-height: 1.6;
}

.tips-card li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background: var(--cinnabar);
  border-radius: 50%;
}

.tips-card li:last-child {
  margin-bottom: 0;
}

.tips-card p {
  font-size: var(--font-sm);
  color: var(--ink-secondary);
  margin-bottom: var(--gap-3);
}

.template-links {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}

@media (max-width: 900px) {
  .upload-container {
    grid-template-columns: 1fr;
  }

  .upload-tips {
    order: -1;
  }

  .hero-title {
    font-size: 24px;
  }

  .template-links {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
