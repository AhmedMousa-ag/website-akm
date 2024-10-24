import { Header } from "./components/Header/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/Router";
function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
