import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartAtom";

interface IProps {
  id: number;
  imgUrl: string;
  price: number;
  productName: string;
}

const Product = ({ imgUrl, price, productName, id }: IProps) => {
  const [cart, setCart] = useRecoilState(cartState);
  const handleAddToCart = () => {
    let isMoreThanFive = false;
    const isThere = cart.find((eachItem) => {
      if(eachItem.id == id) {
        if(eachItem.quantity < 5) {
          return true;
        }
        else {
          isMoreThanFive =  true;
        }
      }
    });

    if(isMoreThanFive) {
      return alert("Not more than 5 items")
    }

    if (isThere) {
      setCart((currentCart) => {
        return currentCart.map((eachItem) => {
          if (eachItem.id == id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + 1,
            };
          }
          return eachItem;
        });
      });
    } else {
      setCart((cart) =>
        cart.concat({
          id,
          price,
          imgUrl,
          name: productName,
          quantity: 1,
        })
      );
    }
  };
  return (
    <div className="w-full flex gap-3 flex-col h-[400px]">
      <div className="w-full h-3/4">
        <img
          src={`${imgUrl}`}
          className="w-full h-full object-cover rounded-3xl"
          alt="Product"
        />
      </div>
      <div className="flex-1 flex justify-between items-center px-2">
        <div className="text-sm font-[Amagro]">
          <h4>{productName}</h4>
          <h3>&#8377; {Number(price) / 100}.00 </h3>
        </div>
        <div className="bg-(--primary-button) rounded-2xl h-10 px-3 py-2.5 flex items-center">
          <button className="h-full" onClick={handleAddToCart}>
            <img
              src="./svg/arrow.svg"
              className="object-cover h-full"
              alt="alt"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
