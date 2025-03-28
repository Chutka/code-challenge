import { lazy } from "react";

export * from "./Main";
export const Game1Page = lazy(() => import("./Game1Page"));
export const Game2Page = lazy(() => import("./Game2Page"));
