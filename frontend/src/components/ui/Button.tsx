import type { CSSProperties, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { tokens } from "@/theme/tokens";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "trust";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-gradient-to-b from-primary to-primary-container text-on-primary shadow-glow hover:-translate-y-0.5 hover:shadow-floating active:translate-y-0",
  secondary:
    "border-border-subtle bg-surface-raised text-foreground shadow-sm backdrop-blur-xl hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:text-primary hover:shadow-md dark:bg-slate-900/80 dark:hover:bg-slate-900",
  outline:
    "border-primary/25 bg-white/70 text-primary shadow-xs backdrop-blur-xl hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary-subtle hover:shadow-sm dark:bg-slate-950/40",
  ghost:
    "border-transparent bg-transparent text-muted-foreground hover:bg-surface-muted hover:text-foreground dark:hover:bg-slate-800",
  danger:
    "border-transparent bg-gradient-to-b from-rose-600 to-rose-700 text-white shadow-sm shadow-rose-950/15 hover:-translate-y-0.5 hover:shadow-md hover:shadow-rose-950/20 active:translate-y-0",
  trust:
    "border-transparent bg-gradient-to-b from-sky-500 to-blue-600 text-white shadow-sm shadow-blue-950/15 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-950/20 active:translate-y-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-11 px-5 py-2.5 text-sm",
};

const tokenVariantStyles: Partial<Record<ButtonVariant, CSSProperties>> = {
  primary: {
    background: `linear-gradient(180deg, ${tokens.colors.primarySoft}, ${tokens.colors.primary})`,
    color: tokens.colors.surface,
  },
  danger: {
    background: `linear-gradient(180deg, #EF4444, ${tokens.colors.danger})`,
    color: tokens.colors.surface,
  },
};

export type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  children?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading,
  className,
  style,
  whileTap,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-all duration-200 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-ring disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:shadow-sm",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={isDisabled}
      style={{
        borderRadius: tokens.radius.md,
        ...tokenVariantStyles[variant],
        ...style,
      }}
      whileTap={isDisabled ? undefined : (whileTap ?? { scale: 0.95 })}
      whileHover={isDisabled ? undefined : (props.whileHover ?? { y: -1 })}
      transition={props.transition ?? { type: "spring", stiffness: 420, damping: 30 }}
      {...props}
    >
      {isLoading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : leftIcon}
      {children}
      {rightIcon}
    </motion.button>
  );
}
