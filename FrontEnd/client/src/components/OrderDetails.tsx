import { useState } from "react";
import { useRecoilState } from "recoil";
import { z } from "zod";
import { cartState } from "../atoms/cartAtom";
import Loading from "./Loading";
import axios from "axios";
const OrderDetails = ({
  setInPurchase,
}: {
  setInPurchase: (props: boolean) => void;
}) => {
  const [products, setProducts] = useRecoilState(cartState);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    number: "",
    address: "",
  });

  const productsSchema = z.object({
    url: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
    productName: z.string(),
    productId: z.number(),
  });

  const orderDetailsSchema = z.object({
    name: z.string().min(3),
    phone: z.string().regex(/^\d{10}$/, { message: "Enter a valid number" }),
    address: z.string().min(3),
    products: z.array(productsSchema),
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePurchase = async () => {
    if (products.length == 0) return alert("Add some products to your cart");
    const { success, error } = orderDetailsSchema.safeParse({
      name: userDetails.name,
      phone: userDetails.number,
      address: userDetails.address,
      products: products,
    });
    if (!success) {
      console.log(error);
      return alert("Enter valid credential");
    }
    setLoading(true);
    // console.log(userDetails);
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
    const res = await axios.post(`${BACKEND_URL}/purchase`, {
      name: userDetails.name,
      address: userDetails.address,
      phone: userDetails.number,
      products,
    });
    if(res.status != 200) return alert("Some error occured in backend please try again later")
    // console.log(res);

    setLoading(false);
    setInPurchase(false);
    alert("Order Placed Successfully");
    setProducts([]);
    localStorage.removeItem("prevCart");
  };

  return (
    <div className="flex items-center justify-center absolute z-20 h-[calc(100vh-6rem)] w-screen">
      <div className="h-full w-full relative bg-black opacity-40 z-10"></div>
      <div className="gap-5 shadow-2xl rounded-2xl absolute bg-(--primary) grid grid-row-5 z-20 px-3 py-5 w-auto min-w-[50vw]">
        {loading && (
          <div className="w-full h-full absolute z-30 flex items-center justify-center">
            <div className="w-full h-full bg-black opacity-25 rounded-2xl"></div>
            <div className="absolute">
              <Loading />
            </div>
          </div>
        )}
        <div
          className="relative bg-(--secondary) right-0 w-9 h-9 text-(--primary-color) text-center flex items-center font-[Buster] justify-center rounded-3xl"
          onClick={() => {
            setInPurchase(false);
          }}
        >
          X
        </div>
        <div className="w-full row-span-1 flex items-center gap-5">
          <h5 className="font-[Buster]">Name</h5>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleOnchange}
            className="bg-(--secondary) w-full h-10 rounded-2xl px-3"
          />
        </div>
        <div className="row-span-1 flex items-center gap-5">
          <h5 className="font-[Buster]">Phone No.</h5>
          <input
            type="text"
            name="number"
            value={userDetails.number}
            onChange={handleOnchange}
            className="bg-(--secondary) h-10 rounded-2xl w-full px-3"
          />
        </div>
        <div className="row-span-3">
          <h5 className="font-[Buster]">Address</h5>
          <input
            name="address"
            id=""
            value={userDetails.address}
            onChange={handleOnchange}
            className="bg-(--secondary) h-20 w-full rounded-2xl px-3"
          />
        </div>
        <button
          className="bg-(--primary-button) py-3 rounded-2xl font-[Buster] tracking-widest"
          onClick={handlePurchase}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
