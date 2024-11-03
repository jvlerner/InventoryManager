import React from "react";
import { Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ProductSearchProps {
  searchHandler: string;
  setSearchHandler: (value: string) => void;
  handleSearch: () => void;
}

const CategorySearch: React.FC<ProductSearchProps> = ({
  searchHandler,
  setSearchHandler,
  handleSearch,
}) => {
  return (
    <Box display="flex" sx={{ gap: 2, height: 60, alignItems: "center" }}>
      <TextField
        label="Pesquisar Categoria"
        variant="outlined"
        value={searchHandler}
        onChange={(e) => setSearchHandler(e.target.value)}
        style={{ width: "20%", minWidth: "300px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        endIcon={<SearchIcon />}
        style={{ padding: "14px 14px", fontWeight: "600" }}
      >
        Pesquisar
      </Button>
    </Box>
  );
};

export default CategorySearch;
