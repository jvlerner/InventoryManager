"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Category } from "@/app/categorias/page";
import CloseIcon from "@mui/icons-material/Close";
import { categoryMaxSize } from "@/config/maxSize";

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
    handleClose();
  };

  const handleClose = () => {
    reset(); // Reseta os campos do formulário
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Cadastrar Categoria
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
              value: categoryMaxSize.name,
              message: `Nome deve ter no máximo ${categoryMaxSize.name.toString()} caracteres`,
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
              value: categoryMaxSize.description,
              message: `Descrição deve ter no máximo ${categoryMaxSize.description} caracteres`,
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

export default CategoryCreateDialog;
