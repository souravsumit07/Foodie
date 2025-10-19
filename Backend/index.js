import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/db_config.js";
import foodRouter from "./routes/food.Routes.js";
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())

const port=process.env.PORT||3000

connectDb()








app.use("/api/food",foodRouter)

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
    
})