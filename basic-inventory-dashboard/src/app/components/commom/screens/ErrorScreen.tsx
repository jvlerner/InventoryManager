// ErrorScreen.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
      textAlign="center"
      marginTop={30}
    >
      <Typography variant="h3" color="info" marginTop={2}>
        404 Error
      </Typography>
      <Typography variant="h4" color="white" marginTop={2}>
        Oops! Ocorreu um erro.
      </Typography>
      <Typography variant="body1" color="white" marginTop={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorScreen;
