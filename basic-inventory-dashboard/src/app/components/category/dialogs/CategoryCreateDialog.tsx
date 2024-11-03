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
import { Category, categoryMaxSizeCategory } from "@/app/categorias/page";

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
    reset, // Adiciona a função reset
    formState: { errors },
  } = useForm<Category>({
    defaultValues: {
      name: "", // Define default value for controlled input
      description: "", // Define default value for controlled input
    },
  });

  const onSubmit = (data: Category) => {
    onCreate(data);
    onClose();
  };

  const handleClose = () => {
    reset(); // Reseta os campos do formulário
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cadastrar Categoria</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          rules={{
            maxLength: {
              value: categoryMaxSizeCategory.name,
              message: `Nome deve ter no máximo ${categoryMaxSizeCategory.name} caracteres`,
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
              value: categoryMaxSizeCategory.description,
              message: `Descrição deve ter no máximo ${categoryMaxSizeCategory.description} caracteres`,
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
        <Button onClick={handleClose} color="primary">
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
