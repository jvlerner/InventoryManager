"use client";

import React, { useRef, useState } from "react";
import LoadingScreen from "@/components/commom/screens/LoadingScreen";
import ErrorScreen from "@/components/commom/screens/ErrorScreen";
import ProductInTableHeader from "@/components/productIn/ProductInTableHeader";
import ProductInTable from "@/components/productIn/tables/ProductInTable";
import ProductInDialogs from "@/components/productIn/ProductInDialogs";
import { useProductsIn } from "@/hooks/useProductsIn";
import ProductInPageHeader from "@/components/productIn/ProductInPageHeader";
import AlertDialog from "@/components/commom/dialogs/AlertDialog";
import { productInSortFieldItems } from "@/config/sortFields";

export interface ProductIn {
  id?: number;
  deleted?: boolean;
  quantity?: number;
  entryDate?: Date;
  product: {
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
    available?: boolean;
  };
}

export interface ProductInApi {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: "id" | "quantity";
  sortDirection: "asc" | "desc";
}

const ProductInPage: React.FC = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const [sortField, setSortField] = useState<ProductInApi["sortField"]>("id");
  const [sortDirection, setSortDirection] =
    useState<ProductInApi["sortDirection"]>("asc");
  const [selectedProductIn, setSelectedProductIn] = useState<ProductIn | null>(
    null
  );
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
    "productsIn",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  ];

  const {
    data,
    error,
    isLoading,
    createProductIn,
    editProductIn,
    deleteProductIn,
  } = useProductsIn({
    queryKey: queryKey,
    page: page,
    rowsPerPage: rowsPerPage,
    searchQuery: searchQuery,
    sortField: sortField,
    sortDirection: sortDirection,
    handleErrorDialog: (message: string) => handleOpenErrorDialog(message),
    handleSuccessDialog: (message: string) => handleOpenSuccessDialog(message),
  });

  const handleOpenEditDialog = (productIn: ProductIn) => {
    setSelectedProductIn(productIn);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProductIn(null);
  };

  const handleOpenDeleteDialog = (productIn: ProductIn) => {
    setSelectedProductIn(productIn);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedProductIn(null);
  };

  const handleCreateProductIn = (newProductIn: ProductIn) => {
    createProductIn.mutate(newProductIn);
  };

  const handleEditProductIn = (editedProductIn: ProductIn) => {
    editProductIn.mutate(editedProductIn);
  };

  const handleDeleteProductIn = () => {
    if (selectedProductIn) {
      deleteProductIn.mutate(selectedProductIn.id!, {
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
      <ProductInPageHeader handleOpenCreateDialog={handleOpenCreateDialog} />
      <ProductInTableHeader
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={handleInputChange}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={productInSortFieldItems}
      />
      {isLoading && <LoadingScreen />}
      {error && (
        <ErrorScreen message="Não foi possível carregar as entradas dos produtos" />
      )}
      {data && (
        <ProductInTable
          productsIn={data?.products || []}
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
      <ProductInDialogs
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        handleCloseCreateDialog={handleCloseCreateDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleCreateProductIn={handleCreateProductIn}
        handleEditProductIn={handleEditProductIn}
        handleDeleteProductIn={handleDeleteProductIn}
        selectedProductIn={selectedProductIn}
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

export default ProductInPage;
