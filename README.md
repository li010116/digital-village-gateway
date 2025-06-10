# 数字乡村网关项目文档

## 一、项目概述
数字乡村网关项目是一个基于 Vite、TypeScript 和 React 构建的数字化乡村应用，旨在推动乡村数字化转型，为农民提供智慧农业、社会治理、便民服务等全方位数字化解决方案。项目使用了 shadcn-ui 作为 UI 组件库，Tailwind CSS 进行样式设计，并集成了 Supabase 进行数据存储和管理。

## 二、项目信息
- **项目链接**：[https://lovable.dev/projects/da672576-ad02-4fcd-8775-1c170aa92634](https://lovable.dev/projects/da672576-ad02-4fcd-8775-1c170aa92634)
- **技术栈**：
    - **构建工具**：Vite
    - **编程语言**：TypeScript
    - **前端框架**：React
    - **UI 组件库**：shadcn-ui
    - **CSS 框架**：Tailwind CSS
    - **数据库**：Supabase

## 三、目录结构
```
.gitignore
README.md
bun.lockb
components.json
eslint.config.js
index.html
package-lock.json
package.json
postcss.config.js
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
src/
  App.css
  App.tsx
  components/
  hooks/
  index.css
  integrations/
  lib/
  main.tsx
  pages/
  vite-env.d.ts
public/
  favicon.ico
  placeholder.svg
  robots.txt
supabase/
  config.toml
```

### 主要目录及文件说明
1. **`src` 目录**：源代码目录，包含项目的主要代码。
    - **`components`**：组件目录，包含各种可复用的 React 组件，如 `Footer.tsx`、`HeroCarousel.tsx` 等。
    - **`hooks`**：自定义 React Hooks 目录。
    - **`integrations`**：集成第三方服务的目录，如 `supabase` 集成。
    - **`lib`**：工具函数目录，如 `utils.ts` 包含一些常用的工具函数。
    - **`pages`**：页面组件目录，包含项目的各个页面，如 `Index.tsx`、`SmartAgriculture.tsx` 等。
2. **`public` 目录**：公共资源目录，包含项目的公共资源，如 `favicon.ico`、`robots.txt` 等。
3. **配置文件**：
    - **`package.json`**：项目依赖和脚本配置文件。
    - **`tailwind.config.ts`**：Tailwind CSS 配置文件。
    - **`tsconfig.json`**：TypeScript 配置文件。
    - **`vite.config.ts`**：Vite 配置文件。

## 四、主要功能模块

### 1. 首页（`Index.tsx`）
- **导航栏**：提供网站导航功能。
- **轮播图**：展示数字乡村相关的宣传图片。
- **服务卡片**：展示数字乡村的各项服务，如智慧农业、社会治理等。
- **应用中心**：展示数字乡村的各种应用。
- **页脚**：包含公司信息、快速链接、服务项目和联系信息等。
- **返回顶部按钮**：当页面滚动超过一定距离时显示，点击可返回页面顶部。

### 2. 智慧农业页面（`SmartAgriculture.tsx`）
- **导航栏**：提供网站导航功能。
- **标题和描述**：介绍智慧农业的概念和作用。
- **科技赋能现代农业**：介绍智慧农业的技术应用和优势。
- **图片展示**：展示智慧农业的相关图片。
- **页脚**：包含公司信息、快速链接、服务项目和联系信息等。

### 3. 应用详情页面（`AppDetail.tsx`）
- **导航栏**：提供网站导航功能。
- **返回按钮**：点击可返回上一页。
- **应用信息**：展示应用的名称、描述、评分、下载量等信息。
- **应用介绍**：详细介绍应用的功能和特点。
- **主要功能**：列出应用的主要功能。
- **侧边栏信息**：展示应用的开发者、分类、版本、更新历史等信息。
- **页脚**：包含公司信息、快速链接、服务项目和联系信息等。

## 五、Supabase 集成
项目集成了 Supabase 进行数据存储和管理，相关代码位于 `src/integrations/supabase` 目录下。
- **`client.ts`**：创建 Supabase 客户端实例，用于与 Supabase 数据库进行交互。
```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://guepqhegqounvpjdlssz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZXBxaGVncW91bnZwamRsc3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTg2NjksImV4cCI6MjA2NTA5NDY2OX0.HSi8ff7XZP-i5y7lMA-KXpE0eSyV27cBlkqek38f9Y4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```
- **`types.ts`**：定义数据库的类型，确保 TypeScript 类型安全。

## 六、开发和部署

### 开发
1. 克隆项目仓库：
```sh
git clone <YOUR_GIT_URL>
```
2. 进入项目目录：
```sh
cd <YOUR_PROJECT_NAME>
```
3. 安装依赖：
```sh
npm i
```
4. 启动开发服务器：
```sh
npm run dev
```

### 部署
可以通过 Lovable 平台进行部署，打开 [Lovable](https://lovable.dev/projects/da672576-ad02-4fcd-8775-1c170aa92634) 并点击 `Share -> Publish` 即可。

### 自定义域名
可以将自定义域名连接到 Lovable 项目，具体操作步骤为：导航到 `Project > Settings > Domains` 并点击 `Connect Domain`。更多详细信息可以参考 [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)。

## 七、代码规范
项目使用 ESLint 进行代码检查，相关配置文件为 `eslint.config.js`。在开发过程中，可运行以下命令进行代码检查：
```sh
npm run lint
```

## 八、注意事项
- 请确保在开发和部署过程中，`SUPABASE_URL` 和 `SUPABASE_PUBLISHABLE_KEY` 的安全性，避免泄露。
- 在修改代码时，遵循项目的代码规范和目录结构，确保代码的可维护性和可读性。
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/da672576-ad02-4fcd-8775-1c170aa92634

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/da672576-ad02-4fcd-8775-1c170aa92634) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/da672576-ad02-4fcd-8775-1c170aa92634) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
