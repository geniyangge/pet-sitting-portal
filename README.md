---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: 80ec278844915e4d650e92767abd85ab
    PropagateID: 80ec278844915e4d650e92767abd85ab
    ReservedCode1: 304502203f66cb2bbfddf32c5368e80059941e76114459d37fe3faf28fc0893885fbe4790221009ecb28ea6ae303d9509b375374314a259b05ed93bd87925dc4027b279f7f9692
    ReservedCode2: 3046022100fe295ea8ca547cf7116384db986bb72e61845e5e8a189c0975862077fb9850ed02210082977a71a65c99a73c79311598bf6d03cf0bfa5a8de10a8971cd3d1a09fa8aa5
---

# 🐾 宠物代养门户网站

基于 Vue3 + TypeScript 开发的现代化宠物代养服务平台，采用温馨治愈的设计风格，为宠物主人提供专业、贴心的代养服务。

[![Vue3](https://img.shields.io/badge/Vue-3.5-blue.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.13-green.svg)](https://element-plus.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-purple.svg)](https://vitejs.dev/)

## 🌐 在线预览

**🚀 演示地址：** https://b9riqf29evj6.space.minimaxi.com

> 点击上方链接即可在线体验完整功能！

## ✨ 项目亮点

- 🎨 **现代温馨设计** - 暖米色主色调，营造温馨信任感
- 📱 **全响应式布局** - 完美适配桌面端、平板和移动设备
- ⚡ **性能优化** - 基于 Vite 构建，开发体验流畅
- 🔒 **类型安全** - 完整 TypeScript 支持
- 🧩 **组件化开发** - 可维护、可复用的代码结构
- 🎯 **用户体验优先** - 直观易用的界面设计

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue.js | 3.5.x | 前端框架 |
| TypeScript | 5.9.x | 类型安全 |
| Element Plus | 2.13.x | UI组件库 |
| Pinia | 3.0.x | 状态管理 |
| Vue Router | 4.6.x | 路由管理 |
| Vite | 7.3.x | 构建工具 |

## 📁 项目结构

```
pet-sitting-portal/
├── public/                    # 公共资源
│   ├── images/               # 图片资源
│   └── favicon.svg           # 网站图标
├── src/
│   ├── assets/               # 静态资源
│   │   └── styles/          # 样式文件
│   ├── components/           # 可复用组件
│   ├── router/              # 路由配置
│   │   └── index.ts         # 路由定义
│   ├── stores/              # 状态管理
│   │   └── index.ts         # Pinia 状态定义
│   ├── types/               # TypeScript 类型定义
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── Services.vue     # 服务介绍
│   │   ├── Caregivers.vue  # 代养师团队
│   │   ├── Booking.vue      # 预约服务
│   │   ├── Profile.vue      # 用户中心
│   │   └── Contact.vue      # 联系我们
│   ├── App.vue             # 主应用组件
│   ├── main.ts             # 应用入口
│   └── env.d.ts            # 类型声明
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.x
- pnpm >= 8.x (推荐) 或 npm >= 8.x

### 安装步骤

1. **克隆项目**
```bash
git clone [项目地址]
cd pet-sitting-portal
```

2. **安装依赖**
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

3. **启动开发服务器**
```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

4. **浏览器访问**
```
http://localhost:5173
```

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📱 功能展示

### 🏠 首页 (Home)
- 精美的轮播图展示核心服务
- 服务类型快速导航
- 热门代养师推荐
- 真实用户评价展示
- 服务流程可视化

### 📋 服务介绍 (Services)
- **家庭寄养** - 150-300元/天，提供舒适家庭环境
- **上门喂养** - 60-100元/次，熟悉的家庭环境
- **遛狗服务** - 50-80元/次，专业遛狗师服务
- 详细价格表和服务对比
- 服务优势和特色介绍

### 👥 代养师团队 (Caregivers)
- 代养师个人资料展示
- 经验年限和专长领域
- 用户评分和评价
- 服务区域和时间
- 在线预约功能

### 📅 预约服务 (Booking)
- 智能表单设计
- 宠物信息录入
- 服务类型选择
- 价格实时计算
- 预约时间管理

### 👤 用户中心 (Profile)
- 个人信息管理
- 我的宠物档案
- 订单历史查看
- 收藏代养师

### 📞 联系我们 (Contact)
- 多种联系方式
- 在线客服功能
- 常见问题解答
- 投诉建议渠道

## 🎨 设计系统

### 色彩方案
```css
:root {
  --color-primary: #D97706;        /* 主色调 - 温暖橙色 */
  --color-primary-light: #F59E0B;  /* 浅色调 - 柔和橙色 */
  --color-primary-dark: #B45309;   /* 深色调 - 稳重橙色 */
  --color-warm-beige: #FEF3E2;    /* 暖米色 - 背景色 */
  --color-warm-cream: #FFF8F0;    /* 暖奶油色 - 页面背景 */
}
```

### 字体系统
- **主字体**: 'Noto Sans SC' - 中文优化字体
- **备选**: 系统默认无衬线字体
- **字重**: 400 (常规), 500 (中等), 600 (半粗)

### 圆角规范
- 小圆角: 8px
- 中等圆角: 12px  
- 大圆角: 16px
- 超大圆角: 24px

## 🔧 开发指南

### 代码规范

- **Vue 组件**: 使用 Composition API
- **TypeScript**: 严格类型检查
- **样式**: CSS 变量 + BEM 命名规范
- **组件通信**: Props + Emits + Pinia

### 状态管理

项目使用 Pinia 进行状态管理，主要包含：

- `userStore` - 用户信息和登录状态
- `caregiversStore` - 代养师数据管理

### 路由配置

```typescript
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/services', name: 'Services', component: Services },
  { path: '/caregivers', name: 'Caregivers', component: Caregivers },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/contact', name: 'Contact', component: Contact }
]
```

## 📦 部署指南

### 静态部署

项目构建后生成静态文件，可部署到任意静态服务器：

```bash
# 构建项目
pnpm build

# dist 目录包含所有静态文件
# 可部署到: Nginx, Apache, Vercel, Netlify 等
```

### 预览部署

```bash
# 预览构建结果
pnpm preview
```

## 🔍 项目特色

### 用户体验
- ✨ 流畅的页面切换动画
- 📱 完美的移动端适配
- 🎨 温馨治愈的视觉设计
- 🔍 清晰的导航结构

### 技术特性
- ⚡ Vite 构建，开发热更新
- 🔒 TypeScript 类型安全
- 🧩 Vue 3 Composition API
- 📦 Element Plus 丰富组件
- 🎯 响应式设计优先

### 代码质量
- 📝 完整的 TypeScript 类型定义
- 🎨 统一的代码风格
- 🧪 可扩展的组件架构
- 📊 清晰的目录结构

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**MiniMax Agent** - *项目开发* - 专注于现代前端技术开发

## 🙏 致谢

- Vue.js 团队提供的优秀框架
- Element Plus 团队提供的UI组件库
- Vite 团队提供的高效构建工具
- 所有为开源社区贡献的开发者和设计师

---

⭐ **如果这个项目对您有帮助，请给它一个星标！**

📧 **如有问题或建议，欢迎联系我们！**
