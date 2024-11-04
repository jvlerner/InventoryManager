import React from "react";
import { Box, TextField } from "@mui/material";
import SearchButton from "../../commom/buttons/SearchButton";

interface ProductSearchProps {
  searchHandler: string;
  setSearchHandler: (value: string) => void;
  handleSearch: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ // FIX: PRECISA ADD DEBOUNCE
  searchHandler,
  setSearchHandler,
  handleSearch,
}) => {
  return (
    <Box display="flex" sx={{ gap: 2, alignItems: "center" }}>
      <TextField
        label="Pesquisar Produto"
        variant="outlined"
        value={searchHandler}
        onChange={(e) => setSearchHandler(e.target.value)}
        style={{ minWidth: "350px" }}
      />
      <SearchButton onSearch={handleSearch} />
    </Box>
  );
};

export default ProductSearch;
