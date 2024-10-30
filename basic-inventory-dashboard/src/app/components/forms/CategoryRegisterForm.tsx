"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  name: string;
  description?: string;
}

const CategoryRegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "80%",
        minWidth: 200,
        maxWidth: 800,
        padding: "1rem 0",
      }}
    >
      <Typography variant="h6">Criar Categoria</Typography>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Nome é obrigatório",
          maxLength: {
            value: 100,
            message: "Nome deve ter no máximo 100 caracteres",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome*"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{
          maxLength: {
            value: 254,
            message: "Descrição deve ter no máximo 254 caracteres",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descrição"
            variant="outlined"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Criar
      </Button>
    </Box>
  );
};

export default CategoryRegisterForm;
