import  express  from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import { authMiddleware } from './../middlewares/authMiddleware.js';
const cartRouter=express.Router()

cartRouter.post("/addToCart",authMiddleware,addToCart)
cartRouter.post("/removeFromCart",authMiddleware,removeFromCart)
cartRouter.get("/getCart",authMiddleware,getCart)

export default cartRouter