import axios from "axios";

const api = axios.create({
  baseURL: "https://indian-heritage-fj4y.onrender.com/api",
});

export default api;
