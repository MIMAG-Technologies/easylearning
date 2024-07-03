const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");
const auth = require("../middlewares/auth");

// Create a new material
router.post("/material", auth, materialController.createMaterial);

// Get material(s)
router.get("/material/:id", materialController.getMaterial);

// Update a material
router.put("/material/:id", auth, materialController.updateMaterial);

// Delete a material
router.delete("/material/:id", auth, materialController.deleteMaterial);

module.exports = router;
