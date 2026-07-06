const fs = require('fs');
let src = fs.readFileSync(__dirname + '/../src/data/color-data.js', 'utf8');

const dynastyMap = {
  '黄': { dynasty: '隋', dynasties: ['隋','唐','宋'] },
  '鹅黄': { dynasty: '宋' },
  '缃色': { dynasty: '汉' },
  '琥珀': { dynasty: '唐' },
  '驼色': { dynasty: '唐' },
  '秋香色': { dynasty: '清' },
  '鸭黄': { dynasty: '宋' },
  '姜黄': { dynasty: '唐' },
  '橙黄': { dynasty: '唐' },
  '碧色': { dynasty: '唐' },
  '翠绿': { dynasty: '清' },
  '竹青': { dynasty: '宋' },
  '豆绿': { dynasty: '宋' },
  '松花绿': { dynasty: '清' },
  '油绿': { dynasty: '明', dynasties: ['明','清'] },
  '麴尘': { dynasty: '唐' },
  '鸭头绿': { dynasty: '宋' },
  '青': { dynasty: '先秦', dynasties: ['先秦','汉','唐'] },
  '靛蓝': { dynasty: '先秦' },
  '宝蓝': { dynasty: '清' },
  '藏青': { dynasty: '明', dynasties: ['明','清'] },
  '天青': { dynasty: '宋' },
  '月白': { dynasty: '明', dynasties: ['明','清'] },
  '石青': { dynasty: '宋' },
  '雨过天青': { dynasty: '宋' },
  '雪青': { dynasty: '清' },
  '藕荷': { dynasty: '清' },
  '紫檀': { dynasty: '明' },
  '紫': { dynasty: '唐' },
  '赭色': { dynasty: '先秦' },
  '古铜色': { dynasty: '周' },
  '酱色': { dynasty: '清' },
  '驼褐': { dynasty: '宋' },
  '香色': { dynasty: '清' },
  '丁香褐': { dynasty: '清' },
  '白': { dynasty: '商' },
  '银白': { dynasty: '唐' },
  '素色': { dynasty: '先秦' },
  '银鼠灰': { dynasty: '明', dynasties: ['明','清'] },
  '玄': { dynasty: '周' },
  '皂色': { dynasty: '周' },
  '墨色': { dynasty: '宋' },
  '煤黑': { dynasty: '宋' },
  '葱绿': { dynasty: '唐' },
};

const customPairs = {
  '赤': ['白', '玄', '金黄'],
  '朱红': ['金', '玄', '白'],
  '大红': ['金', '玄', '翠绿'],
  '胭脂': ['月白', '黛', '藕荷'],
  '银红': ['白', '月白', '翠绿'],
  '海棠红': ['白', '柳色', '豆绿'],
  '石榴红': ['金', '碧色', '象牙白'],
  '绛紫': ['金', '白', '月白'],
  '绯': ['白', '青', '金'],
  '酡色': ['月白', '黛', '竹青'],
  '茜色': ['白', '黛', '月白'],
  '枣红': ['米色', '金', '古铜色'],
  '彤色': ['玄', '白', '金'],
  '丹色': ['玄', '白', '金'],
  '殷红': ['玄', '金', '白'],
  '樱桃色': ['白', '黛', '藕荷'],
  '赫赤': ['金', '墨色', '米色'],
  '缙色': ['白', '青', '米色'],
  '鹅黄': ['白', '碧色', '紫'],
  '杏黄': ['棕', '赤', '白'],
  '黄': ['紫', '赤', '白'],
  '柘黄': ['玄', '赤', '黛'],
  '橘黄': ['白', '黛', '秋香色'],
  '秋香色': ['赤', '墨色', '驼色'],
  '缃色': ['紫', '黛', '赤'],
  '鸭黄': ['柳色', '白', '藕荷'],
  '姜黄': ['绛紫', '白', '墨色'],
  '琥珀': ['金', '白', '黛'],
  '驼色': ['白', '米色', '黛'],
  '缇色': ['玄', '白', '青'],
  '樱草色': ['白', '藕荷', '天青'],
  '米色': ['赤', '黛', '墨色'],
  '乳白': ['赤', '宝蓝', '金'],
  '苍黄': ['赤', '墨色', '白'],
  '碧色': ['白', '赤', '鹅黄'],
  '翠绿': ['金', '赤', '银红'],
  '竹青': ['白', '赭色', '藕荷'],
  '葱绿': ['桃红', '白', '鹅黄'],
  '豆绿': ['白', '藕荷', '檀色'],
  '艾青': ['桃红', '赤', '驼色'],
  '松花绿': ['金', '赤', '象牙白'],
  '草绿': ['赤', '白', '驼色'],
  '柳色': ['桃红', '杏黄', '白'],
  '油绿': ['赤', '白', '驼色'],
  '茶绿': ['白', '赭色', '藕荷'],
  '黛绿': ['白', '金', '赤'],
  '麴尘': ['赤', '白', '墨色'],
  '鸭头绿': ['白', '藕荷', '驼色'],
  '青': ['白', '赤', '黄'],
  '天青': ['白', '藕荷', '驼色'],
  '月白': ['胭脂', '黛', '竹青'],
  '靛蓝': ['白', '赤', '米色'],
  '宝蓝': ['白', '金', '银红'],
  '藏青': ['赤', '金', '象牙白'],
  '碧蓝': ['白', '鹅黄', '藕荷'],
  '石青': ['白', '赤', '驼色'],
  '雨过天青': ['白', '藕荷', '檀色'],
  '花青': ['白', '金', '赤'],
  '窃蓝': ['白', '藕荷', '驼色'],
  '缥色': ['赤', '黛', '白'],
  '绀色': ['金', '白', '赤'],
  '黛': ['白', '胭脂', '月白'],
  '黛蓝': ['白', '金', '银红'],
  '紫': ['白', '金', '碧色'],
  '紫檀': ['金', '白', '象牙白'],
  '丁香': ['白', '驼色', '藕荷'],
  '雪青': ['白', '烟色', '粉红'],
  '藕荷': ['月白', '黛', '竹青'],
  '绀紫': ['金', '白', '米色'],
  '槿紫': ['白', '驼色', '月白'],
  '赭色': ['青', '白', '米色'],
  '赭石': ['青', '白', '金'],
  '褐色': ['米色', '白', '青'],
  '棕色': ['米色', '赤', '白'],
  '茶色': ['白', '秋香色', '黛'],
  '栗色': ['米色', '金', '驼绒'],
  '檀色': ['白', '竹青', '米色'],
  '酱色': ['米色', '金', '青'],
  '古铜色': ['赤', '白', '金'],
  '黎色': ['赤', '白', '竹青'],
  '香色': ['赤', '白', '黛'],
  '棠梨色': ['白', '竹青', '米色'],
  '驼绒': ['赤', '白', '黛'],
  '驼褐': ['赤', '白', '金'],
  '丁香褐': ['白', '竹青', '藕荷'],
  '白': ['赤', '玄', '青'],
  '银白': ['宝蓝', '赤', '黛'],
  '象牙白': ['赤', '宝蓝', '金'],
  '鱼肚白': ['胭脂', '黛', '竹青'],
  '铅白': ['赤', '宝蓝', '墨色'],
  '雪白': ['赤', '黛', '宝蓝'],
  '素色': ['赤', '墨色', '竹青'],
  '灰色': ['赤', '宝蓝', '胭脂'],
  '银鼠灰': ['赤', '宝蓝', '胭脂'],
  '玄': ['赤', '白', '金'],
  '乌色': ['赤', '金', '白'],
  '皂色': ['赤', '金', '白'],
  '墨色': ['赤', '金', '白'],
  '缁色': ['金', '白', '赤'],
  '煤黑': ['赤', '金', '白'],
  '百草霜': ['金', '白', '赤'],
};

// Split file into objects by matching /^\s*\{/ to /\},/
const objects = [];
let i = 0;
while (i < src.length) {
  // Find next {
  const braceStart = src.indexOf('{', i);
  if (braceStart === -1 || braceStart < 10) break;
  
  // Count braces to find matching }
  let depth = 0;
  let braceEnd = braceStart;
  for (let j = braceStart; j < src.length; j++) {
    if (src[j] === '{') depth++;
    if (src[j] === '}') depth--;
    if (depth === 0) { braceEnd = j; break; }
  }
  
  // Get the full object including surrounding
  const objStart = src.lastIndexOf('  {', braceStart);
  const objEnd = Math.min(src.indexOf('},\n', braceEnd), src.indexOf('}\n', braceEnd));
  const objEnd2 = objEnd === -1 ? braceEnd + 1 : objEnd + 2;
  
  const objStr = src.slice(objStart, objEnd2);
  objects.push(objStr);
  i = objEnd2;
}

console.log('Found', objects.length, 'objects');

// Modify each object
const modified = objects.map(obj => {
  const nameMatch = obj.match(/name:\s*'([^']+)'/);
  if (!nameMatch) return obj;
  const name = nameMatch[1];
  
  let result = obj;
  let changes = [];
  
  // Add pairs if not present
  if (!obj.includes('pairs:') && customPairs[name]) {
    const pp = customPairs[name].map(p => `'${p}'`).join(', ');
    changes.push(`    pairs: [${pp}],`);
  }
  
  // Add dynasty if not present
  if (!obj.includes('dynasty:') && dynastyMap[name]) {
    const info = dynastyMap[name];
    if (info.dynasties) {
      const ds = info.dynasties.map(d => `'${d}'`).join(', ');
      changes.push(`    dynasty: '${info.dynasty}',`);
      changes.push(`    dynasties: [${ds}],`);
    } else {
      changes.push(`    dynasty: '${info.dynasty}',`);
    }
  }
  
  if (changes.length === 0) return obj;
  
  // Insert changes before 'tags:' line (or before 'origin:' if no tags)
  const insertPoint = obj.lastIndexOf('tags:');
  if (insertPoint !== -1) {
    const lineEnd = obj.indexOf('\n', insertPoint);
    const afterTags = obj.slice(lineEnd);
    const beforeTags = obj.slice(0, lineEnd);
    return beforeTags + '\n' + changes.join('\n') + afterTags;
  }
  
  // Fallback: insert before origin
  const originPoint = obj.lastIndexOf('origin:');
  if (originPoint !== -1) {
    const lineEnd = obj.indexOf('\n', originPoint);
    const beforeOrigin = obj.slice(0, lineEnd);
    const afterOrigin = obj.slice(lineEnd);
    return beforeOrigin + '\n' + changes.join('\n') + afterOrigin;
  }
  
  return obj;
});

// Reconstruct
let output = src.slice(0, src.indexOf('{'));
for (let m of modified) {
  output += m + '\n';
}
// Find the export line
const exportIdx = src.lastIndexOf('export');
output += src.slice(src.lastIndexOf('const colors')); // just in case

const pairCount = (output.match(/pairs:/g) || []).length;
const dynastyCount = (output.match(/dynasty:/g) || []).length;
console.log('Colors with pairs:', pairCount);
console.log('Colors with dynasty:', dynastyCount);

fs.writeFileSync(__dirname + '/../src/data/color-data.js', output, 'utf8');
console.log('Done');
