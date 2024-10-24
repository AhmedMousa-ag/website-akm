import { Header } from "./components/Header/Header";
import { LoadingBouncer } from "./components/Loading";
import { HomePage } from "./pages/Home/Home";

function App() {
  return (
    <>
      <Header />
      <HomePage className="bg-black font-poppins text-white h-screen text-center text-3xl">
        {/* <p>Hi my Name is Ahmed</p> */}
        <LoadingBouncer />
      </HomePage>
    </>
  );
}

export default App;
