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
import { ProductOut, productOutMaxSize } from "@/app/saidas/page";
import { Product } from "@/app/produtos/page";

interface ProductOutEditDialogProps {
  open: boolean;
  onClose: () => void;
  productOut: ProductOut; // Entrada de produto a ser editada
  onEdit: (editedProductOut: ProductOut) => void; // Callback para salvar a entrada editada
}

interface FormData {
  quantity: ProductOut["quantity"];
  product: Product;
}

const ProductOutEditDialog: React.FC<ProductOutEditDialogProps> = ({
  open,
  onClose,
  productOut,
  onEdit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (productOut) {
      reset({
        quantity: productOut.quantity, // Passando a quantidade do ProductOut
        product: productOut.product, // Passando o objeto do produto
      });
    }
  }, [productOut, reset]);

  const onSubmit = (formData: FormData) => {
    if (formData.product === null) {
      console.error("Produto não selecionado");
      return; // Previne tentar editar uma entrada sem produto selecionado
    }

    const editedProductOut: ProductOut = {
      ...productOut, // Preserva os outros dados
      quantity: formData.quantity,
      product: { id: formData.product.id }, // Atualiza o produto
    };

    onEdit(editedProductOut); // Passa a entrada editada para o pai
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
                value: productOutMaxSize.quantity,
                message: `Quantidade deve ser menor que ${productOutMaxSize.quantity}`,
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

export default ProductOutEditDialog;
