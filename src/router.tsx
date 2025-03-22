import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Challenge, Main } from "./pages";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <React.Suspense>
        <Main />
      </React.Suspense>
    ),
  },
  {
    path: "game-1",
    element: (
      <React.Suspense>
        <Challenge />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
