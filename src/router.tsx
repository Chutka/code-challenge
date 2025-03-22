import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components";
import { Challenge, Main } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense>
            <Main />
          </React.Suspense>
        ),
      },
      {
        path: "challenge",
        element: (
          <React.Suspense>
            <Challenge />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
