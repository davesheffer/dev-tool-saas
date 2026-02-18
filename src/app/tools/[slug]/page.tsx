"use client";

import { useParams } from "next/navigation";
import { Suspense, lazy } from "react";
import Link from "next/link";
import { getPluginBySlug } from "@/core/plugin-registry";
import type { PluginManifest } from "@/types/plugin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

/** Generate a two-letter monogram from a plugin name */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ToolLoader({ slug }: { slug: string }) {
  const entry = getPluginBySlug(slug);

  if (!entry) {
    return (
      <div className="text-center py-24">
        <div className="mx-auto w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center mb-5">
          <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-zinc-200">Tool not found</h2>
        <p className="mt-2 text-sm text-zinc-500">
          No plugin registered with slug &ldquo;{slug}&rdquo;
        </p>
        <Button variant="ghost" className="mt-6" asChild>
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const LazyComponent = lazy(entry.load);

  return (
    <ToolPageLayout manifest={entry.manifest}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500" />
          </div>
        }
      >
        <LazyComponent />
      </Suspense>
    </ToolPageLayout>
  );
}

function ToolPageLayout({
  manifest,
  children,
}: {
  manifest: PluginManifest;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-xs text-zinc-600 mb-3">
            <Link
              href="/"
              className="hover:text-zinc-300 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-400">{manifest.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-xs font-semibold text-zinc-400">
              {initials(manifest.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-zinc-100">
                  {manifest.name}
                </h1>
                {manifest.version && (
                  <Badge variant="info">v{manifest.version}</Badge>
                )}
              </div>
              <p className="text-sm text-zinc-500">{manifest.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <ToolLoader slug={slug} />;
}
