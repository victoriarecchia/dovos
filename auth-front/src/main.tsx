import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Profile from "./routes/Profile.tsx";
import "./index.css";
import Info from "./routes/Info.tsx";
import Donantes  from "./routes/Donantes.tsx";
import EditProfile from "./routes/EditProfile.tsx";
import Receptores from "./routes/Receptores.tsx";
import Politica from "./routes/Politica.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/politica",
    element: <Politica/>,
  },
  // Rutas protegidas
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/me",
        element: <EditProfile />,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },

      {
        path: "/donantes",
        element: <Donantes />,
      },
      {
        path: "/receptores",
        element: <Receptores />,
      },
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
