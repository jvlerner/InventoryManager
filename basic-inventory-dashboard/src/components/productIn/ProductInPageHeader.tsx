import React from "react";
import { Box, Typography } from "@mui/material";
import CreateButton from "../commom/buttons/CreateButton";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

interface ProductInPageHeaderProps {
  handleOpenCreateDialog: () => void;
}

const ProductInPageHeader: React.FC<ProductInPageHeaderProps> = ({
  handleOpenCreateDialog,
}) => {
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
        Entradas <CallReceivedIcon />
      </Typography>
      <CreateButton
        handleOpenCreateDialog={handleOpenCreateDialog}
      ></CreateButton>
    </Box>
  );
};

export default ProductInPageHeader;
