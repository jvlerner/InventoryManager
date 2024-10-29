"use client";
import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "./ThemeContext";

export default function ComponentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ComponentWrapper must be used within a ThemeContextProvider"
    );
  }

  const { theme } = themeContext;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
