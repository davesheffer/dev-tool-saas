# Contributing to DevTools SaaS

Thanks for your interest in contributing! This project is designed to make it easy for anyone to add a new developer tool as a plugin.

## Adding a New Plugin

### 1. Create a Plugin Folder

```bash
mkdir plugins/my-awesome-tool
```

### 2. Add `manifest.json`

```json
{
  "name": "My Awesome Tool",
  "slug": "my-awesome-tool",
  "description": "What it does in one sentence",
  "author": "Your Name",
  "version": "1.0.0",
  "icon": "🚀",
  "category": "Utility",
  "tags": ["keyword1", "keyword2"]
}
```

**Important:** The `slug` must be URL-safe (lowercase, hyphens, no spaces).

### 3. Create `index.tsx`

```tsx
"use client";

import { useState } from "react";

export default function MyAwesomeTool() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-100">My Awesome Tool</h2>
      {/* Your tool UI here */}
    </div>
  );
}
```

**Rules:**
- Must have `"use client"` directive at the top
- Must `export default` a React component
- Must be fully self-contained (no imports from other plugins)
- Use Tailwind CSS for styling
- Keep dependencies minimal — prefer browser-native APIs

### 4. Add `README.md`

Document your plugin's features and usage.

### 5. Register the Plugin

Open `src/core/plugin-registry.ts` and add:

```typescript
import myAwesomeToolManifest from "../../plugins/my-awesome-tool/manifest.json";

// In the registry array:
{
  manifest: myAwesomeToolManifest as PluginManifest,
  load: () => import("../../plugins/my-awesome-tool"),
}
```

### 6. Test

```bash
npm run dev
```

Visit `http://localhost:3000` — your tool should appear on the dashboard.
Visit `http://localhost:3000/tools/my-awesome-tool` — your tool should render.

## Guidelines

- **Keep plugins isolated** — don't import from other plugins
- **No core modifications** — unless adding a new system feature
- **TypeScript strict mode** — no `any` unless absolutely necessary
- **Accessible UI** — use proper labels, focus states, and semantic HTML
- **Responsive** — tools should work on mobile and desktop

## Project Structure

```
plugins/          → Plugin source code (one folder per tool)
src/app/          → Next.js pages
src/components/   → Shared UI components
src/core/         → Plugin registry and loader
src/types/        → TypeScript interfaces
src/utils/        → Shared utility functions
```

## Pull Request Process

1. Fork the repo
2. Create a branch: `feat/plugin-my-awesome-tool`
3. Add your plugin following the steps above
4. Run `npm run build` to verify no errors
5. Open a PR with a description of your tool

Happy building! 🔧
