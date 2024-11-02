"use client"

import axios from "axios";

const api = axios.create({
  baseURL: "process.env.NEXT_PUBLIC_API_URL",
  timeout: 15000,
  timeoutErrorMessage: "Timeout of basic-inventory-api, time waiting: 15 seconds"
});

console.log(process.env.NEXT_PUBLIC_API_URL)

api.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

export default api;
