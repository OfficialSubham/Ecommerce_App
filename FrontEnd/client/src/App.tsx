import { Route, BrowserRouter as Router, Routes } from "react-router";
import CenterImage from "./components/CenterImage";
import Contents from "./components/Contents";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import { useRecoilValueLoadable } from "recoil";
import { productState } from "./atoms/productAtom";

function App() {
  const productsLoadable = useRecoilValueLoadable(productState);

  return (
    <div className="flex min-h-screen flex-col bg-(--primary)">
      <Router>
        <Navbar />
        <Routes>
          <Route
            element={
              <div>
                <CenterImage />
                {productsLoadable.contents[0] ? (
                  <Contents />
                ) : (
                  <div className="w-full h-screen flex justify-center items-center font-[Buster]">
                    Currently There is Nothing to show
                  </div>
                )}
              </div>
            }
            path="/"
          />
          <Route element={<Cart />} path="/cart" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
