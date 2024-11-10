import React from "react";
import { Box } from "@mui/material";
import { ProductApi } from "@/app/produtos/page";
import ProductSortFieldControl, {
  ProductMenuItemProps,
} from "./ProductSortFieldControl";
import ProductSortDirectionControl from "./ProductSortDirectionControl";

interface ProductSortControlProps {
  sortField: ProductApi["sortField"];
  setSortField: (value: ProductApi["sortField"]) => void;
  sortDirection: ProductApi["sortDirection"];
  setSortDirection: (value: ProductApi["sortDirection"]) => void;
  menuItems: ProductMenuItemProps[];
}

const ProductSortControl: React.FC<ProductSortControlProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  menuItems,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <ProductSortFieldControl
        sortField={sortField}
        setSortField={setSortField}
        menuItems={menuItems}
      />
      <ProductSortDirectionControl
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </Box>
  );
};

export default ProductSortControl;
