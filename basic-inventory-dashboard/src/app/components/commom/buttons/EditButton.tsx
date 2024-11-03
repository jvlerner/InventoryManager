import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
  onEdit: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  return (
    <Button
      sx={{ marginRight: 1, marginBottom: 1 }}
      color="inherit"
      variant="contained"
      endIcon={<EditIcon />}
      onClick={onEdit}
    >
      Editar
    </Button>
  );
};

export default EditButton;
