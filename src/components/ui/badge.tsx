"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-zinc-400 border border-zinc-700/50",
        category: "bg-indigo-950/40 text-indigo-400 border border-indigo-500/20",
        tag: "bg-zinc-800/60 text-zinc-500 border border-zinc-700/30",
        info: "bg-indigo-950/30 text-indigo-400 border border-indigo-500/20",
        success: "bg-emerald-950/30 text-emerald-400 border border-emerald-500/20",
        warning: "bg-amber-950/30 text-amber-400 border border-amber-500/20",
        destructive: "bg-red-950/30 text-red-400 border border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
