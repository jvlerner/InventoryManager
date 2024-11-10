"use client";
import React, { createContext, useState, useEffect } from "react";
import { createTheme, useMediaQuery } from "@mui/material";
import { Theme } from "@emotion/react";

interface ThemeContextType {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersMode);

  useEffect(() => {
    setMode(prefersMode);
  }, [prefersMode]);

  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
