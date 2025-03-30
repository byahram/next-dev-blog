"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  type Attribute,
} from "next-themes";

interface CustomThemeProviderProps
  extends Omit<ThemeProviderProps, "attribute"> {
  attribute?: Attribute;
}

export function ThemeProvider({
  children,
  ...props
}: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
