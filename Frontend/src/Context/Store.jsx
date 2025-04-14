import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, registerApi, UserHistory, userProfile } from "../Api/Api";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  // ! header for qubiko
  const [heading, setheading] = useState({
    name: "Qubiko AI",
    logo: true,
    search: false,
  });
  // !delete notification
  const [deleteNotification, setDeleteNotification] = useState({
    heading: "",
    content: "",
    action: "",
    onConfirm: null,
  });

  // ! isopeen dm
  const [isOpenDeleteMessage, setisOpenDeleteMessage] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // ! chat id
  const [chatID, setChatID] = useState("");
  // ! is login or signup
  const [islogin, setislogin] = useState();
  // ! login and signup from data
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [searchInput, setsearchInput] = useState("");
  // !signup loader
  const [signLoader, setSignLoader] = useState(false)
  // ! here is auth token
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || false
  );

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);
  // !!!!!!!!!!!!!!! here is all the tanstack query start
  const {
    //! login react query
    data: loginData,
    refetch: loginRefetch,
    isLoading: loginLoading,
  } = useQuery({
    queryKey: ["login"],
    queryFn: () => loginApi(fromData),
    enabled: false,
  });

  // ! user profile react querys
  const {
    data: profileData,
    refetch: profileRefetch,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userProfile(token),
    enabled: !!token,
  });

  // ! user history react query
  const {
    data: historyData,
    refetch: historyRefetch,
    isLoading: historyLoading,
  } = useQuery({
    queryKey: ["history"],
    queryFn: () => UserHistory(token),
    enabled: !!token,
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
    setSignLoader(true)
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
    } finally {
      setSignLoader(false)
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
        setToken, //! token set
        heading, //! header heading
        setheading, //! header heading
        profileData, //! profile data
        profileLoading, //! profilrLoading
        profileRefetch, //! profile refetch
        chatID, //! chat id
        setChatID, //! chat id
        historyData, //! get history data
        historyRefetch, //! history refetch
        historyLoading, //! history loading
        isSearchOpen, //! is serach open
        setIsSearchOpen, //! set search open value
        searchInput, //! search input data
        setsearchInput, //! search input data set
        deleteNotification, //! delete notification
        setDeleteNotification, //! delete notification
        isOpenDeleteMessage, //! isopen Delete
        setisOpenDeleteMessage, //! isopen Delete
        signLoader,//! singup loader
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
