import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    category:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true}
},{timestamps:true})


export const FoodModel= mongoose.model("Food",foodSchema)