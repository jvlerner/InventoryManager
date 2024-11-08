"use client";

import React from "react";
import { Box } from "@mui/material";
import ReportsLowStockPageHeader from "@/app/components/reports/low-stock/ReportsPageHeader";

const ReportsPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <ReportsLowStockPageHeader />
    </Box>
  );
};

export default ReportsPage;
