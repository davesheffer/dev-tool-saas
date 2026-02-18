"use client";

import Link from "next/link";
import type { PluginManifest } from "@/types/plugin";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ToolCardProps {
  plugin: PluginManifest;
}

/** Generate a two-letter monogram from a plugin name */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ToolCard({ plugin }: ToolCardProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/tools/${plugin.slug}`} className="block">
            <Card className="group relative p-5 hover:border-indigo-500/30 hover:bg-zinc-800/60 cursor-pointer h-full overflow-hidden">
              {/* Subtle gradient accent on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start gap-4">
                {/* Icon / Monogram */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-xs font-semibold text-zinc-400 group-hover:border-indigo-500/30 group-hover:text-indigo-400 transition-all duration-200">
                  {initials(plugin.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-indigo-300 transition-colors">
                    {plugin.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-500 line-clamp-2">
                    {plugin.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    {plugin.category && (
                      <Badge variant="category">{plugin.category}</Badge>
                    )}
                    {plugin.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="tag">{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-zinc-700 group-hover:text-indigo-400 transition-colors mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Open {plugin.name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
