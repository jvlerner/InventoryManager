// ErrorScreen.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorScreen: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
      textAlign="center"
    >
      <Typography variant="h3" color="info" marginTop={2}>
        404 Error
      </Typography>
      <Typography variant="h4" color="white" marginTop={2}>
        Oops! Ocorreu um erro.
      </Typography>
    </Box>
  );
};

export default ErrorScreen;
