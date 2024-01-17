import axios from "axios";
import router from "@/router";

const instance = axios.create();

const token = localStorage.getItem("jwt-token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response == null ? 0 : error.response.status;
    if (status === 401) {
      alert("Unauthorized: Your session has expired. Please Log-in again.");
      const token = localStorage.getItem("jwt-token");
      if (token) {
        localStorage.removeItem("jwt-token");
      }
      instance.defaults.headers.common["Authorization"] = "";

      router.push("/login").catch(() => {});
      return Promise.reject(error);
    }
    alert(`An error occurred: ${error.message}`);
    return Promise.reject(error);
  }
);

export default instance;
