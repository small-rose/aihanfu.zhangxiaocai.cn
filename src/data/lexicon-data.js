export const categories = [
  { key: 'style', icon: '🎨', label: '风格', filename: '风格' },
  { key: 'scene', icon: '🏞️', label: '场景', filename: '场景' },
  { key: 'face', icon: '👤', label: '五官', filename: '五官' },
  { key: 'temperament', icon: '✨', label: '气质', filename: '气质' },
  { key: 'makeup', icon: '💄', label: '妆容', filename: '妆容' },
  { key: 'hairstyle', icon: '💇‍♀️', label: '发髻', filename: '发髻' },
  { key: 'garment', icon: '👗', label: '形制', filename: '形制' },
  { key: 'fabric', icon: '🧵', label: '面料', filename: '面料' },
  { key: 'color', icon: '🎨', label: '色彩', filename: '色彩' },
  { key: 'pattern', icon: '🌸', label: '纹样', filename: '纹样' },
  { key: 'accessory', icon: '💎', label: '配饰', filename: '配饰' },
  { key: 'footwear', icon: '👟', label: '鞋履', filename: '鞋履' }
]

const items = [
  // ===== 01 风格 =====
  { term: '秦汉典雅', en: "Qin-Han classical elegance", meaning: '庄重大气，深衣曲裾，古朴之风', category: 'style', sub: '朝代风格', tags: ['先秦', '汉'] },
  { term: '魏晋风骨', en: "Wei-Jin ethereal grace", meaning: '宽袍大袖，飘逸出尘，名士风度', category: 'style', sub: '朝代风格', tags: ['魏晋'] },
  { term: '唐风雍容', en: "Tang dynasty grandeur", meaning: '丰腴华贵，开放自信，盛唐气象', category: 'style', sub: '朝代风格', tags: ['唐'] },
  { term: '宋时清雅', en: "Song dynasty refined grace", meaning: '简约素净，内敛含蓄，理学之美', category: 'style', sub: '朝代风格', tags: ['宋'] },
  { term: '明制端庄', en: "Ming dynasty dignified", meaning: '繁复典雅，华贵庄重，礼制森然', category: 'style', sub: '朝代风格', tags: ['明'] },
  { term: '先秦古朴', en: "pre-Qin primitive simplicity", meaning: '质朴无华，上衣下裳，礼乐初成', category: 'style', sub: '朝代风格', tags: ['先秦'] },
  { term: '工笔画风', en: "gongbi meticulous painting", meaning: '线条精细，设色典雅，如宋画', category: 'style', sub: '画风参考', tags: [] },
  { term: '水墨写意', en: "ink wash freehand style", meaning: '浓淡相宜，气韵生动，逸笔草草', category: 'style', sub: '画风参考', tags: [] },
  { term: '敦煌壁画风', en: "Dunhuang mural style", meaning: '色彩浓郁，飞天飘带，佛教庄严', category: 'style', sub: '画风参考', tags: [] },
  { term: '唐代绮罗人物画', en: "Tang silk figure painting", meaning: '丰颊肥体，罗衣华服，周昉张萱遗风', category: 'style', sub: '画风参考', tags: ['唐'] },
  { term: '宋代院体画', en: "Song court painting style", meaning: '工整细腻，写实逼真，皇家气派', category: 'style', sub: '画风参考', tags: ['宋'] },
  { term: '明代版画', en: "Ming woodblock print style", meaning: '线条刚劲，黑白分明，木刻韵味', category: 'style', sub: '画风参考', tags: ['明'] },
  { term: '界画楼阁', en: "boundary painting architecture", meaning: '工笔界尺，楼阁精严，可游可居', category: 'style', sub: '画风参考', tags: [] },
  { term: '武侠古风', en: "martial arts fantasy", meaning: '仗剑天涯，快意恩仇，江湖气', category: 'style', sub: '文学意境', tags: [] },
  { term: '仙侠古风', en: "immortal fantasy style", meaning: '御剑飞行，仙门法术，缥缈九天', category: 'style', sub: '文学意境', tags: [] },
  { term: '仕女图风', en: "court lady painting style", meaning: '闺阁闲情，拈花微笑，唐寅笔下', category: 'style', sub: '文学意境', tags: [] },
  { term: '敦煌飞天', en: "Dunhuang flying apsaras", meaning: '天衣飞扬，满壁风动，伎乐天', category: 'style', sub: '文学意境', tags: [] },
  { term: '宫廷华贵', en: "imperial court splendor", meaning: '金碧辉煌，凤冠霞帔，皇家威仪', category: 'style', sub: '文学意境', tags: [] },
  { term: '市井烟火', en: "market street life", meaning: '寻常巷陌，贩夫走卒，人间百态', category: 'style', sub: '文学意境', tags: [] },
  { term: '田园隐逸', en: "pastoral seclusion", meaning: '采菊东篱，悠然南山，归园田居', category: 'style', sub: '文学意境', tags: [] },
  { term: '边塞苍凉', en: "frontier desolation", meaning: '大漠孤烟，长河落日，铁马冰河', category: 'style', sub: '文学意境', tags: [] },
  { term: '江南烟雨', en: "Jiangnan misty rain", meaning: '小桥流水，杏花春雨，吴侬软语', category: 'style', sub: '文学意境', tags: [] },
  { term: '神话志怪', en: "mythical supernatural", meaning: '精怪狐仙，山海经图，瑰丽奇幻', category: 'style', sub: '文学意境', tags: [] },
  { term: '清冷', en: "cool and aloof", meaning: '气质清冽，如霜如月，不可近观', category: 'style', sub: '美学气质', tags: [] },
  { term: '温婉', en: "gentle and warm", meaning: '柔美和顺，如春风拂柳', category: 'style', sub: '美学气质', tags: [] },
  { term: '华丽', en: "magnificent and opulent", meaning: '浓墨重彩，珠光宝气，张扬绚烂', category: 'style', sub: '美学气质', tags: [] },
  { term: '素雅', en: "plain and refined", meaning: '淡雅纯净，不施粉黛，天然去雕饰', category: 'style', sub: '美学气质', tags: [] },
  { term: '明艳', en: "bright and vivid", meaning: '光彩照人，艳丽夺目，如牡丹盛开', category: 'style', sub: '美学气质', tags: [] },
  { term: '沉静', en: "calm and tranquil", meaning: '静如止水，沉稳内敛，不露声色', category: 'style', sub: '美学气质', tags: [] },
  { term: '空灵', en: "ethereal and intangible", meaning: '清虚无物，如烟如雾，飘渺难寻', category: 'style', sub: '美学气质', tags: [] },
  { term: '秾丽', en: "rich and luxuriant", meaning: '色彩浓郁，丰艳华丽，如盛唐气象', category: 'style', sub: '美学气质', tags: [] },
  { term: '淡泊', en: "detached and indifferent", meaning: '不慕荣利，宁静致远，超然物外', category: 'style', sub: '美学气质', tags: [] },
  { term: '禅意', en: "Zen aesthetic", meaning: '空寂幽玄，枯山水境，一念清净', category: 'style', sub: '美学气质', tags: [] },
  { term: '仙气', en: "immortal aura", meaning: '缥缈出尘，不似凡间，凌波微步', category: 'style', sub: '美学气质', tags: [] },
  { term: '贵气', en: "noble aristocratic aura", meaning: '天生贵胄，不怒自威，钟鸣鼎食', category: 'style', sub: '美学气质', tags: [] },
  { term: '杀气', en: "deadly fierce aura", meaning: '凌厉锋锐，肃杀之气，十步一人', category: 'style', sub: '美学气质', tags: [] },
  { term: '书卷气', en: "scholarly literary aura", meaning: '腹有诗书，眉目清朗，儒雅蕴藉', category: 'style', sub: '美学气质', tags: [] },
  { term: '烟火气', en: "mundane earthly warmth", meaning: '寻常生活，柴米油盐，温暖可亲', category: 'style', sub: '美学气质', tags: [] },
  { term: '新中式', en: "modern Chinese, oriental elegance", meaning: '传统元素现代设计，古今融合', category: 'style', sub: '时代融合', tags: [] },
  { term: '汉洋折衷', en: "Chinese-Western fusion", meaning: '汉服与西洋元素混搭，跨时空美感', category: 'style', sub: '时代融合', tags: [] },
  { term: '赛博古风', en: "cyberpunk ancient fusion", meaning: '古典意境+赛博朋克，霓虹古韵', category: 'style', sub: '时代融合', tags: [] },
  { term: '水墨赛博', en: "ink wash cyberpunk", meaning: '水墨笔触+科技光影，东方科幻', category: 'style', sub: '时代融合', tags: [] },
  { term: '敦煌未来', en: "future Dunhuang style", meaning: '敦煌配色+未来感材质，千年之后', category: 'style', sub: '时代融合', tags: [] },

  // ===== 02 场景 =====
  { term: '宫殿', en: "palace hall", meaning: '帝王居所，金瓦朱墙，气势恢宏', category: 'scene', sub: '宫苑殿宇', tags: [] },
  { term: '回廊', en: "winding corridor", meaning: '曲折回环，光影交错，纵深延展', category: 'scene', sub: '宫苑殿宇', tags: [] },
  { term: '宫苑', en: "imperial garden", meaning: '皇家园林，亭台楼阁，奇花异石', category: 'scene', sub: '宫苑殿宇', tags: [] },
  { term: '御花园', en: "imperial botanical garden", meaning: '帝王游赏之处，花木繁盛，小桥流水', category: 'scene', sub: '宫苑殿宇', tags: [] },
  { term: '琼楼', en: "jade pavilion", meaning: '玉宇琼楼，天上宫阙，仙气缭绕', category: 'scene', sub: '宫苑殿宇', tags: [] },
  { term: '丹墀', en: "red palace steps", meaning: '宫殿前的红色台阶，朝仪之所', category: 'scene', sub: '宫苑殿宇', tags: [] },
  { term: '庭院', en: "courtyard garden", meaning: '四合院落，花木扶疏，日常起居', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '亭台', en: "pavilion terrace", meaning: '园林中休憩观景之建筑', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '水榭', en: "waterside pavilion", meaning: '临水而建的台榭，凭栏观鱼', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '长廊', en: "long covered corridor", meaning: '曲折漫长的走廊，壁画雕梁', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '月洞门', en: "moon gate", meaning: '圆形门洞，园林框景，别有洞天', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '假山', en: "rock garden", meaning: '叠石成山，曲径通幽，咫尺山林', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '竹林', en: "bamboo print", meaning: '修竹万竿，风过萧萧，清幽雅静', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '梅园', en: "plum blossom garden", meaning: '梅花如雪，暗香浮动，凌寒独放', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '牡丹亭', en: "peony pavilion", meaning: '牡丹花丛中的亭子，富贵雍容', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '荷塘', en: "lotus pond", meaning: '莲叶田田，荷花映日，水波不兴', category: 'scene', sub: '园林庭院', tags: [] },
  { term: '山间', en: "mountain landscape", meaning: '层峦叠嶂，云雾缭绕，空山新雨', category: 'scene', sub: '山水自然', tags: [] },
  { term: '湖畔', en: "lakeside", meaning: '碧波万顷，烟波浩渺，水天一色', category: 'scene', sub: '山水自然', tags: [] },
  { term: '溪边', en: "streamside", meaning: '清溪潺潺，卵石散布，涉水而行', category: 'scene', sub: '山水自然', tags: [] },
  { term: '泉旁', en: "beside a spring", meaning: '泉水叮咚，清冽甘甜，取水烹茶', category: 'scene', sub: '山水自然', tags: [] },
  { term: '松林', en: "pine forest", meaning: '古松参天，虬枝盘曲，松涛阵阵', category: 'scene', sub: '山水自然', tags: [] },
  { term: '枫林', en: "maple forest", meaning: '秋枫如火，层林尽染，落叶满阶', category: 'scene', sub: '山水自然', tags: [] },
  { term: '柳岸', en: "willow bank", meaning: '垂柳依依，拂水含烟，送别之所', category: 'scene', sub: '山水自然', tags: [] },
  { term: '桃林', en: "peach blossom forest", meaning: '桃花灼灼，落英缤纷，世外桃源', category: 'scene', sub: '山水自然', tags: [] },
  { term: '瀑布', en: "waterfall", meaning: '飞流直下，水雾蒸腾，虹霓隐现', category: 'scene', sub: '山水自然', tags: [] },
  { term: '古寺', en: "ancient temple", meaning: '千年古刹，梵音袅袅，香火缭绕', category: 'scene', sub: '寺庙佛窟', tags: [] },
  { term: '佛窟', en: "Buddhist grotto", meaning: '石窟佛像，庄严静穆，壁绘飞天', category: 'scene', sub: '寺庙佛窟', tags: [] },
  { term: '禅院', en: "Zen monastery", meaning: '清静禅院，竹影扫阶，晨钟暮鼓', category: 'scene', sub: '寺庙佛窟', tags: [] },
  { term: '经幢', en: "sutra pillar", meaning: '刻经石幢，法轮常转，梵文环绕', category: 'scene', sub: '寺庙佛窟', tags: [] },
  { term: '塔', en: "pagoda", meaning: '佛塔高耸，风铃叮当，登临远眺', category: 'scene', sub: '寺庙佛窟', tags: [] },
  { term: '市集', en: "marketplace", meaning: '人声鼎沸，货摊鳞次，百业兴旺', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '酒肆', en: "tavern", meaning: '酒旗招展，酒香四溢，豪客云集', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '茶楼', en: "teahouse", meaning: '茶香袅袅，说书弹唱，闲话古今', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '客栈', en: "inn", meaning: '歇脚过客，人来人往，江湖驿站', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '戏台', en: "opera stage", meaning: '锣鼓喧天，生旦净丑，悲欢离合', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '桥头', en: "bridge", meaning: '古桥横跨，行人往来，流水潺潺', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '画舫', en: "pleasure boat", meaning: '彩绘游船，笙歌彻夜，秦淮风月', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '城楼', en: "city gate tower", meaning: '城墙巍峨，旌旗猎猎，守卫森严', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '灯会', en: "lantern festival", meaning: '花灯如昼，鱼龙夜舞，火树银花', category: 'scene', sub: '市井街巷', tags: [] },
  { term: '春晓', en: "spring dawn", meaning: '春日清晨，鸟语花香，万物复苏', category: 'scene', sub: '季节天候', tags: ['春'] },
  { term: '夏荷', en: "summer lotus", meaning: '夏日荷花，蝉鸣高树，浓荫蔽日', category: 'scene', sub: '季节天候', tags: ['夏'] },
  { term: '秋枫', en: "autumn maple", meaning: '秋风萧瑟，落叶满径，天高云淡', category: 'scene', sub: '季节天候', tags: ['秋'] },
  { term: '冬雪', en: "winter snow", meaning: '大雪纷飞，天地一白，红梅映雪', category: 'scene', sub: '季节天候', tags: ['冬'] },
  { term: '月夜', en: "moonlit night", meaning: '明月当空，清辉如水，夜色静谧', category: 'scene', sub: '季节天候', tags: ['夜'] },
  { term: '晨雾', en: "morning mist", meaning: '晨雾迷蒙，远山如黛，若隐若现', category: 'scene', sub: '季节天候', tags: ['晨'] },
  { term: '黄昏', en: "dusk", meaning: '夕阳西下，暮色苍茫，归鸟投林', category: 'scene', sub: '季节天候', tags: ['晚'] },
  { term: '雨后', en: "after rain", meaning: '雨过天晴，空气清新，草木含露', category: 'scene', sub: '季节天候', tags: ['雨'] },
  { term: '雪中', en: "in snow", meaning: '飞雪漫天，万物覆白，踏雪寻梅', category: 'scene', sub: '季节天候', tags: ['冬', '雪'] },
  { term: '花朝', en: "flower festival", meaning: '百花生日，踏青赏花，少女游春', category: 'scene', sub: '季节天候', tags: ['春'] },
  { term: '书房', en: "study room", meaning: '笔墨纸砚，琴棋书画，明窗净几', category: 'scene', sub: '书斋雅室', tags: ['室内'] },
  { term: '闺阁', en: "womens chamber", meaning: '女子居室，绣床妆台，纱幔低垂', category: 'scene', sub: '书斋雅室', tags: ['室内'] },
  { term: '琴室', en: "guqin room", meaning: '焚香抚琴，余音绕梁，静心之所', category: 'scene', sub: '书斋雅室', tags: ['室内'] },
  { term: '茶寮', en: "tea hut", meaning: '茅草茶亭，粗陶茶具，山泉煮茗', category: 'scene', sub: '书斋雅室', tags: [] },
  { term: '画斋', en: "painting studio", meaning: '画家工作室，画案笔架，墨香四溢', category: 'scene', sub: '书斋雅室', tags: ['室内'] },
  { term: '佛堂', en: "Buddhist shrine", meaning: '供奉佛像，檀香缭绕，蒲团跪拜', category: 'scene', sub: '书斋雅室', tags: ['室内'] },

  // ===== 03 面容五官 =====
  { term: '鹅蛋脸', en: "oval face", meaning: '椭圆脸型，端庄秀丽，中国传统审美典范', category: 'face', sub: '脸型', tags: [] },
  { term: '瓜子脸', en: "heart-shaped face", meaning: '上宽下尖，秀气精致，如瓜子形', category: 'face', sub: '脸型', tags: [] },
  { term: '圆脸', en: "round face", meaning: '饱满圆润，亲切可爱，减龄显幼', category: 'face', sub: '脸型', tags: [] },
  { term: '方脸', en: "square face", meaning: '下颌方正，大气稳重，有骨骼感', category: 'face', sub: '脸型', tags: [] },
  { term: '长脸', en: "long face", meaning: '纵向较长，成熟知性，古典清秀', category: 'face', sub: '脸型', tags: [] },
  { term: '心形脸', en: "heart-shaped face", meaning: '宽额尖下巴，如倒三角，上镜甜美', category: 'face', sub: '脸型', tags: [] },
  { term: '菱形脸', en: "diamond face", meaning: '颧骨突出，额头下巴收窄，立体有型', category: 'face', sub: '脸型', tags: [] },
  { term: '丹凤眼', en: "phoenix eye", meaning: '眼型细长，眼尾微上扬，古典东方美', category: 'face', sub: '眼型', tags: [] },
  { term: '桃花眼', en: "peach blossom eyes", meaning: '眼型似桃花花瓣，眼尾微垂，含情脉脉', category: 'face', sub: '眼型', tags: [] },
  { term: '杏眼', en: "almond eyes", meaning: '眼圆如杏核，黑白分明，清纯灵动', category: 'face', sub: '眼型', tags: [] },
  { term: '狐狸眼', en: "fox eyes", meaning: '眼型狭长上挑，妩媚妖娆，有狐媚感', category: 'face', sub: '眼型', tags: [] },
  { term: '瑞凤眼', en: "auspicious phoenix eyes", meaning: '形似丹凤但更圆润，目光温和，贵气端庄', category: 'face', sub: '眼型', tags: [] },
  { term: '垂眼', en: "downturned eyes", meaning: '眼尾自然下垂，天生含愁，楚楚可怜', category: 'face', sub: '眼型', tags: [] },
  { term: '细长眼', en: "narrow elongated eyes", meaning: '眼型窄长，单眼皮或内双，清冷疏离', category: 'face', sub: '眼型', tags: [] },
  { term: '悬胆鼻', en: "hanging gallnut nose", meaning: '鼻梁挺直，鼻头圆润如悬胆，标准美鼻', category: 'face', sub: '鼻型', tags: [] },
  { term: '挺直鼻', en: "straight nose bridge", meaning: '鼻梁高挺笔直，线条利落，英气', category: 'face', sub: '鼻型', tags: [] },
  { term: '小巧鼻', en: "small delicate nose", meaning: '鼻子小巧精致，秀气可爱', category: 'face', sub: '鼻型', tags: [] },
  { term: '秀气鼻', en: "elegant nose", meaning: '整体线条柔和秀美，精致但不突兀', category: 'face', sub: '鼻型', tags: [] },
  { term: '圆润鼻', en: "rounded nose", meaning: '鼻头圆润有肉，亲和可爱，福气相', category: 'face', sub: '鼻型', tags: [] },
  { term: '樱桃小口', en: "tiny cherry lips", meaning: '唇小而厚，形如樱桃，古典仕女标志', category: 'face', sub: '唇型', tags: [] },
  { term: '花瓣唇', en: "petal lips", meaning: '唇形似花瓣，轮廓分明，饱满柔软', category: 'face', sub: '唇型', tags: [] },
  { term: '薄唇', en: "thin lips", meaning: '上下唇薄而细长，清冷寡淡，有倔强感', category: 'face', sub: '唇型', tags: [] },
  { term: '厚唇', en: "full lips", meaning: '上下唇饱满丰厚，性感热情，有冲击力', category: 'face', sub: '唇型', tags: [] },
  { term: 'M唇', en: "M-shaped lips", meaning: '唇峰明显呈M形，立体精致，微笑唇形', category: 'face', sub: '唇型', tags: [] },
  { term: '微笑唇', en: "smiling lips", meaning: '嘴角自然上扬，不笑亦含笑，亲切甜美', category: 'face', sub: '唇型', tags: [] },
  { term: '肤如凝脂', en: "creamy white skin", meaning: '皮肤白皙细腻如凝固的脂肪', category: 'face', sub: '肤色', tags: [] },
  { term: '冰肌玉骨', en: "icy skin jade bones", meaning: '皮肤如冰般清透，骨骼如玉般莹润', category: 'face', sub: '肤色', tags: [] },
  { term: '肤如蜜色', en: "honey-toned skin", meaning: '皮肤呈温暖的蜜色，健康阳光', category: 'face', sub: '肤色', tags: [] },
  { term: '白皙', en: "fair white skin", meaning: '皮肤白净透亮', category: 'face', sub: '肤色', tags: [] },
  { term: '红润', en: "rosy complexion", meaning: '面色红润有光泽，气血充盈', category: 'face', sub: '肤色', tags: [] },

  // ===== 04 气质 =====
  { term: '端庄典雅', en: "dignified and elegant", meaning: '仪态庄重，举止优雅，大家风范', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '温婉恬静', en: "gentle and serene", meaning: '温柔娴静，不争不抢，岁月静好', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '妩媚灵动', en: "charming and lively", meaning: '姿态娇媚，眼波流转，明艳活泼', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '明艳动人', en: "bright and stunning", meaning: '容貌艳丽，光彩照人，见之忘俗', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '清冷出尘', en: "cool and ethereal", meaning: '气质清冷如霜，超脱尘世', category: 'temperament', sub: '女子气质', tags: ['女', '中'] },
  { term: '娇俏可人', en: "adorable and lovely", meaning: '娇小可爱，俏皮活泼，天真烂漫', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '雍容华贵', en: "graceful and noble", meaning: '仪态大方，气度不凡，高贵典雅', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '我见犹怜', en: "endearingly vulnerable", meaning: '柔弱楚楚，惹人怜爱，不忍触碰', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '秀丽端庄', en: "pretty and dignified", meaning: '清秀美丽，仪态端正，温良恭俭', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '妖娆妩媚', en: "alluring and seductive", meaning: '妖冶动人，媚态横生，摄人心魄', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '清新脱俗', en: "fresh and refined", meaning: '清雅新颖，不落俗套，如出水芙蓉', category: 'temperament', sub: '女子气质', tags: ['女', '中'] },
  { term: '柔美含蓄', en: "soft and reserved", meaning: '柔和优美，内敛含蓄，东方韵味', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '风情万种', en: "irresistibly charming", meaning: '风韵十足，一颦一笑皆有情', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '冰清玉洁', en: "pure and chaste", meaning: '品性高洁，纯净无瑕，不可亵玩', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '娴静优雅', en: "quiet and elegant", meaning: '文静安闲，举止优雅，岁月静好', category: 'temperament', sub: '女子气质', tags: ['女'] },
  { term: '儒雅温润', en: "cultured and gentle", meaning: '谦谦君子，温润如玉，如沐春风', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '豪迈不羁', en: "bold and unrestrained", meaning: '胸怀豪放，不拘小节，洒脱自在', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '剑眉星目', en: "sword brows starry eyes", meaning: '眉如剑锋，目如星辰，英气逼人', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '器宇轩昂', en: "imposing and dignified", meaning: '气度不凡，精神饱满，仪表堂堂', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '风流倜傥', en: "dashing and romantic", meaning: '才华横溢，潇洒不羁，魅力非凡', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '玉树临风', en: "graceful as jade tree", meaning: '姿容秀美，风度翩翩，如风中玉树', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '潇洒飘逸', en: "free and spirited", meaning: '洒脱自然，超凡脱俗，不受羁绊', category: 'temperament', sub: '男子气质', tags: ['男', '中'] },
  { term: '深沉内敛', en: "deep and reserved", meaning: '心思深沉，不外露，胸有丘壑', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '凛然正气', en: "righteous and awe-inspiring", meaning: '正气凛然，刚正不阿，浩然之气', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '英武果敢', en: "valiant and decisive", meaning: '英勇威武，果断敢为，大将之风', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '文质彬彬', en: "scholarly and refined", meaning: '文雅质朴，彬彬有礼，君子之风', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '放浪形骸', en: "uninhibited and carefree", meaning: '不拘礼法，率性而为，魏晋风度', category: 'temperament', sub: '男子气质', tags: ['男'] },
  { term: '超凡脱俗', en: "extraordinary and refined", meaning: '超越凡尘，不染俗世，神仙中人', category: 'temperament', sub: '中性仙气', tags: ['中'] },
  { term: '仙风道骨', en: "immortal-like bearing", meaning: '有仙人之姿，修道之风，超然物外', category: 'temperament', sub: '中性仙气', tags: ['中'] },
  { term: '不食烟火', en: "ethereal otherworldly", meaning: '不食人间烟火，纯净空灵，世外之人', category: 'temperament', sub: '中性仙气', tags: ['中'] },
  { term: '飘逸出尘', en: "transcendent and elegant", meaning: '飘然若仙，不落尘俗，不染凡尘', category: 'temperament', sub: '中性仙气', tags: ['中'] },
  { term: '空灵澄澈', en: "ethereal and clear", meaning: '心境空明，清澈见底，玲珑剔透', category: 'temperament', sub: '中性仙气', tags: ['中'] },
  { term: '遗世独立', en: "solitary and transcendent", meaning: '超然独立于世间，孤高清冷，卓尔不群', category: 'temperament', sub: '中性仙气', tags: ['中'] },
  { term: '英姿飒爽', en: "valiant and spirited", meaning: '英武矫健，豪迈洒脱，巾帼不让须眉', category: 'temperament', sub: '动态气质', tags: ['动'] },
  { term: '灵动活泼', en: "lively and agile", meaning: '活泼好动，机灵可爱，充满生气', category: 'temperament', sub: '动态气质', tags: ['动'] },
  { term: '矫健有力', en: "vigorous and powerful", meaning: '动作有力，身姿矫健，充满力量感', category: 'temperament', sub: '动态气质', tags: ['动'] },
  { term: '飘逸如风', en: "floating like the wind", meaning: '行动轻盈，衣袂飘飘，如风拂柳', category: 'temperament', sub: '动态气质', tags: ['动'] },
  { term: '顾盼神飞', en: "radiant and spirited", meaning: '目光流转，神采飞扬，意气风发', category: 'temperament', sub: '动态气质', tags: ['动'] },
  { term: '回眸百媚', en: "enchanting backward glance", meaning: '回首一望，百媚俱生，动人心魄', category: 'temperament', sub: '动态气质', tags: ['动'] },
  { term: '疏离感', en: "aloof, distant aura", meaning: '与人保持距离，孤寂冷淡，不易亲近', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '破碎感', en: "fragile, broken beauty", meaning: '脆弱易碎，伤痕累累，凄美动人', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '宿命感', en: "fateful, doomed aura", meaning: '命中注定的悲凉，无力回天的沧桑', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '悲悯', en: "compassionate, merciful", meaning: '心怀慈悲，怜爱众生，菩萨低眉', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '肃杀', en: "stern, deadly aura", meaning: '杀气凛冽，气氛压抑，暴风雨前', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '慵懒', en: "languid, lazy charm", meaning: '懒散闲适，漫不经心，午后阳光', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '幽怨', en: "melancholic, plaintive", meaning: '心中含怨，郁郁寡欢，深闺愁绪', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '恬淡', en: "placid, indifferent", meaning: '淡然处之，不悲不喜，心如止水', category: 'temperament', sub: '氛围气质', tags: ['氛'] },
  { term: '凛冽', en: "chilling, fierce aura", meaning: '锋利寒冷，气势凌厉，如冬夜北风', category: 'temperament', sub: '氛围气质', tags: ['氛'] },

  // ===== 05 妆容 =====
  { term: '远山眉', en: "distant mountain brow", meaning: '眉色如远山青色，细长淡雅', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '柳叶眉', en: "willow leaf brow", meaning: '形如柳叶，细长弯柔，唐代典型眉形', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '蛾眉', en: "moth-antennae brow", meaning: '眉形如蚕蛾触须，弯曲细长，先秦至唐流行', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '剑眉', en: "sword brow", meaning: '眉形如剑，直而有力，英气十足', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '愁眉', en: "worried brows", meaning: '眉头微蹙呈愁态，八字眉形，汉代流行', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '一字眉', en: "straight brows", meaning: '平直一字，简约大方，现代古风皆可', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '却月眉', en: "half-moon brow", meaning: '短弯如新月，秀气内敛，唐代流行', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '桂叶眉', en: "cinnamon leaf brow", meaning: '短阔浓眉如桂叶，盛唐流行', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '倒晕眉', en: "reverse-blend brow", meaning: '眉色内深外浅渐变，宋代流行', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '小山眉', en: "little hill brows", meaning: '眉形如小山起伏，远山眉之变体', category: 'makeup', sub: '眉妆', tags: [] },
  { term: '绛唇', en: "crimson lips", meaning: '深红色唇妆，庄重高贵', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '檀口', en: "sandalwood lips", meaning: '浅红色唇妆，如檀木之色，温润含蓄', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '点唇', en: "dotted lips", meaning: '以小笔点染唇心，形如樱桃', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '元宝唇', en: "ingot-shaped lips", meaning: '上唇如元宝形，饱满富态', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '花瓣唇', en: "petal lips", meaning: '唇形如花瓣分层，自然娇嫩', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '蝴蝶唇', en: "butterfly lip", meaning: '上下唇分四点染红如蝶翅，唐代特色', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '内样唇', en: "inner-tint lip", meaning: '仅染唇内侧，缩小唇形，宋代流行', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '大红春', en: "bright vermillion lip", meaning: '明亮的朱红色唇，唐代正宗', category: 'makeup', sub: '唇妆', tags: [] },
  { term: '露珠儿', en: "dewdrop lip", meaning: '透明淡妆唇，若有若无，天然感', category: 'makeup', sub: '唇妆', tags: [] },
  // -- 花钿（独立二级分类） --
  { term: '梅花钿', en: "plum blossom huadian", meaning: '五瓣梅花形额饰，南朝寿阳公主始（梅花妆）', category: 'makeup', sub: '花钿', tags: [] },
  { term: '莲花钿', en: "lotus huadian", meaning: '莲花形额饰，佛教影响', category: 'makeup', sub: '花钿', tags: [] },
  { term: '牡丹钿', en: "peony huadian", meaning: '牡丹花形额饰，华贵富丽', category: 'makeup', sub: '花钿', tags: [] },
  { term: '翠钿', en: "kingfisher huadian", meaning: '以翠鸟羽毛贴制的蓝色花钿', category: 'makeup', sub: '花钿', tags: [] },
  { term: '金钿', en: "gold huadian", meaning: '金箔制成的花形额饰', category: 'makeup', sub: '花钿', tags: [] },
  { term: '珠钿', en: "pearl huadian", meaning: '以小珍珠缀成的花钿', category: 'makeup', sub: '花钿', tags: [] },
  { term: '花黄', en: "flower yellow huadian", meaning: '黄色花形额饰，六朝流行"对镜贴花黄"', category: 'makeup', sub: '花钿', tags: [] },
  // -- 面饰（其他面部装饰） --
  { term: '面靥', en: "cheek dimple dot", meaning: '点在面颊酒窝处的红点装饰', category: 'makeup', sub: '面饰', tags: [] },
  { term: '斜红', en: "diagonal red mark", meaning: '太阳穴两侧的红色装饰，如两道红痕', category: 'makeup', sub: '面饰', tags: [] },
  { term: '额黄', en: "forehead yellow tint", meaning: '额前涂黄色，六朝至唐流行，佛教影响', category: 'makeup', sub: '面饰', tags: [] },
  { term: '鸦黄', en: "crow yellow", meaning: '以鸦黄色涂额，额黄之一种', category: 'makeup', sub: '面饰', tags: [] },
  { term: '铅粉妆', en: "white lead powder base", meaning: '以铅粉敷面，极致白皙，唐代盛行', category: 'makeup', sub: '底妆', tags: [] },
  { term: '三白妆', en: "three whites makeup", meaning: '额、鼻、下颌三处提白，宋代清雅妆', category: 'makeup', sub: '底妆', tags: [] },
  { term: '酒晕妆', en: "drunken flush", meaning: '双颊浓胭脂如醉酒后红晕，唐代流行', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '桃花妆', en: "peach blossom base", meaning: '浅胭脂晕染双颊，如桃花初绽', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '飞霞妆', en: "flying sunset cheek", meaning: '胭脂从颧骨向上晕染至眉梢，如霞飞满面', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '晓霞妆', en: "morning glow marks", meaning: '面颊两侧晕染红霞状，如朝霞映面', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '啼妆', en: "weeping makeup", meaning: '妆容似啼哭后的残妆，东汉权臣梁冀妻首创', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '檀晕妆', en: "sandalwood blended base", meaning: '以檀色(浅红)晕染面颊，宋代淡雅妆', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '北苑妆', en: "northern garden cheek", meaning: '淡胭脂轻扫，宋代宫廷淡妆', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '唐宫梅花妆', en: "Tang plum blossom makeup", meaning: '眉心梅花钿+斜红+蛾眉+樱桃口，全套唐宫妆', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '大唐桃花妆', en: "Tang peach blossom makeup", meaning: '铅粉底+蛾眉+花钿+斜红+樱桃口，唐风代表', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '宋雅妆', en: "Song elegant makeup", meaning: '淡雅素妆+檀晕+柳叶眉+小唇，宋代代表妆', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '明妆', en: "Ming delicate makeup", meaning: '粉面淡妆+纤细眉+红点唇，明清风韵', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '六朝额黄妆', en: "Six Dynasties yellow forehead", meaning: '额涂黄色+淡扫眉，六朝代表性妆容', category: 'makeup', sub: '妆面风格', tags: [] },
  { term: '清透裸妆', en: "fresh no-makeup", meaning: '近乎素颜，仅稍加修饰，天然去雕饰', category: 'makeup', sub: '妆面风格', tags: [] },

    // ===== 06 发髻 =====
  { term: '披发', pinyin: 'pī fà', detail: "披发是上古先民最原始的发式状态，也是发髻文化的起点。在生产力极为低下的原始社会，先民尚无梳理头发的工具与意识，头发自然披散。进入文明社会后，披发逐渐被视为\"未开化\"的象征，转为未成年人的发式或特定礼仪场合的装束。《礼记·王制》载\"东方曰夷，被发文身\"，即描述周边民族披发的习俗。在华夏礼制确立后，成年人蓄发束髻成为正统，披发渐退出主流。", meaning: '头发自然披散不加约束，最原始的发式', category: 'hairstyle', sub: '通用', identity: '原始先民、儿童', tags: [] },
  { term: '辫发', pinyin: 'biàn fà', detail: "编发是新石器时代晚期就已成熟的发式技艺。1976年殷墟妇好墓出土的圆雕玉人，头顶编一长辫，辫根在右耳后侧，上盘头顶，下绕经左耳后，辫梢回接辫根——这是迄今最直观的商代编发形象。辫发是华夏先民从披发向发髻演进的关键过渡形态。周代以后，辫发在中原成人中逐渐让位于盘髻，但在边疆民族中长期延续。值得注意的是，商周时期已有将辫发盘绕成髻的做法，即\"辫发为髻\"——考古人员曾在湖北江陵九店东周墓中解开女性死者发髻，发现是将头发分成数股编好后盘绕成形。", meaning: '将头发编成辫子垂于脑后或盘绕成髻', category: 'hairstyle', sub: '通用', dynasty: '商周', identity: '各阶层', tags: [] },
  { term: '椎髻', pinyin: 'chuí jì', detail: "（同原第3条/第7条）椎髻是中国最古老且延续时间最长的发式之一，男女通用。战国至秦汉男性普遍梳此发式。《汉书·陆贾传》载\"尉佗魋结\"（魋结即椎髻），\"今兵士椎头髻也\"，说明秦汉兵士亦梳椎髻。已录入本词库古代女子发髻部分。", meaning: '将头发盘卷成椎形垂于脑后，男女通用，最古老发髻之一', category: 'hairstyle', sub: '结椎式', dynasty: '先秦', identity: '各阶层', tags: ['汉'] },
  { term: '堕马髻', pinyin: 'duò mǎ jì', detail: "堕马髻是中国古代极负盛名的一款发髻，由东汉梁冀妻孙寿所创。《后汉书·梁冀传》载：\"寿色美而善为妖态，作愁眉、啼妆、堕马髻。\"《后汉书·五行志》亦载：\"桓帝元嘉中，京都妇女作愁眉、啼妆、堕马髻……始自大将军梁冀家所为，京都歙然，诸夏皆仿效。\"其梳编法是：由正中开缝，分发双颞（两侧鬓发），至颈后集为一股挽成大椎，在髻中分出一绺头发朝一侧垂下——此绺垂发即\"垂髾\"。整体呈现一种娇弱无力、慵懒妩媚之态。东汉以后此髻渐少，至魏晋绝迹。唐代复现的\"倭堕髻\"实为名同形异的新发式。", meaning: '发髻偏垂一侧如堕马之态，东汉梁冀妻孙寿所创', category: 'hairstyle', sub: '结椎式', dynasty: '东汉', identity: '贵族女性', tags: ['汉'] },
  { term: '奉圣髻', pinyin: 'fèng shèng jì', detail: "据《中华古今注》载：\"至汉高祖，又令宫人梳奉圣髻。\"这是汉代第一个以皇帝诏令推行的发髻形式。奉圣髻体现了汉初宫廷崇尚庄重肃穆之风，髻形较高，造型端严，多用于朝会、祭祀等正式场合。", meaning: '汉高祖诏令宫人所梳高髻，形制端严', category: 'hairstyle', sub: '盘叠式', dynasty: '西汉', identity: '宫人', tags: ['汉'] },
  { term: '十二鬟髻', pinyin: 'shí èr huán jì', detail: "《中华古今注》载\"武帝又令梳十二鬟髻\"。十二鬟髻以十二为极数，象征尊贵完美。从\"九鬟\"\"十二鬟\"的命名规律可看出汉代宫廷女子以鬟环数量多为美的审美取向，这对后世\"高鬟\"\"叠鬟\"风气影响深远。汉武帝时西王母降临传说盛行，此发式与仙道信仰密切相关。", meaning: '将头发梳成十二个鬟环，武帝时宫廷流行', category: 'hairstyle', sub: '结鬟式', dynasty: '西汉', identity: '宫人', tags: ['汉'] },
  { term: '瑶台髻', pinyin: 'yáo tái jì', detail: "《中华古今注》载\"（汉）灵帝又令梳瑶台髻\"。瑶台为神话中仙人居所（李白诗\"遥见仙人彩云里，手把芙蓉朝玉京\"即指瑶台），此髻以瑶台为名，髻形高耸巍峨。灵帝时期宫廷风气奢靡，发髻不断向高大方向发展，瑶台髻正是此风产物。", meaning: '高髻如瑶台高耸，灵帝时宫人发式', category: 'hairstyle', sub: '盘叠式', dynasty: '东汉', identity: '宫人', tags: ['汉'] },
  { term: '不聊生髻', pinyin: 'bù liáo shēng jì', detail: "不聊生髻是东汉后期出现的一种特殊发式，因形制散乱、仿佛仓促间梳成而得名。\"不聊生\"本义为\"无暇谋生\"，在此形容发髻犹如忙碌无暇打理时的松散状态。但实际上这是一种刻意为之的\"慵懒妆\"，与堕马髻、愁眉、啼妆等共同构成东汉末年贵族女性追求的病态美风尚，反映了汉末社会动荡时期特殊的审美心理。", meaning: '发髻形似不暇梳妆的散乱之态，东汉病态美风尚', category: 'hairstyle', sub: '结椎式', dynasty: '东汉', identity: '贵族女性', tags: ['汉'] },
  { term: '三角髻', pinyin: 'sān jiǎo jì', detail: "三角髻见载于《汉武帝内传》：\"（上元）夫人年可二十余……头作三角髻，余发散垂至腰。\"上元夫人即道教神话中的女仙，此发式将头发在头顶梳成三个角状髻，其余长发自然散垂至腰部。这种\"上髻下披\"的独特造型在历代发式中极为罕见，成为后世道释人物画中仙女的经典发式之一。宋代以后在民间亦有模仿。", meaning: '头顶梳三个角状髻，余发散垂至腰，仙女发式', category: 'hairstyle', sub: '反绾式', dynasty: '西汉', identity: '仙女', tags: ['汉'] },
  { term: '垂鬟分肖髻', pinyin: 'chuí huán fēn xiào jì', detail: "（同原第3条）垂鬟分肖髻是古代未出室少女的典型发式。将头发分成数股，在头顶挽成小鬟（环形发髻），但不以支柱托高，而是任其自然下垂，再束结出一条稍长的发尾垂于肩上，状如燕尾，故亦称\"燕尾\"。据《国宪家猷》记载：\"汉明帝令宫人梳百花分肖髻。\"唐代常作为处女发式标志。《红楼梦》中林黛玉初入贾府时即梳此类发式。", meaning: '发分股结鬟于顶自然下垂，束结肖尾垂肩上', category: 'hairstyle', sub: '结鬟式', dynasty: '汉', identity: '未婚少女', tags: ['唐'] },
  { term: '灵蛇髻', pinyin: 'líng shé jì', detail: "灵蛇髻相传为曹魏文帝妻甄后所创。《采兰杂志》记载：甄后入魏宫后，宫中有一绿蛇，口中恒吐赤珠，不伤人。每日甄后梳妆时，绿蛇辄盘结成一髻形状出现在她面前，甄后异之，因而效仿蛇形梳髻，巧夺天工，每日发型皆不同，号为\"灵蛇髻\"。其梳编法是将头发掠至头顶，编成一股、双股或多股，然后盘成各种环形，扭转自如。顾恺之《洛神赋图》中洛神所梳即为灵蛇髻之变体。后世\"飞天髻\"即由此演变而成。", meaning: '髻式如游蛇蜿蜒蟠曲，曹魏甄后所创', category: 'hairstyle', sub: '拧旋式', dynasty: '曹魏', identity: '贵族女性', tags: ['魏晋'] },
  { term: '反绾髻', pinyin: 'fǎn wǎn jì', detail: "反绾髻是反绾式发髻的代表和源头。据段成式《髻鬟品》记载，魏武帝（曹操）宫中宫妃已梳反绾髻。其梳编法是将头发往后拢结于顶，用丝线结扎后向不同方向翻绾，可形成多种形态。唐代《妆台记》载\"唐武德中梳半翻髻，又梳反绾髻\"，说明反绾髻延续至唐代仍深受欢迎。双刀髻、惊鹄髻、朝天髻、元宝髻等皆属反绾髻的变体，因此反绾式是整个发髻体系中最重要的类别之一。", meaning: '发拢后反绾于顶，反绾式基础发式', category: 'hairstyle', sub: '反绾式', dynasty: '曹魏', identity: '宫妃', tags: ['魏晋', '唐'] },
  { term: '百花髻', pinyin: 'bǎi huā jì', detail: "百花髻是反绾式中的一种华丽变体。《髻鬟品》载\"魏武帝令宫人梳反绾髻，又梳百花髻\"。其梳编法是将多股头发经反绾手法翻绾出类似花瓣的层次，髻形如百花绽放。这一命名方式开创了以花喻髻的传统，对唐代\"花髻\"\"芙蓉髻\"等产生了直接影响。", meaning: '多股头发翻绾成花式如百花绽放', category: 'hairstyle', sub: '反绾式', dynasty: '曹魏', identity: '贵族女性', tags: ['魏晋'] },
  { term: '惊鹄髻', pinyin: 'jīng hú jì', detail: "惊鹄髻属于反绾式发髻之一。《中华古今注》载：\"魏宫人好画长眉，令作蛾眉惊鹄髻。\"其梳编法是将发拢上反绾，绾成惊鸟双翼欲展之势，生动而有趣。髻形像受惊的天鹅（鹄鸟）展开双翼。兴于魏宫，流行于南北朝，至唐及五代仍盛行不衰。新疆库木吐喇45窟壁画\"散花飞天\"的发髻便是典型的惊鹄髻。", meaning: '发髻作两扇羽翼形如惊鸟欲飞', category: 'hairstyle', sub: '反绾式', dynasty: '曹魏', identity: '贵族女性', tags: ['魏晋', '唐'] },
  { term: '十字髻', pinyin: 'shí zì jì', detail: "十字髻因其发髻呈\"十\"字形而得名，流行于魏晋南北朝时期。梳编方法是先将头发盘成一个\"十\"字形的发髻固定于头顶，再将余发在头的两侧各盘一鬟，垂至肩部，用簪、钗固定。最具代表性的形象资料是西安草厂坡出土的北魏彩绘陶俑。魏晋之后各朝均很少见。", meaning: '发髻呈十字形，余发在头两侧各盘一鬟', category: 'hairstyle', sub: '反绾式', dynasty: '魏晋', identity: '贵族女性', tags: ['魏晋'] },
  { term: '芙蓉髻', pinyin: 'fú róng jì', detail: "芙蓉髻是晋代流行的发式之一。髻形模拟盛开的芙蓉花，以层层盘叠的手法塑造出花瓣般的层次感，清丽雅致。此发式流行于晋代世家大族女性之中，反映了魏晋名士崇尚自然、以花喻人的审美风尚。唐代的\"花髻\"亦受此启发。", meaning: '髻形似芙蓉花层层叠叠', category: 'hairstyle', sub: '盘叠式', dynasty: '晋', identity: '贵族女性', tags: ['魏晋'] },
  { term: '盘桓髻', pinyin: 'pán huán jì', detail: "盘桓髻属于盘叠式发髻中的一种。《中华古今注》载：\"长安妇女好为盘桓髻，到今其法不绝。\"其梳编法是将头发蟠曲交卷，盘叠于头顶上，造型稳定而不走落。\"盘桓\"本义为盘旋环绕，形容此髻曲卷盘旋之态。盘桓髻自晋代兴起后影响深远，唐代长安妇女仍普遍梳此发式，历数百年而不衰。", meaning: '发蟠曲交卷盘叠于头顶，稳而不落', category: 'hairstyle', sub: '盘叠式', dynasty: '晋', identity: '各阶层女性', tags: ['魏晋', '唐'] },
  { term: '飞天髻', pinyin: 'fēi tiān jì', detail: "飞天髻是极具仙气的发式，因受佛教艺术中\"飞天\"形象的启发而得名。《宋五行志》载：\"文帝元嘉六年，民间妇人结发者三分发，抽其鬟直上，谓之飞天。\"其梳编方法是将发分成三股，各挽成小鬟耸立于头顶，状如向上飞升之势。唐代敦煌壁画中的飞天女仙多梳此发髻。在古风插画中，飞天髻是塑造仙女形象的首选发型。", meaning: '结三鬟于顶耸立直上，受佛教飞天启发', category: 'hairstyle', sub: '结鬟式', dynasty: '南北朝', identity: '民间女性', tags: ['魏晋', '唐'] },
  { term: '随云髻', pinyin: 'suí yún jì', detail: "随云髻属于拧旋式中的侧拧形式。《国宪家猷》载：\"陈宫梳随云髻。\"其梳编法是将发分几股，如拧麻花般蟠曲扭转，盘结于头顶一侧，髻形如流云随意卷动，生动灵转。此发式在仕女画中颇受青睐，《八十七神仙图卷》中仙女发式即有此类风格。", meaning: '髻如随云卷动侧拧之形，生动灵转', category: 'hairstyle', sub: '拧旋式', dynasty: '南北朝', identity: '仕女', tags: ['魏晋'] },
  { term: '回心髻', pinyin: 'huí xīn jì', detail: "回心髻属于拧旋式中的盘拧形式。《中华古今注》载：\"梁武帝诏宫人梳回心髻。\"其梳编法是将发分股交拧，盘结于头顶或头前，发髻呈回环之势，故称\"回心\"。清代佚名《胤祯妃行乐图屏》中仍有此发式。", meaning: '发分股交拧盘结回心于头顶', category: 'hairstyle', sub: '拧旋式', dynasty: '南北朝', identity: '宫人', tags: ['魏晋'] },
  { term: '高髻', pinyin: 'gāo jì', detail: "高髻并非单一发式，而是一大类高耸于头顶的发髻统称。唐代高髻最盛，宫人喜将头发高高梳起，有多达六鬟、八鬟者。唐诗人刘禹锡《赠李司空妓》有\"高髻云鬟宫样妆，春风一曲杜韦娘\"之名句。梳高髻时往往需用假发（义髻）掺杂其中衬垫，使髻形高大饱满。唐代各类有名称的发髻大多可归入高髻范畴，如半翻髻、云髻、花髻等。高髻的盛行甚至引起朝廷注意——唐高祖曾询问近臣令孤德棻，为何女性喜爱梳高大发髻，令孤德棻答以\"头在身体最上部，发髻是最重要醒目的装饰，能显出人的尊贵\"。", meaning: '发髻高耸于头顶的通称，唐代达到顶峰', category: 'hairstyle', sub: '通用', dynasty: '唐', identity: '各阶层女性', tags: ['唐'] },
  { term: '半翻髻', pinyin: 'bàn fān jì', detail: "半翻髻是唐代早期高髻的一种典型（也是2022年春晚舞剧《只此青绿》\"高峰髻\"的历史原型）。由隋代翻荷髻演变而来，属反绾式梳编法——由下至上至头顶而向外翻转，形似翻转的荷叶。段成式《髻鬟品》载\"高祖宫中有半翻髻\"，《妆台记》称\"唐武德中梳半翻髻\"。从唐高祖至武周朝，半翻髻都十分流行。唐太宗女儿新城长公主墓壁画、武则天孙女永泰公主墓壁画中均有大量梳半翻髻的仕女形象。", meaning: '发髻前倾翻卷如翻卷荷叶，初唐典型', category: 'hairstyle', sub: '反绾式', dynasty: '初唐', identity: '宫廷女性', tags: ['唐'] },
  { term: '双刀髻', pinyin: 'shuāng dāo jì', detail: "双刀髻属于反绾式发髻。其梳编法是将头发向上拢结于头顶，再反绾成双刀欲展之势，造型对称而富有动感。《妆台记》载：\"唐武德中，宫中梳半翻髻。又梳反绾髻。\"双刀髻即反绾髻的一种重要样式。初唐时期贵族女性尤其偏好此发式，因髻形拔擢挺立，再配以华丽的梳篦金簪，极具英气与富贵之气。", meaning: '两髻形似展开的双刀', category: 'hairstyle', sub: '反绾式', dynasty: '初唐', identity: '贵族女性', tags: ['唐'] },
  { term: '倭堕髻', pinyin: 'wō duò jì', detail: "倭堕髻是由汉代堕马髻演变而来的重要发式，但二者并非同一式样。《古今注》载：\"倭堕髻——云堕马髻之余形也。\"其梳编法是总发于顶，在头顶正中挽一发髻，并使之一侧偏斜，发髻挽得较低。虽然源自堕马髻的\"下堕\"概念，但倭堕髻更加规整优雅，没有堕马髻那种明显的\"散乱\"感。汉乐府《陌上桑》中采桑女罗敷即为\"头上倭堕髻，耳中明月珠\"，可见此髻在魏晋至唐五代近千年间深受女性青睐。", meaning: '总发于顶挽髻偏侧低垂，堕马髻之余形', category: 'hairstyle', sub: '结椎式', dynasty: '魏晋', identity: '年轻女性', tags: ['魏晋', '唐'] },
  { term: '花髻', pinyin: 'huā jì', detail: "花髻是唐代贵族妇女的一种时髦发式，以真花或仿生花插满发髻为特色。唐人尤重牡丹，以牡丹簪髻为风尚。传世名画周昉《簪花仕女图》即描绘贵妇们头簪硕大牡丹花的形象。李白《宫中行乐词》有\"山花插宝髻\"之句，万楚《茱萸女》有\"插花向高髻\"之句。花髻可见更细分类：凤髻、步摇髻、芙蓉髻、神仙髻、迎春髻、百花髻等。此风气深刻影响后世，明代女子仍以此法插戴金玉花簪以饰发。", meaning: '高髻上簪插大量鲜花，盛唐贵族风尚', category: 'hairstyle', sub: '通用', dynasty: '盛唐', identity: '贵妇', tags: ['唐'] },
  { term: '螺髻', pinyin: 'luó jì', detail: "螺髻是将头发盘叠成螺壳形而得名，属盘叠式发髻。初唐时盛行于宫廷，后普及至民间。单螺是将发股集结盘叠如螺置于头顶，永泰公主墓石椁雕饰中可见；双螺是将发分为两大股，盘结双叠于两顶角，亦称\"双角\"。唐代诗人有\"螺髻凝香晓黛浓\"之句。明代时双螺髻又称\"把子\"，是江南女子偏爱的简便大方发式，尤多见于丫环侍女。", meaning: '髻形似螺壳，分单螺和双螺', category: 'hairstyle', sub: '盘叠式', dynasty: '唐', identity: '各阶层女性', tags: ['唐', '宋'] },
  { term: '双环望仙髻', pinyin: 'shuāng huán wàng xiān jì', detail: "双环望仙髻是唐代流行的一种高髻变体，将头发在头顶梳成两个环形发髻，前端再略加翻卷，状如仰望仙人，故得名。《髻鬟品》载玄宗开元时期宫中梳双鬟望仙髻。此发式多见于唐代宫廷壁画及仕女画中，在永乐宫壁画等仙道题材作品中亦多见。", meaning: '头顶梳出双环形如望仙之姿', category: 'hairstyle', sub: '结鬟式', dynasty: '唐', identity: '宫廷贵族', tags: ['唐'] },
  { term: '回鹘髻', pinyin: 'huí hú jì', detail: "回鹘髻是盛唐时期受西北少数民族影响的发式之一。唐代国力鼎盛，与西域回鹘等民族交往密切，发髻形态因而出现胡化倾向。《髻鬟品》载玄宗开元时期宫中梳回鹘髻。此髻髻形较高，顶部较尖，有别于传统汉式的圆润饱满，体现了盛唐兼收并蓄的开放风尚。", meaning: '受回鹘影响的胡风高髻，髻高顶尖', category: 'hairstyle', sub: '盘叠式', dynasty: '唐', identity: '宫廷女性', tags: ['唐'] },
  { term: '抛家髻', pinyin: 'pāo jiā jì', detail: "抛家髻是唐代后期极为流行的一种发式。《新唐书·五行志》载：\"唐末京师妇女梳发，以两鬓抱面，状如椎髻，名曰抛家髻。\"其特点是将两侧鬓发紧紧贴在面颊上，头顶再加一个形似椎髻的\"朵子\"（假髻）。整个发式呈现一种蓬松慵懒之态。此发型一直延续至后世，今京剧旦角仍沿用其造型变化。", meaning: '两鬓抱面头顶挽椎髻，晚唐流行', category: 'hairstyle', sub: '结椎式', dynasty: '晚唐', identity: '各阶层女性', tags: ['唐'] },
  { term: '元宝髻', pinyin: 'yuán bǎo jì', detail: "元宝髻属于反绾式发髻的一种。其梳编法是将发拢结于顶，再用木架或假发笼蔽撑起，使发髻呈元宝形，中间高而两端略低翘。《晋书》载：\"用发既多，不可恒载，乃先木及笼上装之，曰假髻或假头。\"唐张雄夫妇合葬墓出土的女俑即有此种发型。因元宝为财富象征，此发式也暗含吉祥富贵之意。", meaning: '髻形似元宝中部隆起两端略翘', category: 'hairstyle', sub: '反绾式', dynasty: '唐', identity: '贵族女性', tags: ['唐', '宋'] },
   { term: '宝髻', pinyin: 'bǎo jì', meaning: '满头珠翠宝石装饰的华贵发髻', category: 'hairstyle', sub: '通用', dynasty: '唐', identity: '贵族女性', tags: ['唐'], detail: '宝髻是唐代贵族妇女以满头发饰为特色的华贵发式，以大量金玉珠宝簪钗堆叠装饰而成。是盛唐华丽审美的典型代表。' },
  { term: '峨髻', pinyin: 'é jì', meaning: '极高耸立如峨眉山，唐代极盛', category: 'hairstyle', sub: '盘叠式', dynasty: '唐', identity: '贵族女性', tags: ['唐'], detail: '峨髻是唐代极高耸立的一种发髻，因髻形高耸如峨眉山而得名。以假发衬垫使髻体高大巍峨。' },
  { term: '云髻', pinyin: 'yún jì', detail: "云髻一词既可作为具体发式名称，也可作为古代文人描写女子发髻的常见诗意称呼。作为一种具体发式，云髻早在三国时期就已出现。其髻形蓬松卷曲，状若云朵堆叠，轻盈飘逸。历代文人诗中常用\"云髻\"来赞美女子之美，如\"云髻峨峨，修眉联娟\"（曹植《洛神赋》）等。唐代周昉《纨扇仕女图》中的仕女多见此类发式。", meaning: '髻形蓬松如云朵堆叠', category: 'hairstyle', sub: '拧旋式', dynasty: '魏晋', identity: '各阶层女性', tags: ['魏晋', '唐'] },
  { term: '凌虚髻', pinyin: 'líng xū jì', detail: "凌虚髻属于拧旋式中的交拧形式。《中华古今注》载：\"隋有凌虚髻、祥云髻。\"其梳编法是将发交集拧旋成髻，悬空托在头顶上，形如云盘回绕，结而不脱落。因其形飘逸灵转，如凌空踏虚般轻盈，故名\"凌虚髻\"。适合古风插画中仙女的造型。", meaning: '交集拧旋悬空托于顶上如云盘回', category: 'hairstyle', sub: '拧旋式', dynasty: '隋', identity: '仙女', tags: ['隋'] },
  { term: '朝云近香髻', pinyin: 'zhāo yún jìn xiāng jì', detail: "朝云近香髻属于拧旋式中的叠拧形式。《中华古今注》载：\"大业中令宫人梳朝云近香髻。\"其编法是将头发分股拧盘，交叠于头顶，形成一种层次丰富、生动而稳定的发式效果。在传世的《八十七神仙图卷》中可见此发式的描绘。", meaning: '分股拧盘交叠于顶生动稳定', category: 'hairstyle', sub: '拧旋式', dynasty: '隋', identity: '仕女', tags: ['隋', '唐'] },
  { term: '朝天髻', pinyin: 'cháo tiān jì', detail: "朝天髻是宋代最具代表性的高髻之一。据《宋史·五行志》载：\"建隆初，蜀孟昶末年，妇女竞治发为高髻，号朝天髻。\"此发型由后蜀孟昶妃李艳娘所创。其梳编法是将头发拢至头顶束结，再反绾成高髻朝天，从正面看耸立于头顶，巍峨壮观。宋代太原晋祠泥塑女像即有朝天髻样式。由于需搀入大量假发才能梳出高度，当时街头出现了专卖假发的店铺。南宋理宗时宫中又兴\"不走落\"（即高髻的别称）。", meaning: '高髻朝天耸立，五代后蜀至宋标志性高髻', category: 'hairstyle', sub: '反绾式', dynasty: '五代后蜀', identity: '各阶层女性', tags: ['宋'] },
  { term: '同心髻', pinyin: 'tóng xīn jì', detail: "同心髻与朝天髻类似但更为简单朴素。梳时将头发全部向上梳至头顶部位，挽成一个圆形的发髻，以簪固定。其形圆润饱满，\"同心\"之名寓意夫妻同心，故已婚女子尤其喜欢此发式。北宋时期流行广泛，上至贵妇下至平民皆可见。", meaning: '发向上梳至头顶挽成圆形发髻', category: 'hairstyle', sub: '结椎式', dynasty: '宋', identity: '各阶层女性', tags: ['宋'] },
  { term: '高椎髻', pinyin: 'gāo zhuī jì', detail: "高椎髻属于结椎式发髻的一种。《妆台记》载：\"宋理宗朝宫妃梳高髻于顶，巍峨高耸，号高椎髻。\"其梳编法是将头发全部拢结于头顶，挽成一个高耸的椎形发髻，形似倒置的椎体，耸立于头顶。在宋代山西太原晋祠女塑中可见此发式。明代贵妇亦沿用此式。", meaning: '发拢结于顶挽成单椎耸立头顶', category: 'hairstyle', sub: '结椎式', dynasty: '宋', identity: '宫妃', tags: ['宋', '明'] },
  { term: '包髻', pinyin: 'bāo jì', detail: "包髻是在发髻梳成之后，用纱、罗、绢、缯等色帛将发髻包裹起来的发式。此风始于宋代，金元时期成为礼服的一部分，至明代发展成重要的头饰形式——䯼髻。《宋史·舆服志》记载，宫中后妃亦常以包髻为饰。包裹发髻的织物颜色和质地因身份而异，贵者用锦罗，平常人家用素绢，既实用（防止发髻松散）又具装饰性。明代的䯼髻即渊源于此。", meaning: '发髻梳成后用绢帛包裹', category: 'hairstyle', sub: '通用', dynasty: '宋', identity: '各阶层女性', tags: ['宋', '明'] },
  { term: '流苏髻', pinyin: 'liú sū jì', detail: "流苏髻是同心髻的一种装饰性变体。在梳成同心髻后，于发髻根部系扎彩色丝带，使丝带自然垂下如流苏般摇曳，故名。此发式兼具清雅与装饰之美，在宋代仕女画中有描绘。", meaning: '同心髻根部系扎丝带垂下如流苏', category: 'hairstyle', sub: '结椎式', dynasty: '宋', identity: '各阶层女性', tags: ['宋'] },
  { term: '狄髻', pinyin: 'dí jì', detail: "䯼髻是明代最具标志性的发饰，实为一种定型假髻或发罩。《云间据目抄》载：\"妇人头髻，在隆庆初年，皆尚圆褊，顶用宝花，谓之挑心。\"中国社会科学院考古研究所研究指出，䯼髻的出现受北宋以来妇女戴冠风气和金元时期\"包髻\"习俗的双重影响。元代时䯼髻本指发髻本身，在戴冠和包髻的影响下，逐渐演变为罩在发髻之外的包裹物。 明代䯼髻一般用金银丝或马鬃、头发、篾丝等材料编成，外覆皂色纱，佩戴时罩于头顶发髻之上。已出土的䯼髻主要有两种形式： - **扭心䯼髻**：顶部两道金梁，两侧有扭出旋卷的曲线 - **尖顶䯼髻**：像有尖顶的小帽子，中部偏下以金属粗丝横隔，上部近圆锥形，下部外扩如帽檐 明代妇女一般不单独戴䯼髻，需配合全套\"头面\"（包括挑心、分心、满冠、掩鬓、顶簪、花钿、围髻等）。䯼髻是明代妇女身份地位的象征，普通的金银丝䯼髻已是正装，金䯼髻更是有地位的贵妇才可佩戴。", meaning: '以金银丝编成的发罩，明代已婚妇女正装', category: 'hairstyle', sub: '通用', dynasty: '明', identity: '已婚妇女', tags: ['明'] },
  { term: '挑心髻', pinyin: 'tiǎo xīn jì', detail: "挑心髻是明代中后期至为流行的发式。\"挑心\"本为明代头面中最重要的一支簪钗——由下而上\"挑\"戴于䯼髻正面当心之处，簪首多以佛像、凤鸟、梵文、宝塔、仙人等为主。后来\"挑心髻\"本身也成为发髻名称，指将头发梳成扁圆形状，在发髻顶部饰以宝石制成的花朵或金银丝结成的装饰，时称\"挑心髻\"。此后又演变为将发髻梳高，以金银丝挽结，顶上配珠翠装点。名目越来越丰富，从扁圆趋于长圆，衍生出\"桃尖顶髻\"、\"鹅胆心髻\"等变体。", meaning: '发髻梳成扁圆状顶部饰宝石花朵', category: 'hairstyle', sub: '结椎式', dynasty: '明', identity: '已婚妇女', tags: ['明'] },
  { term: '三绺头', pinyin: 'sān liǔ tóu', detail: "三绺头是明代至清代汉族妇女的日常发式之一。将头发梳理成三绺：中间一绺梳向头顶前方，两侧各一绺梳向鬓角。三绺发拢合后盘成髻，可用簪钗固定。这种发式简洁利落，适合日常家居及劳作，在明代各阶层妇女中广泛使用。入清后汉族妇女仍延续此发式，与清代旗人的\"两把头\"形成鲜明对比。", meaning: '头发分三绺盘髻，前额一绺两侧各一绺', category: 'hairstyle', sub: '结椎式', dynasty: '明', identity: '已婚妇女', tags: ['明'] },
  { term: '牡丹头', pinyin: 'mǔ dān tóu', detail: "牡丹头是明末清初流行于苏州地区的妇女高髻发式，后逐渐传至北方。因其蓬松高耸形似重瓣牡丹而得名。据《坚瓠集》载：\"我苏（苏州）妇人梳头有'牡丹'、'钵盂'之名，鬓有'闹花'、'如意'之号。\"尤侗诗云：\"闻说江南高一尺，六宫争学牡丹头。\"牡丹头高度可达七寸（约23厘米），鬓部蓬松而髻身光润，髻后有双绺发尾下垂。因真发不足以支撑如此高大的发髻，通常充以假发衬垫，并辅以刨花水粘合定型。其发饰通常搭配金簪、玉簪、鲜花等。", meaning: '高髻蓬松似牡丹花，苏州地区流行', category: 'hairstyle', sub: '盘叠式', dynasty: '明', identity: '贵族女性', tags: ['明'] },
  { term: '桃尖顶髻', pinyin: 'táo jiān dǐng jì', detail: "桃尖顶髻是明代挑心髻的衍变形态。明代中后期，发髻从扁圆形趋于长圆，顶部愈发尖锐，形状如桃实之尖，故称\"桃尖顶髻\"。与其同时流行的还有\"鹅胆心髻\"（形如鹅胆、椭圆饱满）。这些发式反映了明代女性对发髻形态的精细追求。", meaning: '发髻顶部呈桃尖形，挑心髻之变形', category: 'hairstyle', sub: '结椎式', dynasty: '明', identity: '各阶层妇女', tags: ['明'] },
  { term: '双螺髻', pinyin: 'shuāng luó jì', detail: "双螺髻在明代江南地区极为流行，其形类似春秋战国时期的螺髻，时称\"把子\"。梳编时将头发分为两大股，各盘成螺壳状，分置头顶两侧。螺髻清晰秀雅，简便大方，是江南女子尤其是丫环侍女喜爱的发式。", meaning: '双螺形发髻江南称把子，未婚女子常见', category: 'hairstyle', sub: '盘叠式', dynasty: '明', identity: '未婚女子', tags: ['明'] },
  { term: '一窝丝', pinyin: 'yī wō sī', meaning: '以网罩束起的发髻', category: 'hairstyle', sub: '通用', dynasty: '明', identity: '各阶层女性', tags: ['明'], detail: '一窝丝是明代中后期妇女的简便发式，以丝网罩住全部发髻而得名。先将头发盘成发髻，再以黑色丝网罩住收束。' },
  { term: '松鬓扁髻', pinyin: 'sōng bìn biǎn jì', meaning: '鬓发蓬松发髻扁塌，明代后期流行', category: 'hairstyle', sub: '通用', dynasty: '明', identity: '各阶层女性', tags: ['明'], detail: '松鬓扁髻是明代后期妇女流行的发式，以鬓发蓬松、发髻呈扁圆形为特征。与明代前期高髻形成鲜明对比。' },
  { term: '双丫髻', pinyin: 'shuāng yā jì', meaning: '头顶左右各一髻如丫角，未婚少女通用', category: 'hairstyle', sub: '双挂式', dynasty: '通用', identity: '侍女少女', tags: [], detail: '双丫髻是双挂式中最常见的发式，将头发平分为两侧梳结成髻置头顶两侧，髻形小巧如丫角。从秦代延续至近代。' },
  { term: '丱发', pinyin: 'guàn fà', meaning: '发平分两股对称系结成大椎分置头顶两侧', category: 'hairstyle', sub: '双挂式', dynasty: '通用', identity: '儿童少女', tags: [], detail: '丱发是古代儿童及未婚少女的经典发式。将发平分两股系结成大椎分置头顶两侧。《诗经》"总角丱兮"即指此发。' },
  { term: '垂挂髻', pinyin: 'chuí guà jì', meaning: '发顶平分两大股梳成对称环髻垂挂两侧', category: 'hairstyle', sub: '双挂式', dynasty: '通用', identity: '未婚少女', tags: [], detail: '垂挂髻是双挂式发髻的一种，将发顶平分两大股梳结成环状髻垂于两侧。唐代《纨扇仕女图》中可见此发式。' },
  { term: '双平髻', pinyin: 'shuāng píng jì', meaning: '发顶平分两大股梳成对称髻平垂挂两侧', category: 'hairstyle', sub: '双挂式', dynasty: '通用', identity: '侍女少女', tags: [], detail: '双平髻是双挂式的典型形式，将发顶平分两大股梳结成对称髻平垂挂于两侧。敦煌壁画中大量出现。' },
  { term: '飞仙髻', pinyin: 'fēi xiān jì', detail: "飞仙髻与飞天髻同属仙女发式但形态不同。《炙毂子》载：\"汉武帝时，王母降，诸仙髻皆异人间，帝令宫中效之，号飞仙髻。\"其梳编法是两侧各结一个高鬟，耸立头侧，有凌空飞升之姿。此发式多用于仙女形象描绘，后世古风插画亦沿用此形制。", meaning: '两侧结高鬟有凌空飞升之势', category: 'hairstyle', sub: '结鬟式', dynasty: '汉', identity: '仙女', tags: ['唐'] },
  { term: '凌云髻', pinyin: 'líng yún jì', detail: "凌云髻属于结鬟式中的高式单鬟。《中华古今注》载：\"始皇诏后梳凌云髻，三妃梳望仙九鬟髻，九嫔梳参鸾髻。\"也就是说早在秦始皇时期，皇后就开始梳凌云髻。其形态如凌云高耸、巍峨瞻望，在历代仕女画与神女造像中皆可见。", meaning: '高式单鬟如凌云之姿', category: 'hairstyle', sub: '结鬟式', dynasty: '秦', identity: '后妃', tags: ['汉', '唐'] },
  // -- 男性发式 --
  { term: '总角', pinyin: 'zǒng jiǎo', detail: "总角是中国古代男童的经典发式。《诗经·卫风·氓》有\"总角之宴，言笑晏晏\"之名句——\"宴\"即欢乐，描写少年男女在童年时期天真无邪的欢乐时光。（按：后世\"总角之交\"即指童年结为朋友，可见此发式文化影响力之深远。）男子成童后即不再梳总角，改为束发。此发式与女童的丱发、双丫髻形制相近，可视为儿童发式的共性特征。", meaning: '男童将头发分扎两髻如角，《诗经》"总角之宴"', category: 'hairstyle', sub: '双挂式', dynasty: '通用', identity: '男童', tags: [] },
  { term: '束发', pinyin: 'shù fà', detail: "束发是古代男子从成童到行冠礼之间的过渡发式。《大戴礼记·保傅》载：\"束发而就大学，学大艺焉。\"男子十五岁左右（成童）后将总角解散，改将全部头发束拢于头顶或脑后，准备迎接成年的冠礼。束发后即可入大学学习成人之艺。此时发式已接近成年男子但暂不加冠，仅以帛带束扎。贾谊《新书》：\"束发而就大学。\"后世\"束发\"也常作为男子十五岁的代称。", meaning: '男子十五岁后将头发束于顶，冠礼前的过渡发式', category: 'hairstyle', sub: '结椎式', dynasty: '通用', identity: '少年男子', tags: [] },
  { term: '绾髻', pinyin: 'wǎn jì', detail: "绾髻（亦作\"头髻\"）是汉族成年男子的基本发式，从先秦延续至明末，长达三千年。最具说服力的考古实证来自秦始皇帝陵兵马俑——数千件陶俑的头顶均梳有不同形式的绾髻，有圆形髻、扁髻、盘髻、绞髻等多种造型，细致入微地再现了战国至秦代男性的绾髻实况。 《礼记·曲礼上》载\"男子二十，冠而字\"，行冠礼（成人礼）后，男子束发加冠，以笄贯穿发髻固定。日常家居可不戴冠，仅以巾裹头；正式场合需加冠或戴幞头。绾髻作为基底发式，与冠、巾、幞头（已在配饰词库中收录）搭配使用，构成了中国古代男性的完整首服体系。 明亡后，清廷推行剃发令，强迫汉族男子改梳辫发（辫子），绾髻传统遂中断。此发式在朝鲜半岛、日本等受汉文化影响的地区仍有所延续。", meaning: '男子将头发绾结于顶的标准发式，秦兵马俑实物印证', category: 'hairstyle', sub: '结椎式', dynasty: '通用', identity: '成年男子', tags: [] },
  { term: '髡发', pinyin: 'kūn fà', detail: "髡发本为上古五刑之一——\"髡\"指剃去头发，是耻辱刑（《周礼·秋官》载\"髡者使守积\"）。先秦至汉代常用作对罪犯的惩罚手段，去其发以示羞辱。同时，髡发也是北方游牧民族的常见发式，如匈奴、鲜卑等族素有剃发之俗。《后汉书·乌桓鲜卑列传》载乌桓\"以髡头为轻便\"，匈奴亦有\"髡头\"习俗。进入南北朝后，随着民族融合加深，髡发渐从刑罚转为特定群体的自由发式选择。", meaning: '剃去头顶头发，上古五刑之一，亦见于北方游牧民族', category: 'hairstyle', sub: '通用', dynasty: '先秦', identity: '男子', tags: [] },
  // ===== 07 形制 =====
  // -- 上衣 --
  { term: '衫', en: "unlined blouse", meaning: '单层无里的薄上衣，男女皆穿，唐宋以来通行', category: 'garment', sub: '上衣', dynasty: '通用', gender: '通用' },
  { term: '襦', en: "short jacket", meaning: '短上衣，一般不过膝，常与裙搭配', category: 'garment', sub: '上衣', dynasty: '通用', gender: '通用' },
  { term: '袄', en: "lined jacket", meaning: '双层有里的上衣，较襦稍厚，秋冬穿着', category: 'garment', sub: '上衣', dynasty: '宋', dynasties: ['宋', '明'], gender: '通用' },
  { term: '褙子', en: "Beizi parallel-collar robe", meaning: '直领对襟，两侧开叉至腋下，宋明极流行', category: 'garment', sub: '上衣', dynasty: '宋', dynasties: ['宋', '明'], gender: '通用' },
  { term: '半臂', en: "half-sleeve vest", meaning: '短袖外衣，袖长及肘，男女皆穿', category: 'garment', sub: '上衣', dynasty: '唐', gender: '通用' },
  { term: '大袖衫', en: "wide-sleeve outer robe", meaning: '宽大袖子的薄衫，唐代贵妇礼服外罩', category: 'garment', sub: '上衣', dynasty: '唐', gender: '女' },
  { term: '诃子', en: "chest cloth wrap", meaning: '唐代特有的胸衣，束于胸间，外穿', category: 'garment', sub: '上衣', dynasty: '唐', gender: '女' },
  { term: '抹胸', en: "strapless bandeau", meaning: '贴身内衣，束于胸际，宋明时也外露搭配', category: 'garment', sub: '上衣', dynasty: '宋', dynasties: ['宋', '明'], gender: '女' },
  // -- 深衣制 --
  { term: '曲裾深衣', en: "curved-hem wrapped robe", meaning: '衣襟自领曲绕至腰间，再缠绕至身后，呈曲弧状', category: 'garment', sub: '深衣制', dynasty: '汉', gender: '通用' },
  { term: '直裾深衣', en: "straight-hem wrapped robe", meaning: '衣襟垂直而下，下摆方正，先秦至汉代', category: 'garment', sub: '深衣制', dynasty: '汉', gender: '通用' },
  { term: '禅衣', en: "unlined sheer robe", meaning: '无里的单层薄纱长衣，极轻薄', category: 'garment', sub: '深衣制', dynasty: '汉', gender: '通用' },
  { term: '朱子深衣', en: "Zhu Xi style wrapped robe", meaning: '朱熹定制的深衣制式，宋代复古礼制', category: 'garment', sub: '深衣制', dynasty: '宋', gender: '男' },
  // -- 袍服 --
  { term: '圆领袍', en: "round-collar robe", meaning: '圆领窄袖长袍，隋唐至明男女通行', category: 'garment', sub: '袍服', dynasty: '唐', dynasties: ['唐', '明'], gender: '通用' },
  { term: '道袍', en: "scholar's robe", meaning: '明代文人便服，大襟宽袖，儒雅闲适', category: 'garment', sub: '袍服', dynasty: '明', gender: '男' },
  { term: '直裰', en: "straight robe", meaning: '直领对襟或大襟，两侧开叉，明代文人常服', category: 'garment', sub: '袍服', dynasty: '明', gender: '男' },
  { term: '鹤氅', en: "crane cape, Daoist robe", meaning: '宽大长袍，道家之服，魏晋名士爱穿', category: 'garment', sub: '袍服', dynasty: '魏晋', gender: '男' },
  { term: '大氅', en: "wide overcoat", meaning: '宽大外袍，穿于外御寒，明清流行', category: 'garment', sub: '袍服', dynasty: '明', gender: '男' },
  { term: '飞鱼服', en: "flying fish robe (Ming)", meaning: '明代赐服，织有飞鱼纹，锦衣卫公服', category: 'garment', sub: '袍服', dynasty: '明', gender: '男' },
  { term: '曳撒', en: "Mongol-style robe", meaning: '元明时期袍服，上紧下散有褶', category: 'garment', sub: '袍服', dynasty: '明', gender: '男' },
  { term: '贴里', en: "inner pleated skirt", meaning: '明代内衬衣，有褶裙式下摆', category: 'garment', sub: '袍服', dynasty: '明', gender: '男' },
  { term: '襕衫', en: "lanyu, hemmed scholar robe", meaning: '下摆有横襕的衫，宋代公服', category: 'garment', sub: '袍服', dynasty: '宋', gender: '男' },
  { term: '直身', en: "straight-cut long robe", meaning: '直领通体直线剪裁的长衣', category: 'garment', sub: '袍服', gender: '男' },
  // -- 襦裙制 --
  { term: '齐胸襦裙', en: "chest-high ruqun", meaning: '裙腰系于胸部以上，唐代女子典型着装', category: 'garment', sub: '襦裙制', dynasty: '唐', gender: '女' },
  { term: '齐腰襦裙', en: "waist-high ruqun", meaning: '裙腰系于腰间，各朝通用之基础款式', category: 'garment', sub: '襦裙制', dynasty: '通用', gender: '女' },
  { term: '交领襦裙', en: "cross-collar ruqun", meaning: '上衣交领右衽，下配长裙', category: 'garment', sub: '襦裙制', gender: '女' },
  { term: '对襟襦裙', en: "front-opening ruqun", meaning: '上衣两襟相对不交叠，下配长裙', category: 'garment', sub: '襦裙制', gender: '女' },
  { term: '坦领襦裙', en: "low-cut ruqun", meaning: '上衣领口坦露呈U形，唐代特色', category: 'garment', sub: '襦裙制', dynasty: '唐', gender: '女' },
  { term: '高腰襦裙', en: "high-waist ruqun", meaning: '裙腰系于肋骨以下、胸部以下，较齐胸略低', category: 'garment', sub: '襦裙制', dynasty: '唐', gender: '女' },
  // -- 下裳 --
  { term: '裙', en: "pleated skirt", meaning: '下身穿着的围合式长裙，各朝形制不同', category: 'garment', sub: '下裳', dynasty: '通用', gender: '女' },
  { term: '间色裙', en: "color-blocked skirt", meaning: '多色布条拼接而成的条纹裙，唐代流行', category: 'garment', sub: '下裳', dynasty: '唐', gender: '女' },
  { term: '石榴裙', en: "pomegranate red skirt", meaning: '鲜艳如石榴花的红裙，唐代著名', category: 'garment', sub: '下裳', dynasty: '唐', gender: '女' },
  { term: '花笼裙', en: "flower-embroidered skirt", meaning: '绣花轻纱罩裙，罩于主裙之外', category: 'garment', sub: '下裳', dynasty: '唐', gender: '女' },
  { term: '百迭裙', en: "hundred-pleat skirt", meaning: '极细密褶裥的长裙，宋代', category: 'garment', sub: '下裳', dynasty: '宋', gender: '女' },
  { term: '旋裙', en: "wraparound skirt", meaning: '前后开衩方便活动的围裙，宋代', category: 'garment', sub: '下裳', dynasty: '宋', gender: '女' },
  { term: '马面裙', en: "horse-face skirt", meaning: '前后平幅无褶、两侧打褶的裙子，明代标志性女裙', category: 'garment', sub: '下裳', dynasty: '明', gender: '女' },
  { term: '水田衣', en: "patchwork robe", meaning: '多色碎布拼合如稻田的衣裳，明代', category: 'garment', sub: '下裳', dynasty: '明', gender: '女' },
  { term: '凤尾裙', en: "phoenix-tail skirt", meaning: '裙摆饰有凤尾状装饰条，清代', category: 'garment', sub: '下裳', gender: '女' },
  { term: '袴', en: "open-crotch trousers", meaning: '胫衣，即裤子，先秦时无裆，后世发展为满裆裤', category: 'garment', sub: '下裳', dynasty: '通用', gender: '通用' },
  { term: '蔽膝', en: "knee-cover apron", meaning: '系于腰间覆于膝前的装饰性围片，礼服使用', category: 'garment', sub: '下裳', dynasty: '通用', gender: '通用' },
  { term: '裳', en: "lower skirt", meaning: '下身穿的围裙状服饰，上衣下裳之裳', category: 'garment', sub: '下裳', dynasty: '先秦', gender: '通用' },
  // -- 套装 --
  { term: '袄裙', en: "aoqun jacket-and-skirt", meaning: '上衣(袄)下裙的组合，明代女子最常穿着', category: 'garment', sub: '套装', dynasty: '明', gender: '女' },
  { term: '杂裾垂髾服', en: "layered sashes robe", meaning: '多层三角垂饰飘带装饰的礼服，魏晋风度', category: 'garment', sub: '套装', dynasty: '魏晋', gender: '女' },
  { term: '袴褶', en: "tunic and trousers set", meaning: '上短衣下裤的套装，胡服影响便于骑射', category: 'garment', sub: '套装', dynasty: '魏晋', gender: '通用' },
  { term: '补服', en: "badge robe", meaning: '前胸后背缀有补子(官阶图案)的官服', category: 'garment', sub: '套装', dynasty: '明', gender: '男' },
  { term: '冕服', en: "ceremonial court robe", meaning: '帝王最高等级礼服，冕冠+玄衣纁裳', category: 'garment', sub: '套装', dynasty: '通用', gender: '男' },
  { term: '玄端', en: "formal dark robe", meaning: '先秦至明代的正式礼服，玄色端正', category: 'garment', sub: '套装', dynasty: '先秦', gender: '男' },
  // -- 外套 --
  { term: '披风', en: "formal outer jacket", meaning: '直领对襟大袖外衣，男女皆可，明代流行', category: 'garment', sub: '外套', dynasty: '明', gender: '通用' },
  { term: '斗篷', en: "hooded cloak", meaning: '无袖连帽外披，御寒用', category: 'garment', sub: '外套', gender: '通用' },
  { term: '比甲', en: "sleeveless long vest", meaning: '无袖长背心，元代始，明代极流行', category: 'garment', sub: '外套', dynasty: '明', gender: '通用' },
  { term: '裲裆', en: "armored vest", meaning: '前后两片如背心状的甲式外衣', category: 'garment', sub: '外套', dynasty: '魏晋', gender: '通用' },
  { term: '马褂', en: "Magua jacket", meaning: '短款对襟外套，穿于长袍外', category: 'garment', sub: '外套', gender: '男' },
  { term: '坎肩', en: "sleeveless jacket", meaning: '无袖短罩衣', category: 'garment', sub: '外套', gender: '通用' },
  { term: '背子', en: "sleeveless vest robe", meaning: '无袖长外套，唐代已有', category: 'garment', sub: '外套', dynasty: '唐', gender: '女' },
  // -- 配件 --
  { term: '披帛', en: "silk shawl", meaning: '长条形丝帛，绕臂披搭于肩背，唐代女子标志', category: 'garment', sub: '配件', dynasty: '唐', gender: '女' },
  { term: '云肩', en: "cloud collar", meaning: '圆形披肩如云朵覆肩，明清流行', category: 'garment', sub: '配件', dynasty: '明', gender: '女' },
  { term: '霞帔', en: "ceremonial cape", meaning: '长条状绣花披肩，明代命妇礼服必备', category: 'garment', sub: '配件', dynasty: '明', gender: '女' },
  { term: '帔', en: "shoulder cape", meaning: '搭于肩背的装饰性长帛，如霞帔之简版', category: 'garment', sub: '配件' },
  { term: '飘带', en: "flowing ribbon", meaning: '礼服上垂下的长丝带，行走间飘动', category: 'garment', sub: '配件' },
  { term: '臂钏', en: "armlet", meaning: '绕于手臂的金银环形饰，唐宋流行', category: 'garment', sub: '配件', dynasty: '唐', gender: '女' },
  // -- 甲胄戎服 --
  { term: '明光铠', en: "mingguang armor", meaning: '胸前有大型圆护如明镜的铠甲，唐代', category: 'garment', sub: '甲胄戎服', dynasty: '唐', gender: '男' },
  { term: '山文铠', en: "mountain-pattern armor", meaning: '甲片呈山字形叠压的铠甲，宋明', category: 'garment', sub: '甲胄戎服', dynasty: '宋', gender: '男' },
  { term: '箭袖', en: "arrow cuff sleeves", meaning: '袖口收紧便于射箭的衣袖形制', category: 'garment', sub: '甲胄戎服', gender: '男' },
  // -- 袖型 --
  { term: '广袖', en: "wide sweeping sleeves", meaning: '宽大飘逸的袖子，汉唐典型', category: 'garment', sub: '袖型', dynasty: '通用', gender: '通用' },
  { term: '窄袖', en: "narrow tight sleeves", meaning: '紧窄贴臂的袖子，胡服影响，隋唐实用', category: 'garment', sub: '袖型', dynasty: '唐', gender: '通用' },
  { term: '琵琶袖', en: "pipa-shaped sleeves", meaning: '腋宽口窄如琵琶形，明代典型', category: 'garment', sub: '袖型', dynasty: '明', gender: '通用' },
  { term: '大袖', en: "grand wide sleeves", meaning: '礼服专用的宽阔大袖', category: 'garment', sub: '袖型', dynasty: '通用', gender: '通用' },
  { term: '半袖', en: "half-sleeve jacket", meaning: '袖长及肘的短袖', category: 'garment', sub: '袖型', dynasty: '魏晋', gender: '通用' },
  { term: '垂胡袖', en: "drooping elbow sleeves", meaning: '袖口收紧下垂如牛胡，汉代深衣袖型', category: 'garment', sub: '袖型', dynasty: '汉', gender: '通用' },
  { term: '剑袖', en: "sword sleeves", meaning: '袖口窄长如剑，利于骑射', category: 'garment', sub: '袖型', dynasty: '明', gender: '男' },

  // ===== 08 面料 =====
  { term: '绫', en: "twill silk", meaning: '斜纹或变化斜纹组织的丝织物，光泽柔滑', category: 'fabric', sub: '丝织', tags: [] },
  { term: '罗', en: "leno silk", meaning: '绞经织法形成孔眼，透气轻盈', category: 'fabric', sub: '丝织', tags: [] },
  { term: '绸', en: "satin silk", meaning: '平纹或斜纹丝织物，质地平滑', category: 'fabric', sub: '丝织', tags: [] },
  { term: '缎', en: "satin silk", meaning: '缎纹组织，表面光滑如镜，明代盛行', category: 'fabric', sub: '丝织', tags: [] },
  { term: '纱', en: "gauze silk", meaning: '平纹稀薄丝织物，轻薄透明', category: 'fabric', sub: '丝织', tags: [] },
  { term: '绢', en: "silk tabby", meaning: '平纹丝织物，质地细密', category: 'fabric', sub: '丝织', tags: [] },
  { term: '锦', en: "brocade", meaning: '彩色提花丝织物，华丽精美', category: 'fabric', sub: '丝织', tags: [] },
  { term: '绮', en: "monochrome figured silk", meaning: '素色提花丝织物，花纹隐约', category: 'fabric', sub: '丝织', tags: [] },
  { term: '缂丝', en: "kesi silk tapestry", meaning: '通经断纬织造，可织出精美图案', category: 'fabric', sub: '丝织', tags: [] },
  { term: '绒', en: "velvet", meaning: '表面有绒毛的丝织物，华贵厚重', category: 'fabric', sub: '丝织', tags: [] },
  { term: '纨', en: "white fine silk", meaning: '细密洁白的素绢', category: 'fabric', sub: '丝织', tags: [] },
  { term: '縠', en: "crepe silk", meaning: '绉纱类丝织品，表面有皱纹', category: 'fabric', sub: '丝织', tags: [] },
  { term: '素纱', en: "plain silk gauze", meaning: '极轻薄的平纹纱，马王堆素纱禅衣仅49克', category: 'fabric', sub: '丝织', tags: [] },
  { term: '云锦', en: "Yunjin brocade", meaning: '南京云锦，寸锦寸金，明清皇家御用', category: 'fabric', sub: '丝织', tags: [] },
  { term: '宋锦', en: "Song brocade", meaning: '宋代特色的典雅锦缎，苏州特产', category: 'fabric', sub: '丝织', tags: [] },
  { term: '妆花', en: "Zhuanghua brocade", meaning: '明代特有挖花工艺，在织物上织出色块图案', category: 'fabric', sub: '丝织', tags: [] },
  { term: '织金', en: "gold-thread brocade", meaning: '以金线织入锦缎，奢华闪耀', category: 'fabric', sub: '丝织', tags: [] },
  { term: '麻', en: "hemp linen", meaning: '麻纤维织物，凉爽透气，夏季穿着', category: 'fabric', sub: '麻棉葛', tags: [] },
  { term: '苎麻', en: "ramie", meaning: '苎麻纤维织物，比麻更细洁', category: 'fabric', sub: '麻棉葛', tags: [] },
  { term: '葛', en: "ko hemp", meaning: '葛藤纤维织物，粗糙但凉爽', category: 'fabric', sub: '麻棉葛', tags: [] },
  { term: '棉', en: "cotton", meaning: '棉花纤维织物，柔软保暖，明清普及', category: 'fabric', sub: '麻棉葛', tags: [] },
  { term: '绒布', en: "flannel", meaning: '表面起绒的棉织物，柔软温暖', category: 'fabric', sub: '麻棉葛', tags: [] },
  { term: '飘逸', en: "airy and ethereal", meaning: '面料轻薄，自然垂坠有动感', category: 'fabric', sub: '触感', tags: [] },
  { term: '垂坠', en: "draped and flowing", meaning: '面料有重量感，垂感好，线条流畅', category: 'fabric', sub: '触感', tags: [] },
  { term: '轻薄', en: "thin and light", meaning: '面料薄而轻盈，透光', category: 'fabric', sub: '触感', tags: [] },
  { term: '厚重', en: "thick and heavy", meaning: '面料有分量，厚实保暖', category: 'fabric', sub: '触感', tags: [] },
  { term: '挺括', en: "crisp and structured", meaning: '面料硬挺有型，不易皱', category: 'fabric', sub: '触感', tags: [] },
  { term: '柔软', en: "soft", meaning: '面料触感柔顺，亲肤', category: 'fabric', sub: '触感', tags: [] },
  { term: '丝滑', en: "silky smooth", meaning: '如丝绸般光滑细腻的触感', category: 'fabric', sub: '触感', tags: [] },
  { term: '粗粝', en: "rough textured", meaning: '面料表面粗糙有肌理感', category: 'fabric', sub: '触感', tags: [] },
  { term: '透明', en: "transparent", meaning: '面料薄可透光，可见肌肤', category: 'fabric', sub: '触感', tags: [] },
  { term: '半透', en: "semi-transparent", meaning: '面料微透，若隐若现', category: 'fabric', sub: '触感', tags: [] },
  { term: '哑光', en: "matte finish", meaning: '面料表面无光泽，含蓄内敛', category: 'fabric', sub: '触感', tags: [] },
  { term: '亮光', en: "glossy", meaning: '面料表面有光泽，华丽闪耀', category: 'fabric', sub: '触感', tags: [] },

  // ===== 09 色彩 =====
  { term: '赤', en: "vermilion", meaning: '中国传统正红色，五行属火，象征喜庆', category: 'color', sub: '红色系', hex: '#C41E3A', tags: [] },
  { term: '玄', en: "profound black", meaning: '中国传统正黑色，五行属水，象征天', category: 'color', sub: '黑色系', hex: '#2C2C2C', tags: [] },
  { term: '青', en: "cerulean blue", meaning: '中国传统正蓝色，五行属木', category: 'color', sub: '蓝色系', hex: '#1B5583', tags: [] },
  { term: '白', en: "pure white", meaning: '中国传统正白色，五行属金', category: 'color', sub: '白色系', hex: '#FAFAFA', tags: [] },
  { term: '黄', en: "imperial yellow", meaning: '中国传统正黄色，五行属土，帝王之色', category: 'color', sub: '黄色系', hex: '#D4A84B', tags: [] },
  { term: '绯', en: "crimson", meaning: '浅红色，唐代官服用色', category: 'color', sub: '红色系', hex: '#C4444C', tags: [] },
  { term: '黛', en: "dark blue-black", meaning: '青黑色，常用于画眉', category: 'color', sub: '青黛系', hex: '#4A5568', tags: [] },
  { term: '藕荷', en: "lotus root pink", meaning: '淡紫粉色，宋代流行色', category: 'color', sub: '紫色系', hex: '#C9A9B0', tags: [] },
  { term: '素', en: "pale blue-white", meaning: '青白色，如薄雾', category: 'color', sub: '青黛系', hex: '#B5D5D0', tags: [] },
  { term: '檀', en: "sandalwood brown", meaning: '浅绛色，红褐色', category: 'color', sub: '褐色系', hex: '#A0524A', tags: [] },
  { term: '缃', en: "light yellow-red", meaning: '浅红色，礼服常用', category: 'color', sub: '红色系', hex: '#E06040', tags: [] },
  { term: '皂', en: "soap black", meaning: '黑色，指黑色布料', category: 'color', sub: '黑色系', hex: '#333333', tags: [] },

  // ===== 10 纹样 =====
  { term: '云纹', en: "cloud motif", meaning: '祥云之形，秦汉已有，最经典古风纹样', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '回纹', en: "fret pattern", meaning: '反复回环的几何线条，寓意连绵不断', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '菱格纹', en: "diamond lattice pattern", meaning: '菱形网格状几何纹', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '方胜纹', en: "double diamond pattern", meaning: '两个菱形交叠，寓意胜利吉祥', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '龟背纹', en: "tortoise shell pattern", meaning: '六边形如龟背之纹，寓意长寿', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '连珠纹', en: "pearl border pattern", meaning: '一圈小圆珠环绕主体图案，波斯影响', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '万字纹', en: "swastika fret", meaning: '卍字形连绵，佛教吉祥符号', category: 'pattern', sub: '几何纹', tags: [] },
  { term: '牡丹纹', en: "peony motif", meaning: '牡丹花形，唐代盛行，象征富贵', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '莲花纹', en: "lotus motif", meaning: '莲花图案，佛教象征，出淤泥不染', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '梅花纹', en: "plum blossom pattern", meaning: '梅花五瓣，象征高洁不屈', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '菊花纹', en: "chrysanthemum pattern", meaning: '菊花图案，象征隐逸长寿', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '宝相花纹', en: "baoxiang flower", meaning: '佛教圣花，集众花之美的理想化纹样', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '缠枝纹', en: "vine scroll", meaning: '藤蔓连续缠绕，唐代卷草演变', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '折枝纹', en: "detached branch", meaning: '折取一枝花叶的自然写实纹样', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '团花纹', en: "floral medallion", meaning: '圆形适合纹样中的花卉图案', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '卷草纹', en: "scrollwork pattern", meaning: '卷曲的草叶纹，唐代流行', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '忍冬纹', en: "honeysuckle pattern", meaning: '金银花藤蔓纹样，佛教艺术常见', category: 'pattern', sub: '植物纹', tags: [] },
  { term: '龙纹', en: "dragon motif", meaning: '神龙之形，帝王象征，最高等级纹样', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '凤纹', en: "phoenix motif", meaning: '凤凰之形，后妃象征，吉祥瑞鸟', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '麒麟纹', en: "qilin motif", meaning: '瑞兽麒麟，仁兽之象', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '仙鹤纹', en: "crane motif", meaning: '丹顶鹤纹，象征长寿高洁', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '鸳鸯纹', en: "mandarin duck pattern", meaning: '鸳鸯成对，象征夫妻恩爱', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '孔雀纹', en: "peacock pattern", meaning: '孔雀开屏，华丽富贵', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '蝴蝶纹', en: "butterfly pattern", meaning: '蝴蝶翩跹，象征美满爱情', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '鹿纹', en: "deer pattern", meaning: '鹿谐音禄，象征爵禄富贵', category: 'pattern', sub: '动物纹', tags: [] },
  { term: '海水江崖', en: "wave-and-cliff", meaning: '江海波涛+山崖纹，明清官袍下摆，寓意江山', category: 'pattern', sub: '自然纹', tags: [] },
  { term: '如意纹', en: "ruyi motif", meaning: '如意头形，吉祥顺心', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '四合如意云纹', en: "four-petal cloud", meaning: '四个如意头环绕云纹，明代典型', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '寿字纹', en: "longevity character pattern", meaning: '寿字变形为图案，寓意长寿', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '福字纹', en: "blessing character pattern", meaning: '福字变形为图案，祈福', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '暗八仙', en: "Eight Immortals treasures", meaning: '八仙所持法器，暗喻八仙祝寿', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '八宝纹', en: "eight treasures pattern", meaning: '八种吉祥宝物组合的法器图案', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '八卦纹', en: "eight trigrams pattern", meaning: '八卦符号排列成装饰纹', category: 'pattern', sub: '符号纹', tags: [] },
  { term: '龙凤呈祥', en: "dragon phoenix auspicious", meaning: '龙凤共舞，吉祥如意', category: 'pattern', sub: '组合纹', tags: [] },
  { term: '花开富贵', en: "blossoming wealth", meaning: '盛开花卉，寓意富贵吉祥', category: 'pattern', sub: '组合纹', tags: [] },
  { term: '福寿三多', en: "three abundances", meaning: '佛手+桃+石榴，多福多寿多子', category: 'pattern', sub: '组合纹', tags: [] },
  { term: '连年有余', en: "yearly abundance", meaning: '莲+鱼谐音，年年有余', category: 'pattern', sub: '组合纹', tags: [] },
  { term: '喜上眉梢', en: "joy on brows", meaning: '喜鹊+梅花枝头，喜事临门', category: 'pattern', sub: '组合纹', tags: [] },

  // ===== 11 配饰 =====
  { term: '簪', en: "single-prong hairpin", meaning: '单股发簪，用于固定发髻', category: 'accessory', sub: '发饰', tags: [] },
  { term: '钗', en: "hairpin with two prongs", meaning: '双股发钗，比簪更稳固', category: 'accessory', sub: '发饰', tags: [] },
  { term: '步摇', en: "dangling hairpin", meaning: '钗首垂挂珠串，行步则摇动', category: 'accessory', sub: '发饰', tags: [] },
  { term: '发冠', en: "hair crown", meaning: '戴于发髻上的冠形饰物，男子成人礼所用', category: 'accessory', sub: '发饰', tags: [] },
  { term: '梳篦', en: "ornamental hair comb", meaning: '梳头和装饰兼用的齿形发饰', category: 'accessory', sub: '发饰', tags: [] },
  { term: '花冠', en: "flower crown", meaning: '以鲜花或仿花编成的冠饰，唐宋盛行', category: 'accessory', sub: '发饰', tags: [] },
  { term: '凤冠', en: "phoenix crown", meaning: '饰有凤凰的后妃礼冠，霞帔相配', category: 'accessory', sub: '发饰', tags: [] },
  { term: '点翠', en: "kingfisher feather hairpin", meaning: '以翠鸟羽毛贴饰的发饰工艺', category: 'accessory', sub: '发饰', tags: [] },
  { term: '抹额', en: "forehead band", meaning: '束于额前的饰带，保暖兼装饰', category: 'accessory', sub: '发饰', tags: [] },
  { term: '狄髻', en: "metal hair frame", meaning: '明代以金属丝编成的发髻框架', category: 'accessory', sub: '发饰', tags: [] },
  { term: '耳珰', en: "tube-shaped earring", meaning: '穿耳孔佩戴的圆柱形耳饰', category: 'accessory', sub: '耳饰', tags: [] },
  { term: '耳坠', en: "drop earrings", meaning: '带下垂饰物的耳饰', category: 'accessory', sub: '耳饰', tags: [] },
  { term: '耳环', en: "hoop earrings", meaning: '环形耳饰', category: 'accessory', sub: '耳饰', tags: [] },
  { term: '璎珞', en: "beaded neck ornament", meaning: '珠玉串联的项饰，佛教影响', category: 'accessory', sub: '项饰', tags: [] },
  { term: '项圈', en: "rigid neck ring", meaning: '金属或玉质的环状项饰', category: 'accessory', sub: '项饰', tags: [] },
  { term: '长命锁', en: "longevity lock", meaning: '银锁形项饰，寓意长命百岁', category: 'accessory', sub: '项饰', tags: [] },
  { term: '玉佩', en: "jade pendant", meaning: '系于腰间的玉制挂饰', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '禁步', en: "waist jade pendant", meaning: '系于腰间的多组玉佩，行步以禁步履', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '宫绦', en: "palace sash", meaning: '编织丝绦腰带，末端垂穗', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '香囊', en: "perfume sachet", meaning: '盛放香料的刺绣小袋或镂空金球', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '荷包', en: "embroidered pouch", meaning: '绣花小袋，系于腰带，盛放小物', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '蹀躞带', en: "belt with hanging straps", meaning: '腰带上系挂小物品的带饰，胡风影响', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '玉带', en: "jade belt", meaning: '镶嵌玉片的腰带，官员朝服所用', category: 'accessory', sub: '腰饰', tags: [] },
  { term: '压襟', en: "lapel weight ornament", meaning: '系于衣襟的坠饰，防衣襟上掀', category: 'accessory', sub: '胸饰', tags: [] },
  { term: '团扇', en: "round silk fan", meaning: '圆形绢面扇，长柄可持', category: 'accessory', sub: '手持', tags: [] },
  { term: '折扇', en: "folding fan", meaning: '可折叠的纸扇或绢扇，明代流行', category: 'accessory', sub: '手持', tags: [] },
  { term: '拂尘', en: "fly whisk", meaning: '马尾或麈尾制成的拂尘，道家常持', category: 'accessory', sub: '手持', tags: [] },
  { term: '盖头', en: "red bridal veil", meaning: '新娘遮面的方帕', category: 'accessory', sub: '冠帽', tags: [] },
  { term: '幞头', en: "Futou headwrap", meaning: '裹头软巾，唐代男子常用', category: 'accessory', sub: '冠帽', tags: [] },
  { term: '帷帽', en: "veiled hat", meaning: '帽檐垂纱至颈的帽子', category: 'accessory', sub: '冠帽', tags: [] },
  { term: '幂篱', en: "full body veil", meaning: '全身遮纱的帷帽，唐代女子外出所用', category: 'accessory', sub: '冠帽', tags: [] },
  { term: '莲花冠', en: "lotus crown", meaning: '莲花形道冠，道士或仙侠风格', category: 'accessory', sub: '冠帽', tags: [] },
  { term: '姑姑冠', en: "Gu-gu crown", meaning: '元代蒙古族高耸圆柱形冠', category: 'accessory', sub: '冠帽', tags: [] },

  // ===== 12 鞋履 =====
  { term: '翘头履', en: "upturned-toe shoe", meaning: '鞋头尖翘起的鞋子，汉唐通用', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '丝履', en: "silk shoe", meaning: '丝帛制作的绣鞋', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '云履', en: "cloud shoe", meaning: '绣云纹的鞋子，道教常用', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '凤头鞋', en: "phoenix-head shoe", meaning: '鞋头饰有凤凰的绣鞋', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '登云履', en: "cloud-stepping shoe", meaning: '厚底高帮，绣云纹，仪式用鞋', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '方头履', en: "square-toe shoes", meaning: '鞋头方正，明代男子鞋履', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '高底鞋', en: "platform shoes", meaning: '厚底鞋，明清流行', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '绣花鞋', en: "embroidered flat", meaning: '鞋面绣花的布鞋', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '弓鞋', en: "bound-foot shoe", meaning: '尖小弯弓状的缠足鞋', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '花盆底鞋', en: "pedestal shoes", meaning: '鞋底如花盆般高耸的旗鞋', category: 'footwear', sub: '古鞋', tags: [] },
  { term: '膝裤', en: "calf wrap", meaning: '套在小腿上的布套，明代保暖用', category: 'footwear', sub: '袜', tags: [] },
  { term: '罗袜', en: "silk stockings", meaning: '丝罗制成的袜子', category: 'footwear', sub: '袜', tags: [] }
]

// Auto-generate IDs and detect subcategories
const subcategoryMap = {}
const dynasties = ['先秦', '秦汉', '汉', '魏晋', '隋', '唐', '宋', '元', '明']
const genders = ['男', '女', '通用']

items.forEach((item, i) => {
  item.id = item.term
  // collect subcategories
  if (item.sub) {
    const key = item.category + '::' + item.sub
    if (!subcategoryMap[key]) subcategoryMap[key] = { key: item.sub, label: item.sub, count: 0 }
    subcategoryMap[key].count++
  }
})

// Build category metadata with subcategories
export const categoryMeta = categories.map(cat => {
  const subkeys = Object.keys(subcategoryMap).filter(k => k.startsWith(cat.key + '::'))
  const subs = subkeys.map(k => subcategoryMap[k])
  const count = items.filter(i => i.category === cat.key).length
  return { ...cat, count, subcategories: subs }
})

export function getItems(categoryKey) {
  if (!categoryKey || categoryKey === 'all') return items
  return items.filter(i => i.category === categoryKey)
}

export function getItem(id) {
  return items.find(i => i.id === id)
}

export function searchItems(keyword) {
  if (!keyword) return items
  const kw = keyword.toLowerCase()
  return items.filter(i => i.term.includes(kw) || i.meaning.includes(kw))
}

// Dynasty hierarchy: selecting a parent also matches children
const dynastyMap = {
  '先秦': ['先秦', '秦'],
  '汉': ['汉', '西汉', '东汉'],
  '魏晋': ['魏晋', '曹魏', '晋'],
  '南北朝': ['南北朝'],
  '隋': ['隋'],
  '唐': ['唐', '初唐', '盛唐', '晚唐'],
  '宋': ['宋', '五代后蜀'],
  '明': ['明']
}

function matchDynasty(item, selected) {
  // Check item's dynasties array
  const ds = item.dynasties || (item.dynasty ? [item.dynasty] : [])
  if (!ds.length) return false
  // Check if any of the item's dynasties match any selected filter's hierarchy
  for (const sel of selected) {
    const children = dynastyMap[sel] || [sel]
    for (const d of ds) {
      if (children.includes(d)) return true
      // Also check if the item dynasty contains the selected term
      if (d.includes(sel)) return true
    }
  }
  return false
}

export function filterItems(opts = {}) {
  let list = [...items]
  if (opts.category) list = list.filter(i => i.category === opts.category)
  if (opts.sub) list = list.filter(i => i.sub === opts.sub)
  if (opts.dynasty && opts.dynasty.length) {
    list = list.filter(i => matchDynasty(i, opts.dynasty))
  }
  if (opts.gender && opts.gender.length) {
    list = list.filter(i => opts.gender.includes(i.gender) || i.gender === '通用' || !i.gender)
  }
  if (opts.identity && opts.identity.length) {
    list = list.filter(i => i.identity && opts.identity.some(id => i.identity.includes(id)))
  }
  if (opts.keyword) {
    const kw = opts.keyword.toLowerCase()
    list = list.filter(i => {
      if (i.term.toLowerCase().includes(kw)) return true
      if (i.meaning.toLowerCase().includes(kw)) return true
      if (i.pinyin && i.pinyin.toLowerCase().includes(kw)) return true
      if (i.en && i.en.toLowerCase().includes(kw)) return true
      if (i.tags && i.tags.some(t => t.toLowerCase().includes(kw))) return true
      if (i.dynasty && i.dynasty.toLowerCase().includes(kw)) return true
      if (i.detail && i.detail.toLowerCase().includes(kw)) return true
      if (i.identity && i.identity.toLowerCase().includes(kw)) return true
      return false
    })
  }
  return list
}

export function getDynastiesForCategory(categoryKey) {
  const set = new Set()
  items.filter(i => i.category === categoryKey).forEach(i => {
    if (i.dynasty && i.dynasty !== '通用') set.add(i.dynasty)
    if (i.tags) i.tags.forEach(t => { if (dynasties.includes(t)) set.add(t) })
  })
  return [...set]
}
