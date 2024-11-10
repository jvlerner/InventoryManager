"use client"

import axios from "axios";

const api = axios.create({
  baseURL: "http://api:8080", 
  timeout: 15000,
  timeoutErrorMessage: "Timeout of basic-inventory-api, time waiting: 15 seconds"
});

export default api;
