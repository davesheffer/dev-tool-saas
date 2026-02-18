"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              DevTools
            </span>
            <Badge variant="default">SaaS</Badge>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <Separator orientation="vertical" className="h-3.5 mx-2 bg-zinc-700" />

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="https://github.com/davesheffer/dev-tool-saas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  GitHub
                </NavigationMenuLink>
              </NavigationMenuItem>

              <Separator orientation="vertical" className="h-3.5 mx-2 bg-zinc-700" />

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="https://github.com/coders-clan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                  Coders Clan
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
