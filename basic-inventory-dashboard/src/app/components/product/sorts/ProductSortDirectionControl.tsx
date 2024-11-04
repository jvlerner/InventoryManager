import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ProductApi } from "@/app/produtos/page";

interface ProductSortDirectionControlProps {
  sortDirection: ProductApi["sortDirection"];
  setSortDirection: (value: ProductApi["sortDirection"]) => void;
}

const ProductSortDirectionControl: React.FC<
  ProductSortDirectionControlProps
> = ({ sortDirection, setSortDirection }) => {
  const handleChange = (
    event: SelectChangeEvent<ProductApi["sortDirection"]>
  ) => {
    const newDirection = event.target.value as ProductApi["sortDirection"];
    setSortDirection(newDirection);
  };

  return (
    <FormControl
      variant="outlined"
      style={{ margin: "8px", width: "15%", minWidth: "150px" }}
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

export default ProductSortDirectionControl;
