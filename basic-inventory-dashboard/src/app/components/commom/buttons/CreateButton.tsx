import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CreateButtonProps {
  handleOpenCreateDialog: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  handleOpenCreateDialog,
}) => {
  return (
    <Button
      endIcon={<AddIcon />}
      variant="contained"
      color="primary"
      onClick={handleOpenCreateDialog}
      style={{ fontWeight: "600" }} // Botão com largura total
    >
      Cadastrar
    </Button>
  );
};

export default CreateButton;
