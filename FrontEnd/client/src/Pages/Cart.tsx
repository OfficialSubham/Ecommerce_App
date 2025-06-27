import { useRecoilValue } from "recoil";
import CartComponent from "../components/CartComponent";
import { cartState, totalPrice } from "../atoms/cartAtom";
import { useState } from "react";
import OrderDetails from "../components/OrderDetails";

const Cart = () => {
  const cart = useRecoilValue(cartState);
  const total = useRecoilValue(totalPrice);
  const [inPurchase, setInPurchase] = useState(false);
  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center  w-full bg-(--primary) inset-0">
      {inPurchase && <OrderDetails/>}
      <div className="w-full sm:w[40vw] md:w-[50vw] bg-(--primary) flex flex-col gap-5 px-5 pt-5">
        {cart.map(({ id, imgUrl, name, price, quantity }) => {
          return (
            <CartComponent
              id={id}
              name={name}
              key={id}
              url={imgUrl}
              price={price}
              quantity={quantity}
            />
          );
        })}
      </div>
      <div className="fixed bottom-2 py-4 px-8 w-sm items-center bg-(--secondary) rounded-2xl flex justify-between z-10">
        Total: ₹ {total}
        <button
          className="bg-(--primary-button) py-2 px-3 cursor-pointer rounded-2xl font-[Buster]"
          onClick={() => {
            setInPurchase(true);
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
