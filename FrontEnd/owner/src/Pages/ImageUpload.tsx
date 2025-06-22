import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const ImageUpload = () => {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile((prev) => prev.concat(e.target.files![0]));
    const imageLink = URL.createObjectURL(e.target.files![0]);
    setImageUrl((prev) => prev.concat(imageLink));
  };
  const form = new FormData();
  const handleOnClick = async () => {
    imageFile.forEach((file) => {
      form.append("files", file);
    });
    const res = await axios.post(`${BACKEND_URL}/api/v1/uploadImage`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.status == 200) {
      setImageFile([]);
      setImageUrl([]);
    }
  };

  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);

  return (
    <div className="bg-slate-700 text-while min-h-screen flex flex-col">
      <div className="w-full h-30 flex items-center justify-center bg-amber-200 gap-4">
        <input
          type="file"
          className="border p-4"
          multiple
          onChange={handleOnChange}
          value={""}
        />
        <button
          className="p-4 border bg-red-500 cursor-pointer"
          onClick={handleOnClick}
        >
          SEND
        </button>
      </div>
      <div className="flex-1 bg-orange-700 w-full overflow-hidden">
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
  );
};

export default ImageUpload;
