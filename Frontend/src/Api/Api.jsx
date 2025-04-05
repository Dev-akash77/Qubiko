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
    console.log("userProfile Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for get History
export const UserHistory = async (token) => {
  try {
    const { data } = await api.get("/user/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log("UserHistory Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for delete History
export const deleteHistory = async (token, chatId) => {
  try {
    const { data } = await api.post(
      "/user/history-delete",
      { chatId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log("UserHistory Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for delete All History
export const deleteAllHistory = async (token) => {
  try {
    const { data } = await api.post(
      "/user/history-delete-all",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log("deleteAllHistory Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for Edit Profile 
export const EditFrofile = async (token,fromdata) => {
  try {
    const { data } = await api.post(
      "/user/profile-update",
      fromdata,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log("deleteAllHistory Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for  register_otp
export const register_otp = async (token,email) => {
  try {
    const { data } = await api.post(
      "/user/register-otp",
      email,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log("register_otp Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for  verify_otp
export const verify_otp = async (token,otp) => {
  try {
    const { data } = await api.post(
      "/user/verify-otp",
      otp,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log("verify_otp Api error", error);
    toast.error(error.response.data.message);
  }
};

// ! api Call for  reset_password
export const reset_password = async (token,password) => {
  try {
    const { data } = await api.post(
      "/user/reset-password",
      password,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log("reset_password Api error", error);
    toast.error(error.response.data.message);
  }
};
