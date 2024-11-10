// components/ProductInDialogs.tsx
import React from "react";
import ProductInCreateDialog from "./dialogs/ProductInCreateDialog";
import ProductInEditDialog from "./dialogs/ProductInEditDialog";
import { ProductIn } from "@/app/entradas/page";
import DeleteDialog from "../commom/dialogs/DeleteDialog";

interface ProductInDialogsProps {
  openCreateDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  handleCloseCreateDialog: () => void;
  handleCloseEditDialog: () => void;
  handleCloseDeleteDialog: () => void;
  handleCreateProductIn: (newProductIn: ProductIn) => void;
  handleEditProductIn: (editedProductIn: ProductIn) => void;
  handleDeleteProductIn: () => void;
  selectedProductIn: ProductIn | null;
}

const ProductInDialogs: React.FC<ProductInDialogsProps> = ({
  openCreateDialog,
  openEditDialog,
  openDeleteDialog,
  handleCloseCreateDialog,
  handleCloseEditDialog,
  handleCloseDeleteDialog,
  handleCreateProductIn,
  handleEditProductIn,
  handleDeleteProductIn,
  selectedProductIn,
}) => {
  return (
    <>
      <ProductInCreateDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateProductIn}
      />
      <ProductInEditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        productIn={selectedProductIn!}
        onEdit={handleEditProductIn}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProductIn}
        text="este produto"
      />
    </>
  );
};

export default ProductInDialogs;
