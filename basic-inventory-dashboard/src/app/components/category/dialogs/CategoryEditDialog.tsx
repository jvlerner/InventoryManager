"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
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
  const [formData, setFormData] = useState<Category | null>(null);

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onEdit(formData);
      onClose();
    }
  };

  if (!formData) {
    console.log("Erro ao abrir dialogo de editar categoria");
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Descrição"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryEditDialog;
