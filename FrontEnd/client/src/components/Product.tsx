import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addedToCartState, cartState } from "../atoms/cartAtom";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { currentProduct, productState } from "../atoms/productAtom";

interface IProps {
  id: number;
  imgUrl: string;
  price: number;
  productName: string;
}

const Product = ({ imgUrl, price, productName, id }: IProps) => {
  const [cart, setCart] = useRecoilState(cartState);
  const setAddToCartState = useSetRecoilState(addedToCartState);
  const navigate = useNavigate();
  // let timeOutId: number;
  const timeoutRef = useRef<number | null>(null);
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let isMoreThanFive = false;
    setAddToCartState(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setAddToCartState(false);
    }, 1000);

    const isThere = cart.find((eachItem) => {
      if (eachItem.productId == id) {
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
          if (eachItem.productId == id) {
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
          productId: id,
          price,
          url: imgUrl,
          productName,
          quantity: 1,
        })
      );
    }
  };
  const allProduct = useRecoilValue(productState);
  const setCurrentProduct = useSetRecoilState(currentProduct);
  const handleProduct = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const uid = Number(e.currentTarget.dataset.productUid);
    navigate(`${uid}`);
    const product = allProduct.find((pro) => {
      if (pro.product_id == uid) return pro;
    });
    if (product != undefined) setCurrentProduct(product);
    console.log(uid);
  };

  useEffect(() => {
    localStorage.setItem("prevCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div
      className="min-w-[300px] max-w-[300px] flex-1 shrink-0 flex gap-3 flex-col h-[400px]"
      data-product-uid={id}
      onClick={handleProduct}
    >
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
        <button
          className="bg-(--primary-button) rounded-2xl h-10 px-3 py-2.5 flex items-center hover:border duration-150 transition-transform "
          onClick={handleAddToCart}
        >
          <div className="h-full ">
            <img
              src="./svg/arrow.svg"
              className="object-cover h-full"
              alt="alt"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Product;
