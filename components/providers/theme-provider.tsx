"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
// import { Toaster } from "sonner";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // const { resolvedTheme } = useTheme();
  return (
    <NextThemesProvider {...props}>
      {/* <Toaster
        position="top-center"
        duration={1000}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      /> */}
      {children}
    </NextThemesProvider>
  );
}
