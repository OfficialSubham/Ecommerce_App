import { useRecoilValue } from "recoil";
import CartComponent from "../components/CartComponent";
import { cartState } from "../atoms/cartAtom";

const Cart = () => {
  const cart = useRecoilValue(cartState);
  return (
    <div className="min-h-screen flex justify-center  w-full bg-(--primary) inset-0">
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
    </div>
  );
};

export default Cart;
