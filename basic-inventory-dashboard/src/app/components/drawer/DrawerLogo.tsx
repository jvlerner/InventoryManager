"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface DrawerLogoProps {
  open: boolean;
}

const DrawerLogo: React.FC<DrawerLogoProps> = ({ open }) => {
  return (
    <Box
      bgcolor={"#263238"}
      sx={{
        padding: "0px 5px",
        borderRadius: "4px",
      }}
    >
      <Typography color={"white"} variant="h6" noWrap component="div">
        <strong>{open ? "B I C" : "B"}</strong>
      </Typography>
    </Box>
  );
};

export default DrawerLogo;
