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
import { Product, productMaxSize } from "@/app/produtos/page";
import { Category, CategoryApi } from "@/app/categorias/page";
import { useCategories } from "@/app/hooks/useCategories";

interface ProductEditDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product; // Product to be edited
  onEdit: (editedProduct: Product) => void; // Callback for saving edited product
}

interface FormData {
  name: Product["name"];
  description: Product["description"];
  price: Product["price"];
  category: Category;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  open,
  onClose,
  product,
  onEdit,
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

  const { data, isLoading } = useCategories({
    queryKey: queryKey,
    page: 0,
    rowsPerPage: 25,
    searchQuery: searchQuery,
    sortField: "name",
    sortDirection: "asc",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      category: undefined,
    },
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

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
    if (formData.category.id === null || formData.category.id === undefined) {
      console.error("Categoria não selecionada");
      return; // Previne tentar criar um produto sem categoria selecionada
    }

    const editedProduct: Product = {
      ...formData,
      category: { id: parseFloat(formData.category.id.toString()) }, // Garantindo que é um número
    };

    onEdit(editedProduct); // Pass edited product to parent
    handleClose(); // Close dialog
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Nome é obrigatório",
              maxLength: {
                value: productMaxSize.name,
                message: `Nome deve ter no máximo ${productMaxSize.name} caracteres`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome*"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              maxLength: {
                value: productMaxSize.description,
                message: `Descrição deve ter no máximo ${productMaxSize.description} caracteres`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descrição"
                variant="outlined"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            rules={{
              required: "Preço é obrigatório",
              validate: (value) => {
                if (value === undefined) {
                  return "Preço é obrigatório";
                }
                return (
                  (0 < value && value < productMaxSize.price) ||
                  `Preço deve ser maior que zero e menor que ${productMaxSize.price}`
                );
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Preço*"
                variant="outlined"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{
              required: "Categoria é obrigatória",
            }}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!errors.category}
              >
                <Autocomplete
                  {...field}
                  options={data?.categories || []}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(event, newValue) => {
                    field.onChange(newValue); // Directly set category object
                  }}
                  inputValue={searchQueryHandler}
                  onInputChange={(event, newInputValue) => {
                    handleInputChange(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categoria*"
                      variant="outlined"
                      error={!!errors.category}
                      helperText={
                        errors.category ? errors.category.message : ""
                      }
                    />
                  )}
                  loading={isLoading}
                  noOptionsText="Nenhuma categoria encontrada."
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

export default ProductEditDialog;
