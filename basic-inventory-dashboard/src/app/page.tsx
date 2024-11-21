"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHome } from "@/hooks/useHome";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ErrorScreen from "@/components/commom/screens/ErrorScreen";

import InventoryIcon from "@mui/icons-material/Inventory";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import LoadingScreen from "@/components/commom/screens/LoadingScreen";

const HomePage = () => {
  const { homeData, error, isLoading } = useHome();
  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column", // Stack the cards vertically
        gap: 3, // Space between each card
      }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen message="Não foi possível carregar os dados." />}
      {homeData && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: "350px",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Total Categorias
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {homeData?.totalCategories || 0}
                </Typography>
                <TurnedInIcon fontSize="large" />
              </Box>
            </CardContent>
          </Card>

          {/* Total Products */}
          <Card
            sx={{
              display: "flex",
              width: "350px",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Total Produtos
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {homeData?.totalProducts || 0}
                </Typography>
                <InventoryIcon fontSize="large" />
              </Box>
            </CardContent>
          </Card>

          {/* Total Entries */}
          <Card
            sx={{
              display: "flex",
              width: "350px",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Total Entradas
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {homeData?.totalEntries || 0}
                </Typography>
                <CallReceivedIcon fontSize="large" />
              </Box>
            </CardContent>
          </Card>

          {/* Total Exits */}
          <Card
            sx={{
              display: "flex",
              width: "350px",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Total Saídas
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {homeData?.totalExits || 0}
                </Typography>
                <CallMadeIcon fontSize="large" />
              </Box>
            </CardContent>
          </Card>

          {/* Total Products Low Stock */}
          <Card
            sx={{
              display: "flex",
              width: "350px",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Total de Produtos com Baixo Estoque
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {homeData?.totalProductsLowStock || 0}
                </Typography>
                <TrendingDownIcon fontSize="large" />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
