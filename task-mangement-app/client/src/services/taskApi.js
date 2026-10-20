import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:8082/api",
});

taskApi.interceptors.request.use((config) => {
  const storedAuth = JSON.parse(
    localStorage.getItem("taskflow-auth") || "null",
  );

  const token = storedAuth?.state?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default taskApi;
