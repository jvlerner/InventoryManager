"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Product, maxSizeProduct } from "@/app/produtos/page";
import { Category } from "@/app/categorias/page";
import axiosInstance from "@/config/axiosInstance";

interface ProductCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProduct: Product) => void;
}
interface CategoriesResponse {
  categories: Category[];
  totalItems: number;
}

const fetchCategories = async (): Promise<CategoriesResponse> => {
  const response = await axiosInstance.get(`/categories/names`);
  return response.data;
};

const ProductCreateDialog: React.FC<ProductCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (data: Product) => {
    onCreate(data);
    onClose();
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Produto</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          rules={{
            maxLength: {
              value: maxSizeProduct.name,
              message: `Nome deve ter no máximo ${maxSizeProduct.name} caracteres`,
            },
            required: "Nome é obrigatório",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Nome*"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            maxLength: {
              value: maxSizeProduct.description,
              message: `Descrição deve ter no máximo ${maxSizeProduct.description} caracteres`,
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Descrição"
              fullWidth
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description?.message}
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
                return "Preço é obrigatório"; // ou qualquer outra mensagem que você preferir
              }
              return (
                (0 < value && value < maxSizeProduct.price) ||
                `Preço deve ser maior que zero e menor que ${maxSizeProduct.price} dígitos`
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
          rules={{ required: "Categoria é obrigatória" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              variant="outlined"
              margin="dense"
              error={!!errors.category}
            >
              <InputLabel>Categoria*</InputLabel>
              <Select
                {...field}
                label="Categoria*"
                onChange={(e) => field.onChange(e.target.value)}
              >
                {!categories || categories.length === 0 ? (
                  <MenuItem disabled>
                    Nenhuma categoria cadastrada. Por favor, cadastre uma.
                  </MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.category && <span>{errors.category.message}</span>}
            </FormControl>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateDialog;
