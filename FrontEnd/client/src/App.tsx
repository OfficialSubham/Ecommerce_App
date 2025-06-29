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
    <div className="flex min-h-screen flex-col bg-(--primary)">
      <Router>
        <Navbar />
        <Routes>
          <Route
            element={
              productsLoadable.contents[0] ? (
                <div>
                  <CenterImage />
                  <Contents />
                </div>
              ) : (
                <div className="w-full h-screen flex justify-center items-center">
                  <Loading />
                </div>
              )
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
