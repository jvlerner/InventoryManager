import React from "react";
import { Box } from "@mui/material";
import { ProductInApi } from "@/app/entradas/page";
import ProductInSortFieldControl, {
  ProductInMenuItemProps,
} from "./ProductInSortFieldControl";
import ProductInSortDirectionControl from "./ProductInSortDirectionControl";

interface ProductInSortControlProps {
  sortField: ProductInApi["sortField"];
  setSortField: (value: ProductInApi["sortField"]) => void;
  sortDirection: ProductInApi["sortDirection"];
  setSortDirection: (value: ProductInApi["sortDirection"]) => void;
  menuItems: ProductInMenuItemProps[];
}

const ProductInSortControl: React.FC<ProductInSortControlProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  menuItems,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <ProductInSortFieldControl
        sortField={sortField}
        setSortField={setSortField}
        menuItems={menuItems}
      />
      <ProductInSortDirectionControl
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </Box>
  );
};

export default ProductInSortControl;
