import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ProductInApi } from "@/app/entradas/page";

export interface ProductInMenuItemProps {
  value: string;
  label: string;
}

interface ProductInSortFieldControlProps {
  sortField: ProductInApi["sortField"];
  setSortField: (value: ProductInApi["sortField"]) => void;
  menuItems: ProductInMenuItemProps[];
}

const ProductInSortFieldControl: React.FC<ProductInSortFieldControlProps> = ({
  sortField,
  setSortField,
  menuItems,
}) => {
  const handleChange = (
    event: SelectChangeEvent<ProductInApi["sortField"]>
  ) => {
    const newField = event.target.value as ProductInApi["sortField"];
    setSortField(newField);
  };

  return (
    <FormControl variant="outlined" style={{ margin: "8px", minWidth: "90px" }}>
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

export default ProductInSortFieldControl;
