"use client";

import React, { useRef, useState } from "react";
import LoadingScreen from "@/components/commom/screens/LoadingScreen";
import ErrorScreen from "@/components/commom/screens/ErrorScreen";
import ProductTableHeader from "@/components/product/ProductTableHeader";
import ProductLowStockPageHeader from "@/components/reports/low-stock/ProductLowPageHeader";
import { useProductsLow } from "@/hooks/useProductsLow";
import ProductLowTable from "@/components/reports/low-stock/tables/ProductLowTable";
import { ProductApi } from "@/app/produtos/page";
import { productSortFieldItems } from "@/config/sortFields";

const ProductLowPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryHandler, setSearchQueryHandler] = useState<string>("");
  const [sortField, setSortField] = useState<ProductApi["sortField"]>("id");
  const [sortDirection, setSortDirection] =
    useState<ProductApi["sortDirection"]>("asc");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryKey: [string, number, number, string, string, string] = [
    "productsLow",
    page,
    rowsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  ];

  const { data, error, isLoading } = useProductsLow({
    queryKey: queryKey,
    page: page,
    rowsPerPage: rowsPerPage,
    searchQuery: searchQuery,
    quantity: 20,
    sortField: sortField,
    sortDirection: sortDirection,
    lowStock: true,
  });

  const handleInputChange = (value: string) => {
    setSearchQueryHandler(value);
    console.log(value);
    if (value.trim() === "") {
      setSearchQuery("");
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
      setPage(0);
    }, 1000);
  };

  return (
    <div>
      <ProductLowStockPageHeader />
      <ProductTableHeader
        searchQueryHandler={searchQueryHandler}
        setSearchQueryHandler={handleInputChange}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        sortFieldItems={productSortFieldItems}
      />
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen message="Não foi possível carregar os produtos" />}
      {data && (
        <ProductLowTable
          products={data?.products || []}
          page={page}
          count={data?.totalItems || 0}
          rowsPerPage={rowsPerPage}
          handleChangePage={(event, newPage) => setPage(newPage)}
          handleChangeRowsPerPage={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      )}
    </div>
  );
};

export default ProductLowPage;
