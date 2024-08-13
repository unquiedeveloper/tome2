import express from "express"
import {config} from "dotenv"
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors"
import productRouter from "./router/productRouter.js"
import userRouter from "./router/userRouter.js"
import cartRouter from "./router/cartRouter.js"
import orderRouter from "./router/orderRouter.js"
import addressRouter from "./router/addressRouter.js"
const app = express();

config({ path : "./config/config.env"})
app.use(cors({
    origin : "*"
}))
app.use(express.json());

app.use("/api/v1/product" , productRouter);
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/order" , orderRouter);
app.use("/api/v1/cart" , cartRouter);
app.use("/api/v1/address" , addressRouter);


dbConnection();
export default app