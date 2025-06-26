import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productRoute } from './routes/productlist';
import { imageUploadRoute } from './routes/uploadImage';
import purchaseRoute from './routes/purchase';

type Env = {
  Bindings: {
    URL: string;
  }
}

const app = new Hono<Env>()

app.use("*", cors());

app.get('/', (c) => {
  const key = c.env.URL
  // console.log(key);
  return c.text('Ecommerce Project!')
})

app.route("/api/v1/product", productRoute);
app.route("/api/v1/uploadImage", imageUploadRoute);
app.route("/api/v1/purchase", purchaseRoute);
app.onError((e, c) => {
  console.log("error", e);
  return c.json({
    success: false,
    error: e.message,
  }, 500);
})

export default app
