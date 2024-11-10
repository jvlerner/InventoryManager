// components/ProductInTable.tsx
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
} from "@mui/material";
import { ProductIn } from "@/app/entradas/page";
import DeleteButton from "../../commom/buttons/DeleteButton";
import EditButton from "../../commom/buttons/EditButton";

interface ProductInTableProps {
  productsIn: ProductIn[];
  page: number;
  count: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (productIn: ProductIn) => void;
  onDelete: (productIn: ProductIn) => void;
}

const ProductInTable: React.FC<ProductInTableProps> = ({
  productsIn,
  page,
  rowsPerPage,
  count,
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
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Data Entrada</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Quantidade</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Categoria</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 600, right: 1 }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsIn.map((productIn) => (
            <TableRow key={productIn.id}>
              <TableCell sx={{ minWidth: "50px" }}>{productIn.id}</TableCell>
              <TableCell sx={{ minWidth: "80px" }}>
                {(() => {
                  if (!productIn.entryDate) {
                    return "Data não disponível"; // Mensagem de fallback se a data não estiver definida
                  }

                  const entryDate = new Date(productIn.entryDate);
                  if (isNaN(entryDate.getTime())) {
                    return "Data inválida"; // Caso a data não seja válida
                  }

                  return (
                    <>
                      {entryDate.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}{" "}
                      {entryDate.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // Formato de 24 horas
                      })}
                    </>
                  );
                })()}
              </TableCell>

              <TableCell style={{ width: "350px" }}>
                {productIn.product.name}
              </TableCell>
              <TableCell sx={{ minWidth: "150px" }}>
                {productIn.quantity}
              </TableCell>
              <TableCell style={{ width: "350px" }}>
                {productIn.product.category?.name}
              </TableCell>
              <TableCell style={{ width: "250px" }}>
                {productIn.product?.quantity}
              </TableCell>
              <TableCell sx={{ minWidth: "264px" }}>
                <EditButton onEdit={() => onEdit(productIn)} />
                <DeleteButton onDelete={() => onDelete(productIn)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductInTable;
