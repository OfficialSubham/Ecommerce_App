import { Context, Hono } from "hono";
import { sign } from "hono/jwt";


const owner = new Hono();

owner.post("/", async (c: Context) => {
    try {
        const userName = c.env.USERNAME;
        const password = c.env.PASSWORD
        const body = await c.req.json()
        if (body.userName != userName || body.password != password) {
            return c.json({
                message: "Un Authenticated"
            }, 400)
        }
        const token = await sign({ userName, password }, password)
        return c.json({
            message: "User Authenticated",
            token
        })
    } catch (error) {
        return c.json({
            messahe: "Internal Error Occured"
        }, 500)
    }
})

export default owner;