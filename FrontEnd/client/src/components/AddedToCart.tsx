import { useRecoilValue } from "recoil";
import { addedToCartState } from "../atoms/cartAtom";

const AddedToCart = () => {
    const addedToCart = useRecoilValue(addedToCartState)
  return (
    
    <div className=" fixed right-5 px-5 py-3 rounded-2xl bottom-10 bg-(--secondary) flex items-center z-10 justify-center" style={{
        translate: addedToCart ? "0%" : "120%",
        transition: "translate 0.3s ease-in-out",
    }}>
        Added to cart &#9989;
    </div>
  );
};

export default AddedToCart;
