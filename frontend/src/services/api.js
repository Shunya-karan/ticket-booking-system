import axios from "axios";
import { getTokenFromLS } from "../utils/authtokens";

const api = axios.create({
  baseURL: "https://busbuddy-pgec.onrender.com/api",
  withCredentials: true,
});


// 🔥 Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = getTokenFromLS();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
