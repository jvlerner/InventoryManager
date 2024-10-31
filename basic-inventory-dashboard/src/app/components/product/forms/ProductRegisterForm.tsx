"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface Category {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  description?: string;
  price: number;
  category: number;
}

const categories: Category[] = [
  { id: 1, name: "Categoria 1" },
  { id: 2, name: "Categoria 2" },
  { id: 3, name: "Categoria 3" },
];

const ProductRegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para enviar os dados ao servidor
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
      <Typography variant="h6">Cadastrar Produto</Typography>

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
            label="Nome"
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

      <Controller
        name="price"
        control={control}
        rules={{
          required: "Preço é obrigatório",
          min: {
            value: 0,
            message: "Preço deve ser um valor positivo",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Preço"
            type="number"
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ""}
            fullWidth
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: "Categoria é obrigatória" }}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Categoria</InputLabel>
            <Select {...field} label="Categoria">
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography color="error">{errors.category.message}</Typography>
            )}
          </FormControl>
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Criar
      </Button>
    </Box>
  );
};

export default ProductRegisterForm;
