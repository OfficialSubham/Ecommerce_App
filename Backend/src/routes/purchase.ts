import axios from "axios";
import { Context, Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const purchase = new Hono();

const productsSchema = z.object({
    url: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
    productName: z.string(),
    productId: z.number(),
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
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

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

        await prisma.$transaction(async (tx) => {
            const res = await tx.orderDetails.create({
                data: {
                    name,
                    address,
                    phoneNo: phone
                }
            })

            await tx.orderedItems.createMany({
                data: products.map((item) => {
                    return {
                        orderedId: res.order_id,
                        productId: item.productId,
                        quantityOrder: item.quantity
                    }
                })
            })

        })

        let total = 0;
        const productList = products.map((item, idx) => {
            total += ((item.price / 100) * item.quantity)
            return `Image: ${item.url} \n 📦${idx + 1}. ${item.productName} (x${item.quantity}) - ₹${item.price / 100} \n`
        }).join("\n")

        const userDetail = `${productList} \n \n👤 Name: ${name} \n 📞 Phone: ${phone} \n 📍Address: ${address} \n \n🛍️ TOTAL: ₹${total}`
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