"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

interface CategoryApi {
  page: number; // começa em 1
  rowsPerPage: number; // >5  tem que ser maior que cinco
  searchQuery: string;
  sortField: "id" | "name" | "description";
  sortDirection: "asc" | "desc";
}

const fetchCategories = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  sortField: string,
  sortDirection: string
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
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHandler, setSearchHandler] = useState<string>("");
  const [sortField, setSortField] = useState<CategoryApi["sortField"]>("name");
  const [sortDirection, setSortDirection] =
    useState<CategoryApi["sortDirection"]>("asc");

  const queryClient = useQueryClient();
  const queryKey: [string, number, number, string, string, string] = [
    "categories",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  ];

  const { data, error, isLoading } = useQuery<CategoriesResponse, Error>({
    queryKey,
    queryFn: () =>
      fetchCategories(
        page + 1,
        rowsPerPage,
        searchQuery,
        sortField,
        sortDirection
      ),
    staleTime: 60 * 1000, //cache
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

  const handleSearch = () => {
    setSearchQuery(searchHandler);
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <FormControl
            variant="outlined"
            style={{ margin: "8px", width: "20%", minWidth: "180px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCreateDialog}
              style={{ width: "100%", padding: "15px 0", fontWeight: "500" }} // Botão com largura total
            >
              Cadastrar Categoria
            </Button>
          </FormControl>

          <FormControl
            variant="outlined"
            style={{ margin: "8px", width: "10%", minWidth: "90px" }}
          >
            <InputLabel id="sort-field-label">Sort Field</InputLabel>
            <Select
              labelId="sort-field-label"
              value={sortField}
              onChange={(e) =>
                setSortField(e.target.value as CategoryApi["sortField"])
              }
              label="Sort Field"
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            style={{ margin: "8px", width: "15%", minWidth: "140px" }}
          >
            <InputLabel id="sort-direction-label">Sort Direction</InputLabel>
            <Select
              labelId="sort-direction-label"
              value={sortDirection}
              onChange={(e) =>
                setSortDirection(e.target.value as CategoryApi["sortDirection"])
              }
              label="Sort Direction"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <TextField
            label="Search Product"
            variant="outlined"
            value={searchHandler}
            onChange={(e) => setSearchHandler(e.target.value)}
            style={{ margin: "8px", width: "20%", minWidth: "300px" }}
          />
          <FormControl
            variant="outlined"
            style={{ margin: "8px", width: "10%", minWidth: "90px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{ width: "100%", padding: "15px 0", fontWeight: "500" }}
            >
              Pesquisar
            </Button>
          </FormControl>
        </Box>
      </Box>
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
