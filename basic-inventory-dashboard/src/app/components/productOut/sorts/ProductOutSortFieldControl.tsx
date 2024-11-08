import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ProductOutApi } from "@/app/saidas/page";

export interface ProductOutMenuItemProps {
  value: string;
  label: string;
}

interface ProductOutSortFieldControlProps {
  sortField: ProductOutApi["sortField"];
  setSortField: (value: ProductOutApi["sortField"]) => void;
  menuItems: ProductOutMenuItemProps[];
}

const ProductOutSortFieldControl: React.FC<ProductOutSortFieldControlProps> = ({
  sortField,
  setSortField,
  menuItems,
}) => {
  const handleChange = (
    event: SelectChangeEvent<ProductOutApi["sortField"]>
  ) => {
    const newField = event.target.value as ProductOutApi["sortField"];
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

export default ProductOutSortFieldControl;
