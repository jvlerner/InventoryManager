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
import { Product } from "@/app/produtos/page";

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
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

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
    console.log("Erro ao abrir dialogo de editar produto")
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
        <TextField
          margin="dense"
          label="Preço"
          type="number"
          fullWidth
          variant="outlined"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Quantidade"
          type="number"
          fullWidth
          variant="outlined"
          name="quantity"
          value={formData.quantity}
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

export default ProductEditDialog;
