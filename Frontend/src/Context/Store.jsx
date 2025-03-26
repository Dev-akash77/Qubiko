import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../Api/Api";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  // ! is login or signup
  const [islogin, setislogin] = useState();
  // ! login and signup from data
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ! here is auth token
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || false
  );
  
  useEffect(()=>{
    localStorage.setItem("token",JSON.stringify(token));
  },[token])
  // !!!!!!!!!!!!!!! here is all the tanstack query start
  const {
    data: loginData,
    refetch: loginRefetch,
    isLoading: loginLoading,
  } = useQuery({
    queryKey: ["login"],
    queryFn: () => loginApi(fromData),
    enabled: false,
  });
  // !!!!!!!!!!!!!!!!! here is all the tanstack query end

  // ! changes handle fromdata function
  const handleFromdata = (e) => {
    const { value, name } = e.target;
    setFromData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // ! handle user authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      // ! signup
      if (islogin === "Sign up") {
        const data = await registerApi(fromData);
        if (data?.success) {
          toast.success(data.message);
          setFromData({ name: "", email: "", password: "" });
          setislogin("Login");
        }
      }

      if (islogin === "Login") {
        loginRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginData?.success) {
      toast.success(loginData.message);
      setToken(loginData.token);
      setFromData({ name: "", email: "", password: "" });
    }
  }, [loginData]);

  return (
    <StoreContext.Provider
      value={{
        islogin, // ! is login or signup
        setislogin, // ! set value is sign up or login
        handleFromdata, // ! change the bfrom data function
        handleAuth, // ! handle authenticatoin
        fromData, // ! here is all the auth from data
        loginLoading, // ! login Loding
        token, // ! here is authorization token
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
