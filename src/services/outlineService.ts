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
const getInstallBasePath = (): string => `${getBasePath()}data/install`

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
 * 加载 install 目录下的 markdown 文件
 */
async function loadInstallMarkdownFile(majorName: string): Promise<string> {
  try {
    // 将专业名称映射到 install 文件名
    const nameMap: Record<string, string> = {
      '金融投资分析师': '金融投资分析师_技能培养大纲',
      '内容创作者': '内容创作者_技能培养大纲',
      '人力资源专家': '人力资源专家_技能培养大纲',
      '市场营销专家': '市场营销专家_技能培养大纲',
      '销售CRM专家': '销售CRM专家_技能培养大纲',
      '学术研究员': '学术研究员_技能培养大纲'
    }
    
    const filePrefix = nameMap[majorName] || `${majorName}_技能培养大纲`
    const filename = `${filePrefix}.md`
    
    const response = await fetch(`${getInstallBasePath()}/${filename}`)
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

    // 加载 outline markdown 文件和 install markdown 文件
    const [outlineContent, installContent] = await Promise.all([
      loadMarkdownFile(major.outlineMarkdownPath),
      loadInstallMarkdownFile(major.name)
    ])

    return {
      ...major,
      outlineContent,
      installContent
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