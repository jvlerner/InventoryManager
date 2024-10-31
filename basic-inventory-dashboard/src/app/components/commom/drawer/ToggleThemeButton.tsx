"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ThemeContext } from "@/app/context/ThemeContext";

const ToggleThemeButton: React.FC = () => {
  const { mode, setMode } = React.useContext(ThemeContext)!;

  const toggleTheme = () => {
    setMode((prevMode) => !prevMode);
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="Alterar tema">
      {mode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ToggleThemeButton;
