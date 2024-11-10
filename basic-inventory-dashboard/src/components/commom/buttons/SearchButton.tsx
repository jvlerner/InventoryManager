import React from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchButtonProps {
  onSearch: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onSearch}
      endIcon={<SearchIcon />}
      style={{ fontWeight: "600" }}
    >
      Pesquisar
    </Button>
  );
};

export default SearchButton;
