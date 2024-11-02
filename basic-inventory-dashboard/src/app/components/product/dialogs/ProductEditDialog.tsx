"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Product, maxSizeProduct } from "@/app/produtos/page";

interface ProductEditDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onEdit: (editedProduct: Product) => void;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  open,
  onClose,
  product,
  onEdit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = (data: Product) => {
    onEdit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Nome é obrigatório",
              maxLength: {
                value: maxSizeProduct.name,
                message: `Nome deve ter no máximo ${maxSizeProduct.name} caracteres`,
              },
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
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Quantidade"
                type="number"
                fullWidth
                variant="outlined"
              />
            )}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
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
