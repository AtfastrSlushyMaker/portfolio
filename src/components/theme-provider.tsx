"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { usePortfolioMotion } from "./motion-provider";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (originX: number, originY: number) => void;
}>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const {enabled} = usePortfolioMotion();
  const [theme, setTheme] = useState<Theme>("dark");


  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", initial === "dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);

  }, []);

  const toggle = useCallback((originX: number, originY: number) => {
    const next = theme === "light" ? "dark" : "light";
    const apply = () => {
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      try { localStorage.setItem("theme", next); } catch { /* Theme still works with storage disabled. */ }
    };
    if (!enabled || !document.startViewTransition) { apply(); return; }
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY)
      );
      document.documentElement.animate({
        clipPath: [`circle(0px at ${originX}px ${originY}px)`, `circle(${radius}px at ${originX}px ${originY}px)`]
      }, {
        duration:520,easing:"cubic-bezier(.22,1,.36,1)",pseudoElement:"::view-transition-new(root)"
      });
    }).catch(() => { /* The theme is already applied if a transition is interrupted. */ });
  }, [theme, enabled]);


  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
