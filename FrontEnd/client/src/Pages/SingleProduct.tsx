import { useRef } from "react";
import { addedToCartState, cartState } from "../atoms/cartAtom";
import { currentProduct } from "../atoms/productAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Size from "../components/Size";

const SingleProduct = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const setAddToCartState = useSetRecoilState(addedToCartState);
  const currentProductState = useRecoilValue(currentProduct);
  const timeoutRef = useRef<number | null>(null);
  const handleAddToCart = () => {
    if (!currentProductState) return;
    let isMoreThanFive = false;
    setAddToCartState(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setAddToCartState(false);
    }, 1000);

    const isThere = cart.find((eachItem) => {
      if (eachItem.productId == currentProductState?.product_id) {
        if (eachItem.quantity < 5) {
          return true;
        } else {
          isMoreThanFive = true;
        }
      }
    });

    if (isMoreThanFive) {
      return alert("Not more than 5 items");
    }

    if (isThere) {
      setCart((currentCart) => {
        return currentCart.map((eachItem) => {
          if (eachItem.productId == currentProductState?.product_id) {
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
        cart.concat([
          {
            productId: Number(currentProductState.product_id),
            price: currentProductState.price ?? 0,
            url: currentProductState.Images[0]?.imageUrl ?? "",
            productName: currentProductState.product_name ?? "Unknown Product",
            quantity: 1,
          },
        ])
      );
    }
  };

  return (
    currentProductState && (
      <div className="w-full items-center min-h-[78vh] gap-4 md:flex-row flex-col flex px-10 mt-5">
        <div className="min-w-[40%] h-[500px]">
          <img
            src={`${currentProductState?.Images[0].imageUrl}`}
            alt=""
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="w-full font-[Buster] gap-7 p-4 flex flex-col justify-evenly">
          <h1 className="text-2xl">{currentProductState?.product_name}</h1>
          <h1>Price : {currentProductState?.price / 100}.00</h1>
          <div className="w-full h-[200px] overflow-y-scroll no-scrollbar">
            Product Description :
          <p className="whitespace-pre-line pl-3">{currentProductState?.product_description}</p>

          </div>
          <div>
            <h1>Sizes Availabe : </h1>
            <div className="flex gap-3">

            {currentProductState.productSize.map(({ size }) => {
              return <Size sz={size} />;
            })}
            </div>
          </div>
          <div className=" rounded-2xl h-10 flex md:justify-start justify-center items-center">
            <button
              className="h-full w-40 bg-(--primary-button) px-3 py-2.5  hover:border rounded-2xl duration-150 transition-transform"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SingleProduct;
