import { atom, selector } from "recoil";
import { productState, type ActualProductType } from "./productAtom";

export const isEditingState = atom({
    key: "isEditingState",
    default: false
})

export const derivedEditingProduct = selector<ActualProductType | null>({

    key: "derivedEditingProduct",
    get: ({ get }) => {
        const products = get(productState);
        const productId = get(productToBeEditState);

        if (!products || productId === null) return null;

        const product = products.find((item) => item.product_id === productId)
        if (product == null) return null;
        return product
    },

})

export const editingProductState = atom<ActualProductType | null> ({
    key: "editingProductState",
    default: null
})

export const productToBeEditState = atom<number | null>({
    key: "productToBeEditState",
    default: null
})