"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import CategoryTable from "@/app/components/category/tables/CategoryTable";
import CategoryCreateDialog from "@/app/components/category/dialogs/CategoryCreateDialog";
import CategoryEditDialog from "@/app/components/category/dialogs/CategoryEditDialog";
import CategoryDeleteDialog from "@/app/components/category/dialogs/CategoryDeleteDialog";

export interface Category {
  id?: number;
  deleted?: boolean;
  name?: string | null;
  description?: string | null;
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Categoria 1",
    description: "null",
  },
];

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    setCategories((prev) => [...prev, newCategory]);
    handleCloseCreateDialog();
  };

  const handleEditCategory = (editedCategory: Category) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === editedCategory.id ? editedCategory : category
      )
    );
    handleCloseEditDialog();
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.filter((category) => category.id !== selectedCategory.id)
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
        Cadastrar Categoria
      </Button>
      <CategoryTable
        categories={categories}
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
      <CategoryCreateDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateCategory}
      />
      <CategoryEditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        category={selectedCategory!}
        onEdit={handleEditCategory}
      />
      <CategoryDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
};

export default CategoryPage;
