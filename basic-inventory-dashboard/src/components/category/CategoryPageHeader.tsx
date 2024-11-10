import React from "react";
import { Box, Typography } from "@mui/material";
import CreateButton from "../commom/buttons/CreateButton";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

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
        Categorias <TurnedInIcon />
      </Typography>
      <CreateButton
        handleOpenCreateDialog={handleOpenCreateDialog}
      ></CreateButton>
    </Box>
  );
};

export default CategoryPageHeader;
