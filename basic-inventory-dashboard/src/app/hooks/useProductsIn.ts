// src/app/hooks/useProducts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/app/config/api";
import { ProductIn } from "../entradas/page";

// Definindo a interface para a resposta da API
export interface ProductsInResponse {
  totalItems: number;
  products: ProductIn[];
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
const createProductInApi = async (
  newProductIn: ProductIn
): Promise<ProductIn> => {
  const response = await api.post<ProductIn>("/products-in", newProductIn);
  return response.data; // Retorna o produto criado
};

// Função para editar um produto
const editProductInApi = async (
  editedProductIn: ProductIn
): Promise<ProductIn> => {
  const response = await api.put<ProductIn>(
    `/products-in/${editedProductIn.id}`,
    editedProductIn
  );
  return response.data; // Retorna apenas os dados do produto editado
};

// Função para deletar um produto
const deleteProductInApi = async (ProductInId: number): Promise<void> => {
  await api.delete(`/products-in/${ProductInId}`); // Não precisa retornar nada
};

// Hook
export const useProductsIn = ({
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
  const createProductIn = useMutation<ProductIn, Error, ProductIn>({
    mutationFn: createProductInApi, // Passa a função da API
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
  const editProductIn = useMutation<ProductIn, Error, ProductIn>({
    mutationFn: editProductInApi, // Passa a função da API diretamente

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
  const deleteProductIn = useMutation<void, Error, number>({
    mutationFn: deleteProductInApi, // Passa a função da API diretamente

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
    createProductIn,
    editProductIn,
    deleteProductIn,
  };
};
