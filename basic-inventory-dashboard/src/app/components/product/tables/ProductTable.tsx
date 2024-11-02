// components/ProductTable.tsx
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { Product } from "@/app/produtos/page";

interface ProductTableProps {
  products: Product[];
  page: number;
  rowsPerPage: number;
  totalItems: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  page,
  rowsPerPage,
  totalItems,
  handleChangePage,
  handleChangeRowsPerPage,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <TableRow key={product.id}>
                <TableCell style={{ width: "50px" }}>{product.id}</TableCell>
                <TableCell style={{ width: "150px" }}>{product.name}</TableCell>
                <TableCell style={{ width: "200px" }}>
                  {product.description}
                </TableCell>
                <TableCell style={{ width: "100px" }}>
                  {product.price?.toFixed(2)}
                </TableCell>
                <TableCell style={{ width: "90px" }}>
                  {product.quantity}
                </TableCell>
                <TableCell style={{ width: "150px" }}>
                  {product.category?.name}
                </TableCell>
                <TableCell style={{ width: "90px" }}>
                  <Button onClick={() => onEdit(product)}>Editar</Button>
                  <Button onClick={() => onDelete(product)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductTable;
