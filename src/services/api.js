import axios from "axios";

const api = axios.create({
  baseURL: process.env.URL_BASE,
});

export default api;
