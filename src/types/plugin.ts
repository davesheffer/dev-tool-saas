export interface PluginManifest {
  name: string;
  slug: string;
  description: string;
  author: string;
  version: string;
  icon?: string;
  category?: string;
  tags?: string[];
}

export interface Plugin {
  manifest: PluginManifest;
  component: React.ComponentType;
}

export interface PluginRegistryEntry {
  manifest: PluginManifest;
  load: () => Promise<{ default: React.ComponentType }>;
}
