// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/", // URL API FIX ENV API_URL
  timeout: 10000, // 10 sec
  headers: {
    "Content-Type": "application/json", // Tipo de conteúdo padrão
  },
});

export default axiosInstance;
