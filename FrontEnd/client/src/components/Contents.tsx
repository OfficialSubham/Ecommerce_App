import Product from "./Product";
import { useRecoilValueLoadable } from "recoil";
import { productState } from "../atoms/productAtom";

interface IImage {
  imageUrl: string;
}

const Contents = () => {
  const productsLoadable = useRecoilValueLoadable(productState);

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  return (
    <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 ">
      {productsLoadable.contents[0] &&
        productsLoadable.contents.map(
          ({
            product_id,
            Images,
            price,
            product_name,
          }: {
            product_id: number;
            price: number;
            product_name: string;
            Images: IImage[];
          }) => {
            // console.log(Images);
            return (
              <Product
                key={product_id}
                id={product_id}
                imgUrl={Images[0].imageUrl}
                price={price}
                productName={product_name}
              />
            );
          }
        )}
    </div>
  );
};

export default Contents;
