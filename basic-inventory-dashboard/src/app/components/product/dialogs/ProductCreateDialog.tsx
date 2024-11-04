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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Product, productMaxSize } from "@/app/produtos/page";
import { Category, CategoryApi, categoryMaxSize } from "@/app/categorias/page";
import { useCategories } from "@/app/hooks/useCategories";

interface ProductCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProduct: Product) => void;
}

interface FormData {
  name: Product["name"];
  description: Product["description"];
  price: Product["price"];
  category: Category;
}

const ProductCreateDialog: React.FC<ProductCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const page = 0;
  const rowsPerPage = 20;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const sortField: CategoryApi["sortField"] = "name";
  const sortDirection: CategoryApi["sortDirection"] = "asc";
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryKey: [string, number, number, string, string, string] = [
    "categories",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  ];

  const { data, isLoading } = useCategories({
    queryKey: queryKey,
    page: page,
    rowsPerPage: rowsPerPage,
    searchQuery: searchQuery,
    sortField: sortField,
    sortDirection: sortDirection,
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

    const newProduct: Product = {
      ...formData,
      category: { id: parseFloat(formData.category.id.toString()) }, // Garantindo que é um número
    };

    onCreate(newProduct);
    handleClose();
  };

  const handleClose = () => {
    reset(); // Reseta os campos do formulário
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cadastrar Produto</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          rules={{
            maxLength: {
              value: productMaxSize.name,
              message: `Nome deve ter no máximo ${productMaxSize.name} caracteres`,
            },
            required: "Nome é obrigatório",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Nome*"
              type="text"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
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
              margin="dense"
              label="Descrição"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
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
              margin="dense"
              label="Preço*"
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          rules={{
            maxLength: {
              value: categoryMaxSize.name,
              message: `No máximo ${categoryMaxSize.name} caracteres`,
            },
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
                  field.onChange(newValue ? newValue.id : null);
                }}
                inputValue={searchQuery} // Manage the input value here
                onInputChange={(event, newInputValue) => {
                  handleInputChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categoria*"
                    variant="outlined"
                    error={!!errors.category}
                    helperText={errors.category ? errors.category.message : ""}
                  />
                )}
                loading={isLoading}
                noOptionsText="Nenhuma categoria encontrada."
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
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
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateDialog;
