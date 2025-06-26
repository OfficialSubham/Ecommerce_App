import { atom } from "recoil";

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

