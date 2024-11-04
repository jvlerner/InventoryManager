import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ProductInApi } from "@/app/entradas/page";

interface ProductInSortDirectionControlProps {
  sortDirection: ProductInApi["sortDirection"];
  setSortDirection: (value: ProductInApi["sortDirection"]) => void;
}

const ProductInSortDirectionControl: React.FC<
  ProductInSortDirectionControlProps
> = ({ sortDirection, setSortDirection }) => {
  const handleChange = (
    event: SelectChangeEvent<ProductInApi["sortDirection"]>
  ) => {
    const newDirection = event.target.value as ProductInApi["sortDirection"];
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

export default ProductInSortDirectionControl;
