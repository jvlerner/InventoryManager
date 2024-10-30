"use client";

import React from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface DrawerToggleButtonProps {
  action: () => void;
  open: boolean;
}

const DrawerToggleButton: React.FC<DrawerToggleButtonProps> = ({
  action,
  open,
}) => {
  return (
    <IconButton aria-label="Abrir/fechar menu" onClick={action}>
      {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
};

export default DrawerToggleButton;
