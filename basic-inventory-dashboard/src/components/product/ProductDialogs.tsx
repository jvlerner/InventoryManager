// components/ProductDialogs.tsx
import React from "react";
import ProductCreateDialog from "./dialogs/ProductCreateDialog";
import ProductEditDialog from "./dialogs/ProductEditDialog";
import { Product } from "@/app/produtos/page";
import DeleteDialog from "../commom/dialogs/DeleteDialog";

interface ProductDialogsProps {
  openCreateDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  handleCloseCreateDialog: () => void;
  handleCloseEditDialog: () => void;
  handleCloseDeleteDialog: () => void;
  handleCreateProduct: (newProduct: Product) => void;
  handleEditProduct: (editedProduct: Product) => void;
  handleDeleteProduct: () => void;
  selectedProduct: Product | null;
}

const ProductDialogs: React.FC<ProductDialogsProps> = ({
  openCreateDialog,
  openEditDialog,
  openDeleteDialog,
  handleCloseCreateDialog,
  handleCloseEditDialog,
  handleCloseDeleteDialog,
  handleCreateProduct,
  handleEditProduct,
  handleDeleteProduct,
  selectedProduct,
}) => {
  return (
    <>
      <ProductCreateDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateProduct}
      />
      <ProductEditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        product={selectedProduct!}
        onEdit={handleEditProduct}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProduct}
        text="este produto"
      />
    </>
  );
};

export default ProductDialogs;
