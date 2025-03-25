import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    // ! is login or signup
  const [islogin, setislogin] = useState();

  

  return (
    <StoreContext.Provider value={{ islogin, setislogin }}>
      {children}
    </StoreContext.Provider>
  );

};

export const useStore = () => useContext(StoreContext);
