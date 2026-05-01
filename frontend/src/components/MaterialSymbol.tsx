import React from "react";

interface MaterialSymbolProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export function MaterialSymbol({
  name,
  className = "",
  filled = false,
}: MaterialSymbolProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`.trim()}
      style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}
