import React from "react";
import { Box } from "@mui/material";
import { ProductApi } from "@/app/produtos/page";
import ProductSortFieldControl, {
  ProductMenuItemProps,
} from "./ProductSortFieldControl";
import ProductSortDirectionControl from "./ProductSortDirectionControl";
import CreateButton from "../../commom/buttons/CreateButton";

interface ProductSortControlProps {
  sortField: ProductApi["sortField"];
  setSortField: (value: ProductApi["sortField"]) => void;
  sortDirection: ProductApi["sortDirection"];
  setSortDirection: (value: ProductApi["sortDirection"]) => void;
  menuItems: ProductMenuItemProps[];
  handleOpenCreateDialog: () => void;
}

const ProductSortControl: React.FC<ProductSortControlProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  menuItems,
  handleOpenCreateDialog,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <CreateButton handleOpenCreateDialog={handleOpenCreateDialog} />

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
