import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./Home/Home";
import { ErrorElement } from "../components/ErrorElement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorElement errorMessage="Page Not Found 404" />,
  },
]);
