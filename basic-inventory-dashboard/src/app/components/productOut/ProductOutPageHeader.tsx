import React from "react";
import { Box, Typography } from "@mui/material";
import CreateButton from "../commom/buttons/CreateButton";
import CallMadeIcon from '@mui/icons-material/CallMade';

interface ProductOutPageHeaderProps {
  handleOpenCreateDialog: () => void;
}

const ProductOutPageHeader: React.FC<ProductOutPageHeaderProps> = ({
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
        Saídas <CallMadeIcon />
      </Typography>
      <CreateButton
        handleOpenCreateDialog={handleOpenCreateDialog}
      ></CreateButton>
    </Box>
  );
};

export default ProductOutPageHeader;
