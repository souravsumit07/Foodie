import { FoodModel } from "./../models/foodModel.js";
export const addFood = async (req, res) => {
  try {
    const { filename } = req.file;
    const { name, description, category, price } = req.body;
    const food = new FoodModel({
      name,
      description,
      category,
      price,
      image: filename, // store the filename (or URL if you upload to Cloudinary)
    });
    await food.save();
    res
      .status(201)
      .json({ success: true, message: "Food added successfully", food });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFood = async (req, res) => {
  try {
    const food = await FoodModel.find({});
    res
      .status(201)
      .json({ success: true, message: "Food added successfully", food });
  } catch (error) {
    console.error("Error Getting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.param;
    await FoodModel.findByIdAndDelete({ id });
    res
      .status(201)
      .json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error Deleting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
