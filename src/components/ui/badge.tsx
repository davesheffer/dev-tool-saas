"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-600 border border-zinc-300/50",
        category: "bg-indigo-50 text-indigo-600 border border-indigo-200",
        tag: "bg-zinc-100/60 text-zinc-500 border border-zinc-300/30",
        info: "bg-indigo-50 text-indigo-600 border border-indigo-200",
        success: "bg-emerald-50 text-emerald-600 border border-emerald-200",
        warning: "bg-amber-50 text-amber-600 border border-amber-200",
        destructive: "bg-red-50 text-red-600 border border-red-200",
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
