import React from "react";
import { Button, FormControl } from "@mui/material";

interface CreateButtonProps {
  handleOpenCreateDialog: () => void;
  object: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  handleOpenCreateDialog,
  object,
}) => {
  return (
    <FormControl
      variant="outlined"
      style={{ margin: "8px", minWidth: "180px" }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateDialog}
        style={{ width: "100%", padding: "15px 0px", fontWeight: "600" }} // Botão com largura total
      >
        Cadastrar {object}
      </Button>
    </FormControl>
  );
};

export default CreateButton;
