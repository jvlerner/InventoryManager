// src/app/hooks/useProducts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/service/api";
import { ProductOut } from "@/app/saidas/page";

// Definindo a interface para a resposta da API
export interface ProductsOutResponse {
  totalItems: number;
  products: ProductOut[];
}

// Definindo a interface para os parâmetros do hook
export interface UseProductsOutParams {
  queryKey: [string, number, number, string, string, string];
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  sortField: string;
  sortDirection: string;
  handleErrorDialog?: (message: string) => void;
  handleSuccessDialog?: (message: string) => void;
  handleWarningDialog?: (message: string) => void;
}

const fetchProductsOut = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  sortField: string,
  sortDirection: string
): Promise<ProductsOutResponse> => {
  page = page + 1;
  const response = await api.get(`/products-out`, {
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
  const response = await api.post<ProductOut>("/products-out", newProductOut);
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
  handleWarningDialog,
}: UseProductsOutParams) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<ProductsOutResponse, Error>({
    queryKey: [...queryKey],
    queryFn: () =>
      fetchProductsOut(
        page,
        rowsPerPage,
        searchQuery,
        sortField,
        sortDirection
      ),
    staleTime: 2 * 60 * 1000, //cache
  });

  // Mutação para criar um produto
  const createProductOut = useMutation<ProductOut, Error, ProductOut>({
    mutationFn: createProductOutApi, // Passa a função da API
    onSuccess: async (ProductOut) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsIn"] });
      queryClient.invalidateQueries({ queryKey: ["productsOut"] });
      queryClient.invalidateQueries({ queryKey: ["productsLow"] });
      console.log(ProductOut.product.quantity + " - " + ProductOut.quantity)
      if (ProductOut.product.quantity && ProductOut.quantity) {
        const newQuantity = ProductOut.product.quantity - ProductOut.quantity;
        if (newQuantity < 20 && handleWarningDialog) {
          await handleWarningDialog(
            "Estoque baixo para o produto de ID: " +
              ProductOut.product.id +
              " - Nome: " +
              ProductOut.product.name +
              " - Quantidade: " +
              newQuantity
          );
          if (handleSuccessDialog) {
            handleSuccessDialog("Saída de produto criado com sucesso.");
          }
        }
      }      
    },
    onError: (error: Error) => {
      console.log("Error creating product in:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível criar saída para o produto: " + error.message
        );
      }
    },
  });
  // Mutação para editar um produto existente
  const editProductOut = useMutation<ProductOut, Error, ProductOut>({
    mutationFn: editProductOutApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsIn"] });
      queryClient.invalidateQueries({ queryKey: ["productsOut"] });
      queryClient.invalidateQueries({ queryKey: ["productsLow"] });
      if (handleSuccessDialog) {
        handleSuccessDialog("Saída do produto editada com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error editing product out:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível editar a saída do produto:" + error.message
        );
      }
    },
  });

  // Mutação para deletar um produto
  const deleteProductOut = useMutation<void, Error, number>({
    mutationFn: deleteProductOutApi, // Passa a função da API diretamente

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsIn"] });
      queryClient.invalidateQueries({ queryKey: ["productsOut"] });
      queryClient.invalidateQueries({ queryKey: ["productsLow"] });
      if (handleSuccessDialog) {
        handleSuccessDialog("Saída de produto deletada com sucesso.");
      }
    },
    onError: (error: Error) => {
      console.log("Error deleting product out:", error);
      if (handleErrorDialog) {
        handleErrorDialog(
          "Não foi possível deletar a a saída de produto: " + error.message
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
