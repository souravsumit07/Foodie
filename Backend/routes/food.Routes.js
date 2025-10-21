// routes/foodRouter.js
import express from "express";
import multer from "multer";
import { addFood, deleteFood, getFood } from "../controllers/food.Controller.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

foodRouter.post("/addfood", upload.single("image"), addFood);
foodRouter.get("/getfood", getFood);
foodRouter.delete("/deleteFood/:_id", deleteFood);

export default foodRouter;
