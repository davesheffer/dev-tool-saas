import type { PluginManifest, PluginRegistryEntry } from "@/types/plugin";

import jsonFormatterManifest from "../../plugins/json-formatter/manifest.json";
import jwtDecoderManifest from "../../plugins/jwt-decoder/manifest.json";
import base64ConverterManifest from "../../plugins/base64-converter/manifest.json";

/**
 * Plugin Registry
 *
 * Each plugin is registered here with its manifest and a lazy-loaded component.
 * To add a new plugin:
 *   1. Create a folder under /plugins/{slug}
 *   2. Add manifest.json and index.tsx
 *   3. Import the manifest here and add an entry to the registry array
 *
 * The dynamic import ensures plugins are code-split automatically.
 */
const registry: PluginRegistryEntry[] = [
  {
    manifest: jsonFormatterManifest as PluginManifest,
    load: () => import("../../plugins/json-formatter"),
  },
  {
    manifest: jwtDecoderManifest as PluginManifest,
    load: () => import("../../plugins/jwt-decoder"),
  },
  {
    manifest: base64ConverterManifest as PluginManifest,
    load: () => import("../../plugins/base64-converter"),
  },
];

export function getAllPlugins(): PluginManifest[] {
  return registry.map((entry) => entry.manifest);
}

export function getPluginBySlug(slug: string): PluginRegistryEntry | undefined {
  return registry.find((entry) => entry.manifest.slug === slug);
}

export function getPluginsByCategory(): Record<string, PluginManifest[]> {
  const grouped: Record<string, PluginManifest[]> = {};
  for (const entry of registry) {
    const cat = entry.manifest.category ?? "Uncategorized";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(entry.manifest);
  }
  return grouped;
}

export { registry };
