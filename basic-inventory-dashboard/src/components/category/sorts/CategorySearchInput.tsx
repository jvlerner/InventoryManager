import React from "react";
import { Box, TextField } from "@mui/material";

interface CategorySearchInputProps {
  searchQueryHandler: string;
  setSearchQueryHandler: (value: string) => void;
}

const CategorySearchInput: React.FC<CategorySearchInputProps> = ({
  searchQueryHandler,
  setSearchQueryHandler,
}) => {
  return (
    <Box display="flex" sx={{ gap: 2, alignItems: "center" }}>
      <TextField
        label="Pesquisar Nome Categoria"
        variant="outlined"
        value={searchQueryHandler}
        onChange={(e) => setSearchQueryHandler(e.target.value)}
        style={{ minWidth: "350px" }}
      />
    </Box>
  );
};

export default CategorySearchInput;
