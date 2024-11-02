// LoadingScreen.tsx
import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
    >
      <CircularProgress />
      <Typography variant="h6" marginTop={2}>
        Carregando...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
