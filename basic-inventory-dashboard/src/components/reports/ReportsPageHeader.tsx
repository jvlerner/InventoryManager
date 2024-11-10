import React from "react";
import { Box, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";

const ReportsPageHeader: React.FC = () => {
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
        Relatórios <AssessmentIcon />
      </Typography>
    </Box>
  );
};

export default ReportsPageHeader;
