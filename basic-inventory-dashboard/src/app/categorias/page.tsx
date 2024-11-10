"use client";

import LoadingScreen from "@/components/commom/screens/LoadingScreen";
import ErrorScreen from "@/components/commom/screens/ErrorScreen";

import React, { useRef, useState } from "react";
import { useCategories } from "@/hooks/useCategories";

import CategoryTable from "@/components/category/tables/CategoryTable";
import CategoryDialogs from "@/components/category/CategoryDialogs";
import CategoryTableHeader from "@/components/category/CategoryTableHeader";
import CategoryPageHeader from "@/components/category/CategoryPageHeader";
import AlertDialog from "@/components/commom/dialogs/AlertDialog";
import { categorySortFieldItems } from "@/config/sortFields";

export interface Category {
  id?: number;
  deleted?: boolean;
  name?: string | null;
  description?: string | null;
}

export interface CategoryApi {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: "id" | "name";
  sortDirection: "asc" | "desc";
}

const CategoryPage: React.FC = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const [sortField, setSortField] = useState<CategoryApi["sortField"]>("id");
  const [sortDirection, setSortDirection] =
    useState<CategoryApi["sortDirection"]>("asc");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
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
    "categories",
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
    createCategory,
    editCategory,
    deleteCategory,
  } = useCategories({
    queryKey: queryKey,
    page: page,
    rowsPerPage: rowsPerPage,
    searchQuery: searchQuery,
    sortField: sortField,
    sortDirection: sortDirection,
    handleErrorDialog: (message: string) => handleOpenErrorDialog(message),
    handleSuccessDialog: (message: string) => handleOpenSuccessDialog(message),
  });

  const handleOpenEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCategory(null);
  };

  const handleOpenDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const handleCreateCategory = (newCategory: Category) => {
    createCategory.mutate(newCategory);
  };

  const handleEditCategory = (editedCategory: Category) => {
    editCategory.mutate(editedCategory);
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      deleteCategory.mutate(selectedCategory.id!, {
        onSuccess: () => {
          if (data?.categories.length === 1 && page > 0) {
            setPage((prevPage) => prevPage - 1); // Volta uma página
          } else if (data?.categories.length === 0) {
            setPage(0); // Se não houver mais categorias, vá para a página 0
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
      <CategoryPageHeader handleOpenCreateDialog={handleOpenCreateDialog} />
      <CategoryTableHeader
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={handleInputChange}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={categorySortFieldItems}
      />
      {isLoading && <LoadingScreen />}
      {error && (
        <ErrorScreen message="Não foi possível carregar as categorias." />
      )}
      {data && (
        <CategoryTable
          categories={data?.categories || []}
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
      <CategoryDialogs
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        handleCloseCreateDialog={handleCloseCreateDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleCreateCategory={handleCreateCategory}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
        selectedCategory={selectedCategory}
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

export default CategoryPage;
