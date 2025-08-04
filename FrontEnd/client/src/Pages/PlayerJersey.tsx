import { useRecoilValue } from "recoil";
import { playerVersionState } from "../atoms/productAtom";
import Product from "../components/Product";

interface IImage {
  imageUrl: string;
}

const PlayerJersey = () => {
  const playerProduct = useRecoilValue(playerVersionState);
  return (
    <div className="w-[70vw] min-h-[78vh] flex justify-center mt-5">
      <div className="grid md:grid-cols-2 gap-4 xl:grid-cols-3">
        {playerProduct.length > 0 &&
          playerProduct.map(
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
    </div>
  );
};

export default PlayerJersey;
