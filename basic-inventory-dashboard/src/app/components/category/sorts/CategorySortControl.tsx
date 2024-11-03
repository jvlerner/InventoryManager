import React from "react";
import { Box } from "@mui/material";
import { CategoryApi } from "@/app/categorias/page";
import CategorySortFieldControl, {
  CategoryMenuItemProps,
} from "./CategorySortFieldControl";
import CategorySortDirectionControl from "./CategorySortDirectionControl";
import CreateButton from "../../commom/buttons/CreateButton";

interface CategorySortControlProps {
  sortField: CategoryApi["sortField"];
  setSortField: (value: CategoryApi["sortField"]) => void;
  sortDirection: CategoryApi["sortDirection"];
  setSortDirection: (value: CategoryApi["sortDirection"]) => void;
  menuItems: CategoryMenuItemProps[];
  handleOpenCreateDialog: () => void;
}

const CategorySortControl: React.FC<CategorySortControlProps> = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  menuItems,
  handleOpenCreateDialog,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <CreateButton
        handleOpenCreateDialog={handleOpenCreateDialog}
        object="Categoria"
      />

      <CategorySortFieldControl
        sortField={sortField}
        setSortField={setSortField}
        menuItems={menuItems}
      />
      <CategorySortDirectionControl
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </Box>
  );
};

export default CategorySortControl;
