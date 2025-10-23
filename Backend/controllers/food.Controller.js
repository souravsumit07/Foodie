// controller/food.Controller.js
import { FoodModel } from "../models/foodModel.js";

export const addFood = async (req, res) => {
  try {
    const { filename } = req.file;
    const { name, description, category, price } = req.body;

    const food = new FoodModel({
      name,
      description,
      category,
      price,
      image: `http://localhost:3000/uploads/${req.file.filename}`,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully", food });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFood = async (req, res) => {
  try {
    const food = await FoodModel.find({});
    res.status(200).json({ success: true, message: "Food fetched successfully", food });
  } catch (error) {
    console.error("Error getting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { _id } = req.params;
    await FoodModel.findByIdAndDelete(_id);
    res.status(200).json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const { _id } = req.params;
    const food = await FoodModel.findById(_id);

    if (food) {
      res.status(200).json({ success: true, message: "Food fetched successfully", food });
    } else {
      res.status(404).json({ success: false, message: "No food found" });
    }
  } catch (error) {
    console.error("Error getting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
