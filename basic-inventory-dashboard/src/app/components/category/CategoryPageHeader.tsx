import React from "react";
import { Box, Typography } from "@mui/material";
import CreateButton from "../commom/buttons/CreateButton";
import CategoryIcon from "@mui/icons-material/Category";

interface CategoryPageHeaderProps {
  handleOpenCreateDialog: () => void;
}

const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
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
        Categorias <CategoryIcon />
      </Typography>
      <CreateButton
        handleOpenCreateDialog={handleOpenCreateDialog}
      ></CreateButton>
    </Box>
  );
};

export default CategoryPageHeader;
