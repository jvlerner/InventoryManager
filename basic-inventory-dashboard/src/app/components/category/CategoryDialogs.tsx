// components/CategoryDialogs.tsx
import React from "react";
import CategoryCreateDialog from "./dialogs/CategoryCreateDialog";
import CategoryEditDialog from "./dialogs/CategoryEditDialog";
import CategoryDeleteDialog from "./dialogs/CategoryDeleteDialog";
import { Category } from "@/app/categorias/page";

interface CategoryDialogsProps {
  openCreateDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  handleCloseCreateDialog: () => void;
  handleCloseEditDialog: () => void;
  handleCloseDeleteDialog: () => void;
  handleCreateCategory: (newCategory: Category) => void;
  handleEditCategory: (editedCategory: Category) => void;
  handleDeleteCategory: () => void;
  selectedCategory: Category | null;
}

const CategoryDialogs: React.FC<CategoryDialogsProps> = ({
  openCreateDialog,
  openEditDialog,
  openDeleteDialog,
  handleCloseCreateDialog,
  handleCloseEditDialog,
  handleCloseDeleteDialog,
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
  selectedCategory,
}) => {
  return (
    <>
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
    </>
  );
};

export default CategoryDialogs;
