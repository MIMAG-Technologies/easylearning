const Module = require("../models/module");
const Material = require("../models/material");

const isComplete = async (moduleId) => {
  const module = await Module.findById(moduleId);
  if (!module) return false;
  const materials = await Material.find({ module: moduleId });
  if (!materials || materials.length === 0) return false;
  return materials.every((material) => material.isCompleted);
};

module.exports = { isComplete };
