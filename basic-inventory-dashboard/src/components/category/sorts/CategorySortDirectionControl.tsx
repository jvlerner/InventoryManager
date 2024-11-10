import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { CategoryApi } from "@/app/categorias/page";

interface CategorySortDirectionControlProps {
  sortDirection: CategoryApi["sortDirection"];
  setSortDirection: (value: CategoryApi["sortDirection"]) => void;
}

const CategorySortDirectionControl: React.FC<
  CategorySortDirectionControlProps
> = ({ sortDirection, setSortDirection }) => {
  const handleChange = (
    event: SelectChangeEvent<CategoryApi["sortDirection"]>
  ) => {
    const newDirection = event.target.value as CategoryApi["sortDirection"];
    setSortDirection(newDirection);
  };

  return (
    <FormControl
      variant="outlined"
      style={{ margin: "8px", minWidth: "150px" }}
    >
      <InputLabel id="sort-direction-label">Direção</InputLabel>
      <Select
        labelId="sort-direction-label"
        value={sortDirection}
        onChange={handleChange}
        label="Direção"
      >
        <MenuItem value="asc">Crescente</MenuItem>
        <MenuItem value="desc">Decrescente</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySortDirectionControl;
