import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ProductApi } from "@/app/produtos/page";

export interface ProductMenuItemProps {
  value: string;
  label: string;
}

interface ProductSortFieldControlProps {
  sortField: ProductApi["sortField"];
  setSortField: (value: ProductApi["sortField"]) => void;
  menuItems: ProductMenuItemProps[];
}

const ProductSortFieldControl: React.FC<ProductSortFieldControlProps> = ({
  sortField,
  setSortField,
  menuItems,
}) => {
  const handleChange = (event: SelectChangeEvent<ProductApi["sortField"]>) => {
    const newField = event.target.value as ProductApi["sortField"];
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

export default ProductSortFieldControl;
