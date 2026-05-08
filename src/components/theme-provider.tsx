"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (originX: number, originY: number) => void;
}>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = stored ?? preferred;
    document.documentElement.classList.toggle("dark", initial === "dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = useCallback(
    (originX: number, originY: number) => {
      const next = theme === "light" ? "dark" : "light";

      const endRadius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY)
      );

      if (!document.startViewTransition) {
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem("theme", next);
        return;
      }

      const transition = document.startViewTransition(() => {
        document.documentElement.classList.toggle("dark", next === "dark");
        setTheme(next);
        localStorage.setItem("theme", next);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${originX}px ${originY}px)`,
              `circle(${endRadius}px at ${originX}px ${originY}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [theme]
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
