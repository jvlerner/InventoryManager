"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface ProductDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  const handleOnDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir este produto?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOnDelete} color="primary">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDeleteDialog;
