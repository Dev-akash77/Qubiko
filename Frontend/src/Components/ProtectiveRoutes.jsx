import Ract, { useEffect } from "react";
import { useStore } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const ProtectiveRoutes = ({ children }) => {
  const { token,setislogin } = useStore();
  const navigate = useNavigate();

  //   ! if token rae not found then redirect auth page
  useEffect(() => {
    if (!token) {
      setislogin("Login")
      navigate("/auth");
    }
  }, [token, navigate]);

  return children;
};

export default ProtectiveRoutes;
