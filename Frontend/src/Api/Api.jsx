import axios from "axios";
import { toast } from "react-toastify";

// !base url ---- backend ul
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// ! api call for register
export const registerApi = async (fromData) => {
  try {
    const { data } = await api.post("/user/register", fromData);
    return data;
  } catch (error) {
    console.log("registerApi error", error);
    toast.error(error.response.data.message);
  }
};

// ! api call for login user
export const loginApi = async (fromData) => {
  try {
    const { data } = await api.post("/user/login", fromData);
    return data;
  } catch (error) {
    console.log("loginApi error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for userprofile
export const userProfile = async (token) => {
  try {
    const { data } = await api.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log("loginApi error", error);
    toast.error(error.response.data.message);
  }
};
