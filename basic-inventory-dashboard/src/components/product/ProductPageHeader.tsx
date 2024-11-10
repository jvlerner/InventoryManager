import React from "react";
import { Box, Typography } from "@mui/material";
import CreateButton from "../commom/buttons/CreateButton";
import InventoryIcon from "@mui/icons-material/Inventory";

interface ProductPageHeaderProps {
  handleOpenCreateDialog: () => void;
}

const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
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
        Produtos <InventoryIcon />
      </Typography>
      <CreateButton
        handleOpenCreateDialog={handleOpenCreateDialog}
      ></CreateButton>
    </Box>
  );
};

export default ProductPageHeader;
