"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ProductIn, productInMaxSize } from "@/app/entradas/page";
import { useProducts } from "@/app/hooks/useProducts";

interface ProductInEditDialogProps {
  open: boolean;
  onClose: () => void;
  productIn: ProductIn; // Entrada de produto a ser editada
  onEdit: (editedProductIn: ProductIn) => void; // Callback para salvar a entrada editada
}

interface FormData {
  quantity: ProductIn["quantity"];
  product: number | null; // ID do produto
}

const ProductInEditDialog: React.FC<ProductInEditDialogProps> = ({
  open,
  onClose,
  productIn,
  onEdit,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryKey: [string, number, number, string, string, string] = [
    "productsIn",
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
    sortDirection: "desc",
    sortField: "name",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      quantity: undefined,
      product: null,
    },
  });

  useEffect(() => {
    if (productIn) {
      reset({
        quantity: productIn.quantity,
        product: productIn.product.id,
      });
    }
  }, [productIn, reset]);

  const handleInputChange = (value: string) => {
    setSearchQueryHandler(value);
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
      return; // Previne tentar editar uma entrada sem produto selecionado
    }

    const editedProductIn: ProductIn = {
      ...productIn, // Preserva os outros dados
      quantity: formData.quantity,
      product: { id: formData.product }, // Atualiza o produto
    };

    onEdit(editedProductIn); // Passa a entrada editada para o pai
    handleClose(); // Fecha o diálogo
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Entrada de Produto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantidade é obrigatória",
              min: { value: 1, message: "Quantidade deve ser maior que zero" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantidade*"
                variant="outlined"
                type="number"
                error={!!errors.quantity}
                helperText={errors.quantity ? errors.quantity.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="product"
            control={control}
            rules={{
              required: "Produto é obrigatório",
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
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductInEditDialog;
