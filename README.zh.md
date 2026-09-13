# MySelf OS 网站

[English](README.md) | [简体中文](README.zh.md)

本仓库包含 MySelf OS 网站。产品运行时在下方关联的前端仓库中独立开发。已提交的包使用 React、TypeScript 和 Vite；包标记为私有，当前声明版本为 0.0.0，该数值不是统一规划的产品发布版本。

跨仓库工作、实现与验收统一在 [Project 9](https://github.com/users/yhbcode000/projects/9) 跟踪。关联仓库包括[前端 fork](https://github.com/yhbcode000/Myself-os-front)、[本地 Agent](https://github.com/yhbcode000/Myself-os-agent)、[模拟器](https://github.com/yhbcode000/Myself-os-simulator)及 [orchestrator 研究参考](https://github.com/yhbcode000/orchestrator)。各仓库保留独立源码、版本与验证证据。

## 本地开发

在仓库根目录使用与已提交依赖兼容的 Node.js/npm 环境运行：

~~~sh
npm ci
npm run dev -- --host 127.0.0.1
~~~

Vite 配置端口为 3000，以 Vite 输出的回环地址为准。入口为 index.html，应用源码位于 src/，@ 别名指向 src/。

~~~sh
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
~~~

构建脚本先执行 TypeScript 项目检查，再运行 Vite。preview 仅提供本地构建预览，不是部署命令。本次文档更新从 package.json 与 vite.config.ts 核对这些命令，未实际执行。

## 协作与证据

使用命名分支/工作树，修改前检查已有变更，将所属仓库的 issue 和 PR 关联到 Project 9。当前文档维持英文与简体中文配对。凭据、私密记录、本地视频与环境文件不进入提交。

仅有浏览器代码不能证明原生移动端支持、传感器权限、Agent 集成、真机行为或发布验收；应针对准确候选版本单独记录这些验证。当前实现与发布归属以统一产品路线为准，本指南不改变其范围。

原始 [Vite 模板 README](docs/reference/VITE-TEMPLATE.md) 保留为历史英文参考，其中包含可选的 lint 配置示例。
