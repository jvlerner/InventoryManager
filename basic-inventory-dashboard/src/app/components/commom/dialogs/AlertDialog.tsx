// AlertDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { CheckCircle, Error, Warning, Info } from "@mui/icons-material";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error" | "warning" | "info";
  message: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  type,
  message,
}) => {
  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle color="success" />;
      case "error":
        return <Error color="error" />;
      case "warning":
        return <Warning color="warning" />;
      case "info":
        return <Info color="info" />;
      default:
        return null;
    }
  };
  const renderTitle = () => {
    switch (type) {
      case "success":
        return <DialogTitle>Sucesso!</DialogTitle>;
      case "error":
        return <DialogTitle>Erro!</DialogTitle>;
      case "warning":
        return <DialogTitle>Atenção!</DialogTitle>;
      case "info":
        return <DialogTitle>Informação!</DialogTitle>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {renderTitle()}
      <DialogContent>
        <Typography
          variant="body1"
          style={{ display: "flex", alignItems: "center" }}
        >
          {renderIcon()}
          <span style={{ marginLeft: "8px" }}>{message}</span>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
