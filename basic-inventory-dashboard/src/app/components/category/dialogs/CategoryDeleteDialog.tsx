"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
  const handleOnDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Confirmar Exclusão
        <IconButton
          aria-label="fechar"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir esta categoria?
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

export default CategoryDeleteDialog;
