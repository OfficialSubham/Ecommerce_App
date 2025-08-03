import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  derivedEditingProduct,
  editingProductState,
  productToBeEditState,
} from "../atoms/isEditingAtom";
import { useEffect, useState } from "react";
import Sizes from "./Sizes";
import { productState, type productCategory } from "../atoms/productAtom";
import { ProductSchema } from "../Pages/ImageUpload";
import Loading from "./Loading";
import axios from "axios";

const EditProduct = () => {

  //ENVs
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  // const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [editingProduct, setEditingProduct] =
    useRecoilState(editingProductState);
  const setProductToBeEdit = useSetRecoilState(productToBeEditState);
  const setProductState = useSetRecoilState(productState);
  const [isOnSizeSelection, setIsOnSizeSelection] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const editingProductValue = useRecoilValue(derivedEditingProduct);
  //Handle functions
  const handelSizeSelection = () => {
    setIsOnSizeSelection(!isOnSizeSelection);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingProduct((prev) => {
      if (!prev) return prev;
      const { name, value, type } = e.target;
      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  const handleEditProduct = async () => {
    const confirmRes = confirm("Are you sure you want to update changes");
    if (!confirmRes) return;
    if (!editingProduct?.product_sizes) return alert("Select Size Properly");
    const sizes = Object.entries(editingProduct?.product_sizes)
      .filter(([size, bool]) => bool && size)
      .map(([size]) => size);
    const { success, data } = ProductSchema.safeParse({
      productPrice: Number(editingProduct.price) * 100,
      productName: editingProduct.product_name,
      imageUrl: editingProduct.Images[0].imageUrl,
      productDescription: editingProduct.product_description,
      productCategory: editingProduct.category,
      productSize: sizes,
    });
    if (!success)
      return alert(
        "Hey please follow the minimum criteria of filling up the details"
      );
    setisLoading(true);
    const res = await axios.post(`${BACKEND_URL}/editProduct`, {
      body: {
        ...data,
        productId: editingProduct.product_id
      }
    })
    console.log(res);
    setProductState((pre) => {
      return pre.map((pro) => {
        if (pro.product_id == editingProduct.product_id) {
          return {
            Images: editingProduct.Images,
            price: Number(editingProduct.price),
            product_id: editingProduct.product_id,
            product_name: editingProduct.product_name,
            product_description: editingProduct.product_description,
            category: editingProduct.category,
            product_sizes: editingProduct.product_sizes,
          };
        }
        return pro;
      });
      
    })
    setEditingProduct(null);;
    setProductToBeEdit(null);
    setisLoading(false);
  };

  useEffect(() => {
    if (editingProductValue) {
      setEditingProduct(editingProductValue);
    }
  }, [editingProductValue, setEditingProduct]);

  return (
    editingProduct != null && (
      <>
        {isLoading && <Loading />}
        {editingProduct?.product_sizes && (
          <Sizes
            closeButton={setIsOnSizeSelection}
            isOpen={isOnSizeSelection}
            selectedSizes={editingProduct?.product_sizes}
            setSelectedSizes={(newSizes) => {
              setEditingProduct((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  product_sizes: newSizes,
                };
              });
            }}
          />
        )}
        <div className="min-w-screen min-h-screen fixed z-10 bg-black opacity-80"></div>
        <div className="w-screen min-h-screen flex items-center justify-center z-20 absolute">
          <div className="w-[80%] md:w-[50%] lg:w-[30%] h-auto bg-gray-600 z-20 p-5 rounded-2xl relative">
            <div className="w-full h-65">
              {editingProduct?.Images[0] && (
                <img
                  src={`${editingProduct?.Images[0].imageUrl}`}
                  alt=""
                  className="w-full h-full rounded-2xl"
                />
              )}
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <div className="w-full">
                <input
                  type="text"
                  className="bg-[#bfe0d1] border p-4 h-10 w-full"
                  multiple
                  onChange={handleOnChange}
                  value={editingProduct?.product_name}
                  name="product_name"
                  placeholder="Product Name"
                />
              </div>
              <div>
                <input
                  type="number"
                  className="bg-[#bfe0d1] border p-4 h-10 w-full"
                  multiple
                  onChange={handleOnChange}
                  value={Number(editingProduct?.price)}
                  name="price"
                  placeholder="Product Price"
                />
              </div>
              <div>
                <textarea
                  className="bg-[#bfe0d1] border h-20 p-4 w-full"
                  placeholder="Enter Product Description"
                  value={editingProduct?.product_description}
                  onChange={(e) => {
                    setEditingProduct((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        product_description: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="h-10 w-full">
                <select
                  name="version"
                  value={editingProduct?.category}
                  className="w-full border bg-[#bfe0d1] h-full"
                  onChange={(e) => {
                    setEditingProduct((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        category: e.target.value as productCategory,
                      };
                    });
                  }}
                >
                  <option value="playerV">Player Version</option>
                  <option value="normalV">Normal Version</option>
                </select>
              </div>
              <div>
                <button
                  className="bg-[#bfe0d1] h-10 w-full border"
                  onClick={handelSizeSelection}
                >
                  Select available Sizes
                </button>
              </div>
              <div className="w-full gap-3 flex h-12 text-white font-bold">
                <button
                  className="w-full h-full bg-red-500 rounded-2xl"
                  onClick={() => {
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="w-full h-full bg-green-500 rounded-2xl"
                  onClick={handleEditProduct}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default EditProduct;
