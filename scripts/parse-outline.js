import { read, utils } from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const INPUT_DIR = path.join(__dirname, '../public/data/outline/original');
const OUTPUT_DIR = path.join(__dirname, '../public/data/outline');

// 工作表名称映射
const SHEET_NAMES = {
  outline: '技能分类大纲',
  deleted: '已删除技能说明',
  stats: '统计'
};

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 判断是否是一级标题（如：一、招聘管理）
 */
function isLevel1Title(text) {
  return /^[一二三四五六七八九十]+、/.test(text);
}

/**
 * 判断是否是二级标题（如：1.1 招聘平台）
 */
function isLevel2Title(text) {
  return /^\d+\.\d+\s/.test(text);
}

/**
 * 判断是否是技能行（有三列数据）
 */
function isSkillRow(row) {
  return row.length >= 3 && row[0] && row[1] && row[2];
}

/**
 * 将工作表数据转换为Markdown
 */
function sheetToMarkdown(data, sheetName) {
  if (!data || data.length === 0) {
    return `# ${sheetName}\n\n暂无数据\n`;
  }

  let markdown = '';

  // 特殊处理"技能分类大纲"工作表
  if (sheetName === '技能分类大纲') {
    // 标题行
    if (data[0] && data[0][0]) {
      markdown += `# ${data[0][0]}\n\n`;
    }

    // 检测是哪种格式
    // 格式A: 有技能名称/技能描述/URL表头 + 表格数据
    // 格式B: 有技能名称/技能描述/URL表头 + 标题文本行 + 技能行
    let hasFormatB = false;
    for (let i = 2; i < Math.min(20, data.length); i++) {
      const row = data[i];
      if (row[0] && row[0].startsWith('  ') && !row[1]) {
        hasFormatB = true;
        break;
      }
    }
    
    if (hasFormatB) {
      // 格式B: 简单的线性格式（从索引3开始跳过表头）
      let needTableHeader = true;
      
      for (let i = 3; i < data.length; i++) {
        const row = data[i];
        if (!row[0]) continue;
        
        const firstCell = String(row[0]).trim();
        
        // 一级标题
        if (isLevel1Title(firstCell)) {
          markdown += `## ${firstCell}\n\n`;
          needTableHeader = true;
        }
        // 二级标题或其他文本
        else if (!row[1]) {
          markdown += `${firstCell}\n\n`;
          needTableHeader = true;
        }
        // 技能行
        else if (row[1]) {
          if (needTableHeader) {
            markdown += '| 技能名称 | 技能描述 | URL |\n';
            markdown += '| --- | --- | --- |\n';
            needTableHeader = false;
          }
          markdown += '| ' + row.map(cell => {
            if (cell === null || cell === undefined) return '';
            let cellStr = String(cell);
            if (cellStr.startsWith('http')) {
              cellStr = `[${cellStr}](${cellStr})`;
            }
            return cellStr.replace(/\|/g, '\\|');
          }).join(' | ') + ' |\n';
        }
      }
    } else {
      // 格式A: 表格分组格式
      // 表头
      const headers = data[1] || ['技能名称', '技能描述', 'URL'];

      // 从第2行开始处理数据
      let currentTableRows = [];

      for (let i = 2; i < data.length; i++) {
        const row = data[i];
        const firstCell = row[0] ? String(row[0]).trim() : '';

        // 跳过空行
        if (!firstCell && row.every(cell => !cell)) {
          continue;
        }

        // 处理一级标题
        if (isLevel1Title(firstCell)) {
          // 如果有待输出的表格，先输出
          if (currentTableRows.length > 0) {
            markdown += renderTable(headers, currentTableRows);
            currentTableRows = [];
          }
          markdown += `## ${firstCell}\n\n`;
        }
        // 处理二级标题
        else if (isLevel2Title(firstCell)) {
          // 如果有待输出的表格，先输出
          if (currentTableRows.length > 0) {
            markdown += renderTable(headers, currentTableRows);
            currentTableRows = [];
          }
          markdown += `### ${firstCell}\n\n`;
        }
        // 处理技能数据行
        else if (isSkillRow(row)) {
          currentTableRows.push(row);
        }
        // 处理其他内容行
        else if (firstCell) {
          // 如果有待输出的表格，先输出
          if (currentTableRows.length > 0) {
            markdown += renderTable(headers, currentTableRows);
            currentTableRows = [];
          }
          markdown += `${firstCell}\n\n`;
        }
      }

      // 输出最后剩余的表格
      if (currentTableRows.length > 0) {
        markdown += renderTable(headers, currentTableRows);
      }
    }
  }
  // 特殊处理"统计"工作表
  else if (sheetName === '统计') {
    // 先输出标题
    if (data[0] && data[0][0]) {
      markdown += `${data[0][0]}\n\n`;
    }

    // 检测是哪种统计格式
    // 格式A: 格式2 - 两个表格都有（基本统计+分类统计，共享表头）
    // 格式B: 格式1 - 一个表格+单独统计行（分类表格+原始/筛选/删除）
    
    let hasBasicStats = false;
    let hasCategoryTitle = false;
    let hasTotalRow = false;
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue;
      
      if (/原始技能数|去重后技能数|删除技能数/.test(row[0])) hasBasicStats = true;
      if (/^[一二三四五六七八九十]+、/.test(row[0])) hasCategoryTitle = true;
      if (row[0] === '合计') hasTotalRow = true;
    }
    
    // 格式A: 有分类标题和基本统计（共享表头的两个表格）
    if (hasCategoryTitle && hasBasicStats) {
      let headerRow = null;
      let basicStatsRows = [];
      let categoryRows = [];
      let inBasicStats = false;
      let inCategory = false;
      
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        
        // 找表头
        if (!headerRow && row.length >= 2 && row[0] && row[1]) {
          headerRow = row;
          inBasicStats = true;
          continue;
        }
        
        // 收集基本统计
        if (inBasicStats) {
          if (!row[0]) {
            // 遇到空行，切换到分类部分
            inBasicStats = false;
            inCategory = true;
            continue;
          }
          if (/原始技能数|去重后技能数|删除技能数/.test(row[0])) {
            basicStatsRows.push(row);
          }
        }
        // 收集分类统计
        else if (inCategory) {
          if (row[0]) {
            categoryRows.push(row);
          }
        }
      }
      
      if (!headerRow) headerRow = ['分类', '数量'];
      
      if (basicStatsRows.length > 0) {
        markdown += renderTable(headerRow, basicStatsRows);
        markdown += '\n';
      }
      
      if (categoryRows.length > 0) {
        markdown += renderTable(headerRow, categoryRows);
      }
    }
    // 格式B: 有合计行但没有分类标题（一个表格+单独行）
    else if (hasTotalRow && !hasCategoryTitle) {
      let headerRow = null;
      let tableRows = [];
      let statsLines = [];
      let foundTotal = false;
      
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        
        // 找表头
        if (!headerRow && row.length >= 2 && row[0] && row[1]) {
          if (/模块|分类|技能数量|数量/.test(row[0] + row[1])) {
            headerRow = row;
            continue;
          }
        }
        
        if (headerRow && !foundTotal) {
          if (row[0]) {
            tableRows.push(row);
            if (row[0] === '合计') {
              foundTotal = true;
            }
          }
        } else if (foundTotal) {
          if (row[0]) {
            statsLines.push(row[0]);
          }
        }
      }
      
      if (!headerRow) headerRow = ['模块', '技能数量'];
      
      if (tableRows.length > 0) {
        markdown += renderTable(headerRow, tableRows);
        markdown += '\n';
      }
      
      for (const line of statsLines) {
        markdown += `${line}\n`;
      }
    }
  }
  // "已删除技能说明"和其他工作表使用通用格式
  else {
    // 找到第一行有内容的作为标题
    let title = sheetName;
    let titleRow = -1;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row[0]) {
        title = row[0];
        titleRow = i;
        break;
      }
    }

    markdown += `# ${title}\n\n`;

    // 找到表头行（标题之后第一个有多列的行）
    let headerRow = -1;
    for (let i = titleRow + 1; i < data.length; i++) {
      const row = data[i];
      if (row.length >= 2 && row[0] && row[1]) {
        headerRow = i;
        break;
      }
    }

    // 收集数据行
    if (headerRow !== -1) {
      const headers = data[headerRow] || [];
      const tableRows = [];
      
      for (let i = headerRow + 1; i < data.length; i++) {
        const row = data[i];
        if (row.some(cell => cell)) {
          tableRows.push(row);
        }
      }

      if (tableRows.length > 0) {
        markdown += renderTable(headers, tableRows);
      }
    }
  }

  return markdown;
}

/**
 * 渲染Markdown表格
 */
function renderTable(headers, rows) {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return '';
  }

  let table = '';
  
  // 表头行
  table += '| ' + headers.map(h => h || '').join(' | ') + ' |\n';
  
  // 分隔行
  table += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
  
  // 数据行
  for (const row of rows) {
    table += '| ' + row.map(cell => {
      if (cell === null || cell === undefined) return '';
      let cellStr = String(cell);
      // 处理URL
      if (cellStr.startsWith('http')) {
        cellStr = `[${cellStr}](${cellStr})`;
      }
      // 处理可能包含竖线的内容
      return cellStr.replace(/\|/g, '\\|');
    }).join(' | ') + ' |\n';
  }

  table += '\n';
  return table;
}

/**
 * 解析单个xlsx文件
 */
function parseXlsxFile(filePath) {
  console.log(`正在解析: ${path.basename(filePath)}`);

  try {
    // 读取文件
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = read(fileBuffer);
    
    // 获取文件名（不含扩展名）
    const baseName = path.basename(filePath, path.extname(filePath));
    
    // 解析每个工作表
    for (const [key, sheetName] of Object.entries(SHEET_NAMES)) {
      if (workbook.SheetNames.includes(sheetName)) {
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet, { header: 1 });
        
        // 生成Markdown
        const markdown = sheetToMarkdown(data, sheetName);
        
        // 输出文件路径
        const outputFileName = `${baseName}_${key}.md`;
        const outputPath = path.join(OUTPUT_DIR, outputFileName);
        
        // 写入文件
        fs.writeFileSync(outputPath, markdown, 'utf-8');
        console.log(`  ✓ 已生成: ${outputFileName}`);
      } else {
        console.log(`  ⚠  找不到工作表: ${sheetName}`);
      }
    }
    
    console.log(`✓ ${path.basename(filePath)} 解析完成\n`);
  } catch (error) {
    console.error(`✗ 解析失败: ${path.basename(filePath)}`);
    console.error(`  错误: ${error.message}\n`);
  }
}

/**
 * 主函数
 */
function main() {
  console.log('开始解析技能分类大纲xlsx文件...\n');
  
  // 获取目录下所有xlsx文件
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => file.endsWith('.xlsx') && !file.startsWith('.~'));
  
  if (files.length === 0) {
    console.log('未找到xlsx文件');
    return;
  }
  
  console.log(`找到 ${files.length} 个xlsx文件\n`);
  
  // 解析所有xlsx文件进行验证
  const filesToParse = files;
  
  for (const file of filesToParse) {
    const filePath = path.join(INPUT_DIR, file);
    parseXlsxFile(filePath);
  }
  
  console.log('解析完成！');
}

// 运行
main();