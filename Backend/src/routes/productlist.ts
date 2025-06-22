import { Context, Hono } from "hono";

export const productRoute = new Hono();

productRoute.get("/", (c: Context) => {
    return c.json({
        message: "Hello from product"
    })
});
