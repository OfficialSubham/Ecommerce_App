import { atom, selector } from "recoil";

interface UserCart {
    id: number;
    imgUrl: string;
    price: number;
    name: string;
    quantity: number
}

export const cartState = atom({
    key: "cartState",
    default: [] as UserCart[]
})

export const totalPrice = selector({
    key: "totalPrice",
    get: ({get}) => {
        const cart = get(cartState);
        let total = 0;
        cart.forEach((item) => {
            total += ((item.price/100) * item.quantity)
        })
        return total;
    },
})

