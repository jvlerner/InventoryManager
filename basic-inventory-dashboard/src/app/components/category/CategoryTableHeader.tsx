import React from "react";
import { Box } from "@mui/material";
import CategorySortControl from "./sorts/CategorySortControl";
import CategorySearch from "./sorts/CategorySearchInput";
import { CategoryApi } from "@/app/categorias/page";
import { CategoryMenuItemProps } from "./sorts/CategorySortFieldControl";

interface CategoryTableHeaderProps {
  sortField: CategoryApi["sortField"];
  setSortField: (value: CategoryApi["sortField"]) => void;
  sortDirection: CategoryApi["sortDirection"];
  setSortDirection: (value: CategoryApi["sortDirection"]) => void;
  searchQueryHandler: string;
  setSearchQueryHandler: (value: string) => void;
  handleOpenCreateDialog: () => void;
  sortFieldItems: CategoryMenuItemProps[];
}

const CategoryTableHeader: React.FC<CategoryTableHeaderProps> = ({
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
      <CategorySortControl
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        menuItems={sortFieldItems}
      />
      <CategorySearch
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={setSearchQueryHandler}
      />
    </Box>
  );
};

export default CategoryTableHeader;
