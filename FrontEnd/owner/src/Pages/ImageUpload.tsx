import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { z } from "zod";
import Sizes from "../utils/Sizes";

type typeSize = "S" | "M" | "L" | "XL" | "XXL";

type iSize = {
  [key in typeSize]: boolean;
};

const productSchema = z.object({
  price: z.number().gt(0, "Price Cannot be 0"),
  name: z.string().min(2, "Name is too short"),
  image: z.string(),
});

const ImageUpload = () => {
  //Imports from env's
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  //States
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isOnSizeSelection, setIsOnSizeSelection] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<iSize>({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });

  //Functions
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files![0]);
    const imageLink = URL.createObjectURL(e.target.files![0]);
    setImageUrl(imageLink);
  };
  const handleOnClick = async () => {
    const result = productSchema.safeParse({
      price: Number(productPrice),
      name: productName,
      image: imageUrl,
    });

    if (!result.success) {
      return alert("Try to enter valid Details");
    }

    const form = new FormData();
    setLoading(true);
    form.append("files", imageFile || "");
    form.append("productName", productName);
    form.append("productPrice", productPrice);

    const res = await axios.post(`${BACKEND_URL}/uploadImage`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    if (res.status == 200) {
      setImageUrl("");
      setProductName("");
      setProductPrice("");
    } else {
      alert(res.data.message);
    }
  };

  const handleDelete = () => {
    setImageUrl("");
    setImageFile(null);
    URL.revokeObjectURL(imageUrl);
  };

  const handelSizeSelection = () => {
    setIsOnSizeSelection(!isOnSizeSelection);
  };

  //Effects
  useEffect(() => {
    // console.log(imageFile);
    return () => {
      URL.revokeObjectURL(imageUrl || "");
    };
  });

  return (
    <>
      {loading && (
        <div className="inset-0 absolute z-10 flex justify-center items-center bg-slate-700 opacity-70">
          <div className="p-10 bg-white text-black rounded-2xl flex items-center flex-col justify-center gap-5">
            <Loading />
            Do not refresh the page or leave it.
          </div>
        </div>
      )}
      <Sizes
        closeButton={setIsOnSizeSelection}
        isOpen={isOnSizeSelection}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
      />
      <div className="bg-slate-700 text-while min-w-screen min-h-screen flex flex-col no-scrollbar">
        <div
          className="fixed bottom-0 w-full py-5 flex gap-4
        lg:gap-0 flex-col items-center justify-center bg-[#1e202c] lg:flex-row"
        >
          <button
            className="w-70 bg-[#60519b] h-10 mx-5 border"
            onClick={handelSizeSelection}
          >
            Sizes
          </button>
          <div className="h-full gap-3 flex flex-col">
            <div className="gap-4 flex w-full md:w-auto px-10">
              <input
                type="file"
                className="bg-[#bfe0d1] border p-4 w-full md:w-auto"
                onChange={handleOnChange}
              />
              <button
                className="p-4 border bg-[#60519b] cursor-pointer"
                onClick={handleOnClick}
              >
                SEND
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full px-10 md:w-auto">
              <input
                type="text"
                className="bg-[#bfe0d1] border p-4 w-full"
                multiple
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                value={productName}
                placeholder="Product Name"
              />
              <input
                type="number"
                className="bg-[#bfe0d1] border p-4"
                multiple
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
                placeholder="Product Price"
              />
            </div>
            <textarea
              className="bg-[#bfe0d1] border h-30 mx-10 p-4"
              placeholder="Enter Product Description"
            />
          </div>
          <div className="h-10 mx-5">
            <select name="version" className="w-70 bg-[#bfe0d1] h-full">
              <option value="playerV">Player Version</option>
              <option value="normalV">Normal Version</option>
            </select>
          </div>
        </div>
        <div className="flex-1 bg-[#31323e] w-full overflow-hidden">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center mt-5 overflow-y-auto max-h-[90vh] no-scrollbar">
            {imageUrl && (
              <div className="h-72 w-full gap-2 flex flex-col items-center justify-center">
                <img
                  src={imageUrl}
                  alt="hlo"
                  className="h-10/12 w-64 object-contain"
                />
                <button
                  onClick={handleDelete}
                  className="bg-red-500 rounded-2xl cursor-pointer px-20 py-3 text-white"
                >
                  DELETE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
