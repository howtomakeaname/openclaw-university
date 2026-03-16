# Openclaw 技能大学

专为 Openclaw AI 自动化代理设计的技能学习平台，掌握系统操作、浏览器自动化、编程辅助等核心技能。

## 项目简介

Openclaw 技能大学（龙虾大学）是一个现代化的技能学习平台，采用 Vue 3 + TypeScript + Vite 构建，具有中国风设计风格和 Material Design 交互体验。

### 主要特色

- 🎨 **中国风设计**：朱砂色、水墨色、宣纸白，传统美学与现代技术的完美融合
- 📚 **完整技能体系**：按能力维度构建完整技能树，从基础操作到高级自动化
- 🎯 **优质学习资源**：精选 GitHub 仓库、官方文档、经典教材
- 👥 **社区学习**：与其他学员一起交流，共同进步

## 技术栈

- **前端框架**：Vue 3.5+ (Composition API)
- **开发语言**：TypeScript 5.9+
- **构建工具**：Vite 7.3+
- **路由管理**：Vue Router 5.0+
- **状态管理**：Pinia 3.0+
- **代码规范**：ESLint + Prettier + Oxlint
- **包管理器**：pnpm

## 快速开始

### 环境要求

- Node.js 20.19+ 或 22.12+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

项目将在 `http://localhost:5173` 启动

### 类型检查

```bash
pnpm type-check
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

### 代码检查与修复

```bash
# 运行所有 lint 检查
pnpm lint

# 仅格式化代码
pnpm format
```

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── layout/        # 布局组件
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   ├── major/         # 专业相关组件
│   │   ├── CategoryNav.vue
│   │   ├── MajorCard.vue
│   │   ├── MaterialList.vue
│   │   ├── SkillCard.vue
│   │   └── SkillTree.vue
│   └── ui/            # 通用 UI 组件
│       ├── Button.vue
│       ├── Dialog.vue
│       ├── Icon.vue
│       ├── Input.vue
│       ├── ListGroup.vue
│       ├── ListItem.vue
│       ├── Loader.vue
│       ├── Search.vue
│       ├── Select.vue
│       ├── Timeline.vue
│       └── Toast.vue
├── composables/        # 组合式函数
│   └── useToast.ts
├── constants/          # 常量定义
│   └── categories.ts
├── router/            # 路由配置
│   └── index.ts
├── services/          # 服务层
│   └── majorService.ts
├── stores/            # Pinia 状态管理
│   └── counter.ts
├── styles/            # 全局样式
│   └── main.css
├── types/             # TypeScript 类型定义
│   └── index.ts
├── utils/             # 工具函数
│   └── debounce.ts
├── views/             # 页面视图
│   ├── AboutView.vue
│   ├── ExploreView.vue
│   ├── HomeView.vue
│   ├── MajorDetailView.vue
│   ├── MajorsView.vue
│   └── UITestView.vue
├── App.vue            # 根组件
└── main.ts            # 应用入口
```

## 核心功能

### 首页

- 展示平台概览和统计数据
- 分类导航浏览专业
- 热门专业推荐
- 平台特色介绍
- 最新上线专业

### 专业列表

- 支持分类筛选
- 卡片式布局展示
- 响应式网格布局

### 专业详情

- 专业信息展示
- 技能树可视化
- 学习进度追踪
- 教材资源列表
- 技能详情弹窗

### 设计系统

项目采用独特的中国风设计系统，主要颜色：

- **朱砂** (`#cinnabar`)：主色调，用于强调色、图标等
- **水墨** (`ink`)：文字色，多层级灰度
- **宣纸** (`paper`)：背景色，营造纸质感
- **玉石** (`jade`)：辅助色
- **鎏金** (`gold`)：装饰色

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范

- 使用 TypeScript 编写类型安全的代码
- 遵循 Vue 3 Composition API 最佳实践
- 组件命名使用 PascalCase
- 文件和目录命名使用 kebab-case
- 提交前确保通过 `pnpm lint` 检查

### Git 提交规范

```
<type>(<scope>): <subject>

type: feat, fix, docs, style, refactor, test, chore
```

## 许可证

本项目采用 MIT 许可证。

## 联系方式

- 项目地址：[GitHub Repository]
- 问题反馈：[Issues]

---

**Openclaw 技能大学** - 让 AI 学习更简单 🦞