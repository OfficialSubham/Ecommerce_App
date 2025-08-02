import axios from "axios";
import { atom, selector } from "recoil";
import type { iSize } from "../utils/Sizes";
type typeSize = "S" | "M" | "L" | "XL" | "XXL";
type sizeType = {
    id: number;
    size: typeSize;
    productId: number;
}
export type productCategory = "normalV" | "playerV"

interface IImage {
    imageUrl: string;
    image_id: number;
}
export interface IProduct {
    Images: IImage[];
    price: number;
    product_id: number;
    product_name: string;
    product_description: string;
    category: productCategory;
    productSize: sizeType[];
}

export type ActualProductType = Omit<IProduct, "productSize"> & {
    "product_sizes": iSize
}

interface iData {
    message: string;
    products: IProduct[];
}

export const productState = atom<ActualProductType[] | []>({
    key: "productState",
    default: selector({
        key: "allProduct",
        get: async () => {
            const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
            const { status, data }: { status: number; data: iData } = await axios.get(
                `${BACKEND_URL}/product/bulk`
            );
            if (status == 200) {
                const { products } = data;

                const priceUpdate = products.map((pro) => {
                    const sizeMap: Record<typeSize, boolean> = (["S", "M", "L", "XL", "XXL"] as const).reduce((acc, sz) => {
                        const found = pro.productSize.some((obj) => obj.size == sz);
                        acc[sz] = found;
                        return acc;
                    }, {
                        S: false,
                        M: false,
                        L: false,
                        XL: false,
                        XXL: false
                    } as Record<typeSize, boolean>)
                    return {
                        price: pro.price / 100,
                        product_sizes: sizeMap,
                        Images: pro.Images,
                        product_id: pro.product_id,
                        product_name: pro.product_name,
                        product_description: pro.product_description,
                        category: pro.category
                    };
                })
                return priceUpdate;
            }
            return [];
            // console.log(data);
        }
    })
}) 
