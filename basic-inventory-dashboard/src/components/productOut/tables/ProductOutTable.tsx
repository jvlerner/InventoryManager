// components/ProductOutTable.tsx
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
import { ProductOut } from "@/app/saidas/page";
import DeleteButton from "../../commom/buttons/DeleteButton";
// import EditButton from "../../commom/buttons/EditButton";

interface ProductOutTableProps {
  productsOut: ProductOut[];
  page: number;
  count: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (productOut: ProductOut) => void;
  onDelete: (productOut: ProductOut) => void;
}

const ProductOutTable: React.FC<ProductOutTableProps> = ({
  productsOut,
  page,
  rowsPerPage,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  // onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Data Saida</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Quantidade</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Categoria</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 600, right: 1 }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsOut.map((productOut) => (
            <TableRow key={productOut.id}>
              <TableCell sx={{ minWidth: "50px" }}>{productOut.id}</TableCell>
              <TableCell sx={{ minWidth: "80px" }}>
                {(() => {
                  if (!productOut.exitDate) {
                    return "Data não disponível"; // Mensagem de fallback se a data não estiver definida
                  }

                  const exitDate = new Date(productOut.exitDate);
                  if (isNaN(exitDate.getTime())) {
                    return "Data inválida"; // Caso a data não seja válida
                  }

                  return (
                    <>
                      {exitDate.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}{" "}
                      {exitDate.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // Formato de 24 horas
                      })}
                    </>
                  );
                })()}
              </TableCell>

              <TableCell style={{ width: "350px" }}>
                {productOut.product.name}
              </TableCell>
              <TableCell sx={{ minWidth: "150px" }}>
                {productOut.quantity}
              </TableCell>
              <TableCell style={{ width: "350px" }}>
                {productOut.product.category?.name}
              </TableCell>
              <TableCell style={{ width: "250px" }}>
                {productOut.product?.quantity}
              </TableCell>
              <TableCell sx={{ minWidth: "264px" }}>
                {/* <EditButton onEdit={() => onEdit(productOut)} /> */}
                <DeleteButton onDelete={() => onDelete(productOut)} />
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

export default ProductOutTable;
