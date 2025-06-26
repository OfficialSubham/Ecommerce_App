import { useSetRecoilState } from "recoil";
import { cartState } from "../atoms/cartAtom";

interface CartProps {
  url: string;
  price: number;
  quantity: number;
  id: number;
  name: string;
}

const CartComponent = ({ url, price, quantity, id, name }: CartProps) => {
  const setCart = useSetRecoilState(cartState);
  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCart((cart) => {
      return cart.map((item) => {
        if (item.id == id) {
         return {
            ...item,
            quantity:  Number(e.target.value)
         }
        }
        return item;
      });
    });
  };

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
        <h3 className="bg-amber-200">Price : {(price / 100) * quantity}.00</h3>
      </div>
    </div>
  );
};

export default CartComponent;
