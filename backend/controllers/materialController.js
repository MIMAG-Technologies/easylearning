const Material = require("../models/material");

// Create a new material
exports.createMaterial = async (req, res) => {
  const { user } = req;
  if (user.role !== "admin" && user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const material = new Material(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: "Error creating material", error });
  }
};

// Get material by ID or by Module ID
exports.getMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findById(id);

    if (material) {
      res.status(200).json(material);
    } else {
      const materials = await Material.find({ module: id });
      res.status(200).json(materials);
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching material", error });
  }
};

// Update a material
exports.updateMaterial = async (req, res) => {
  const { user } = req;
  if (user.role !== "admin" && user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { id } = req.params;
    const updatedMaterial = await Material.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(400).json({ message: "Error updating material", error });
  }
};

// Delete a material
exports.deleteMaterial = async (req, res) => {
  const { user } = req;
  if (user.role !== "admin" && user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { id } = req.params;
    await Material.findByIdAndDelete(id);
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting material", error });
  }
};
