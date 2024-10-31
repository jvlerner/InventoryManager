"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Category } from "@/app/categorias/page";

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
  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onCreate({ ...formData } as Category);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Produto</DialogTitle>
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
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryCreateDialog;
