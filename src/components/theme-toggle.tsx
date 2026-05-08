"use client";

import { useCallback, type MouseEvent } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      toggle(e.clientX, e.clientY);
    },
    [toggle]
  );

  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative w-9 h-9 flex items-center justify-center rounded-full text-muted hover:text-foreground transition-colors hover:bg-stone-surface/60 cursor-pointer"
    >
      {theme === "light" ? (
        <Moon weight="duotone" className="w-4 h-4" />
      ) : (
        <Sun weight="duotone" className="w-4 h-4" />
      )}
    </button>
  );
}
