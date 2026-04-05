/**
 * Self-contained mock registry — no relative imports.
 * All types are inlined to avoid Nitro module resolution issues with .ts extensions.
 * Loaded via: await import('~/mock/index')
 */

// ─── Inline types (mirrors types/api.ts) ─────────────────────────────────────

interface Pagination { page: number; size: number; total: number }
interface ApiResponse<T> { code: number; message: string; data: T }
interface SiteInfo { webName: string; webDescribe?: string; webAddress?: string; webSeo?: string; icpTxt?: string; icpLink?: string; nickName?: string; headImg?: string }
interface LinkItem { id?: string; name: string; url: string; description?: string; avatar?: string }
interface ArticleListItem { id: string; typeId?: number; title: string; author?: string; excerpt?: string; readCounts?: number; typeName?: string; createTime?: string; updateTime?: string; isPrivacy?: number; listPic?: string | null; music?: string | null; collectTotal?: number | null; likeTotal?: number | null }
interface ArticleDetail extends ArticleListItem { mdcontent?: string; content?: string; isShow?: number; shareCode?: string; isTop?: number }
interface ArticlePageData { list: ArticleListItem[]; pagination: Pagination }
interface CommentItem { id: string; name: string; avatarUrl?: string; targetId: string; parentId: string | null; commentName?: string; content: string; platformType?: string; topStatus?: number; createTime?: string; updateTime?: string }
interface CommentPageData { list: CommentItem[]; pagination: Pagination }
interface LetterItem { contentHtml: string; time: string }
interface LetterPageData { list: LetterItem[]; pagination: Pagination }

const LOCAL_LOGO_LIST = ['/image/logo/logo1.png', '/image/logo/logo2.png', '/image/logo/logo3.png', '/image/logo/logo4.png']
const DEFAULT_SITE_LOGO = LOCAL_LOGO_LIST[0] ?? '/image/logo/logo1.png'

// Available local mp3 files (the repo currently has no 4.mp3)
const MP3_LIST = ['/mp3/0.mp3', '/mp3/1.mp3', '/mp3/2.mp3', '/mp3/3.mp3', '/mp3/5.mp3', '/mp3/6.mp3']
function mp3(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffff
  return MP3_LIST[h % MP3_LIST.length] ?? MP3_LIST[0] ?? '/mp3/0.mp3'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function coverUrl(seed: string, w = 800, h = 450): string {
  const safe = String(seed).replace(/[^a-zA-Z0-9_-]/g, '') || '0'
  return `https://picsum.photos/seed/blog-${safe}/${w}/${h}`
}

function ok<T>(data: T): ApiResponse<T> {
  return { code: 200, message: 'success', data }
}

// ─── Site ─────────────────────────────────────────────────────────────────────

const SITE_INFO: SiteInfo = {
  webName: '全栈 | 兔子零 — Wang Xiaoming\'s Personal Website',
  webDescribe: '王小明，全栈，h5前端开发，web技术，node，小程序开发，android，iOS，游戏开发',
  webAddress: 'https://example.com',
  webSeo: '王小明,全栈,前端开发,兔子零',
  icpTxt: '京ICP备2026012345号-1',
  icpLink: 'https://beian.miit.gov.cn',
  nickName: 'admin',
  headImg: DEFAULT_SITE_LOGO,
}

// ─── Articles ─────────────────────────────────────────────────────────────────

const ARTICLE_LIST: ArticleListItem[] = [
  { id: '422', typeId: 99, title: 'Vue3.0的设计目标是什么？做了哪些优化?', author: '兔子零', excerpt: '不以解决实际业务痛点的更新都是耍流氓，下面我们来列举一下Vue3之前我们或许会面临的问题', readCounts: 78, typeName: '刷题', createTime: '2022-01-11 23:16:52', updateTime: '2022-01-15 21:38:57', isPrivacy: 0, music: mp3('422'), collectTotal: null, likeTotal: 1 },
  { id: '421', typeId: 99, title: '自定义指令是什么？有哪些应用场景？', author: '兔子零', excerpt: '指令系统是计算机硬件的语言系统，也叫机器语言，它是系统程序员看到的计算机的主要属性', readCounts: 248, typeName: '刷题', createTime: '2022-01-10 23:20:56', updateTime: '2022-01-13 23:18:30', isPrivacy: 0, music: mp3('421'), collectTotal: null, likeTotal: 2 },
  { id: '419', typeId: 99, title: '虚拟DOM一定更快吗？', author: '兔子零', excerpt: '我们常说的虚拟DOM是通过JS对象模拟出来的DOM节点，domDiff是通过特定算法计算出来一次操作所带来的DOM变化', readCounts: 45, typeName: '刷题', createTime: '2022-01-09 22:17:10', updateTime: '2022-01-12 00:22:08', isPrivacy: 0, music: mp3('419'), collectTotal: null, likeTotal: 1 },
  { id: '420', typeId: 99, title: '什么是虚拟DOM？', author: '兔子零', excerpt: '什么是虚拟DOM？虚拟DOM是用JS对象描述真实DOM树的一层中间表示', readCounts: 245, typeName: '刷题', createTime: '2022-01-09 22:17:10', updateTime: '2022-01-15 21:40:44', isPrivacy: 0, music: mp3('420'), collectTotal: null, likeTotal: 1 },
  { id: '418', typeId: 3, title: 'Vue路由拦截与权限控制', author: '兔子零', excerpt: '在SPA里常见组合：路由前置守卫 + HTTP拦截器，统一处理登录态与错误提示', readCounts: 244, typeName: 'vue', createTime: '2022-01-09 20:22:05', updateTime: '2022-01-12 09:38:47', isPrivacy: 0, music: mp3('418'), collectTotal: null, likeTotal: 1 },
  { id: '417', typeId: 6, title: '常用的正则表达式整理', author: '兔子零', excerpt: '整理常用正则便于复制；注意不同语言引擎与Unicode属性差异', readCounts: 59, typeName: '正则', createTime: '2022-01-09 20:18:02', updateTime: '2022-01-13 22:23:15', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '416', typeId: 41, title: 'HTML5的 input:file 上传类型控制', author: '兔子零', excerpt: 'accept属性可以限制上传格式，multiple属性允许多文件选择', readCounts: 40, typeName: 'html', createTime: '2022-01-04 23:31:33', updateTime: '2022-01-10 01:25:28', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '415', typeId: 44, title: 'CSS input[type=file] 样式美化', author: '兔子零', excerpt: '我们在做input文本上传的时候，html自带的上传按钮比较丑，如何对其进行美化呢？', readCounts: 74, typeName: 'css', createTime: '2022-01-04 23:16:24', updateTime: '2022-01-13 22:14:34', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '414', typeId: 41, title: 'input accept属性限制文件上传格式', author: '兔子零', excerpt: '上传文件的类型；注意accept属性可以限制上传格式，其有兼容性如下', readCounts: 38, typeName: 'html', createTime: '2022-01-04 23:06:30', updateTime: '2022-01-09 06:24:24', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '413', typeId: 57, title: 'Redis Cannot connect to server 错误排查', author: '兔子零', excerpt: '先看 bind 和 protected-mode，十有八九是配置问题', readCounts: 59, typeName: 'redis', createTime: '2021-12-19 18:42:52', updateTime: '2022-01-11 16:47:36', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '412', typeId: 97, title: 'Vue3 + TypeScript 快速上手', author: '兔子零', excerpt: 'TypeScript是一种由微软开发的开源、跨平台的编程语言，是JavaScript的超集', readCounts: 85, typeName: 'vue3', createTime: '2021-12-19 00:01:25', updateTime: '2022-01-13 17:36:57', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '411', typeId: 10, title: 'npm 常用命令与技巧', author: '兔子零', excerpt: 'pnpm 在 monorepo 里磁盘占用友好很多，npm 常用命令整理', readCounts: 52, typeName: '工具', createTime: '2021-12-15 23:17:44', updateTime: '2022-01-13 22:25:43', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '410', typeId: 44, title: 'SassScript 变量与函数', author: '兔子零', excerpt: '在CSS属性的基础上Sass提供了一些名为SassScript的新功能，允许属性使用变量、算数运算等', readCounts: 46, typeName: 'css', createTime: '2021-12-12 19:54:26', updateTime: '2022-01-10 09:15:53', isPrivacy: 0, music: null, collectTotal: null, likeTotal: 1 },
  { id: '409', typeId: 1, title: '微信小程序生成二维码', author: '兔子零', excerpt: '注意小程序码和H5二维码接口别混用，本文介绍小程序端生成二维码的方法', readCounts: 49, typeName: 'wechat', createTime: '2021-12-12 12:36:30', updateTime: '2022-01-13 22:25:58', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '408', typeId: 97, title: 'Vite2 + Vue3 搭建项目脚手架', author: '兔子零', excerpt: 'Vite利用原生ESM，开发态极快；生产构建基于Rollup', readCounts: 64, typeName: 'vue3', createTime: '2021-12-11 21:41:38', updateTime: '2022-01-12 09:44:34', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '407', typeId: 51, title: '新Mac（M1芯片）Flutter开发环境搭建', author: '兔子零', excerpt: 'Rosetta下跑旧插件偶尔踩坑，能原生就原生，本文介绍M1芯片下Flutter环境配置', readCounts: 58, typeName: 'flutter', createTime: '2021-12-11 21:19:53', updateTime: '2022-01-13 14:50:14', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '405', typeId: 36, title: 'mac .bash_profile 只读或没有权限的解决方法', author: '兔子零', excerpt: 'zsh用户改.zshrc，别改错文件，本文介绍权限问题的解决方案', readCounts: 43, typeName: 'linux', createTime: '2021-12-11 21:18:08', updateTime: '2022-01-08 01:48:56', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '404', typeId: 36, title: 'zsh: command not found: brew 解决方案', author: '兔子零', excerpt: 'M1记得看官方安装脚本里的PATH提示，本文介绍brew安装后命令找不到的解决方案', readCounts: 58, typeName: 'linux', createTime: '2021-12-11 19:46:27', updateTime: '2022-01-08 10:17:22', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '403', typeId: 36, title: 'Mac 安装 CocoaPods', author: '兔子零', excerpt: 'ruby版本用rbenv锁住，少折腾，关于CocoaPods是OS X和iOS下的第三方类库管理工具', readCounts: 51, typeName: 'linux', createTime: '2021-12-11 19:07:08', updateTime: '2022-01-09 15:15:51', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
  { id: '402', typeId: 10, title: 'HHKB MAC 配置指南 操作指南 快捷键', author: '兔子零', excerpt: 'HHKB配Karabiner之后终于不用切系统快捷键了，本文介绍HHKB在Mac上的完整配置', readCounts: 2344, typeName: '工具', createTime: '2021-12-11 14:52:32', updateTime: '2022-01-09 03:11:10', isPrivacy: 0, music: null, collectTotal: null, likeTotal: null },
]

for (const row of ARTICLE_LIST) {
  row.listPic = coverUrl(row.id)
}

function defaultMd(row: ArticleListItem): string {
  return `# ${row.title}\n\n> ${String(row.excerpt || '').replace(/\n+/g, ' ')}\n\n---\n\n**分类**：${row.typeName}　**阅读量**：${row.readCounts}\n\n本文为本地 Mock 正文，上线后由接口返回 Markdown 或 HTML 即可。\n\n## 概述\n\n${row.excerpt}\n`
}

function articleMd(row: ArticleListItem): string {
  const ex = (row.excerpt || '').replace(/\n+/g, ' ')
  const map: Record<string, () => string> = {
    422: () => `# ${row.title}\n\n> ${ex}\n\n## 1. 为什么要有 Vue 3\n\nVue 3 并非为了「新」而新，而是为了解决大型应用在 **类型推导、逻辑复用、Tree-shaking、运行时体积** 上的痛点。\n\n## 2. 主要设计目标\n\n- **更好的 TypeScript 支持**\n- **Composition API**：用函数组织逻辑，替代碎片化 mixin。\n- **更快更省**：编译优化、Proxy 响应式。\n`,
    421: () => `# ${row.title}\n\n指令（Directive）是带 \`v-\` 前缀的特殊 attribute，适合把 **DOM 行为** 从组件里抽离。\n\n## 常见场景\n\n- 输入框聚焦、防抖节流\n- 懒加载、无限滚动\n- 权限控制（显示/禁用）\n`,
    420: () => `# ${row.title}\n\n虚拟 DOM 可以理解为 **用 JS 对象描述真实 DOM 树** 的一层中间表示，便于做 **diff** 与批量更新。\n\n## 关键点\n\n- 降低手写 DOM 操作的复杂度\n- 不是银弹：大数据列表仍需虚拟滚动等手段\n`,
    419: () => `# ${row.title}\n\n${ex}\n\n## 结论先行\n\n**不一定。** 虚拟 DOM 解决的是「维护性与一致性」，与「绝对性能」不是同一件事。\n`,
    412: () => `# ${row.title}\n\nTypeScript 与 Vue 3 结合时，建议：\n\n1. 启用 \`strict\`\n2. 组件 props 用泛型或运行时 props 联合声明\n3. 避免滥用 \`any\`\n`,
    408: () => `# ${row.title}\n\nVite 利用原生 ESM，开发态极快；生产构建基于 Rollup。\n\n## 脚手架要点\n\n- \`@vitejs/plugin-vue\`\n- 环境变量 \`import.meta.env\`\n`,
    402: () => `# ${row.title}\n\nHHKB 键位与 macOS 快捷键需要一段时间肌肉记忆；可配合 **Karabiner-Elements**。\n`,
  }
  return (map[row.id] ?? (() => defaultMd(row)))()
}

function buildDetail(row: ArticleListItem): ArticleDetail {
  return {
    ...row,
    mdcontent: articleMd(row),
    content: '',
    isShow: 1,
    shareCode: row.listPic || coverUrl(row.id),
    isTop: 0,
    music: row.music || mp3(row.id),
  }
}

const FEATURED: ArticleDetail = {
  id: '3', createTime: '2018-03-12 22:08:32', updateTime: '2022-01-15 22:26:51', typeId: 8,
  title: '世界上只有一种英雄主义，就是在认清生活真相之后依然选择热爱生活',
  readCounts: 2905,
  mdcontent: `<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113318417139533&bvid=BV19XyFYkEhv&cid=26322405760&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=236309068&bvid=BV1Ue411f7MX&cid=1341920100&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113407235854674&bvid=BV181SRYvEc3&cid=26564100460&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

罗曼·罗兰曾言：“世界上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。”这句话如同一盏明灯，照亮了无数人在生活迷雾中的前行之路。而“走暗路，耕瘦田，进窄门”则是对这种英雄主义的具体诠释，蕴含着深刻的人生哲理，激励着我们在困境中坚守，在艰难中前行。

走暗路，是一种勇气。生活并非总是一帆风顺，我们难免会遭遇黑暗时刻，事业低谷、感情挫折、突如其来的灾难，都可能让我们陷入黑暗的困境。这些暗路没有灯光指引，充满未知与恐惧。然而，真正的英雄不会因黑暗而退缩，他们勇敢地踏入其中，凭借内心的坚定和勇气，摸索前行。走暗路绝非走歪路，这是原则和底线。在黑暗中，我们不能迷失方向，不能为一时之利违背道德与法律。唯有坚守正道，走出暗路时，我们才能保持内心的纯净与尊严。

历史上，众多伟人走过暗路。司马迁因李陵之祸遭受宫刑，人生陷入至暗时刻。但他没有放弃，忍辱负重，发愤著书，最终成就了被誉为“史家之绝唱，无韵之《离骚》”的《史记》。贝多芬双耳失聪，却依然坚持创作音乐，《命运交响曲》激励无数人在困境中奋勇前行。他们都是走暗路的英雄，用勇气和坚持书写了辉煌人生篇章。

在现实生活中，我们也常常面临暗路的考验。或许是工作中的重大失误，让我们面临职业危机；或许是家庭的变故，让我们陷入情感的困境。但正是这些暗路，让我们学会了勇敢面对，学会了在逆境中成长。当我们勇敢地踏上暗路，我们会发现，黑暗并不可怕，可怕的是失去勇气。只要我们坚定信念，勇敢前行，就一定能走出黑暗，迎来光明。

耕瘦田，是一种坚韧。瘦田贫瘠，收获微薄，但耕瘦田的人却有着不屈不挠的精神。他们不抱怨土地的贫瘠，而是默默地耕耘，用汗水和努力去改变命运。耕瘦田需要耐心和毅力，不能期望一蹴而就。在这个过程中，我们可能会遇到无数的困难和挫折，但只要我们坚持不懈，就一定能在瘦田中收获属于自己的果实。

贫困地区的教师们，面对简陋的教学条件和贫困的学生，依然坚守岗位，用知识去改变孩子们的命运。他们在耕瘦田，用自己的奉献和坚持，为孩子们播下希望的种子。艰苦岗位上的劳动者们，收入微薄，却为了家庭和社会的发展默默付出。他们也是耕瘦田的英雄，用自己的坚韧诠释着生活的意义。

耕瘦田的过程，是一个磨砺意志的过程。我们要学会在困难面前不屈不挠，在挫折面前勇往直前。当我们面对瘦田时，不能灰心丧气，要相信只要我们付出努力，就一定能有所收获。正如古人云：“天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。”只有经历了耕瘦田的磨砺，我们才能更加坚强，更加成熟。

进窄门，是一种选择。窄门狭窄，通行困难，但进窄门的人却有着更高的追求和境界。他们不满足于走宽阔的大道，而是选择了一条艰难的道路，去追求真正的价值和意义。进窄门绝非进偏门，这是正确的价值观和人生态度。在进窄门的过程中，我们要保持清醒的头脑，不能为了追求个人利益而不择手段。唯有坚守正道，我们才能在窄门中找到真正的幸福和满足。

孔子在礼崩乐坏的时代，四处奔走，推行自己的学说，虽历经艰难，却始终未放弃。他的思想影响了中国几千年的历史，成为中华民族的精神支柱。屈原在楚国面临危机时，不顾个人安危，力主改革，虽遭流放，却依然心系国家和人民。他们都是进窄门的英雄，用自己的智慧和勇气，为了理想和信念而奋斗。

在现实生活中，我们也常常面临进窄门的选择。或许是放弃安逸的生活，去追求自己的梦想；或许是选择一条不被人看好的道路，去实现自己的价值。进窄门需要勇气和决心，需要我们有坚定的信念和不屈的精神。当我们选择进窄门时，我们要明白，这条道路可能充满困难和挑战，但正是这些困难和挑战，让我们不断成长，不断进步。

走暗路、耕瘦田、进窄门，是生活对我们的考验，也是我们成长的机遇。在生活中，我们每个人都会遇到这些时刻。当我们面对困难和挫折时，不要害怕，不要退缩，要勇敢地走暗路，坚韧地耕瘦田，正确地进窄门。只有这样，我们才能在认清生活真相之后，依然热爱生活，成为真正的英雄。

在当今社会，我们面临着各种各样的挑战和困难。经济的快速发展带来了竞争的加剧，社会的变革带来了不确定性。在这样的环境下，我们更需要走暗路的勇气、耕瘦田的坚韧和进窄门的选择。我们要勇敢地面对生活中的黑暗，不畏惧困难和挫折，用勇气和坚持去战胜它们。我们要像耕瘦田的人一样，不抱怨生活的艰难，用努力和汗水去创造美好的未来。我们要像进窄门的人一样，不满足于平庸的生活，用追求和信念去实现自己的人生价值。

<iframe src="//player.bilibili.com/player.html?aid=33450116&bvid=BV1uW41117yV&cid=58557834&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=313997880&bvid=BV1oP411978R&cid=1138640863&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

> 走暗路，耕瘦田，进窄门。
> 走暗路不意味着走歪路，进窄门不意味着进偏门。

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1101525389&bvid=BV1kw4m1Z7Qh&cid=1464382115&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
`,
  content: '', isShow: 1, author: '王小明', shareCode: coverUrl('3'), listPic: coverUrl('3'),
  isTop: 0, isPrivacy: 0,
  excerpt: '愿所有的美好如约而至，愿所有的黑暗都能看到希望，我们都能微笑前行，人生没有完美，有些遗憾才美...',
  music: mp3('3'), typeName: '随笔', collectTotal: null, likeTotal: 8,
}

const ABOUT: ArticleDetail = {
  id: '17', createTime: '2018-06-24 09:46:13', updateTime: '2022-01-16 22:06:47', typeId: 8,
  title: 'about', readCounts: 404,
  mdcontent: `# ☔️ 你好，我是兔子零！\n\nPART 1\n- 在识字是书荒，专注学习寻自由，离群索居享清静\n- 倾听心灵治疗，轻触指尖黑白键，聆听在唯美纯音\n\n今天的大海很温顺，也许是因为吞没了夕阳，沉睡了一般，只留下海鸥的鸣叫~~ \n\n陌生人，你好呀，承蒙遇见，三生有幸，永远年轻，永远热泪满盈，终身美丽~~ \n\n赠吾：世界上只有一种英雄主义，就是在认清生活真相之后依然选择热爱生活。\n\n——2022.1.3。\n\n<iframe height=100% width=100% src="//player.bilibili.com/player.html?bvid=BV1Nv411k7SF&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`,
  content: '', isShow: 1, author: '兔子零', shareCode: coverUrl('17'), listPic: coverUrl('17'),
  isTop: 0, isPrivacy: 0, excerpt: 'about',
  music: mp3('17'), typeName: '随笔', collectTotal: null, likeTotal: null,
}

// ─── Comments ─────────────────────────────────────────────────────────────────

function buildComments(): CommentItem[] {
  const out: CommentItem[] = []
  let nid = 10000
  let avatarSeed = 1
  const lastId = (): string => out[out.length - 1]?.id ?? String(nid - 1)
  function av(): string {
    const n = ((avatarSeed++ - 1) % 10) + 1
    return `${n}.jpg`
  }
  function push(row: Omit<CommentItem, 'id' | 'avatarUrl' | 'platformType' | 'topStatus' | 'createTime' | 'updateTime'>) {
    out.push({ id: String(nid++), avatarUrl: av(), platformType: 'pc', topStatus: 0, createTime: '2022-01-11 15:42:00', updateTime: '2022-01-11 15:42:00', ...row })
  }

  // ── 422 ──────────────────────────────────────────────────────────────────────
  push({ name: '阿哲', targetId: '422', parentId: null, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: 'Composition API 用下来比 mixin 清晰很多，就是团队里要先统一风格。' })
  const r422a = lastId()
  push({ name: '兔子零', targetId: '422', parentId: r422a, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: '可以按业务拆 composable，小步迁移 Options API 也行。' })
  const r422b = lastId()
  push({ name: '阿哲', targetId: '422', parentId: r422b, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: '明白了，我们项目正好在做这个迁移，感谢！' })
  push({ name: 'Carol', targetId: '422', parentId: null, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: 'Tree-shaking 体感上 vendor 掉了不少，配合 Vite 开发体验很顺。' })
  push({ name: '小李', targetId: '422', parentId: null, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: 'Teleport 做弹窗层级太省心了，不用到处改 z-index。' })
  const r422c = lastId()
  push({ name: '夜行', targetId: '422', parentId: r422c, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: '+1，我们表格详情抽屉也全用 Teleport 挂 body。' })
  push({ name: 'visitor_12', targetId: '422', parentId: null, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: '和 React hooks 心智模型接近吗？想二选一学深一个。' })
  const r422d = lastId()
  push({ name: '兔子零', targetId: '422', parentId: r422d, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: '思路相近，但 Vue 的响应式更自动，React 需要手动管理依赖。' })
  push({ name: '老周', targetId: '422', parentId: null, commentName: 'Vue3.0的设计目标是什么？做了哪些优化?', content: '性能章节写得实在，实际瓶颈多半在业务逻辑而不是框架。' })

  // ── 421 ──────────────────────────────────────────────────────────────────────
  push({ name: 'Ming', targetId: '421', parentId: null, commentName: '自定义指令是什么？有哪些应用场景？', content: '自定义指令适合做无限滚动和懒加载，注意要在 unmounted 里解绑。' })
  push({ name: 'Sue', targetId: '421', parentId: null, commentName: '自定义指令是什么？有哪些应用场景？', content: 'v-focus 这种小指令在表单多的后台特别好用。' })
  const r421a = lastId()
  push({ name: '兔子零', targetId: '421', parentId: r421a, commentName: '自定义指令是什么？有哪些应用场景？', content: '可以封装成插件批量注册，避免到处 import。' })
  const r421b = lastId()
  push({ name: 'Sue', targetId: '421', parentId: r421b, commentName: '自定义指令是什么？有哪些应用场景？', content: '这个思路很好，我们项目里有十几个指令，正好可以整理一下。' })
  push({ name: '前端小白', targetId: '421', parentId: null, commentName: '自定义指令是什么？有哪些应用场景？', content: '请问 v-permission 权限指令怎么实现比较优雅？' })
  const r421c = lastId()
  push({ name: '兔子零', targetId: '421', parentId: r421c, commentName: '自定义指令是什么？有哪些应用场景？', content: '在 mounted 里判断用户角色，不满足就 el.remove() 或 el.style.display = none。' })

  // ── 420 / 419 ────────────────────────────────────────────────────────────────
  push({ name: '虚拟DOM练习生', targetId: '420', parentId: null, commentName: '什么是虚拟DOM？', content: 'diff 过程比想象中细，key 不要乱用随机数。' })
  const r420a = lastId()
  push({ name: '路人甲', targetId: '420', parentId: r420a, commentName: '什么是虚拟DOM？', content: '对，用 index 做 key 在列表排序时也会出问题。' })
  push({ name: 'Hector', targetId: '419', parentId: null, commentName: '虚拟DOM一定更快吗？', content: '长列表还是要虚拟化，光虚拟 DOM 救不了大数据量。' })
  push({ name: '阿梨', targetId: '419', parentId: null, commentName: '虚拟DOM一定更快吗？', content: 'Svelte 那种编译时方案又是另一条路，各有取舍吧。' })
  const r419a = lastId()
  push({ name: 'Hector', targetId: '419', parentId: r419a, commentName: '虚拟DOM一定更快吗？', content: 'Svelte 确实快，但生态还是差一截，大项目还是 Vue/React 稳。' })

  // ── 412 ──────────────────────────────────────────────────────────────────────
  push({ name: 'TS萌新', targetId: '412', parentId: null, commentName: 'Vue3+typescript 快速上手', content: '泛型组件 props 推导有时要显式写，有没有最佳实践合集？' })
  const r412a = lastId()
  push({ name: '兔子零', targetId: '412', parentId: r412a, commentName: 'Vue3+typescript 快速上手', content: '建议配合 volar + 严格模式，从小组件开始加类型。' })
  const r412b = lastId()
  push({ name: 'TS萌新', targetId: '412', parentId: r412b, commentName: 'Vue3+typescript 快速上手', content: '已经装了 volar，但 defineProps 的泛型写法还是有点绕。' })
  const r412c = lastId()
  push({ name: '兔子零', targetId: '412', parentId: r412c, commentName: 'Vue3+typescript 快速上手', content: '用 withDefaults(defineProps<{...}>(), {...}) 这个组合就很清晰了。' })
  push({ name: '老陈', targetId: '412', parentId: null, commentName: 'Vue3+typescript 快速上手', content: '从 JS 迁移到 TS 最大的收益是重构时不怕改漏了。' })

  // ── 408 ──────────────────────────────────────────────────────────────────────
  push({ name: 'ViteUser', targetId: '408', parentId: null, commentName: 'Vite2 + Vue3搭建项目脚手架', content: '冷启动速度真的快，老项目 webpack 迁移要注意 legacy 插件。' })
  const r408a = lastId()
  push({ name: '兔子零', targetId: '408', parentId: r408a, commentName: 'Vite2 + Vue3搭建项目脚手架', content: '@vitejs/plugin-legacy 处理兼容性，基本无痛迁移。' })
  push({ name: '小明同学', targetId: '408', parentId: null, commentName: 'Vite2 + Vue3搭建项目脚手架', content: 'HMR 速度比 webpack 快了不止一个量级，开发体验提升明显。' })

  // ── 402 ──────────────────────────────────────────────────────────────────────
  push({ name: '键盘侠本侠', targetId: '402', parentId: null, commentName: 'HHKB MAC 配置指南 操作指南 快捷键', content: 'HHKB 配 Karabiner 之后终于不用切系统快捷键了。' })
  push({ name: 'Mac老用户', targetId: '402', parentId: null, commentName: 'HHKB MAC 配置指南 操作指南 快捷键', content: '蓝牙延迟在会议场景能接受，码字为主可以闭眼入。' })
  const r402a = lastId()
  push({ name: '键盘侠本侠', targetId: '402', parentId: r402a, commentName: 'HHKB MAC 配置指南 操作指南 快捷键', content: '同意，我用了两年了，手感确实没话说。' })
  push({ name: '程序员阿强', targetId: '402', parentId: null, commentName: 'HHKB MAC 配置指南 操作指南 快捷键', content: '这篇配置指南救了我，买来两周一直没配好，照着做完美了。' })

  // ── 3 (featured) ─────────────────────────────────────────────────────────────
  push({ name: '路过读者', targetId: '3', parentId: null, commentName: '世界上只有一种英雄主义', content: '写得很克制，读完沉默了很久。' })
  push({ name: '南方乔木', targetId: '3', parentId: null, commentName: '世界上只有一种英雄主义', content: '一个人生活那段太真实了，像在看自己的日记。' })
  const r3a = lastId()
  push({ name: '兔子零', targetId: '3', parentId: r3a, commentName: '世界上只有一种英雄主义', content: '谢谢你能读完，愿你我都能在孤独里长出力气。' })
  const r3b = lastId()
  push({ name: '南方乔木', targetId: '3', parentId: r3b, commentName: '世界上只有一种英雄主义', content: '会的，共勉。' })
  push({ name: '匿名用户', targetId: '3', parentId: null, commentName: '世界上只有一种英雄主义', content: '电影《冈仁波齐》那段我也记得，蚂蚁的镜头意味深长。' })
  push({ name: '晚风', targetId: '3', parentId: null, commentName: '世界上只有一种英雄主义', content: '孤独是一种境界，不是一种状态。这句话让我想了很久。' })
  const r3c = lastId()
  push({ name: '兔子零', targetId: '3', parentId: r3c, commentName: '世界上只有一种英雄主义', content: '是的，耐得住寂寞，才能走得更远。' })

  // ── 17 (about) ───────────────────────────────────────────────────────────────
  push({ name: '新访客', targetId: '17', parentId: null, commentName: 'about', content: '排版舒服，背景音乐开关很贴心～' })
  push({ name: '路人乙', targetId: '17', parentId: null, commentName: 'about', content: '博主加油，文章质量很高！' })
  const r17a = lastId()
  push({ name: '兔子零', targetId: '17', parentId: r17a, commentName: 'about', content: '谢谢鼓励，会继续更新的～' })

  // ── extras ───────────────────────────────────────────────────────────────────
  const extras: [string, string, string, string?][] = [
    ['416', 'HTML5的 input:file上传类型控制', 'multiple 在 iOS 上表现还是要真机测一遍。'],
    ['415', 'css input[type=file] 样式美化', '用 label 包一层隐藏原生 input 最稳。'],
    ['414', 'input accept属性限制文件上传格式', 'accept 和 MIME 对照表建议写进文档。'],
    ['413', 'redis 错误排查', '先看 bind 和 protected-mode，十有八九是配置。'],
    ['411', 'npm', 'pnpm 在 monorepo 里磁盘占用友好很多。'],
    ['410', 'SassScript', '颜色函数混用要注意 sass 版本差异。'],
    ['409', '微信小程序生成二维码', '注意小程序码和 H5 二维码接口别混用。'],
    ['407', '新Mac Flutter开发环境搭建', 'Rosetta 下跑旧插件偶尔踩坑，能原生就原生。'],
    ['405', 'mac .bash_profile 权限问题', 'zsh 用户改 .zshrc，别改错文件。'],
    ['404', 'brew 命令找不到', 'M1 记得看官方安装脚本里的 PATH 提示。'],
    ['403', 'Mac安装CocoaPods', 'ruby 版本用 rbenv 锁住，少折腾。'],
    ['418', 'Vue路由拦截与权限控制', '路由守卫和 axios 拦截器一起用时要小心重复弹窗。'],
    ['417', '常用的正则表达式整理', '手机号那段我抄到项目里了，记得根据号段更新。'],
  ]
  for (const [tid, title, text] of extras) {
    push({ name: `读者_${tid}`, targetId: tid, parentId: null, commentName: title, content: text })
    const parentId = lastId()
    push({ name: '兔子零', targetId: tid, parentId, commentName: title, content: '感谢反馈，已记录～' })
  }
  return out
}

const ALL_COMMENTS = buildComments()

// ─── Letters ──────────────────────────────────────────────────────────────────

const ALL_LETTERS: LetterItem[] = [
  { contentHtml: '<p>你好，这是一封模拟信件。愿温柔长伴，愿岁月静好。</p>', time: '2022-01-12 10:00:00' },
  { contentHtml: '<p>愿温柔长伴，愿你所遇皆是良人。</p>', time: '2022-01-11 18:30:00' },
  { contentHtml: '<p>陌生人，你好呀，承蒙遇见，三生有幸。</p>', time: '2022-01-10 09:15:00' },
  { contentHtml: '<p>世界上只有一种英雄主义，就是在认清生活真相之后依然选择热爱生活。</p>', time: '2022-01-09 20:00:00' },
  { contentHtml: '<p>愿所有的美好如约而至，愿所有的黑暗都能看到希望。</p>', time: '2022-01-08 14:22:00' },
]

// ─── Public API ───────────────────────────────────────────────────────────────

export function getMockResponse<T>(path: string, params?: Record<string, unknown>): ApiResponse<T> {
  if (path === '/api/v1/site') return ok(SITE_INFO) as unknown as ApiResponse<T>
  if (path === '/api/v1/links') return ok([]) as unknown as ApiResponse<T>

  if (path === '/api/v1/articles') {
    const page = Number(params?.page ?? 1)
    const size = Number(params?.size ?? 20)
    const keyword = String(params?.keyword ?? '').toLowerCase()
    const typeId = params?.typeId ? String(params.typeId) : ''
    let list = [...ARTICLE_LIST]
    if (keyword) list = list.filter(a => a.title.toLowerCase().includes(keyword) || (a.excerpt || '').toLowerCase().includes(keyword))
    if (typeId) list = list.filter(a => String(a.typeId) === typeId)
    const paged = list.slice((page - 1) * size, page * size)
    return ok({ list: paged, pagination: { page, size, total: 354 } } as ArticlePageData) as unknown as ApiResponse<T>
  }

  if (path === '/api/v1/articles/about') return ok(ABOUT) as unknown as ApiResponse<T>

  const detailMatch = path.match(/^\/api\/v1\/articles\/([^/]+)$/)
  if (detailMatch) {
    const id = detailMatch[1]
    if (id === '3') return ok({ ...FEATURED }) as unknown as ApiResponse<T>
    if (id === '17') return ok({ ...ABOUT }) as unknown as ApiResponse<T>
    const row = ARTICLE_LIST.find(r => r.id === id)
    if (!row) return { code: 404, message: 'not found', data: null as unknown as T }
    return ok(buildDetail(row)) as unknown as ApiResponse<T>
  }

  const commentsMatch = path.match(/^\/api\/v1\/articles\/([^/]+)\/comments$/)
  if (commentsMatch) {
    const page = Number(params?.page ?? 1)
    const size = Number(params?.size ?? 15)
    const list = ALL_COMMENTS.filter(c => c.targetId === commentsMatch[1])
    const paged = list.slice((page - 1) * size, page * size)
    return ok({ list: paged, pagination: { page, size, total: list.length } } as CommentPageData) as unknown as ApiResponse<T>
  }

  if (path === '/api/v1/letters') {
    const page = Number(params?.page ?? 1)
    const size = Number(params?.size ?? 10)
    const paged = ALL_LETTERS.slice((page - 1) * size, page * size)
    return ok({ list: paged, pagination: { page, size, total: ALL_LETTERS.length } } as LetterPageData) as unknown as ApiResponse<T>
  }

  if (path === '/api/v1/captcha') {
    return ok({ data: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="38"><text x="10" y="28" font-size="24" fill="#333">1234</text></svg>', captchaId: 'mock-captcha-id' }) as unknown as ApiResponse<T>
  }

  if (path.endsWith('/like') || path === '/api/v1/subscriptions') {
    return ok(null) as unknown as ApiResponse<T>
  }

  return { code: 404, message: `Mock: no handler for ${path}`, data: null as unknown as T }
}

export function getMockPostResponse<T>(_path: string, _body?: unknown): ApiResponse<T> {
  return ok(null) as unknown as ApiResponse<T>
}
