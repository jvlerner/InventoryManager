// src/app/hooks/useProducts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/app/config/api";
import { ProductOut } from "../saidas/page";

// Definindo a interface para a resposta da API
export interface ProductsInResponse {
  totalItems: number;
  products: ProductOut[];
}

// Definindo a interface para os parâmetros do hook
export interface UseProductsInParams {
  queryKey: [string, number, number, string, string, string];
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: string;
  sortDirection: string;
  handleErrorDialog?: (message: string) => void;
  handleSuccessDialog?: (message: string) => void;
}

const fetchProductsIn = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  sortField: string,
  sortDirection: string
): Promise<ProductsInResponse> => {
  page = page + 1;
  const response = await api.get(`/products-in`, {
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
const createProductOutApi = async (
  newProductOut: ProductOut
): Promise<ProductOut> => {
  const response = await api.post<ProductOut>("/products-in", newProductOut);
  return response.data; // Retorna o produto criado
};

// Função para editar um produto
const editProductOutApi = async (
  editedProductOut: ProductOut
): Promise<ProductOut> => {
  const response = await api.put<ProductOut>(
    `/products-in/${editedProductOut.id}`,
    editedProductOut
  );
  return response.data; // Retorna apenas os dados do produto editado
};

// Função para deletar um produto
const deleteProductOutApi = async (ProductOutId: number): Promise<void> => {
  await api.delete(`/products-out/${ProductOutId}`); // Não precisa retornar nada
};

// Hook
export const useProductsOut = ({
  queryKey,
  page,
  rowsPerPage,
  searchQuery,
  sortField,
  sortDirection,
  handleErrorDialog,
  handleSuccessDialog,
}: UseProductsInParams) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<ProductsInResponse, Error>({
    queryKey: [...queryKey],
    queryFn: () =>
      fetchProductsIn(page, rowsPerPage, searchQuery, sortField, sortDirection),
    staleTime: 60 * 1000, //cache
  });

  // Mutação para criar um produto
  const createProductOut = useMutation<ProductOut, Error, ProductOut>({
    mutationFn: createProductOutApi, // Passa a função da API
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["productsIn"] }); // Invalida a query de produtos
      if (handleSuccessDialog) {
        handleSuccessDialog("Entrada de produto criado com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error creating product in:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível criar entrada para o produto: " + error.message
        );
      }
    },
  });
  // Mutação para editar um produto existente
  const editProductOut = useMutation<ProductOut, Error, ProductOut>({
    mutationFn: editProductOutApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      if (handleSuccessDialog) {
        handleSuccessDialog("Entrada do produto editada com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error editing product in:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível editar a entrada do produto:" + error.message
        );
      }
    },
  });

  // Mutação para deletar um produto
  const deleteProductOut = useMutation<void, Error, number>({
    mutationFn: deleteProductOutApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }); // Invalida a query de produtos
      if (handleSuccessDialog) {
        handleSuccessDialog("Entrada de produto deletada com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error deleting  in:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível deletar a a entrada de produto: " + error.message
        );
      }
    },
  });

  return {
    data,
    error,
    isLoading,
    createProductOut,
    editProductOut,
    deleteProductOut,
  };
};
