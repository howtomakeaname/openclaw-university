/**
 * 安全扫描结果类型
 */

// 安全状态
export type SecurityStatus = 'clean' | 'suspicious' | 'malicious' | 'unknown'

// 扫描器状态
export type ScannerStatus = 'clean' | 'suspicious' | 'malicious' | 'error'

// 扫描详情项
export interface ScanDetail {
  scanner: string
  status: ScannerStatus
  text: string
}

// 技能安全数据
export interface SkillSecurity {
  name: string
  author: string
  description: string
  url: string
  installs: string
  stars: string
  security_status: SecurityStatus
  scan_details: ScanDetail[]
}

// 安全统计
export interface SecurityStats {
  total: number
  clean: number
  suspicious: number
  malicious: number
  unknown: number
}

// 扫描器统计
export interface ScannerStats {
  name: string
  total: number
  clean: number
  suspicious: number
  malicious: number
}
