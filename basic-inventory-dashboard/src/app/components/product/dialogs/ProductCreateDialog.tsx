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
import { Product, productMaxSize } from "@/app/produtos/page";
import { categoryMaxSize } from "@/app/categorias/page";
import { useCategories } from "@/app/hooks/useCategories";
import CloseIcon from "@mui/icons-material/Close";

interface ProductCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProduct: Product) => void;
}

interface FormData {
  name: Product["name"];
  description: Product["description"];
  price: Product["price"];
  category: number | null;
}

const ProductCreateDialog: React.FC<ProductCreateDialogProps> = ({
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
      category: null,
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
    if (formData.category === null) {
      console.error("Categoria não selecionada"); // ADD handleErrorDialog
      return; // Previne tentar criar um produto sem categoria selecionada
    }

    const newProduct: Product = {
      ...formData,
      category: { id: formData.category },
    };

    onCreate(newProduct);
    handleClose();
  };

  const handleClose = () => {
    // Resetando o formulário e limpando o campo de pesquisa
    reset({ name: "", description: "", price: undefined, category: null });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Cadastrar Produto
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
                options={data?.categories || []}
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
                    label="Categoria*"
                    variant="outlined"
                    error={!!errors.category}
                    helperText={errors.category ? errors.category.message : ""}
                  />
                )}
                loading={isLoading}
                noOptionsText="Nenhuma categoria encontrada."
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
