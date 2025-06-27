import axios from "axios";
import { atom, selector } from "recoil";

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

export const productState = atom({
    key: "productState",
    default: selector({
        key: "allProduct",
        get: async () => {
            const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
            const { status, data }: { status: number; data: iData } = await axios.get(
                `${BACKEND_URL}/product/bulk`
            );
            if (status == 200) {
                return data.products
            }
            // console.log(data);
        }
    })
}) 
