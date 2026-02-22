"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type AppContext = "environment" | "finance";

interface AppContextState {
  context: AppContext;
  setContext: (ctx: AppContext) => void;
  toggle: () => void;
}

const AppContextCtx = createContext<AppContextState>({
  context: "environment",
  setContext: () => {},
  toggle: () => {},
});

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<AppContext>("environment");

  const toggle = useCallback(() => {
    setContext((prev) => (prev === "environment" ? "finance" : "environment"));
  }, []);

  return (
    <AppContextCtx.Provider value={{ context, setContext, toggle }}>
      {children}
    </AppContextCtx.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContextCtx);
}
