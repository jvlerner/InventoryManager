// components/CategoryHeader.tsx
import React from "react";
import { Box } from "@mui/material";
import CategorySortControl from "./sorts/CategorySortControl";
import CategorySearch from "./sorts/CategorySearch";
import { CategoryApi } from "@/app/categorias/page";
import { CategoryMenuItemProps } from "./sorts/CategorySortFieldControl";

interface CategoryHeaderProps {
  sortField: CategoryApi["sortField"];
  setSortField: (value: CategoryApi["sortField"]) => void;
  sortDirection: CategoryApi["sortDirection"];
  setSortDirection: (value: CategoryApi["sortDirection"]) => void;
  searchHandler: string;
  setSearchHandler: (value: string) => void;
  handleSearch: () => void;
  handleOpenCreateDialog: () => void;
  sortFieldItems: CategoryMenuItemProps[];
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
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
      <CategorySortControl
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        menuItems={sortFieldItems}
        handleOpenCreateDialog={handleOpenCreateDialog}
      />
      <CategorySearch
        handleSearch={handleSearch}
        searchHandler={searchHandler}
        setSearchHandler={setSearchHandler}
      />
    </Box>
  );
};

export default CategoryHeader;
