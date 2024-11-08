"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ProductOut, productOutMaxSize } from "@/app/saidas/page";
import { useProducts } from "@/app/hooks/useProducts";
import CloseIcon from "@mui/icons-material/Close";
import { productMaxSize } from "@/app/produtos/page";

interface ProductOutCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProductOut: ProductOut) => void;
}

interface FormData {
  quantity: ProductOut["quantity"];
  product: number | null;
}

const ProductOutCreateDialog: React.FC<ProductOutCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryKey: [string, number, number, string, string, string] = [
    "categories",
    0,
    25,
    searchQuery,
    "name",
    "asc",
  ];

  const { data, isLoading } = useProducts({
    queryKey: queryKey,
    page: 0,
    rowsPerPage: 25,
    searchQuery: searchQuery,
    sortDirection: "asc",
    sortField: "name",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      quantity: 0,
      product: null,
    },
  });

  const handleInputChange = (value: string) => {
    setSearchQueryHandler(value);
    if (value.trim() === "") {
      setSearchQuery("");
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 1000);
  };

  const onSubmit = (formData: FormData) => {
    if (formData.product === null) {
      console.error("Produto não selecionado");
      return; // Previne tentar criar uma entrada sem produto selecionado
    }

    const newProductOut: ProductOut = {
      ...formData,
      product: { id: formData.product },
    };

    onCreate(newProductOut);
    handleClose();
  };

  const handleClose = () => {
    reset({ quantity: 0, product: null }); // Reseta todos os campos do formulário
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Registrar Entrada de Produto
        <IconButton
          aria-label="fechar"
          onClick={handleClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: "Quantidade é obrigatória",
            min: { value: 1, message: "Quantidade deve ser maior que zero" },
            max: {
              value: productOutMaxSize.quantity,
              message: `Quantidade deve ser menor que ${productOutMaxSize.quantity}`,
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Quantidade*"
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.quantity}
              helperText={errors.quantity ? errors.quantity.message : ""}
            />
          )}
        />
        <Controller
          name="product"
          control={control}
          rules={{
            required: "Produto é obrigatório",
            maxLength: {
              value: productMaxSize.name,
              message: `Produto tem máximo ${productMaxSize.name} caracteres`,
            },
          }}
          render={({ field }) => (
            <FormControl
              fullWidth
              variant="outlined"
              margin="dense"
              error={!!errors.product}
            >
              <Autocomplete
                options={data?.products || []}
                getOptionLabel={(option) => option.name || ""}
                onChange={(event, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                inputValue={searchQueryHandler}
                onInputChange={(event, newInputValue) => {
                  handleInputChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Produto*"
                    variant="outlined"
                    error={!!errors.product}
                    helperText={errors.product ? errors.product.message : ""}
                  />
                )}
                loading={isLoading}
                noOptionsText="Nenhum produto encontrado."
              />
            </FormControl>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductOutCreateDialog;
