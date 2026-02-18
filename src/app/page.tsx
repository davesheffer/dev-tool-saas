import { getAllPlugins } from "@/core/plugin-registry";
import { ToolCard } from "@/components/tool-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const plugins = getAllPlugins();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
          Developer Tools
        </h1>
        <p className="mt-3 text-base text-zinc-500 max-w-xl mx-auto leading-relaxed">
          A modular, plugin-based platform for everyday dev utilities.
          Open-source and community-driven.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-sm">
          <Badge>{plugins.length} tools</Badge>
          <Badge>Plugin architecture</Badge>
          <Badge>Client-side</Badge>
        </div>
      </div>

      <Separator className="mb-10 bg-zinc-800" />

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {plugins.map((plugin) => (
          <ToolCard key={plugin.slug} plugin={plugin} />
        ))}

        {/* Placeholder card for contributing */}
        <div className="border border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
          <svg className="w-6 h-6 text-zinc-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m-7-7h14" />
          </svg>
          <p className="text-sm font-medium text-zinc-500">
            Want to add a tool?
          </p>
          <a
            href="https://github.com/davesheffer/dev-tool-saas/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Read CONTRIBUTING.md
          </a>
        </div>
      </div>
    </main>
  );
}
