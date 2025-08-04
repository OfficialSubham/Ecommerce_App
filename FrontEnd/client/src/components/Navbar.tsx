import { useNavigate } from "react-router";
import Menu from "./Menu";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { totalProduct } from "../atoms/cartAtom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartQuantityValue = useRecoilValue(totalProduct);
  return (
    <div className="font-[Buster] flex top-0 sticky min-w-screen justify-between px-10 py-5 h-24 z-10 text-2xl bg-(--primary) text-(--primary-color) shadow">
      <div
        className="flex gap-2 items-center h-full justify-center"
        onClick={() => {
          setIsMenuOpen((pre) => !pre);
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="w-7 h-1 bg-black"></span>
          <span className="w-7 h-1 bg-black"></span>
          <span className="w-7 h-1 bg-black"></span>
        </div>
      </div>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div
        className="flex gap-2 bg-(--secondary) px-4 min-w-30 items-center h-full justify-center rounded-3xl cursor-pointer"
        onClick={() => {
          navigate("/cart");
        }}
      >
        CART
        <div className="w-full">
          ( {cartQuantityValue < 100 ? cartQuantityValue : "99+"} )
        </div>
      </div>
    </div>
  );
};

export default Navbar;
