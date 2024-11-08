"use client";

import React, { useRef, useState } from "react";
import LoadingScreen from "@/app/components/commom/screens/LoadingScreen";
import ErrorScreen from "@/app/components/commom/screens/ErrorScreen";
import ProductOutTableHeader from "../components/productOut/ProductOutTableHeader";
import ProductOutTable from "@/app/components/productOut/tables/ProductOutTable";
import ProductOutDialogs from "../components/productOut/ProductOutDialogs";
import { useProductsOut } from "../hooks/useProductsOut";
import ProductOutPageHeader from "../components/productOut/ProductOutPageHeader";
import AlertDialog from "../components/commom/dialogs/AlertDialog";

export interface ProductOut {
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

export const productOutMaxSize: {
  quantity: number;
} = {
  quantity: 1000000,
};

const productOutSortFieldItems = [
  { value: "id", label: "ID" },
  { value: "quantity", label: "Quantidade" },
];

export interface ProductOutApi {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: "id" | "quantity";
  sortDirection: "asc" | "desc";
}

const ProductOutPage: React.FC = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const [sortField, setSortField] = useState<ProductOutApi["sortField"]>("id");
  const [sortDirection, setSortDirection] =
    useState<ProductOutApi["sortDirection"]>("asc");
  const [selectedProductOut, setSelectedProductOut] =
    useState<ProductOut | null>(null);
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
    createProductOut,
    editProductOut,
    deleteProductOut,
  } = useProductsOut({
    queryKey: queryKey,
    page: page,
    rowsPerPage: rowsPerPage,
    searchQuery: searchQuery,
    sortField: sortField,
    sortDirection: sortDirection,
    handleErrorDialog: (message: string) => handleOpenErrorDialog(message),
    handleSuccessDialog: (message: string) => handleOpenSuccessDialog(message),
  });

  const handleOpenEditDialog = (productOut: ProductOut) => {
    setSelectedProductOut(productOut);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProductOut(null);
  };

  const handleOpenDeleteDialog = (productOut: ProductOut) => {
    setSelectedProductOut(productOut);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedProductOut(null);
  };

  const handleCreateProductOut = (newProductOut: ProductOut) => {
    createProductOut.mutate(newProductOut);
  };

  const handleEditProductOut = (editedProductOut: ProductOut) => {
    editProductOut.mutate(editedProductOut);
  };

  const handleDeleteProductOut = () => {
    if (selectedProductOut) {
      deleteProductOut.mutate(selectedProductOut.id!, {
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
      <ProductOutPageHeader handleOpenCreateDialog={handleOpenCreateDialog} />
      <ProductOutTableHeader
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={handleInputChange}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={productOutSortFieldItems}
      />
      {isLoading && <LoadingScreen />}
      {error && (
        <ErrorScreen message="Não foi possível carregar as entradas dos produtos" />
      )}
      {data && (
        <ProductOutTable
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
      <ProductOutDialogs
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        handleCloseCreateDialog={handleCloseCreateDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleCreateProductOut={handleCreateProductOut}
        handleEditProductOut={handleEditProductOut}
        handleDeleteProductOut={handleDeleteProductOut}
        selectedProductOut={selectedProductOut}
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

export default ProductOutPage;
