import type { SkillSecurity, SecurityStats } from '@/types/security'

const SKILLS_DATA_URL = '/data/skills_raw.json'

/**
 * 获取所有技能安全数据
 */
export const fetchSkillsSecurity = async (): Promise<SkillSecurity[]> => {
  const response = await fetch(SKILLS_DATA_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch skills data: ${response.status}`)
  }
  return response.json()
}

/**
 * 计算安全统计数据
 */
export const calculateSecurityStats = (skills: SkillSecurity[]): SecurityStats => {
  const stats: SecurityStats = {
    total: skills.length,
    clean: 0,
    suspicious: 0,
    malicious: 0,
    unknown: 0
  }

  skills.forEach(skill => {
    switch (skill.security_status) {
      case 'clean':
        stats.clean++
        break
      case 'suspicious':
        stats.suspicious++
        break
      case 'malicious':
        stats.malicious++
        break
      default:
        stats.unknown++
    }
  })

  return stats
}

/**
 * 按安全状态筛选技能
 */
export const filterSkillsByStatus = (
  skills: SkillSecurity[],
  status: string
): SkillSecurity[] => {
  if (status === 'all') return skills
  return skills.filter(skill => skill.security_status === status)
}

/**
 * 搜索技能
 */
export const searchSkills = (skills: SkillSecurity[], query: string): SkillSecurity[] => {
  if (!query.trim()) return skills
  const lowerQuery = query.toLowerCase()
  return skills.filter(
    skill =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.author.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery)
  )
}
