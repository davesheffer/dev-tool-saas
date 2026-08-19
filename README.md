# ⚡ DevTools SaaS — Modular Dev Tools Platform

A plugin-based, open-source SaaS platform for everyday developer utilities. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Architecture

```
/
├── plugins/                        # All plugins live here
│   ├── json-formatter/
│   │   ├── manifest.json           # Plugin metadata
│   │   ├── index.tsx               # React component
│   │   └── README.md
│   └── jwt-decoder/
│       ├── manifest.json
│       ├── index.tsx
│       └── README.md
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Dashboard
│   │   └── tools/[slug]/page.tsx   # Dynamic tool route
│   ├── components/                 # Shared UI components
│   ├── core/                       # Plugin registry & loader
│   ├── types/                      # TypeScript interfaces
│   └── utils/                      # Shared utilities
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Plugin System

Each plugin is a self-contained module inside the `/plugins` directory.

### Plugin Structure

```
plugins/my-tool/
├── manifest.json    # Metadata (name, slug, description, author)
├── index.tsx        # Default export: React component
└── README.md        # Documentation
```

### manifest.json

```json
{
  "name": "My Tool",
  "slug": "my-tool",
  "description": "A short description of what it does",
  "author": "Your Name",
  "version": "1.0.0",
  "icon": "🔧",
  "category": "Utility",
  "tags": ["tool", "utility"]
}
```

### Plugin Interface

```typescript
interface PluginManifest {
  name: string;
  slug: string;
  description: string;
  author: string;
  version: string;
  icon?: string;
  category?: string;
  tags?: string[];
}
```

### Registering a Plugin

After creating your plugin folder, register it in `src/core/plugin-registry.ts`:

```typescript
import myToolManifest from "../../plugins/my-tool/manifest.json";

// Add to the registry array:
{
  manifest: myToolManifest as PluginManifest,
  load: () => import("../../plugins/my-tool"),
}
```

The tool will automatically appear on the dashboard and be routable at `/tools/my-tool`.

## Available Tools

| Tool | Description |
|------|-------------|
| **JSON Formatter** | Format, validate, and minify JSON |
| **JWT Decoder** | Decode and inspect JSON Web Tokens |

## Tech Stack

- **Next.js 16** — App Router
- **TypeScript** — Strict mode
- **Tailwind CSS 4** — Utility-first styling
- **React 19** — Server & Client components

## Design Principles

1. **Plugin isolation** — each tool is self-contained, no cross-plugin imports
2. **No hardcoded registration** — plugins declare metadata, core discovers them
3. **Code-splitting** — plugins are lazy-loaded via dynamic imports
4. **Client-side only** — no backend required for MVP tools
5. **Community-first** — easy to fork, contribute, and extend

## License

MIT
