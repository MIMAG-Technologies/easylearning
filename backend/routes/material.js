const { Router } = require("express");
const materialControllers = require("../controllers/materialControllers");
const auth = require("../middlewares/auth");

const router = Router();

// MATERIALS
router.post("/create/:topicId", auth, materialControllers.createMaterial);
router.get("/:materialId/:topicId", materialControllers.getMaterialById);
router.put("/:materialId", auth, materialControllers.updateMaterial);
router.delete("/:materialId", auth, materialControllers.deleteMaterial);

module.exports = router;
