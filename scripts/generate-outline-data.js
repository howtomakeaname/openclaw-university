import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTLINE_DIR = path.join(__dirname, '../public/data/outline');

// 专业分类映射
const CATEGORY_MAP = {
  '金融投资分析师': 'finance',
  '电商运营专家': 'business',
  '人力资源专家': 'hr',
  '内容创作者': 'content',
  '学术研究员': 'research',
  '市场营销专家': 'marketing',
  '销售CRM专家': 'sales'
};

// 专业 code 映射
const CODE_MAP = {
  '金融投资分析师': 'financial-analyst',
  '电商运营专家': 'ecommerce-operator',
  '人力资源专家': 'hr-specialist',
  '内容创作者': 'content-creator',
  '学术研究员': 'academic-researcher',
  '市场营销专家': 'marketing-specialist',
  '销售CRM专家': 'sales-crm-specialist'
};

// 专业描述生成
function generateDescription(name, outlineContent) {
  const descriptions = {
    '金融投资分析师': '掌握金融投资分析核心技能，包括股票数据分析、技术分析、市场研究、财务分析等，成为专业的金融投资人才。',
    '电商运营专家': '系统学习电商运营全流程，包括平台管理、营销推广、数据分析、客户关系管理等技能，打造电商运营专家。',
    '人力资源专家': '掌握人力资源管理核心技能，包括招聘管理、HR系统、面试安排、员工沟通等，成为专业的HR人才。',
    '内容创作者': '精通内容创作全流程，包括文案写作、图像创作、视频制作、社媒运营等技能，打造专业内容创作能力。',
    '学术研究员': '掌握系统的学术研究方法，包括文献检索、研究设计、数据分析、论文写作等核心技能。',
    '市场营销专家': '学习市场营销核心技能，包括营销策略、内容营销、SEO优化、广告投放、数据分析等，成为营销专家。',
    '销售CRM专家': '掌握销售与客户关系管理技能，包括CRM系统、销售流程、客户沟通、数据分析等，成为销售专家。'
  };
  return descriptions[name] || `${name}专业技能培养大纲，掌握核心职业技能，提升专业能力。`;
}

// 专业标签生成
function generateTags(name) {
  const tagsMap = {
    '金融投资分析师': ['金融', '股票', '投资', '数据分析'],
    '电商运营专家': ['电商', '运营', '营销', '数据分析'],
    '人力资源专家': ['HR', '招聘', '人事管理', '协作'],
    '内容创作者': ['内容', '创作', '社媒', '文案'],
    '学术研究员': ['研究', '学术', '论文', '文献'],
    '市场营销专家': ['营销', '市场', '广告', 'SEO'],
    '销售CRM专家': ['销售', 'CRM', '客户', '沟通']
  };
  return tagsMap[name] || ['职业技能', '专业培养'];
}

// 专业封面图生成（使用 Unsplash 免费图片）
function generateCoverImage(name) {
  const coverMap = {
    '金融投资分析师': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    '电商运营专家': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    '人力资源专家': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    '内容创作者': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    '学术研究员': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
    '市场营销专家': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
    '销售CRM专家': 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80'
  };
  return coverMap[name] || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80';
}

// 主函数
function main() {
  console.log('开始生成 outline_data.json...\n');

  const files = fs.readdirSync(OUTLINE_DIR)
    .filter(file => file.endsWith('_outline.md'));

  const outlineData = [];
  let id = 1;

  for (const file of files) {
    const baseName = file.replace('_outline.md', '');
    
    // 从文件名提取专业名称
    const match = baseName.match(/^(.+?)_技能分类大纲_v1$/);
    if (!match) continue;
    
    const name = match[1];
    const code = CODE_MAP[name] || name.replace(/\s+/g, '-').toLowerCase();
    const category = CATEGORY_MAP[name] || 'other';
    
    // 读取 outline 文件内容
    const outlinePath = path.join(OUTLINE_DIR, file);
    const outlineContent = fs.readFileSync(outlinePath, 'utf-8');
    
    const item = {
      id: String(id++),
      code: code,
      name: name,
      category: category,
      description: generateDescription(name, outlineContent),
      tags: generateTags(name),
      coverImage: generateCoverImage(name),
      createdAt: '2024-01-01',
      updatedAt: '2024-12-31',
      // Markdown 路径（相对 public/data/outline）
      outlineMarkdownPath: file,
      deletedMarkdownPath: `${baseName}_deleted.md`,
      statsMarkdownPath: `${baseName}_stats.md`
    };
    
    outlineData.push(item);
    console.log(`✓ 已处理: ${name}`);
  }

  // 写入 JSON 文件
  const outputPath = path.join(OUTLINE_DIR, 'data.json');
  fs.writeFileSync(outputPath, JSON.stringify(outlineData, null, 2), 'utf-8');
  
  console.log(`\n✓ 已生成: data.json (${outlineData.length} 个专业)`);
}

main();