// ==================== 核心类型定义 ====================

/**
 * 专业（Major）- 以职业/行业/业务为粒度的教程
 */
export interface Major {
  id: string
  code: string
  name: string
  category: MajorCategory
  description: string
  cover: string
  difficulty: Difficulty
  duration: string
  skills: Skill[]
  materials: Material[]
  enrollment: number
  rating: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

/**
 * 教材（Material）- Skill仓库、知识库等材料
 */
export interface Material {
  id: string
  title: string
  type: MaterialType
  description: string
  url?: string
  source: string
  stars?: number
  tags: string[]
  addedAt: string
}

/**
 * 技能（Skill）- 专业包含的具体技能点
 */
export interface Skill {
  id: string
  name: string
  description: string
  level: Difficulty
  order: number
}

/**
 * 专业分类
 */
export type MajorCategory =
  | 'engineering'    // 工程开发
  | 'design'         // 设计创意
  | 'product'        // 产品管理
  | 'data'           // 数据科学
  | 'marketing'      // 市场营销
  | 'operations'     // 运营管理
  | 'research'       // 学术研究

/**
 * 教材类型
 */
export type MaterialType =
  | 'repository'     // 代码仓库
  | 'documentation'  // 官方文档
  | 'tutorial'       // 教程指南
  | 'book'           // 书籍
  | 'video'          // 视频课程
  | 'article'        // 文章/博客

/**
 * 难度等级
 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

/**
 * 分类显示信息
 */
export interface CategoryInfo {
  key: MajorCategory
  name: string
  icon: string
  color: string
  description: string
}
