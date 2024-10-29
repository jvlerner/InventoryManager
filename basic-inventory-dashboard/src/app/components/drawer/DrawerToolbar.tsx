"use client";

import React from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import DrawerTitle from "./DrawerTitle";
import { DarkMode, KeyboardArrowRight, LightMode } from "@mui/icons-material";

interface DrawerToolbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  toggleTheme: () => void;
  mode: boolean;
}

const DrawerToolbar: React.FC<DrawerToolbarProps> = ({
  open,
  handleDrawerOpen,
  toggleTheme,
  mode,
}) => {
  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          aria-label="Abrir menu"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <KeyboardArrowRight />
        </IconButton>
        <DrawerTitle />
      </Box>
      <IconButton
        sx={{ justifySelf: "right" }}
        onClick={toggleTheme}
        color="inherit"
        aria-label="toggle theme"
      >
        {mode ? <LightMode /> : <DarkMode />}{" "}
      </IconButton>
    </Toolbar>
  );
};

export default DrawerToolbar;
