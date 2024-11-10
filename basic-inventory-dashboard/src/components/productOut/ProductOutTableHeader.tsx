// components/ProductOutHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import ProductOutSortControl from "./sorts/ProductOutSortControl";
import ProductOutSearchInput from "./sorts/ProductOutSearchInput";
import { ProductOutApi } from "@/app/saidas/page";
import { ProductOutMenuItemProps } from "./sorts/ProductOutSortFieldControl";

interface ProductOutHeaderProps {
  sortField: ProductOutApi["sortField"];
  setSortField: (value: ProductOutApi["sortField"]) => void;
  sortDirection: ProductOutApi["sortDirection"];
  setSortDirection: (value: ProductOutApi["sortDirection"]) => void;
  searchQueryHandler: string;
  setSearchQueryHandler: (value: string) => void;
  sortFieldItems: ProductOutMenuItemProps[];
}

const ProductOutHeader: React.FC<ProductOutHeaderProps> = ({
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
      <ProductOutSortControl
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        menuItems={sortFieldItems}
      />
      <ProductOutSearchInput
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={setSearchQueryHandler}
      />
    </Box>
  );
};

export default ProductOutHeader;
