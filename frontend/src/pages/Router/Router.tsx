import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../Home/Home";
import { ErrorElement } from "../../components/ErrorElement";
import { Suspense } from "react";
import { LoadingBouncer } from "../../components/Loading";
import { RootLayout } from "./Root";
import { BasePage } from "../../components/BasePage";
import { Login } from "../Home/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorElement errorMessage="Page Not Found 404" />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <BasePage>
                <LoadingBouncer />
              </BasePage>
            }
          >
            <HomePage>
              <p>Home Page....</p>
            </HomePage>
          </Suspense>
        ),
      },
      {
        path: "github",
        Component: () => {
          window.location.href = "https://github.com/AhmedMousa-ag";
          return (
            <BasePage>
              <LoadingBouncer />
            </BasePage>
          );
        },
      },
      {
        path: "linkedIn",
        Component: () => {
          window.location.href = "https://www.linkedin.com/in/akmousa/";
          return (
            <BasePage>
              <LoadingBouncer />
            </BasePage>
          );
        },
      },
      {
        path: "login_akm",
        element: (
          <BasePage>
            <Login />
          </BasePage>
        ),
      },
    ],
  },
]);
