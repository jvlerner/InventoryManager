"use client";

import React, { useState } from "react";
import LoadingScreen from "@/app/components/commom/LoadingScreen";
import ErrorScreen from "@/app/components/commom/ErrorScreen";
import CategoryHeader from "../components/category/CategoryHeader";
import CategoryTable from "@/app/components/category/tables/CategoryTable";
import CategoryDialogs from "../components/category/CategoryDialogs";
import { useCategories } from "../hooks/useCategories";

export interface Category {
  id?: number;
  deleted?: boolean;
  name?: string | null;
  description?: string | null;
}

export const categoryMaxSizeCategory: { name: number; description: number } = {
  name: 50,
  description: 100,
};

const categorySortFieldItems = [
  { value: "id", label: "ID" },
  { value: "name", label: "Nome" },
];

export interface CategoryApi {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: "id" | "name" | "description";
  sortDirection: "asc" | "desc";
}

const CategoryPage: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHandler, setSearchHandler] = useState<string>("");
  const [sortField, setSortField] = useState<CategoryApi["sortField"]>("name");
  const [sortDirection, setSortDirection] =
    useState<CategoryApi["sortDirection"]>("asc");

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
    handleCloseCreateDialog: () => handleCloseCreateDialog,
    handleCloseEditDialog: () => handleCloseEditDialog,
    handleCloseDeleteDialog: () => handleCloseDeleteDialog,
  });

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

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
    handleCloseCreateDialog();
  };

  const handleEditCategory = (editedCategory: Category) => {
    editCategory.mutate(editedCategory);
    handleCloseEditDialog();
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      deleteCategory.mutate(selectedCategory.id!);
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
      <CategoryHeader
        handleOpenCreateDialog={handleOpenCreateDialog}
        handleSearch={handleSearch}
        searchHandler={searchHandler}
        setSearchHandler={setSearchHandler}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={categorySortFieldItems}
      />
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
    </div>
  );
};

export default CategoryPage;
