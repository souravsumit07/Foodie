import express from "express";
import multer from "multer";
import { addFood } from "../controllers/food.Controller.js";

const foodRoute = express.Router();

// ✅ Fix: combine destination + filename in one object
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    // Always save as .png file
    cb(null, Date.now() + `${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Route for adding food
foodRouter.post("/addfood", upload.single("image"), addFood);

export default foodRouter;