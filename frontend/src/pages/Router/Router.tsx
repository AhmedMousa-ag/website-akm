import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../Home/Home";
import { ErrorElement } from "../../components/ErrorElement";
import { Suspense } from "react";
import { LoadingBouncer } from "../../components/Loading";
import { RootLayout } from "./Root";
import { BasePage } from "../../components/BasePage";
import { Login } from "../Home/Login";
import { HistoryPage } from "../History/History";

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
              <p className="opacity-100">Home Page....</p>
            </HomePage>
          </Suspense>
        ),
      },
      {
        path: "history",
        element: <HistoryPage />,
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
        element: <Login />,
      },
    ],
  },
]);
