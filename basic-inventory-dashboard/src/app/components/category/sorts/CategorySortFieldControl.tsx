import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { CategoryApi } from "@/app/categorias/page";

export interface CategoryMenuItemProps {
  value: string;
  label: string;
}

interface CategorySortFieldControlProps {
  sortField: CategoryApi["sortField"];
  setSortField: (value: CategoryApi["sortField"]) => void;
  menuItems: CategoryMenuItemProps[];
}

const CategorySortFieldControl: React.FC<CategorySortFieldControlProps> = ({
  sortField,
  setSortField,
  menuItems,
}) => {
  const handleChange = (event: SelectChangeEvent<CategoryApi["sortField"]>) => {
    const newField = event.target.value as CategoryApi["sortField"];
    setSortField(newField);
  };

  return (
    <FormControl
      variant="outlined"
      style={{ margin: "8px", width: "10%", minWidth: "90px" }}
    >
      <InputLabel id="sort-field-label">Ordenar</InputLabel>
      <Select
        labelId="sort-field-label"
        value={sortField}
        onChange={handleChange}
        label="Ordenar"
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySortFieldControl;
