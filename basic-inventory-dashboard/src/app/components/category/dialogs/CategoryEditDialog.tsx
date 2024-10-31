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
import { Category } from "@/app/categorias/page";

interface CategoryEditDialogProps {
  open: boolean;
  onClose: () => void;
  category: Category;
  onEdit: (editedCategory: Category) => void;
}

const CategoryEditDialog: React.FC<CategoryEditDialogProps> = ({
  open,
  onClose,
  category,
  onEdit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>();

  useEffect(() => {
    if (category) {
      reset(category); // Resetar os campos do formulário com os dados da categoria
    }
  }, [category, reset]);

  const onSubmit = (data: Category) => {
    onEdit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Categoria</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Nome é obrigatório",
              maxLength: {
                value: 50,
                message: "Nome deve ter no máximo 50 caracteres",
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
                value: 254,
                message: "Descrição deve ter no máximo 254 caracteres",
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

export default CategoryEditDialog;
