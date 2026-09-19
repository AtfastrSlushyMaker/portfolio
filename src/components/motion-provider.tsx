"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const subscribe = () => () => {};
const MotionContext = createContext({ enabled: false });
export function usePortfolioMotion() { return useContext(MotionContext); }

export function PortfolioMotionProvider({children}: {children: ReactNode}) {
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const enabled = hydrated && reduced === false;
  return (
    <MotionContext.Provider value={{enabled}}>
      <MotionConfig reducedMotion="user"><div className="motion-root" data-motion={enabled ? "on" : "off"}>{children}</div></MotionConfig>
    </MotionContext.Provider>
  );
}
