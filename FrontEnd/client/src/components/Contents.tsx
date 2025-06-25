import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

interface IImage {
  imageUrl: string;
  image_id: number;
}
interface IProduct {
  Images: IImage[];
  price: number;
  product_id: number;
  product_name: string;
}

interface iData {
  message: string;
  products: IProduct[];
}

const Contents = () => {
  const [productArray, setProductArray] = useState<IProduct[]>([]);
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const getAllProducts = async () => {
    const { status, data }: { status: number; data: iData } = await axios.get(
      `${BACKEND_URL}/product/bulk`
    );
    if (status == 200) {
      setProductArray(data.products);
    }
    console.log(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-full h-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 ">
      {productArray[0] &&
        productArray.map(({ product_id, Images, price, product_name }) => {
          // console.log(Images);
          return (
            <Product
              key={product_id}
              imgUrl={Images[0].imageUrl}
              price={price}
              productName={product_name}
            />
          );
        })}
    </div>
  );
};

export default Contents;
