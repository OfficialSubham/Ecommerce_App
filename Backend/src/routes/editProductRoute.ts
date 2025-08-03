import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";

type typeSize = "S" | "M" | "L" | "XL" | "XXL";

export type productCategory = "normalV" | "playerV"
export interface IProduct {
    imageUrl: string;
    productPrice: number;
    productId: number;
    productName: string;
    productDescription: string;
    productCategory: productCategory;
    productSize: typeSize[];
}

interface body {
    body: IProduct;
}

const editProductRoute = new Hono();



editProductRoute.post("/", async (c: Context) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const { body } = await c.req.json() as body;
        console.log(body)
        const res = await prisma.$transaction(async (tx) => {
            await tx.productSize.deleteMany({
                where: { productId: body.productId }
            })

            await tx.productSize.createMany({
                data: body.productSize.map((sz) => {
                    return { size: sz, productId: body.productId }
                }),
                skipDuplicates: true,
            })
            await tx.product.update({
                where: {
                    product_id: body.productId
                },
                data: {
                    price: body.productPrice,
                    product_description: body.productDescription,
                    product_name: body.productName,
                    category: body.productCategory
                }
            })
        })
        return c.json({ message: "Product Updated Successfully" })
    } catch (error) {
        console.log(error)
        return c.json({ message: "Internal Server Error Please try again later" }, 500)
    }
})

export default editProductRoute;