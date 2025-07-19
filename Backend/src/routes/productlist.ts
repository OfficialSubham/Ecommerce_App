import { Context, Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const productRoute = new Hono();

productRoute.get("/", (c: Context) => {
    return c.json({
        message: "Hello from product"
    })
});

productRoute.get("/bulk", async (c: Context) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const allProduct = await prisma.product.findMany(
            {
                select: {
                    Images: true,
                    price: true,
                    product_id: true,
                    product_name: true
                },
                orderBy: {
                    date: "desc"
                }
            }
        )

        return c.json({
            message: "All your products",
            products: allProduct
        })


    } catch (error) {
        return c.json({
            message: "Internal Error",
            error
        }, 500)
    }
})