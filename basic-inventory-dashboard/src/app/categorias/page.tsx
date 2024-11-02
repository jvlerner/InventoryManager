"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import CategoryTable from "@/app/components/category/tables/CategoryTable";
import CategoryCreateDialog from "@/app/components/category/dialogs/CategoryCreateDialog";
import CategoryEditDialog from "@/app/components/category/dialogs/CategoryEditDialog";
import CategoryDeleteDialog from "@/app/components/category/dialogs/CategoryDeleteDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "@/app/components/commom/LoadingScreen";
import ErrorScreen from "@/app/components/commom/ErrorScreen";
import api from "@/app/config/api";

export interface Category {
  id?: number;
  deleted?: boolean;
  name?: string | null;
  description?: string | null;
}

interface SizeCategory {
  name: number;
  description: number;
}

export const maxSizeCategory: SizeCategory = {
  name: 50,
  description: 100,
};

// Definindo a interface para a resposta da API
interface CategoriesResponse {
  categories: Category[];
  totalItems: number;
}

const fetchCategories = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  sortField: string = "id",
  sortDirection: string = "asc"
): Promise<CategoriesResponse> => {
  const response = await api.get(`/categories`, {
    params: {
      page,
      rowsPerPage,
      search: searchQuery,
      sortField,
      sortDirection,
    },
  });
  return response.data;
};

// Função para criar um produto
const createCategoryApi = async (newCategory: Category): Promise<Category> => {
  const response = await api.post<Category>("/categories", newCategory);
  return response.data; // Retorna o produto criado
};

// Função para editar um produto
const editCategoryApi = async (editedCategory: Category): Promise<Category> => {
  const response = await api.put<Category>(
    `/categories/${editedCategory.id}`,
    editedCategory
  );
  return response.data; // Retorna apenas os dados do produto editado
};

// Função para deletar um produto
const deleteCategoryApi = async (categoryId: number): Promise<void> => {
  await api.delete(`/categories/${categoryId}`); // Não precisa retornar nada
};

const CategoryPage: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const queryClient = useQueryClient();
  const queryKey: [string, number, number, string, string] = [
    "categories",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
  ];

  const { data, error, isLoading } = useQuery<CategoriesResponse, Error>({
    queryKey,
    queryFn: () =>
      fetchCategories(page, rowsPerPage, searchQuery, sortField, sortDirection),
    staleTime: 2 * 60 * 1000, //2 minutos cache
  });

  // Mutação para criar um produto
  const createCategory = useMutation<Category, Error, Category>({
    mutationFn: createCategoryApi, // Passa a função da API
    onSuccess: (category: Category) => {
      console.log("Success category created:", category);
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      handleCloseCreateDialog(); // Fecha o diálogo após a criação
    },
    onError: (error: Error) => {
      console.error("Error creating category:", error);
    },
  });

  // Mutação para editar um produto existente
  const editCategory = useMutation<Category, Error, Category>({
    mutationFn: editCategoryApi, // Passa a função da API diretamente

    onSuccess: (category: Category) => {
      console.log("Success Category edited:", category);
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      handleCloseEditDialog(); // Fecha o diálogo de edição
    },
    onError: (error: Error) => {
      console.error("Error editing category:", error);
    },
  });

  // Mutação para deletar um produto
  const deleteCategory = useMutation<void, Error, number>({
    mutationFn: deleteCategoryApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      handleCloseDeleteDialog(); // Fecha o diálogo de exclusão
    },
    onError: (error: Error) => {
      console.error("Error deleting category:", error);
    },
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

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateDialog}
      >
        Cadastrar Categoria
      </Button>
      <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
        <option value="Id">ID</option>
        <option value="Name">Name</option>
        <option value="Price">Price</option>
      </select>
      <select
        onChange={(e) => setSortDirection(e.target.value)}
        value={sortDirection}
      >
        <option value="Asc">Ascending</option>
        <option value="Desc">Descending</option>
      </select>
      <TextField
        label="Search Product"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <CategoryTable
        categories={data?.categories || []}
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
