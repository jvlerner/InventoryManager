// components/ProductInHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import ProductInSortControl from "./sorts/ProductInSortControl";
import ProductInSearchInput from "./sorts/ProductInSearchInput";
import { ProductInApi } from "@/app/entradas/page";
import { ProductInMenuItemProps } from "./sorts/ProductInSortFieldControl";

interface ProductInHeaderProps {
  sortField: ProductInApi["sortField"];
  setSortField: (value: ProductInApi["sortField"]) => void;
  sortDirection: ProductInApi["sortDirection"];
  setSortDirection: (value: ProductInApi["sortDirection"]) => void;
  searchQueryHandler: string;
  setSearchQueryHandler: (value: string) => void;
  sortFieldItems: ProductInMenuItemProps[];
}

const ProductInHeader: React.FC<ProductInHeaderProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  searchQueryHandler,
  setSearchQueryHandler,
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
      <ProductInSortControl
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        menuItems={sortFieldItems}
      />
      <ProductInSearchInput
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={setSearchQueryHandler}
      />
    </Box>
  );
};

export default ProductInHeader;
