import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <Button
      sx={{ marginBottom: 1 }}
      color="error"
      variant="contained"
      endIcon={<DeleteIcon />}
      onClick={onDelete}
    >
      Excluir
    </Button>
  );
};

export default DeleteButton;
