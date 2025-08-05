import { atom, selector } from "recoil";

export interface UserCart {
    productId: number;
    url: string;
    price: number;
    productName: string;
    quantity: number
}

export const cartState = atom({
    key: "cartState",
    default: [] as UserCart[]
})

export const cartHydratedState = atom({
  key: "cartHydratedState",
  default: false,
});

export const totalPrice = selector({
    key: "totalPrice",
    get: ({ get }) => {
        const cart = get(cartState);
        let total = 0;
        cart.forEach((item) => {
            total += ((item.price / 100) * item.quantity)
        })
        return total;
    },
})

export const totalProduct = selector({
    key: "totalProduct",
    get: ({ get }) => {
        const cart = get(cartState);
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        })
        return total;
    },
})

export const addedToCartState = atom({
    key: "addedToCartState",
    default: false
})
