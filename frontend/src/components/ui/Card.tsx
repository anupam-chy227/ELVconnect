"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { tokens } from "@/theme/tokens";
import { cn } from "./utils";

export type CardVariant = "default" | "glass" | "stat" | "interactive" | "panel" | "elevated";
export type CardPadding = "none" | "sm" | "md" | "lg";

export type CardProps = Omit<HTMLMotionProps<"section">, "children"> & {
  title?: string;
  description?: string;
  action?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  children?: ReactNode;
};

export const cardBaseClassName =
  "group/card relative overflow-hidden rounded-md border transition-all duration-200 ease-out focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary-ring";

export const cardPaddingClassNames: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export const cardVariantClassNames: Record<CardVariant, string> = {
  default:
    "border-border-subtle bg-surface shadow-card hover:border-border hover:shadow-md",
  glass:
    "border-glass-border bg-glass shadow-card backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/28 before:to-transparent hover:border-primary/25 hover:bg-glass-strong hover:shadow-glow",
  stat:
    "border-white/70 bg-gradient-to-br from-white via-white to-primary-subtle/45 shadow-card hover:border-primary/25 hover:shadow-glow dark:border-slate-700/70 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30",
  interactive:
    "cursor-pointer border-border-subtle bg-surface shadow-card hover:-translate-y-1 hover:border-primary/35 hover:shadow-glow active:translate-y-0",
  panel:
    "border-border-subtle bg-surface-muted shadow-sm hover:border-border hover:bg-surface",
  elevated:
    "border-white/70 bg-white shadow-floating hover:border-primary/20 dark:border-slate-700/70 dark:bg-slate-900/90",
};

export function Card({
  title,
  description,
  action,
  variant = "default",
  padding = "md",
  interactive,
  className,
  style,
  whileHover,
  transition,
  children,
  ...props
}: CardProps) {
  return (
    <motion.section
      className={cn(
        cardBaseClassName,
        cardVariantClassNames[variant],
        cardPaddingClassNames[padding],
        className,
      )}
      style={{ borderRadius: tokens.radius.lg, ...style }}
      initial={props.initial ?? { opacity: 0, y: 8 }}
      whileInView={props.whileInView ?? { opacity: 1, y: 0 }}
      viewport={props.viewport ?? { once: true, margin: "-24px" }}
      whileHover={whileHover ?? (interactive || variant === "interactive" ? { y: -4, scale: 1.01 } : { y: -2 })}
      whileTap={props.whileTap ?? (interactive || variant === "interactive" ? { scale: 0.99 } : undefined)}
      transition={transition ?? { type: "spring", stiffness: 300, damping: 26 }}
      {...props}
    >
      {title || description || action ? (
        <div className="relative mb-4 flex flex-col gap-3 border-b border-border-subtle pb-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {title ? <h2 className="text-base font-bold text-foreground">{title}</h2> : null}
            {description ? <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </motion.section>
  );
}
