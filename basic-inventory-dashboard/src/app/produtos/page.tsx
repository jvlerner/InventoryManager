"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductTable from "@/app/components/product/tables/ProductTable";
import ProductCreateDialog from "@/app/components/product/dialogs/ProductCreateDialog";
import ProductEditDialog from "@/app/components/product/dialogs/ProductEditDialog";
import ProductDeleteDialog from "@/app/components/product/dialogs/ProductDeleteDialog";
import LoadingScreen from "../components/commom/LoadingScreen";
import ErrorScreen from "../components/commom/ErrorScreen";
import axiosInstance from "@/config/axiosInstance";

// Definindo a interface para o produto
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

export const maxSizeProduct = {
  name: 50,
  description: 100,
  price: 999999.99,
};

// Definindo a interface para a resposta da API
interface ProductsResponse {
  products: Product[];
  totalItems: number;
}

const fetchProducts = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  sortField: string = "id",
  sortDirection: string = "asc"
): Promise<ProductsResponse> => {
  const response = await axiosInstance.get(`/api/products`, {
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
const createProductApi = async (newProduct: Product): Promise<Product> => {
  const response = await axiosInstance.post<Product>("/products", newProduct);
  return response.data; // Retorna o produto criado
};

// Função para editar um produto
const editProductApi = async (editedProduct: Product): Promise<Product> => {
  const response = await axiosInstance.put<Product>(
    `/products/${editedProduct.id}`,
    editedProduct
  );
  return response.data; // Retorna apenas os dados do produto editado
};

// Função para deletar um produto
const deleteProductApi = async (productId: number): Promise<void> => {
  await axiosInstance.delete(`/products/${productId}`); // Não precisa retornar nada
};

const ProductPage: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const queryClient = useQueryClient();
  const queryKey: [string, number, number, string, string] = [
    "products",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
  ];

  const { data, error, isLoading } = useQuery<ProductsResponse, Error>({
    queryKey,
    queryFn: () =>
      fetchProducts(page, rowsPerPage, searchQuery, sortField, sortDirection),
    staleTime: 2 * 60 * 1000, //2 minutos cache
  });

  // Mutação para criar um produto
  const createProduct = useMutation<Product, Error, Product>({
    mutationFn: createProductApi, // Passa a função da API
    onSuccess: (product: Product) => {
      console.log("Success product created:", product);
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      handleCloseCreateDialog(); // Fecha o diálogo após a criação
    },
    onError: (error: Error) => {
      console.error("Error creating product:", error);
    },
  });

  // Mutação para editar um produto existente
  const editProduct = useMutation<Product, Error, Product>({
    mutationFn: editProductApi, // Passa a função da API diretamente

    onSuccess: (product: Product) => {
      console.log("Success product edited:", product);
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      handleCloseEditDialog(); // Fecha o diálogo de edição
    },
    onError: (error: Error) => {
      console.error("Error editing product:", error);
    },
  });

  // Mutação para deletar um produto
  const deleteProduct = useMutation<void, Error, number>({
    mutationFn: deleteProductApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      handleCloseDeleteDialog(); // Fecha o diálogo de exclusão
    },
    onError: (error: Error) => {
      console.error("Error deleting product:", error);
    },
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
      handleCloseDeleteDialog();
    }
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
        Cadastrar Produto
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
      <ProductTable
        products={data?.products || []}
        page={page}
        rowsPerPage={rowsPerPage}
        totalItems={data?.totalItems || 0}
        handleChangePage={(event, newPage) => setPage(newPage)}
        handleChangeRowsPerPage={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(1);
        }}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />
      <ProductCreateDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateProduct}
      />
      <ProductEditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        product={selectedProduct!}
        onEdit={handleEditProduct}
      />
      <ProductDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductPage;
