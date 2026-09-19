"use client";
import { useTheme } from "./theme-provider";
export function ThemeToggle() {
  const {theme,toggle} = useTheme();
  return <button className="theme-toggle" onClick={event => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggle(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><span className="theme-symbol" aria-hidden="true">◐</span><span>{theme === "dark" ? "Light" : "Dark"}</span></button>;
}
