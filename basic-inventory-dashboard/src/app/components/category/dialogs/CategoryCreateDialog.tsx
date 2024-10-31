"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Category, maxSizeCategory } from "@/app/categorias/page";

interface CategoryCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newCategory: Category) => void;
}

const CategoryCreateDialog: React.FC<CategoryCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();

  const onSubmit = (data: Category) => {
    onCreate(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Categoria</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          rules={{
            maxLength: {
              value: maxSizeCategory.name,
              message: `Nome deve ter no máximo ${maxSizeCategory.name} caracteres`,
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
              value: maxSizeCategory.description,
              message: `Descrição deve ter no máximo ${maxSizeCategory.description} caracteres`,
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

export default CategoryCreateDialog;
