// src/app/hooks/useProducts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/app/config/api";
import { Product } from "../produtos/page";

// Definindo a interface para a resposta da API
export interface ProductsResponse {
  products: Product[];
  totalItems: number;
}

// Definindo a interface para os parâmetros do hook
export interface UseProductsParams {
  queryKey: [string, number, number, string, string, string];
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: string;
  sortDirection: string;
  handleErrorDialog?: (message: string) => void;
  handleSuccessDialog?: (message: string) => void;
}

const fetchProducts = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  sortField: string,
  sortDirection: string
): Promise<ProductsResponse> => {
  page = page + 1;
  const response = await api.get(`/products`, {
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
  const response = await api.post<Product>("/products", newProduct);
  return response.data; // Retorna o produto criado
};

// Função para editar um produto
const editProductApi = async (editedProduct: Product): Promise<Product> => {
  const response = await api.put<Product>(
    `/products/${editedProduct.id}`,
    editedProduct
  );
  return response.data; // Retorna apenas os dados do produto editado
};

// Função para deletar um produto
const deleteProductApi = async (productId: number): Promise<void> => {
  await api.delete(`/products/${productId}`); // Não precisa retornar nada
};

// Hook
export const useProducts = ({
  queryKey,
  page,
  rowsPerPage,
  searchQuery,
  sortField,
  sortDirection,
  handleErrorDialog,
  handleSuccessDialog,
}: UseProductsParams) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<ProductsResponse, Error>({
    queryKey: [...queryKey],
    queryFn: () =>
      fetchProducts(page, rowsPerPage, searchQuery, sortField, sortDirection),
    staleTime: 60 * 1000, //cache
  });

  // Mutação para criar um produto
  const createProduct = useMutation<Product, Error, Product>({
    mutationFn: createProductApi, // Passa a função da API
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Invalida a query de produtos
      if (handleSuccessDialog) {
        handleSuccessDialog("Produto criado com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error creating product:", error);
      if (handleErrorDialog) {
        handleErrorDialog("Não foi possível criar produto: " + error.message);
      }
    },
  });
  // Mutação para editar um produto existente
  const editProduct = useMutation<Product, Error, Product>({
    mutationFn: editProductApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      if (handleSuccessDialog) {
        handleSuccessDialog("Produto editado com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error editing product:", error);
      if (handleErrorDialog) {
        handleErrorDialog("Não foi possível editar o produto:" + error.message);
      }
    },
  });

  // Mutação para deletar um produto
  const deleteProduct = useMutation<void, Error, number>({
    mutationFn: deleteProductApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      if (handleSuccessDialog) {
        handleSuccessDialog("Produto deletado com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error deleting product:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível deletar o produto: " + error.message
        );
      }
    },
  });

  return {
    data,
    error,
    isLoading,
    createProduct,
    editProduct,
    deleteProduct,
  };
};
