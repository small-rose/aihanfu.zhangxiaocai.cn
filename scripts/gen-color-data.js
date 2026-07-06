const fs = require('fs');

// Dynasty info: keyed by color name
const dynastyInfo = {
  '赤': '周', '朱红': ['明','清'], '绯': '唐', '胭脂': ['汉','唐'],
  '银红': '清', '海棠红': '宋', '石榴红': '唐', '绛紫': '唐',
  '殷红': '商', '彤色': '周', '丹色': ['秦','汉'], '茜色': '汉',
  '黄': ['隋','唐','宋'], '鹅黄': '宋', '缃色': '汉', '琥珀': '唐',
  '驼色': '唐', '秋香色': '清', '鸭黄': '宋', '姜黄': '唐', '橙黄': '唐',
  '缇色': '汉', '柘黄': ['隋','唐','宋'],
  '碧色': '唐', '翠绿': '清', '竹青': '宋', '豆绿': '宋', '松花绿': '清',
  '油绿': ['明','清'], '麴尘': '唐', '鸭头绿': '宋', '葱绿': '唐',
  '青': ['先秦','汉','唐'], '靛蓝': '先秦', '宝蓝': '清', '藏青': ['明','清'],
  '天青': '宋', '月白': ['明','清'], '石青': '宋', '雨过天青': '宋',
  '雪青': '清', '藕荷': '清', '紫檀': '明', '紫': '唐',
  '赭色': '先秦', '古铜色': '周', '酱色': '清', '驼褐': '宋', '香色': '清', '丁香褐': '清',
  '白': '商', '银白': '唐', '素色': '先秦', '银鼠灰': ['明','清'],
  '玄': '周', '皂色': '周', '墨色': '宋', '煤黑': '宋',
};

// Generate dynasty/dynasties field string
function dynStr(name) {
  const d = dynastyInfo[name];
  if (!d) return '';
  if (Array.isArray(d)) {
    return `    dynasty: '${d[0]}',\n    dynasties: [${d.map(x => `'${x}'`).join(', ')}],`;
  }
  return `    dynasty: '${d}',`;
}

// Default pairs by category
const defPairs = {
  '红': ['白', '玄', '金'], '黄': ['紫', '棕', '赤'],
  '绿': ['白', '红', '象牙白'], '蓝紫': ['白', '金', '藕荷'],
  '褐': ['米色', '白', '黛'], '黑白': ['赤', '金', '宝蓝'],
};

// Custom pairs
const custPairs = {
  '赤': ['白', '玄', '金黄'], '朱红': ['金', '玄', '白'],
  '胭脂': ['月白', '黛', '藕荷'], '银红': ['白', '月白', '翠绿'],
  '海棠红': ['白', '柳色', '豆绿'], '石榴红': ['金', '碧色', '象牙白'],
  '绛紫': ['金', '白', '月白'], '绯': ['白', '青', '金'],
  '酡色': ['月白', '黛', '竹青'], '茜色': ['白', '黛', '月白'],
  '枣红': ['米色', '金', '古铜色'], '彤色': ['玄', '白', '金'],
  '丹色': ['玄', '白', '金'], '殷红': ['玄', '金', '白'],
  '鹅黄': ['白', '碧色', '紫'], '柘黄': ['玄', '赤', '黛'],
  '秋香色': ['赤', '墨色', '驼色'], '缃色': ['紫', '黛', '赤'],
  '姜黄': ['绛紫', '白', '墨色'], '琥珀': ['金', '白', '黛'],
  '驼色': ['白', '米色', '黛'], '缇色': ['玄', '白', '青'],
  '碧色': ['白', '赤', '鹅黄'], '翠绿': ['金', '赤', '银红'],
  '竹青': ['白', '赭色', '藕荷'], '葱绿': ['桃红', '白', '鹅黄'],
  '豆绿': ['白', '藕荷', '檀色'], '松花绿': ['金', '赤', '象牙白'],
  '柳色': ['桃红', '杏黄', '白'], '油绿': ['赤', '白', '驼色'],
  '青': ['白', '赤', '黄'], '天青': ['白', '藕荷', '驼色'],
  '月白': ['胭脂', '黛', '竹青'], '靛蓝': ['白', '赤', '米色'],
  '宝蓝': ['白', '金', '银红'], '藏青': ['赤', '金', '象牙白'],
  '石青': ['白', '赤', '驼色'], '紫': ['白', '金', '碧色'],
  '藕荷': ['月白', '黛', '竹青'], '雪青': ['白', '烟色', '粉红'],
  '丁香': ['白', '驼色', '藕荷'],
  '赭色': ['青', '白', '米色'], '褐色': ['米色', '白', '青'],
  '棕色': ['米色', '赤', '白'], '茶色': ['白', '秋香色', '黛'],
  '栗色': ['米色', '金', '驼绒'], '檀色': ['白', '竹青', '米色'],
  '酱色': ['米色', '金', '青'], '古铜色': ['赤', '白', '金'],
  '黎色': ['赤', '白', '竹青'],
  '白': ['赤', '玄', '青'], '玄': ['赤', '白', '金'],
  '素色': ['赤', '墨色', '竹青'], '银白': ['宝蓝', '赤', '黛'],
  '墨色': ['赤', '金', '白'], '皂色': ['赤', '金', '白'],
  '银鼠灰': ['赤', '宝蓝', '胭脂'],
};

function pairsStr(name, cat) {
  const p = custPairs[name] || defPairs[cat] || ['白', '赤', '玄'];
  return `    pairs: [${p.map(x => `'${x}'`).join(', ')}],`;
}

// Read original color data (before corruption) from the fallback
const original = fs.readFileSync(__dirname + '/../src/data/color-data.js', 'utf8');

// Extract individual objects using a cleaner approach
const lines = original.split('\n');
let result = 'const colors = [\n';
let inObj = false;
let objLines = [];
let objCount = 0;

for (let li = 0; li < lines.length; li++) {
  const line = lines[li];
  const trimmed = line.trim();
  
  // Start of color object
  if (trimmed === '{' && !inObj && line.includes('  {')) {
    inObj = true;
    objLines = [line];
    continue;
  }
  
  if (inObj) {
    objLines.push(line);
    if (trimmed === '},' || trimmed === '}') {
      // Process completed object
      const objText = objLines.join('\n');
      const nameM = objText.match(/name:\s*'([^']+)'/);
      const catM = objText.match(/category:\s*'([^']+)'/);
      
      if (nameM) {
        const name = nameM[1];
        const cat = catM ? catM[1] : '红';
        
        // Remove any existing pairs/dynasty lines
        let cleaned = objText
          .replace(/\n\s+pairs:\s*\[[^\]]+\],/g, '')
          .replace(/\n\s+dynasty:\s*'[^']+',/g, '')
          .replace(/\n\s+dynasties:\s*\[[^\]]+\],/g, '');
        
        // Insert new fields after tags line
        const dyn = dynStr(name);
        const pairs = pairsStr(name, cat);
        let insertStr = pairs;
        if (dyn) insertStr = dyn + '\n' + pairs;
        
        // Find insertion point: after tags line
        const tagMatch = cleaned.match(/(\s+tags:\s*\[[^\]]+\]),/);
        if (tagMatch) {
          const idx = tagMatch.index + tagMatch[0].length;
          cleaned = cleaned.slice(0, idx) + '\n' + insertStr + cleaned.slice(idx);
        }
        
        result += cleaned + '\n';
        objCount++;
      } else {
        result += objText + '\n';
      }
      
      inObj = false;
      objLines = [];
    }
  }
}

result += ']\n\nexport default colors\n';

console.log('Generated', objCount, 'color objects');
console.log('pairs count:', (result.match(/pairs:/g)||[]).length);
console.log('dynasty count:', (result.match(/dynasty:/g)||[]).length);

fs.writeFileSync(__dirname + '/../src/data/color-data.js', result, 'utf8');
console.log('Done');
