"use client";

import React, { useRef, useState } from "react";
import LoadingScreen from "@/app/components/commom/screens/LoadingScreen";
import ErrorScreen from "@/app/components/commom/screens/ErrorScreen";
import ProductTableHeader from "../components/product/ProductTableHeader";
import ProductTable from "@/app/components/product/tables/ProductTable";
import ProductDialogs from "../components/product/ProductDialogs";
import { useProducts } from "../hooks/useProducts";
import ProductPageHeader from "../components/product/ProductPageHeader";
import AlertDialog from "../components/commom/dialogs/AlertDialog";

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
  sortField: "id" | "name" | "price" | "quantity";
  sortDirection: "asc" | "desc";
}

const ProductPage: React.FC = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const [sortField, setSortField] = useState<ProductApi["sortField"]>("id");
  const [sortDirection, setSortDirection] =
    useState<ProductApi["sortDirection"]>("asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>(
    "Sucesso ao realizar operação."
  );
  const [errorMessage, setErrorMessage] = useState<string>(
    "Erro ao realizar operação."
  );
  const handleOpenSuccessDialog = (message: string) => {
    setSuccessMessage(message);
    setOpenSuccessDialog(true);
  };
  const handleCloseSuccessDialog = () => setOpenSuccessDialog(false);

  const handleOpenErrorDialog = (message: string) => {
    setErrorMessage(message);
    setOpenErrorDialog(true);
  };
  const handleCloseErrorDialog = () => setOpenErrorDialog(false);
  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      handleErrorDialog: (message: string) => handleOpenErrorDialog(message),
      handleSuccessDialog: (message: string) =>
        handleOpenSuccessDialog(message),
    });

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
  };

  const handleEditProduct = (editedProduct: Product) => {
    editProduct.mutate(editedProduct);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteProduct.mutate(selectedProduct.id!, {
        onSuccess: () => {
          if (data?.products.length === 1 && page > 0) {
            setPage((prevPage) => prevPage - 1); //Volta uma página
          } else if (data?.products.length === 0) {
            setPage(0); // Se não houver mais prudutos na tabela, va para pagina 0
          }
        },
      });
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQueryHandler(value);
    console.log(value);
    if (value.trim() === "") {
      setSearchQuery("");
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
      setPage(0);
    }, 1000);
  };

  return (
    <div>
      <ProductPageHeader handleOpenCreateDialog={handleOpenCreateDialog} />
      <ProductTableHeader
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={handleInputChange}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={productSortFieldItems}
      />
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen message="Não foi possível carregar os produtos" />}
      {data && (
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
      )}
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
      <AlertDialog
        type="error"
        message={errorMessage}
        onClose={handleCloseErrorDialog}
        open={openErrorDialog}
      />
      <AlertDialog
        type="success"
        message={successMessage}
        onClose={handleCloseSuccessDialog}
        open={openSuccessDialog}
      />
    </div>
  );
};

export default ProductPage;
