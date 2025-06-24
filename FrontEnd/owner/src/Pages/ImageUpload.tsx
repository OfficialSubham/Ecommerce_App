import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "../utils/Loading";

const ImageUpload = () => {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile((prev) => prev.concat(e.target.files![0]));
    const imageLink = URL.createObjectURL(e.target.files![0]);
    setImageUrl((prev) => prev.concat(imageLink));
  };
  const form = new FormData();
  const handleOnClick = async () => {
    setLoading(true);
    imageFile.forEach((file) => {
      form.append("files", file);
    });
    form.append("productName", productName);
    form.append("productDescription", productDescription);
    const res = await axios.post(`${BACKEND_URL}/api/v1/uploadImage`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    if (res.status == 200) {
      setImageFile([]);
      setImageUrl([]);
      setProductName("");
      setProductDescription("");
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);

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
      <div className="bg-slate-700 text-while min-h-screen flex flex-col">
        <div className="w-full py-5 flex flex-col items-center justify-center bg-[#1e202c] gap-4">
          <div className="gap-4 flex">
            <input
              type="file"
              className="bg-[#bfe0d1] border p-4"
              multiple
              onChange={handleOnChange}
              value={""}
            />
            <button
              className="p-4 border bg-[#60519b] cursor-pointer"
              onClick={handleOnClick}
            >
              SEND
            </button>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              className="bg-[#bfe0d1] border p-4"
              multiple
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              value={productName}
              placeholder="Product Name"
            />
            <input
              type="text"
              className="bg-[#bfe0d1] border p-4"
              multiple
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
              placeholder="Product desc"
            />
          </div>
        </div>
        <div className="flex-1 bg-[#31323e] w-full overflow-hidden">
          <div className="grid gap-3 justify-center mt-5 overflow-y-auto max-h-[90vh] md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 px-4">
            {imageUrl.map((i, idx) => {
              return (
                <img
                  src={i}
                  alt="hlo"
                  key={idx}
                  className="h-64 w-64 object-contain"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
