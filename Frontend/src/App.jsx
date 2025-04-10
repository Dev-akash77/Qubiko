import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import Layout from "./Components/Layout";
import Welcome from "./Pages/Welcome";
import Assistent from "./Pages/Assistent";
import Account from "./Pages/Account";
import History from "./Pages/History";
import Login_Signup from "./Authentication/Login_Signup";
import { StoreContextProvider } from "./Context/Store";
import ProtectiveRoutes from "./Components/ProtectiveRoutes";
import Chat from "./Pages/Chat";
import { SocketProvider } from "./Context/Socket";
import ChatStart from "./Pages/ChatStart";
import Personal from "./Pages/Personal";
import Security from "./Pages/Security";
import ChangePassword from "./UI/ChangePassword";
import Pro from './Pages/Pro';
import Contact from "./Pages/Contact";
import About from "./Pages/About";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Login_Signup />,
    },

    {
      path: "/chat/:chatId",
      element: (
        <ProtectiveRoutes>
          <Chat />
        </ProtectiveRoutes>
      ),
    },
    {
      path: "/chat",
      element: (
        <ProtectiveRoutes>
          <ChatStart />
        </ProtectiveRoutes>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectiveRoutes>
          <Layout />
        </ProtectiveRoutes>
      ),
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
      path: "personal",
      element: <Personal />,
    },
    {
      path: "security",
      element: <Security />,
    },
    {
      path: "pro",
      element: <Pro />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "changePassword",
      element: (
        <ProtectiveRoutes>
          <ChangePassword />
        </ProtectiveRoutes>
      )
    },
  ]);

  // ! query client from tanstack/react query
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContextProvider>
        <SocketProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer
            position="top-right"
            transition={Bounce}
            className="my_custom_toast"
          />
        </SocketProvider>
      </StoreContextProvider>
    </QueryClientProvider>
  );
};

export default App;
