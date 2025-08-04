import axios from "axios";
import { atom, selector } from "recoil";

interface IImage {
    imageUrl: string;
    image_id: number;
}

type typeSize = "S" | "M" | "L" | "XL" | "XXL";
type sizeType = {
    id: number;
    size: typeSize;
    productId: number;
}
export type productCategory = "normalV" | "playerV"

export interface IProduct {
    Images: IImage[];
    price: number;
    product_id: number;
    product_name: string;
    product_description: string;
    category: productCategory;
    productSize: sizeType[];
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
            else return []
            // console.log(data);
        }
    })
})

export const normalVersionState = selector({
    key: "normalVersionState",
    get: ({ get }) => {
        const allProduct = get(productState);
        const normalProduct = allProduct?.filter((pro) => pro.category == "normalV")
        if (normalProduct?.length > 0) return normalProduct
        else return []
    }
})


export const playerVersionState = selector({
    key: "playerVersionState",
    get: ({ get }) => {
        const allProduct = get(productState);
        const playerProduct = allProduct?.filter((pro) => pro.category == "playerV")
        if (playerProduct?.length > 0) return playerProduct
        else return []
    }
})

export const currentProduct = atom<IProduct | null>({
    key: "currentProduct",
    default: null
})