import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Welcome from "./Pages/Welcome";
import Assistent from "./Pages/Assistent";
import Account from "./Pages/Account";
import History from "./Pages/History";
import Login_Signup from "./Authentication/Login_Signup";
import { StoreContextProvider } from "./Context/Store";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "assistent",
          element: <Assistent />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Login_Signup />,
    },
  ]);
  return (
    <StoreContextProvider>
      <RouterProvider router={router}></RouterProvider>{" "}
    </StoreContextProvider>
  );
};

export default App;
