import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import EachProduct from "../utils/EachProduct";
import EditProduct from "../utils/EditProduct";
import { productState } from "../atoms/productAtom";
import Loading from "../utils/Loading";
import { loadingState } from "../atoms/loadingAtom";

const ProductList = () => {
  const productLoadable = useRecoilValueLoadable(productState);
  const isLoading = useRecoilValue(loadingState);
  if (productLoadable.state === "loading") {
    return <Loading />;
  } else if (productLoadable.state === "hasError") {
    return <div>Something went wrong loading products.</div>;
  }
  const entireProduct = productLoadable.contents;
  return (
    <>
      {isLoading && <Loading />}
      <EditProduct />
      <div className="w-screen min-h-screen bg-slate-700 flex flex-col px-5 py-2 gap-4">
        <div className="w-full">
          <h1 className="font-[buster] text-3xl text-(--primary-color)">
            Player Version
          </h1>
          <div className="w-full h-[550px] overflow-x-scroll bg-black md:justify-start p-2 items-center flex gap-3 no-scrollbar rounded-2xl">
            {entireProduct
              ?.filter((eachProduct) => eachProduct.category == "playerV")
              .map((prduct) => (
                <EachProduct
                  key={prduct.product_id}
                  product_id={prduct.product_id}
                  Images={prduct.Images}
                  price={prduct.price}
                  product_description={prduct.product_description}
                  product_name={prduct.product_name}
                  product_sizes={prduct.product_sizes}
                  category={prduct.category}
                />
              ))}
          </div>
        </div>
        <div className="w-full">
          <h1 className="font-[buster] text-3xl text-(--primary-color)">
            Normal Version
          </h1>
          <div className="w-full h-[550px] overflow-x-scroll bg-black md:justify-start p-2 items-center flex gap-3 no-scrollbar rounded-2xl">
            {entireProduct
              ?.filter((eachProduct) => eachProduct.category == "normalV")
              .map((prduct) => (
                <EachProduct
                  key={prduct.product_id}
                  product_id={prduct.product_id}
                  Images={prduct.Images}
                  price={prduct.price}
                  product_description={prduct.product_description}
                  product_name={prduct.product_name}
                  product_sizes={prduct.product_sizes}
                  category={prduct.category}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
