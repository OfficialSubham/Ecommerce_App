import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";

const deleteProductRoute = new Hono();

deleteProductRoute.delete("/", async (c: Context) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const param = c.req.query()

        const image = await prisma.images.findFirst({
            where: {
                productId: Number(param.productId)
            }
        })

        if (!image) return c.json({ message: "No Product Found" }, 400);

        const private64Key = btoa(`${c.env.PRIVATE_KEY}:`);
        const url = `https://api.imagekit.io/v1/files/${image.fileId}`;
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${private64Key}`
            }
        };
        const response = await fetch(url, options)
        if (response.status != 204) return c.json({ message: "Error while deleting" }, 500);

        const dbCall = await prisma.product.delete({
            where: {
                product_id: Number(param.productId)
            }
        })
        return c.json({ message: "Successfully Deleted the product" });
    } catch (error) {
        console.log(error)
        return c.json({ message: "Internal Error" }, 500);
    }
})




export default deleteProductRoute