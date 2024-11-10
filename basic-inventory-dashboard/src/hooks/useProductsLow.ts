// src/app/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import { ProductsResponse } from "./useProducts";

interface UseProductsLowParams {
  queryKey: [string, number, number, string, string, string];
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  quantity: number;
  sortField: string;
  sortDirection: string;
  lowStock: boolean;
}

const fetchProducts = async (
  page: number,
  rowsPerPage: number,
  searchQuery: string,
  quantity: number,
  sortField: string,
  sortDirection: string,
  lowStock: boolean
): Promise<ProductsResponse> => {
  page = page + 1;
  const response = await api.get(`/products`, {
    params: {
      page,
      rowsPerPage,
      search: searchQuery,
      quantity,
      sortField,
      sortDirection,
      lowStock,
    },
  });
  return response.data;
};

// Hook
export const useProductsLow = ({
  queryKey,
  page,
  rowsPerPage,
  searchQuery,
  quantity,
  sortField,
  sortDirection,
  lowStock,
}: UseProductsLowParams) => {
  const { data, error, isLoading } = useQuery<ProductsResponse, Error>({
    queryKey: [...queryKey],
    queryFn: () =>
      fetchProducts(
        page,
        rowsPerPage,
        searchQuery,
        quantity,
        sortField,
        sortDirection,
        lowStock
      ),
    staleTime: 2 * 60 * 1000, //cache
  });

  return {
    data,
    error,
    isLoading,
  };
};
