import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartAtom";
import { useEffect } from "react";

interface CartProps {
  url: string;
  price: number;
  quantity: number;
  id: number;
  name: string;
}

const CartComponent = ({ url, price, quantity, id, name }: CartProps) => {
  const [cart, setCart] = useRecoilState(cartState);
  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCart((cart) => {
      return cart.map((item) => {
        if (item.productId == id) {
          return {
            ...item,
            quantity: Number(e.target.value),
          };
        }
        return item;
      });
    });
  };

  const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = Number(e.currentTarget.dataset.productId);
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.productId !== productId);

      if (newCart.length === 0) {
        localStorage.removeItem("prevCart");
      }

      return newCart;
    });
  };

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("prevCart");
    } else {
      localStorage.setItem("prevCart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="w-full h-36 flex p-2 gap-3 rounded-2xl border">
      <div className="h-full w-36">
        <img
          className="object-cover h-full rounded-2xl w-full"
          src={`${url}`}
          alt=""
        />
      </div>
      <div className="flex-1 px-2 grid grid-rows-4 font-[Amagro] gap-4">
        <h1 className="row-span-2 items-center flex">
          {name.length > 30 ? `${name.substring(0, 8)}...` : name}
        </h1>
        <select
          className="w-30 h-full "
          value={quantity}
          onChange={handleClick}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <h3 className="">Price : {(price / 100) * quantity}.00</h3>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="p-2 bg-red-500 rounded-xl text-white cursor-pointer font-[Buster]"
          data-product-id={id}
          onClick={handleDeleteFromCart}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
