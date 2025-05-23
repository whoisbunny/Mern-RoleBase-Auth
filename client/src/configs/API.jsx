import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("TOKEN")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")} `;
  }
  return req;
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject(errorMessage);
  }
);

export default API;
