"use client";

import React from "react";
import { Box } from "@mui/material";

interface FormBoxHandlerProps {
  children: React.ReactNode;
}

const FormBoxHandler: React.FC<FormBoxHandlerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FormBoxHandler;
