import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../Home/Home";
import { ErrorElement } from "../../components/ErrorElement";
import { Suspense } from "react";
import { LoadingBouncer } from "../../components/Loading";
import { RootLayout } from "./Root";
import { BasePage } from "../../components/BasePage";

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
            <HomePage />
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
    ],
  },
]);
