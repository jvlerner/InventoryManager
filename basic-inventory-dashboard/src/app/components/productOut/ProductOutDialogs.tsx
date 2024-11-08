// components/ProductOutDialogs.tsx
import React from "react";
import ProductOutCreateDialog from "./dialogs/ProductOutCreateDialog";
import ProductOutEditDialog from "./dialogs/ProductOutEditDialog";
import { ProductOut } from "@/app/saidas/page";
import DeleteDialog from "../commom/dialogs/DeleteDialog";

interface ProductOutDialogsProps {
  openCreateDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  handleCloseCreateDialog: () => void;
  handleCloseEditDialog: () => void;
  handleCloseDeleteDialog: () => void;
  handleCreateProductOut: (newProductOut: ProductOut) => void;
  handleEditProductOut: (editedProductOut: ProductOut) => void;
  handleDeleteProductOut: () => void;
  selectedProductOut: ProductOut | null;
}

const ProductOutDialogs: React.FC<ProductOutDialogsProps> = ({
  openCreateDialog,
  openEditDialog,
  openDeleteDialog,
  handleCloseCreateDialog,
  handleCloseEditDialog,
  handleCloseDeleteDialog,
  handleCreateProductOut,
  handleEditProductOut,
  handleDeleteProductOut,
  selectedProductOut,
}) => {
  return (
    <>
      <ProductOutCreateDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateProductOut}
      />
      <ProductOutEditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        productOut={selectedProductOut!}
        onEdit={handleEditProductOut}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProductOut}
        text="este produto"
      />
    </>
  );
};

export default ProductOutDialogs;
