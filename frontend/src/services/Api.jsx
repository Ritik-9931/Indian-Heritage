import axios from "axios";

const Api = axios.create({
  baseURL: "https://indian-heritage-fj4y.onrender.com/api",
});

export default Api;
