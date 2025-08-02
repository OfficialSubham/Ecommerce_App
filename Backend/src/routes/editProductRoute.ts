import { Context, Hono } from "hono";

const editProductRoute = new Hono();

editProductRoute.post("/", async (c: Context) => {

})

export default editProductRoute;