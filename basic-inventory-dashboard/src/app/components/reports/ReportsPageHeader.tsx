import React from "react";
import { Box, Typography } from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

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
        Relatórios <TurnedInIcon />
      </Typography>
    </Box>
  );
};

export default ReportsPageHeader;
