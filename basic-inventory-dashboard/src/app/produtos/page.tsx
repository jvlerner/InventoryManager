"use client";

import React, { useState } from "react";
import LoadingScreen from "@/app/components/commom/screens/LoadingScreen";
import ErrorScreen from "@/app/components/commom/screens/ErrorScreen";
import ProductHeader from "../components/product/ProductHeader";
import ProductTable from "@/app/components/product/tables/ProductTable";
import ProductDialogs from "../components/product/ProductDialogs";
import { useProducts } from "../hooks/useProducts";

export interface Product {
  id?: number;
  deleted?: boolean;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: {
    id?: number;
    deleted?: boolean;
    name?: string | null;
    description?: string | null;
  };
  available?: boolean; // quantity > 0
}

export const productMaxSize: {
  name: number;
  description: number;
  price: number;
} = {
  name: 50,
  description: 100,
  price: 999999.99,
};

const productSortFieldItems = [
  { value: "id", label: "ID" },
  { value: "name", label: "Nome" },
  { value: "price", label: "Preço" },
  { value: "quantity", label: "Quantidade" },
];

export interface ProductApi {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: "id" | "name" | "description";
  sortDirection: "asc" | "desc";
}

const ProductPage: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHandler, setSearchHandler] = useState<string>("");
  const [sortField, setSortField] = useState<ProductApi["sortField"]>("id");
  const [sortDirection, setSortDirection] =
    useState<ProductApi["sortDirection"]>("asc");

  const queryKey: [string, number, number, string, string, string] = [
    "products",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  ];

  const { data, error, isLoading, createProduct, editProduct, deleteProduct } =
    useProducts({
      queryKey: queryKey,
      page: page,
      rowsPerPage: rowsPerPage,
      searchQuery: searchQuery,
      sortField: sortField,
      sortDirection: sortDirection,
      handleCloseCreateDialog: () => handleCloseCreateDialog,
      handleCloseEditDialog: () => handleCloseEditDialog,
      handleCloseDeleteDialog: () => handleCloseDeleteDialog,
    });

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
    createProduct.mutate(newProduct);
    handleCloseCreateDialog();
  };

  const handleEditProduct = (editedProduct: Product) => {
    editProduct.mutate(editedProduct);
    handleCloseEditDialog();
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteProduct.mutate(selectedProduct.id!);
    }
    handleCloseDeleteDialog();
  };

  const handleSearch = () => {
    setSearchQuery(searchHandler);
  };

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorScreen />;

  return (
    <div>
      <ProductHeader
        handleOpenCreateDialog={handleOpenCreateDialog}
        handleSearch={handleSearch}
        searchHandler={searchHandler}
        setSearchHandler={setSearchHandler}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={productSortFieldItems}
      />
      <ProductTable
        products={data?.products || []}
        page={page}
        count={data?.totalItems || 0}
        rowsPerPage={rowsPerPage}
        handleChangePage={(event, newPage) => setPage(newPage)}
        handleChangeRowsPerPage={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />
      <ProductDialogs
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        handleCloseCreateDialog={handleCloseCreateDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleCreateProduct={handleCreateProduct}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductPage;
