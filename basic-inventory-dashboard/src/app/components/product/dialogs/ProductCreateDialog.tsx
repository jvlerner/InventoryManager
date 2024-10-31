"use client";

import React from "react";
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

interface ProductCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProduct: Product) => void;
  categories: Category[];
}

const ProductCreateDialog: React.FC<ProductCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
  categories,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (data: Product) => {
    onCreate(data);
    onClose();
  };

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
            validate: (value) =>
              (0 < value && value < maxSizeProduct.price) ||
              `Preço deve ser maior que zero e menor que ${maxSizeProduct.price} dígitos`,
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
