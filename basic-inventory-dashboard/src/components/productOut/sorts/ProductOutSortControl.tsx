import React from "react";
import { Box } from "@mui/material";
import { ProductOutApi } from "@/app/saidas/page";
import ProductOutSortFieldControl, {
  ProductOutMenuItemProps,
} from "./ProductOutSortFieldControl";
import ProductOutSortDirectionControl from "./ProductOutSortDirectionControl";

interface ProductOutSortControlProps {
  sortField: ProductOutApi["sortField"];
  setSortField: (value: ProductOutApi["sortField"]) => void;
  sortDirection: ProductOutApi["sortDirection"];
  setSortDirection: (value: ProductOutApi["sortDirection"]) => void;
  menuItems: ProductOutMenuItemProps[];
}

const ProductOutSortControl: React.FC<ProductOutSortControlProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  menuItems,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <ProductOutSortFieldControl
        sortField={sortField}
        setSortField={setSortField}
        menuItems={menuItems}
      />
      <ProductOutSortDirectionControl
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </Box>
  );
};

export default ProductOutSortControl;
