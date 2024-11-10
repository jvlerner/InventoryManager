"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ProductIn } from "@/app/entradas/page";
import { Product } from "@/app/produtos/page";
import { productInMaxSize } from "@/config/maxSize";

interface ProductInEditDialogProps {
  open: boolean;
  onClose: () => void;
  productIn: ProductIn; // Entrada de produto a ser editada
  onEdit: (editedProductIn: ProductIn) => void; // Callback para salvar a entrada editada
}

interface FormData {
  quantity: ProductIn["quantity"];
  product: Product;
}

const ProductInEditDialog: React.FC<ProductInEditDialogProps> = ({
  open,
  onClose,
  productIn,
  onEdit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (productIn) {
      reset({
        quantity: productIn.quantity, // Passando a quantidade do productIn
        product: productIn.product, // Passando o objeto do produto
      });
    }
  }, [productIn, reset]);

  const onSubmit = (formData: FormData) => {
    if (formData.product === null) {
      console.error("Produto não selecionado");
      return; // Previne tentar editar uma entrada sem produto selecionado
    }

    const editedProductIn: ProductIn = {
      ...productIn, // Preserva os outros dados
      quantity: formData.quantity,
      product: { id: formData.product.id }, // Atualiza o produto
    };

    onEdit(editedProductIn); // Passa a entrada editada para o pai
    handleClose(); // Fecha o diálogo
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Entrada de Produto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantidade é obrigatória",
              min: { value: 1, message: "Quantidade deve ser maior que zero" },
              max: {
                value: productInMaxSize.quantity,
                message: `Quantidade deve ser menor que ${productInMaxSize.quantity}`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantidade*"
                variant="outlined"
                error={!!errors.quantity}
                helperText={errors.quantity ? errors.quantity.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
          <Controller
            name="product.name"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!errors.product?.name}
              >
                <TextField
                  {...field}
                  disabled
                  variant="outlined"
                  error={!!errors.product?.name}
                  helperText={errors.product ? errors.product.message : ""}
                />
              </FormControl>
            )}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductInEditDialog;
