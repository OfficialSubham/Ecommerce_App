import Product from "./Product";
import { useRecoilValue } from "recoil";
import { normalVersionState, playerVersionState } from "../atoms/productAtom";
import { useNavigate } from "react-router";

interface IImage {
  imageUrl: string;
}

const Contents = () => {
  const normalProduct = useRecoilValue(normalVersionState);
  const playerProduct = useRecoilValue(playerVersionState);
  const navigate = useNavigate();
  const handleViewAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    const route = e.currentTarget.dataset.productVersion;
    if (route == "normalV") navigate("/normalversion");
    else navigate("/playerversion");
  };
  return (
    <div className="w-full">
      <div className="w-full h-[500px] flex flex-col">
        <div className="flex justify-between font-[Buster] text-xl">
          <h1>Player Versions</h1>
          <span
            className="border flex items-center justify-center px-2 py-1 rounded-2xl hover:underline"
            data-product-version="playerV"
            onClick={handleViewAll}
          >
            View All
          </span>
        </div>
        <div className="w-full flex h-full overflow-x-scroll justify-start items-center no-scrollbar gap-4">
          {playerProduct.length > 0 &&
            playerProduct
              .slice(0, 4)
              .map(
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
          {playerProduct.length > 2 && (
            <div className="min-w-30 mr-3">
              <button
                className="px-4 py-2 w-full bg-black text-white rounded hover:bg-gray-800 transition"
                data-product-version="playerV"
                onClick={handleViewAll}
              >
                View All
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[500px] flex flex-col">
        <div className="flex justify-between font-[Buster] text-xl">
          <h1>Normal Versions</h1>
          <span
            className="border flex items-center justify-center px-2 py-1 rounded-2xl hover:underline"
            data-product-version="normalV"
            onClick={handleViewAll}
          >
            View All
          </span>
        </div>
        <div className="w-full flex h-full overflow-x-scroll justify-start items-center no-scrollbar gap-4">
          {normalProduct.length > 0 &&
            normalProduct
              ?.slice(0, 4)
              .map(
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
          {normalProduct.length > 2 && (
            <div className="min-w-30 mr-3">
              <button
                className="px-4 py-2 w-full bg-black text-white rounded hover:bg-gray-800 transition"
                data-product-version="normalV"
                onClick={handleViewAll}
              >
                View All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contents;
