import {
  isEditingState,
  productToBeEditState,
} from "../atoms/isEditingAtom";
import {  useSetRecoilState } from "recoil";
import { type ActualProductType } from "../atoms/productAtom";

const EachProduct = ({
  product_id,
  Images,
  price,
  product_sizes,
  product_description,
  product_name,
}: ActualProductType) => {
  const setIsEditing = useSetRecoilState(isEditingState);
  const editProduct = useSetRecoilState(productToBeEditState);
  //Handle Clicks
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const product = e.target as HTMLElement;
    editProduct(Number(product.id));
    // setTimeout(() => {
    //   setEditingProduct(editingProductValue)
    // }, 0)
    
    // setEditingProduct(editingProductValue);
    console.log(product.id);
    setIsEditing(true);
  };
  const handleDeleteProduct = () => {
    const isConfirm = confirm("Are you sure you want to delete the product");

    if (!isConfirm) return;

    console.log(isConfirm);
  };

  return (
    <div className="h-full justify-around w-80 shrink-0 p-2 bg-gray-500 rounded-2xl flex gap-3 flex-col">
      <div className="w-full h-60 rounded-2xl">
        <img
          src={`${Images[0].imageUrl}`}
          alt=""
          className="w-full h-full rounded-2xl"
        />
      </div>
      <div className="w-full">
        <span className="font-bold">Name : </span>
        {product_name.length < 27
          ? product_name
          : `${product_name.slice(0, 14)}...`}
      </div>
      <div className="w-full">
        <span className="font-bold">Description : </span>
        {product_description.length < 27
          ? product_description
          : `${product_description.slice(0, 50)}...`}
      </div>
      <div className="w-full">
        <span className="font-bold">Price : </span>
        {price}/-
      </div>
      <div className="w-full flex items-center gap-2">
        <span className="font-bold">Sizes : </span>
        {Object.entries(product_sizes).map(([size, isAvailable]) => {
          if (!isAvailable) return null; // Skip sizes that are false

          return (
            <span
              className="bg-slate-900 px-2 py-1 rounded text-white"
              key={size}
            >
              {size}
            </span>
          );
        })}
      </div>
      <div className="w-full flex justify-between gap-3">
        <button
          className="w-full h-10 rounded-2xl text-white font-bold bg-green-500"
          onClick={handleOnClick}
          id={`${product_id}`}
        >
          Edit
        </button>
        <button
          className="w-full h-10 rounded-2xl text-white font-bold bg-red-500"
          onClick={handleDeleteProduct}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EachProduct;
