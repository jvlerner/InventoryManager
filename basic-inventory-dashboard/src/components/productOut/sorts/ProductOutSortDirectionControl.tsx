import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ProductOutApi } from "@/app/saidas/page";

interface ProductOutSortDirectionControlProps {
  sortDirection: ProductOutApi["sortDirection"];
  setSortDirection: (value: ProductOutApi["sortDirection"]) => void;
}

const ProductOutSortDirectionControl: React.FC<
  ProductOutSortDirectionControlProps
> = ({ sortDirection, setSortDirection }) => {
  const handleChange = (
    event: SelectChangeEvent<ProductOutApi["sortDirection"]>
  ) => {
    const newDirection = event.target.value as ProductOutApi["sortDirection"];
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

export default ProductOutSortDirectionControl;
