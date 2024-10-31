"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface CategoryDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const CategoryDeleteDialog: React.FC<CategoryDeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir esta categoria?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} color="primary">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDeleteDialog;
