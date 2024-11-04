// components/ProductHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import ProductSortControl from "./sorts/ProductSortControl";
import ProductSearch from "./sorts/ProductSearch";
import { ProductApi } from "@/app/produtos/page";
import { ProductMenuItemProps } from "./sorts/ProductSortFieldControl";

interface ProductHeaderProps {
  sortField: ProductApi["sortField"];
  setSortField: (value: ProductApi["sortField"]) => void;
  sortDirection: ProductApi["sortDirection"];
  setSortDirection: (value: ProductApi["sortDirection"]) => void;
  searchHandler: string;
  setSearchHandler: (value: string) => void;
  handleSearch: () => void;
  handleOpenCreateDialog: () => void;
  sortFieldItems: ProductMenuItemProps[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  searchHandler,
  setSearchHandler,
  handleSearch,
  handleOpenCreateDialog,
  sortFieldItems,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        marginBottom: 1,
      }}
    >
      <ProductSortControl
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        menuItems={sortFieldItems}
        handleOpenCreateDialog={handleOpenCreateDialog}
      />
      <ProductSearch
        handleSearch={handleSearch}
        searchHandler={searchHandler}
        setSearchHandler={setSearchHandler}
      />
    </Box>
  );
};

export default ProductHeader;
