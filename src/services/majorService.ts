import type { Major, MajorCategory, Skill, Material } from '@/types'

/**
 * 模拟专业数据
 */
const MOCK_MAJORS: Major[] = [
  {
    id: '1',
    code: 'frontend-dev',
    name: '前端开发工程师',
    category: 'engineering',
    description: '掌握现代Web前端开发技术栈，包括HTML5、CSS3、JavaScript、TypeScript、Vue、React等主流框架，能够独立完成复杂Web应用的开发与优化。',
    cover: 'https://picsum.photos/id/1/400/250',
    difficulty: 'intermediate',
    duration: '12周',
    enrollment: 12580,
    rating: 4.8,
    tags: ['Vue', 'React', 'TypeScript', '工程化'],
    createdAt: '2024-01-15',
    updatedAt: '2024-12-01',
    skills: [
      { id: 's1', name: 'HTML5/CSS3 基础', description: '语义化标签、Flex/Grid布局、响应式设计', level: 'beginner', order: 1 },
      { id: 's2', name: 'JavaScript 核心', description: 'ES6+语法、异步编程、原型链、闭包', level: 'intermediate', order: 2 },
      { id: 's3', name: 'TypeScript 进阶', description: '类型系统、泛型、装饰器、类型推断', level: 'intermediate', order: 3 },
      { id: 's4', name: 'Vue.js 生态', description: 'Vue3组合式API、Pinia状态管理、Vue Router', level: 'intermediate', order: 4 },
      { id: 's5', name: '前端工程化', description: 'Vite/Webpack、CI/CD、单元测试、性能优化', level: 'advanced', order: 5 }
    ],
    materials: [
      { id: 'm1', title: 'Vue.js 官方文档', type: 'documentation', description: 'Vue.js渐进式JavaScript框架官方文档', source: 'Vue.js', url: 'https://vuejs.org', tags: ['Vue', '官方'], addedAt: '2024-01-01' },
      { id: 'm2', title: 'Frontend Developer Roadmap', type: 'tutorial', description: '前端开发者学习路线图', source: 'roadmap.sh', stars: 280000, url: 'https://roadmap.sh/frontend', tags: ['Roadmap', '学习指南'], addedAt: '2024-01-01' },
      { id: 'm3', title: 'Modern JavaScript Tutorial', type: 'book', description: '现代JavaScript教程，从基础到高级', source: 'javascript.info', tags: ['JavaScript', '教程'], addedAt: '2024-02-15' }
    ]
  },
  {
    id: '2',
    code: 'backend-go',
    name: 'Go后端开发工程师',
    category: 'engineering',
    description: '系统学习Go语言编程，掌握微服务架构、分布式系统、云原生技术，能够构建高性能、高可用的后端服务。',
    cover: 'https://picsum.photos/id/2/400/250',
    difficulty: 'intermediate',
    duration: '14周',
    enrollment: 8930,
    rating: 4.9,
    tags: ['Go', 'Microservices', 'Kubernetes', 'gRPC'],
    createdAt: '2024-02-01',
    updatedAt: '2024-11-20',
    skills: [
      { id: 's6', name: 'Go语言基础', description: '语法、并发模型、错误处理、标准库', level: 'beginner', order: 1 },
      { id: 's7', name: 'Web框架与路由', description: 'Gin/Echo框架、中间件、RESTful API设计', level: 'intermediate', order: 2 },
      { id: 's8', name: '数据库与存储', description: 'GORM、Redis、MySQL优化、分库分表', level: 'intermediate', order: 3 },
      { id: 's9', name: '微服务架构', description: '服务拆分、gRPC通信、服务发现、熔断降级', level: 'advanced', order: 4 },
      { id: 's10', name: '云原生部署', description: 'Docker容器化、Kubernetes编排、监控告警', level: 'advanced', order: 5 }
    ],
    materials: [
      { id: 'm4', title: 'Go by Example', type: 'tutorial', description: 'Go语言实践教程，通过示例学习', source: 'gobyexample.com', url: 'https://gobyexample.com', tags: ['Go', '实践'], addedAt: '2024-01-10' },
      { id: 'm5', title: 'Go语言高级编程', type: 'book', description: 'Go语言高级特性和最佳实践', source: 'GitHub', stars: 12000, tags: ['Go', '高级'], addedAt: '2024-03-01' },
      { id: 'm6', title: 'Go项目结构最佳实践', type: 'repository', description: 'Standard Go Project Layout', source: 'GitHub', stars: 48000, url: 'https://github.com/golang-standards/project-layout', tags: ['Go', '最佳实践'], addedAt: '2024-02-01' }
    ]
  },
  {
    id: '3',
    code: 'ui-designer',
    name: 'UI/UX设计师',
    category: 'design',
    description: '培养专业的界面设计能力，掌握Figma、设计系统、交互原型，以及用户研究方法论，打造卓越的用户体验。',
    cover: 'https://picsum.photos/id/3/400/250',
    difficulty: 'beginner',
    duration: '10周',
    enrollment: 15620,
    rating: 4.7,
    tags: ['Figma', 'Design System', 'UX Research', 'Prototyping'],
    createdAt: '2024-01-20',
    updatedAt: '2024-12-10',
    skills: [
      { id: 's11', name: '设计基础', description: '色彩理论、排版、网格系统、视觉层级', level: 'beginner', order: 1 },
      { id: 's12', name: 'Figma精通', description: '组件库、变体、Auto Layout、原型交互', level: 'intermediate', order: 2 },
      { id: 's13', name: '设计系统构建', description: 'Design Tokens、组件规范、文档化', level: 'intermediate', order: 3 },
      { id: 's14', name: '用户研究方法', description: '用户访谈、可用性测试、旅程地图、Persona', level: 'intermediate', order: 4 },
      { id: 's15', name: '交互设计', description: '微交互、动效设计、无障碍设计', level: 'advanced', order: 5 }
    ],
    materials: [
      { id: 'm7', title: 'Figma最佳实践', type: 'documentation', description: 'Figma官方最佳实践指南', source: 'Figma', url: 'https://www.figma.com/best-practices', tags: ['Figma', '设计规范'], addedAt: '2024-01-15' },
      { id: 'm8', title: 'Ant Design设计系统', type: 'repository', description: '企业级UI设计语言和React组件库', source: 'Ant Design', stars: 92000, url: 'https://github.com/ant-design/ant-design', tags: ['Design System', 'React'], addedAt: '2024-02-10' },
      { id: 'm9', title: 'Nielsen Norman Group', type: 'article', description: '用户体验研究权威文章', source: 'NNGroup', tags: ['UX', '研究方法'], addedAt: '2024-03-15' }
    ]
  },
  {
    id: '4',
    code: 'product-manager',
    name: '产品经理',
    category: 'product',
    description: '系统学习产品管理方法论，从需求分析、用户研究到产品规划、数据分析，成为全栈型产品人才。',
    cover: 'https://picsum.photos/id/4/400/250',
    difficulty: 'intermediate',
    duration: '8周',
    enrollment: 6780,
    rating: 4.6,
    tags: ['产品思维', '数据分析', '用户研究', '敏捷开发'],
    createdAt: '2024-03-01',
    updatedAt: '2024-11-15',
    skills: [
      { id: 's16', name: '产品思维', description: '用户价值、商业逻辑、竞品分析', level: 'beginner', order: 1 },
      { id: 's17', name: '需求分析', description: '用户故事、功能拆解、优先级排序', level: 'intermediate', order: 2 },
      { id: 's18', name: '数据分析', description: '指标体系、漏斗分析、A/B测试', level: 'intermediate', order: 3 },
      { id: 's19', name: '项目管理', description: '敏捷开发、Scrum、跨部门协作', level: 'intermediate', order: 4 }
    ],
    materials: [
      { id: 'm10', title: 'Inspired', type: 'book', description: '如何创造客户喜爱的科技产品', source: 'Marty Cagan', tags: ['产品管理', '经典'], addedAt: '2024-01-20' },
      { id: 'm11', title: 'The Product Manager', type: 'article', description: '产品经理知识库', source: 'ProductHunt', tags: ['产品'], addedAt: '2024-02-20' }
    ]
  },
  {
    id: '5',
    code: 'data-analyst',
    name: '数据分析师',
    category: 'data',
    description: '掌握数据分析核心技能，包括SQL、Python、数据可视化，能够从海量数据中提取商业价值。',
    cover: 'https://picsum.photos/id/5/400/250',
    difficulty: 'beginner',
    duration: '10周',
    enrollment: 11200,
    rating: 4.8,
    tags: ['SQL', 'Python', 'Tableau', '统计学'],
    createdAt: '2024-02-15',
    updatedAt: '2024-12-05',
    skills: [
      { id: 's20', name: 'SQL精通', description: '复杂查询、窗口函数、性能优化', level: 'beginner', order: 1 },
      { id: 's21', name: 'Python数据分析', description: 'Pandas、NumPy、数据清洗', level: 'intermediate', order: 2 },
      { id: 's22', name: '统计学基础', description: '描述统计、假设检验、回归分析', level: 'intermediate', order: 3 },
      { id: 's23', name: '数据可视化', description: 'Tableau、Matplotlib、数据故事', level: 'intermediate', order: 4 }
    ],
    materials: [
      { id: 'm12', title: 'SQLBolt', type: 'tutorial', description: '交互式SQL教程', source: 'SQLBolt', url: 'https://sqlbolt.com', tags: ['SQL', '教程'], addedAt: '2024-01-25' },
      { id: 'm13', title: 'Python for Data Analysis', type: 'book', description: 'Python数据分析经典教材', source: 'O\'Reilly', tags: ['Python', '数据分析'], addedAt: '2024-02-05' }
    ]
  },
  {
    id: '6',
    code: 'growth-hacker',
    name: '增长黑客',
    category: 'marketing',
    description: '学习用户增长方法论，掌握AARRR漏斗、渠道运营、内容营销等技能，驱动业务快速增长。',
    cover: 'https://picsum.photos/id/6/400/250',
    difficulty: 'intermediate',
    duration: '6周',
    enrollment: 4320,
    rating: 4.5,
    tags: ['增长', '运营', '数据分析', '营销'],
    createdAt: '2024-04-01',
    updatedAt: '2024-10-20',
    skills: [
      { id: 's24', name: '增长框架', description: 'AARRR、增长黑客方法论', level: 'beginner', order: 1 },
      { id: 's25', name: '渠道运营', description: 'SEO/SEM、社交媒体、内容营销', level: 'intermediate', order: 2 },
      { id: 's26', name: '转化优化', description: '落地页优化、用户心理学、实验设计', level: 'intermediate', order: 3 }
    ],
    materials: [
      { id: 'm14', title: 'Hacking Growth', type: 'book', description: '增长黑客实战手册', source: 'Sean Ellis', tags: ['增长', '经典'], addedAt: '2024-03-10' },
      { id: 'm15', title: 'Growth.design', type: 'tutorial', description: '交互式增长案例研究', source: 'growth.design', url: 'https://growth.design', tags: ['案例', '心理学'], addedAt: '2024-04-01' }
    ]
  },
  {
    id: '7',
    code: 'scrum-master',
    name: '敏捷教练',
    category: 'operations',
    description: '深入理解Scrum框架和敏捷思想，掌握团队引导、冲突解决、持续改进等核心技能。',
    cover: 'https://picsum.photos/id/7/400/250',
    difficulty: 'intermediate',
    duration: '6周',
    enrollment: 2890,
    rating: 4.7,
    tags: ['Scrum', '敏捷', '团队协作', '领导力'],
    createdAt: '2024-03-15',
    updatedAt: '2024-09-30',
    skills: [
      { id: 's27', name: 'Scrum框架', description: '角色、事件、工件、敏捷宣言', level: 'beginner', order: 1 },
      { id: 's28', name: '团队引导', description: '引导技术、会议主持、决策制定', level: 'intermediate', order: 2 },
      { id: 's29', name: '持续改进', description: '回顾会议、行动项追踪、度量指标', level: 'intermediate', order: 3 }
    ],
    materials: [
      { id: 'm16', title: 'Scrum Guide', type: 'documentation', description: 'Scrum官方指南', source: 'Scrum.org', url: 'https://scrumguides.org', tags: ['Scrum', '官方'], addedAt: '2024-01-30' },
      { id: 'm17', title: '敏捷革命', type: 'book', description: '敏捷转型实践指南', source: 'Jurgen Appelo', tags: ['敏捷', '管理'], addedAt: '2024-03-01' }
    ]
  },
  {
    id: '8',
    code: 'research-methodology',
    name: '学术研究方法',
    category: 'research',
    description: '掌握系统的学术研究方法，包括文献综述、研究设计、数据分析、论文写作等核心技能。',
    cover: 'https://picsum.photos/id/8/400/250',
    difficulty: 'advanced',
    duration: '16周',
    enrollment: 3250,
    rating: 4.9,
    tags: ['研究', '论文', '方法论', '统计'],
    createdAt: '2024-01-05',
    updatedAt: '2024-12-15',
    skills: [
      { id: 's30', name: '研究设计', description: '定量/定性研究、实验设计、抽样方法', level: 'intermediate', order: 1 },
      { id: 's31', name: '文献综述', description: '文献检索、批判性阅读、知识图谱', level: 'intermediate', order: 2 },
      { id: 's32', name: '学术写作', description: '论文结构、引用规范、学术伦理', level: 'advanced', order: 3 },
      { id: 's33', name: '高级统计', description: '结构方程模型、多层线性模型', level: 'expert', order: 4 }
    ],
    materials: [
      { id: 'm18', title: 'Zotero', type: 'documentation', description: '文献管理工具', source: 'Zotero', url: 'https://www.zotero.org', tags: ['工具', '文献'], addedAt: '2024-01-10' },
      { id: 'm19', title: 'The Craft of Research', type: 'book', description: '研究的艺术', source: 'Chicago Press', tags: ['研究方法', '经典'], addedAt: '2024-02-01' }
    ]
  }
]

/**
 * 专业服务 - 模拟API
 */
export const majorService = {
  /**
   * 获取所有专业
   */
  async getAllMajors(): Promise<Major[]> {
    await simulateDelay(300)
    return [...MOCK_MAJORS]
  },

  /**
   * 按分类获取专业
   */
  async getMajorsByCategory(category: MajorCategory): Promise<Major[]> {
    await simulateDelay(200)
    return MOCK_MAJORS.filter(m => m.category === category)
  },

  /**
   * 搜索专业
   */
  async searchMajors(query: string): Promise<Major[]> {
    await simulateDelay(400)
    const q = query.toLowerCase()
    return MOCK_MAJORS.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(tag => tag.toLowerCase().includes(q))
    )
  },

  /**
   * 获取专业详情
   */
  async getMajorById(id: string): Promise<Major | null> {
    await simulateDelay(300)
    return MOCK_MAJORS.find(m => m.id === id) || null
  },

  /**
   * 获取热门专业
   */
  async getHotMajors(limit: number = 4): Promise<Major[]> {
    await simulateDelay(200)
    return [...MOCK_MAJORS]
      .sort((a, b) => b.enrollment - a.enrollment)
      .slice(0, limit)
  },

  /**
   * 获取最新专业
   */
  async getNewMajors(limit: number = 4): Promise<Major[]> {
    await simulateDelay(200)
    return [...MOCK_MAJORS]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }
}

/**
 * 模拟网络延迟
 */
function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
