import { Route, BrowserRouter as Router, Routes } from "react-router";
import CenterImage from "./components/CenterImage";
import Contents from "./components/Contents";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import { useRecoilValueLoadable } from "recoil";
import { productState } from "./atoms/productAtom";
import Loading from "./components/Loading";

function App() {
  const productsLoadable = useRecoilValueLoadable(productState);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          
          <Route
            element={
              <div className="min-h-screen w-[100vw] bg-(--primary) items-center justify-center flex flex-col">
                {productsLoadable.contents[0] ? (
                  <>
                    <CenterImage />
                    <Contents />
                  </>
                ) : (
                  <Loading />
                )}
              </div>
            }
            path="/"
          />
          <Route element={<Cart />} path="/cart" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
