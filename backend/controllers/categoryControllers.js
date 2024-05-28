const Category = require("../models/catagory");
const mongoose = require("mongoose");

// Function to create a new category
const createCategory = async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create new category
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to get category by ID or get all categories
// Function to get category by ID or get all categories with number of courses
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (categoryId === "all") {
      // Return all categories with number of courses
      const categories = await Category.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "_id",
            foreignField: "category",
            as: "courses",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            numCourses: { $size: "$courses" },
          },
        },
      ]);
      return res.status(200).json(categories);
    }

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Find category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to update category name
const updateCategory = async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { categoryId } = req.params;
    const { name } = req.body;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Find and update category
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to delete a category
const deleteCategory = async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { categoryId } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Find and delete category
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
