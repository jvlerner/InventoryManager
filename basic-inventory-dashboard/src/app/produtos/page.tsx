"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import ProductTable from "@/app/components/product/tables/ProductTable";
import ProductCreateDialog from "@/app/components/product/dialogs/ProductCreateDialog";
import ProductEditDialog from "@/app/components/product/dialogs/ProductEditDialog";
import ProductDeleteDialog from "@/app/components/product/dialogs/ProductDeleteDialog";

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  category: {
    id?: number;
    deleted?: boolean;
    name?: string | null;
    description?: string | null;
  };
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Pedra",
    description: "Jardinagem",
    price: 12.0,
    quantity: 0,
    category: {
      id: 1,
      name: "Categoria 1",
      description: "null",
    },
  },
];

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProduct(null);
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedProduct(null);
  };

  const handleCreateProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    handleCloseCreateDialog();
  };

  const handleEditProduct = (editedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
    handleCloseEditDialog();
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id)
      );
    }
    handleCloseDeleteDialog();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateDialog}
      >
        Cadastrar Produto
      </Button>
      <ProductTable
        products={products}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={(event, newPage) => setPage(newPage)}
        handleChangeRowsPerPage={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />
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
      <ProductDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductPage;
