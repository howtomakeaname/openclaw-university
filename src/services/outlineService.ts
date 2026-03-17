import type { OutlineMajor, OutlineMajorDetail } from '@/types'

// 获取基础路径
const getBasePath = (): string => {
  // 使用 Vite 提供的 BASE_URL
  const base = import.meta.env.BASE_URL || '/'
  // 确保 base 总是以 / 结尾
  return base.endsWith('/') ? base : base + '/'
}

// 动态获取路径
const getOutlineDataPath = (): string => `${getBasePath()}data/outline/data.json`
const getOutlineBasePath = (): string => `${getBasePath()}data/outline`

/**
 * 模拟网络延迟
 */
function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 加载 markdown 文件
 */
async function loadMarkdownFile(filename: string): Promise<string> {
  try {
    const response = await fetch(`${getOutlineBasePath()}/${filename}`)
    if (!response.ok) return ''
    return await response.text()
  } catch {
    return ''
  }
}

/**
 * Outline 服务
 */
export const outlineService = {
  /**
   * 获取所有专业
   */
  async getAllMajors(): Promise<OutlineMajor[]> {
    await simulateDelay(300)
    try {
      const response = await fetch(getOutlineDataPath())
      if (!response.ok) return []
      return await response.json()
    } catch {
      return []
    }
  },

  /**
   * 按分类获取专业
   */
  async getMajorsByCategory(category: string): Promise<OutlineMajor[]> {
    await simulateDelay(200)
    const all = await this.getAllMajors()
    if (!category) return all
    return all.filter(m => m.category === category)
  },

  /**
   * 搜索专业
   */
  async searchMajors(query: string): Promise<OutlineMajor[]> {
    await simulateDelay(400)
    const all = await this.getAllMajors()
    const q = query.toLowerCase()
    return all.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(tag => tag.toLowerCase().includes(q))
    )
  },

  /**
   * 获取专业详情（含 markdown 内容）
   */
  async getMajorById(id: string): Promise<OutlineMajorDetail | null> {
    await simulateDelay(300)
    const all = await this.getAllMajors()
    const major = all.find(m => m.id === id)
    if (!major) return null

    // 加载三个 markdown 文件
    const [outlineContent, deletedContent, statsContent] = await Promise.all([
      loadMarkdownFile(major.outlineMarkdownPath),
      loadMarkdownFile(major.deletedMarkdownPath),
      loadMarkdownFile(major.statsMarkdownPath)
    ])

    return {
      ...major,
      outlineContent,
      deletedContent,
      statsContent
    }
  },

  /**
   * 获取热门专业（按顺序取前几个）
   */
  async getHotMajors(limit: number = 4): Promise<OutlineMajor[]> {
    await simulateDelay(200)
    const all = await this.getAllMajors()
    return all.slice(0, limit)
  },

  /**
   * 获取最新专业（倒序取前几个）
   */
  async getNewMajors(limit: number = 4): Promise<OutlineMajor[]> {
    await simulateDelay(200)
    const all = await this.getAllMajors()
    return [...all].reverse().slice(0, limit)
  }
}