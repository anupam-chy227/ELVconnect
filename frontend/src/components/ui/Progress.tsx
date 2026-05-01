import { tokens } from "@/theme/tokens";
import { cn } from "./utils";

export type ProgressProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
  className?: string;
};

const toneColors = {
  primary: tokens.colors.primary,
  success: tokens.colors.success,
  warning: tokens.colors.warning,
  danger: tokens.colors.danger,
};

export function Progress({ value, max = 100, label, showValue = true, tone = "primary", className }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn("grid gap-2", className)}>
      {label || showValue ? (
        <div className="flex items-center justify-between gap-3 text-xs">
          {label ? <span className="font-semibold tracking-tight text-slate-700 dark:text-slate-200">{label}</span> : <span />}
          {showValue ? <span className="font-mono font-semibold" style={{ color: toneColors[tone] }}>{percentage}%</span> : null}
        </div>
      ) : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/70 dark:bg-slate-800 dark:ring-slate-700">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${toneColors[tone]}, ${tokens.colors.primarySoft})`,
            borderRadius: tokens.radius.xl,
          }}
        />
      </div>
    </div>
  );
}
