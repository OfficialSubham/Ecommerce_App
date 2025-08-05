import { Route, BrowserRouter as Router, Routes } from "react-router";
import CenterImage from "./components/CenterImage";
import Contents from "./components/Contents";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { productState } from "./atoms/productAtom";
import Footer from "./components/Footer";
import AddedToCart from "./components/AddedToCart";
import NormalJersey from "./Pages/NormalJersey";
import PlayerJersey from "./Pages/PlayerJersey";
import CatchAllIdRoute from "./components/CatchAllIdRoute";
import { useEffect } from "react";
import { cartState, type UserCart } from "./atoms/cartAtom";
function App() {
  const productsLoadable = useRecoilValueLoadable(productState);
  const setCartState = useSetRecoilState(cartState);
  useEffect(() => {
    const prevCartString = localStorage.getItem("prevCart");
    if (!prevCartString) setCartState([]);
    else {
      const prevCartArray = JSON.parse(prevCartString) as UserCart[];
      setCartState(prevCartArray);
    }
  });

  return (
    <div className="flex min-h-screen min-w-screen items-center flex-col bg-(--primary)">
      <AddedToCart />
      <Router>
        <Navbar />
        <Routes>
          <Route
            element={
              <div className="w-[90vw] flex justify-center flex-col px-10">
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
          <Route element={<NormalJersey />} path="/normalversion" />
          <Route element={<PlayerJersey />} path="/playerversion" />
          <Route element={<CatchAllIdRoute />} path="*" />
        </Routes>

        <footer className="h-30 flex bottom-0 justify-center items-center bg-(--primary-color) text-white relative min-w-screen">
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
