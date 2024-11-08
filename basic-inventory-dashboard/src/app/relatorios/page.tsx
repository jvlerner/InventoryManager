"use client";

import React from "react";
import Link from "next/link"; // Importação do Link
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning"; // Ícone de aviso
import ReportsPageHeader from "../components/reports/ReportsPageHeader";

// Definindo os relatórios
const reports = [
  {
    id: 1,
    title: "Relatório de Baixo Estoque",
    icon: <WarningIcon />, // Ícone de aviso
    url: "/relatorios/baixo-estoque", // URL para o relatório
  },
];

const ReportsPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <ReportsPageHeader />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {reports.map((report) => (
          <Box
            key={report.id}
            sx={{
              display: "flex",
              gap: 1,
              minWidth: "200px",
            }}
          >
            <Link href={report.url} passHref>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "auto", // Altura automática do card
                  borderRadius: 2, // Bordas arredondadas
                  boxShadow: 3, // Sombra suave
                  maxWidth: "260px",
                }}
              >
                <CardActionArea>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 3, // Espaçamento interno
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 60, color: "orange" }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {report.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReportsPage;
