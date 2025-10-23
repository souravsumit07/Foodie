import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/db_config.js";
import foodRouter from "./routes/food.Routes.js";
import userRouter from "./routes/user.Routes.js";
import cartRouter from "./routes/cart.Routes.js";
import orderRouter from "./routes/order.Routes.js";
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads")); // serve images

const port=process.env.PORT||3000

connectDb()


app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
    
})