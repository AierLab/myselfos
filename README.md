# MySelf OS website

[English](README.md) | [简体中文](README.zh.md)

This repository contains the MySelf OS website. The product runtime is developed separately in the frontend repository linked below. Its checked-in package uses React, TypeScript and Vite. The package is private and currently declares version 0.0.0; that value is not the coordinated product release version.

Track cross-repository work, implementation and acceptance in [Project 9](https://github.com/users/yhbcode000/projects/9). Related repositories are the [frontend fork](https://github.com/yhbcode000/Myself-os-front), [local Agent](https://github.com/yhbcode000/Myself-os-agent), [simulator](https://github.com/yhbcode000/Myself-os-simulator) and [orchestrator research reference](https://github.com/yhbcode000/orchestrator). Each repository has its own source, version and validation evidence.

## Local development

Run from the repository root with a Node.js/npm environment compatible with the checked-in dependencies:

~~~sh
npm ci
npm run dev -- --host 127.0.0.1
~~~

Vite configures port 3000; use the loopback URL printed by Vite. The entrypoint is index.html and application source is under src/. The @ alias resolves to src/.

~~~sh
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
~~~

The build script runs TypeScript project checks followed by Vite. Preview serves the local build; it is not a deployment command. These commands were read from package.json and vite.config.ts, not executed as part of this documentation update.

## Collaboration and evidence

Use named branches/worktrees, inspect existing changes before editing, and link owning-repository issues and PRs to Project 9. Keep current documentation paired in English and Simplified Chinese. Keep credentials, private records, local videos and environment files out of commits.

Browser code alone does not establish native mobile support, sensor permissions, Agent integration, physical-device behavior or release acceptance. Record those checks separately for the exact candidate. Current implementation and release ownership remain in the coordinated product roadmap; this guide does not change that scope.

The original [Vite template README](docs/reference/VITE-TEMPLATE.md) is preserved as a historical English reference, including its optional lint configuration examples.
