import express from "express";
import { addFood } from "../controllers/food.Controller.js";
const foodRouter=express.Router()

foodRouter.post("/addfood",addFood)



export default foodRouter