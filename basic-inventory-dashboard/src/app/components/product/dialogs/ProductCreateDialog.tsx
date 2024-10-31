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
import { Product } from "@/app/produtos/page";

interface ProductCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProduct: Product) => void;
}

const ProductCreateDialog: React.FC<ProductCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0.0,
    category: { name: "", description: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onCreate({ ...formData } as Product);
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
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateDialog;
