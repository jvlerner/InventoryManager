// components/ProductHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import ProductSortControl from "./sorts/ProductSortControl";
import ProductSearchInput from "./sorts/ProductSearchInput";
import { ProductApi } from "@/app/produtos/page";
import { ProductMenuItemProps } from "./sorts/ProductSortFieldControl";

interface ProductHeaderProps {
  sortField: ProductApi["sortField"];
  setSortField: (value: ProductApi["sortField"]) => void;
  sortDirection: ProductApi["sortDirection"];
  setSortDirection: (value: ProductApi["sortDirection"]) => void;
  searchQueryHandler: string;
  setSearchQueryHandler: (value: string) => void;
  sortFieldItems: ProductMenuItemProps[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
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
      <ProductSortControl
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        menuItems={sortFieldItems}
      />
      <ProductSearchInput
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={setSearchQueryHandler}
      />
    </Box>
  );
};

export default ProductHeader;
