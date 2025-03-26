import Ract, { useEffect } from "react";
import { useStore } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const ProtectiveRoutes = ({ children }) => {
  const { token } = useStore();
  const navigate = useNavigate();

  //   ! if token rae not found then redirect auth page
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  return children;
};

export default ProtectiveRoutes;
