import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Game1Page, Game2Page, Main } from "./pages";

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
        <Game1Page />
      </React.Suspense>
    ),
  },
  {
    path: "game-2",
    element: (
      <React.Suspense>
        <Game2Page />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
