import React from "react";
import { Box, TextField } from "@mui/material";

interface ProductSearchInputProps {
  searchQueryHandler: string;
  setSearchQueryHandler: (value: string) => void;
}

const ProductSearchInput: React.FC<ProductSearchInputProps> = ({
  searchQueryHandler,
  setSearchQueryHandler,
}) => {
  return (
    <Box display="flex" sx={{ gap: 2, alignItems: "center" }}>
      <TextField
        label="Pesquisar Nome Produto"
        variant="outlined"
        value={searchQueryHandler}
        onChange={(e) => setSearchQueryHandler(e.target.value)}
        style={{ minWidth: "350px" }}
      />
    </Box>
  );
};

export default ProductSearchInput;
