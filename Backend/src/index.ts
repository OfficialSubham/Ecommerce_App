import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productRoute } from './routes/productlist';
import { imageUploadRoute } from './routes/uploadImage';

type Env = {
  Bindings: {
    URL: string;
  }
}

const app = new Hono<Env>()

app.use("*", cors());

app.get('/', (c) => {
  const key = c.env.URL
  console.log(key);
  return c.text('Ecommerce Project!')
})

app.route("/api/v1/product", productRoute);
app.route("/api/v1/uploadImage", imageUploadRoute);
app.onError((e, c) => {
  console.log("error", e);
  return c.json({
    success: false,
    error: e.message,
  }, 500);
})

export default app
