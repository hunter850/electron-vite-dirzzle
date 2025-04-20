# Electron + Vite + React + TypeScript

這是一個使用 Electron、Vite、React 和 TypeScript 建立的桌面應用程式專案。
This is a desktop application project built with Electron, Vite, React, and TypeScript.

## 環境需求 (Requirements)

- Node.js
- PNPM (專案使用 PNPM 作為包管理器 / Project uses PNPM as package manager)

## 環境變數設定 (Environment Variables)

在專案根目錄創建 `.env` 文件：
Create a `.env` file in the project root:

```plaintext
PORT=3000
```

## 安裝依賴 (Install Dependencies)

```bash
pnpm install
```

## 開發模式 (Development)

啟動開發環境：
Start development environment:

```bash
pnpm dev
```

這個命令會：
This command will:

1. 建立 Electron 主程序和預加載腳本
   Build Electron main process and preload scripts
2. 啟動 Vite 開發伺服器
   Start Vite development server
3. 啟動 Electron 應用程式
   Launch Electron application

## 建置專案 (Build)

打包應用程式：
Build the application:

```bash
pnpm build
```

這個命令會：
This command will:

1. 建立主程序、預加載腳本和渲染程序
   Build main process, preload scripts, and renderer process
2. 打包成可執行的桌面應用程式
   Package into executable desktop application

## 專案結構 (Project Structure)

```
├── src/
│   ├── main/          # Electron 主程序 / Electron main process
│   ├── preload/       # Electron 預加載腳本 / Electron preload scripts
│   └── renderer/      # React 應用程式 (渲染程序) / React application (renderer process)
├── vite.config.mts             # Vite 渲染程序配置 / Vite renderer process config
├── vite-main.config.mts        # Vite 主程序配置 / Vite main process config
└── vite-preload.config.mts     # Vite 預加載腳本配置 / Vite preload script config
```

## 資料庫工具 (Database Tools)

專案包含了一些資料庫相關的指令：
The project includes some database-related commands:

```bash
pnpm db:generate  # 生成資料庫遷移 / Generate database migrations
pnpm db:drop     # 刪除資料庫 / Drop database
pnpm db:migrate  # 執行資料庫遷移 / Run database migrations
pnpm db:studio   # 啟動資料庫管理介面 / Start database management interface
```
