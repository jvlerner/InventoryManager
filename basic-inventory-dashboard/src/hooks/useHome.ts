// src/app/hooks/useHome.ts

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "./useCategories";
import { useProductsIn } from "./useProductsIn";
import { useProductsOut } from "./useProductsOut";
import { useProductsLow } from "./useProductsLow";

// Definindo a interface para a resposta da API
interface HomeResponse {
  totalCategories: number;
  totalProducts: number;
  totalExits: number;
  totalEntries: number;
  totalProductsLowStock: number;
}

export const useHome = () => {
  // Desestruturando os valores de queryKey com valores padrão
  const queryKey:
    | never[]
    | [
        ("productsLow" | undefined)?,
        (0 | undefined)?,
        (5 | undefined)?,
        ("" | undefined)?,
        ("id" | undefined)?,
        ("desc" | undefined)?
      ] = [];
  const [
    key = "categoriesDashboard",
    page = 0,
    rowsPerPage = 5,
    searchQuery = "",
    sortField = "id",
    sortDirection = "desc",
  ] = queryKey;

  const quantity = 20;
  const lowStock = true;

  // Chama o hook useCategories para obter os dados de categorias
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategories({
    queryKey: [key, page, rowsPerPage, searchQuery, sortField, sortDirection],
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  });

  // Chama o hook useProducts para obter os dados de produtos
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useProducts({
    queryKey: [
      "productsDashboard",
      page,
      rowsPerPage,
      searchQuery,
      sortField,
      sortDirection,
    ],
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  });

  const {
    data: productsInData,
    error: productsInError,
    isLoading: productsInLoading,
  } = useProductsIn({
    queryKey: [
      "productsInDashboard",
      page,
      rowsPerPage,
      searchQuery,
      sortField,
      sortDirection,
    ],
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  });

  const {
    data: productsOutData,
    error: productsOutError,
    isLoading: productsOutLoading,
  } = useProductsOut({
    queryKey: [
      "productsOutDashboard",
      page,
      rowsPerPage,
      searchQuery,
      sortField,
      sortDirection,
    ],
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  });

  const {
    data: productsLowData,
    error: productsLowError,
    isLoading: productsLowLoading,
  } = useProductsLow({
    queryKey: [
      "productsLowDashboard",
      page,
      rowsPerPage,
      searchQuery,
      sortField,
      sortDirection,
    ],
    page,
    rowsPerPage,
    searchQuery,
    quantity,
    sortField,
    sortDirection,
    lowStock,
  });

  // Verifica se os dados de produtos e categorias estão carregando
  if (
    categoriesLoading ||
    productsLoading ||
    productsInLoading ||
    productsOutLoading ||
    productsLowLoading
  ) {
    return { isLoading: true };
  }

  // Verifica se há erro nos dados de produtos ou categorias
  if (
    categoriesError ||
    productsError ||
    productsInError ||
    productsOutError ||
    productsLowError
  ) {
    return {
      error:
        categoriesError ||
        productsError ||
        productsInError ||
        productsOutError ||
        productsLowError,
    };
  }

  // Combine os dados para formar a resposta do "Home"
  const homeData: HomeResponse = {
    totalCategories: categoriesData ? categoriesData.totalItems : 0,
    totalProducts: productsData ? productsData.totalItems : 0, // Assuming 'totalItems' is the total product count
    totalExits: productsOutData ? productsOutData.totalItems : 0, // Example of products data you might have
    totalEntries: productsInData ? productsInData.totalItems : 0, // Similarly for entries
    totalProductsLowStock: productsLowData ? productsLowData.totalItems : 0, // Assuming there's such a field
  };

  return {
    homeData,
  };
};
