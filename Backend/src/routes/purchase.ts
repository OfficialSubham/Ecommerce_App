import axios from "axios";
import { Context, Hono } from "hono";
import { z } from "zod";

const purchase = new Hono();

const productsSchema = z.object({
    url: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
    productName: z.string()
})

const orderDetailsSchema = z.object({
    name: z.string().min(3),
    phone: z.string().length(10),
    address: z.string().min(3),
    products: z.array(productsSchema)
})

type TOrder = z.infer<typeof orderDetailsSchema>

purchase.post("/", async (c: Context) => {
    try {

        const { name, phone, address, products }: TOrder = await c.req.json()
        // const body = await c.req.json()

        const { success } = orderDetailsSchema.safeParse({
            name,
            phone,
            address,
            products
        })

        if (!success) {
            return c.json({
                message: "Give valid Product details"
            }, 400)
        }
        let total = 0;
        const productList = products.map((item, idx) => {
            total += ((item.price / 100) * item.quantity)
            return `Image: ${item.url} \n 📦${idx + 1}. ${item.productName} (x${item.quantity}) - ₹${item.price} `
        }).join("\n")

        const userDetail = `${productList} \n👤 Name: ${name} \n 📞 Phone: ${phone} \n 📍Address: ${address} \n🛍️ TOTAL: ₹${total}`
        const res = await axios.post(`${c.env.TELEGRAM_URL}`, {
            "text": userDetail,
            "chat_id": c.env.CHAT_ID
        })
        if (res.data.ok == true) {
            return c.json({
                message: "Order Successful"
            })
        }
        else {
            return c.json({
                message: "Some Error occured"
            }, 400)
        }
    } catch (error) {
        return c.json({
            message: "Internal Error Occured"
        }, 500);
    }
})

export default purchase