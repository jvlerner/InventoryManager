import React from "react";
import { Box, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const ReportsLowStockPageHeader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        marginBottom: 3,
      }}
    >
      <Typography variant="h4">
        Relatório Baixo Estoque <TrendingDownIcon />
      </Typography>
    </Box>
  );
};

export default ReportsLowStockPageHeader;
