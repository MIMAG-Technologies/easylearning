const { Router } = require("express");
const moduleControllers = require("../controllers/moduleControllers");
const auth = require("../middlewares/auth");

const router = Router();

// MODULES
router.post("/create/:courseId", auth, moduleControllers.createModule);
router.get("/:courseId/:moduleId", moduleControllers.getModuleById);
router.put("/:moduleId", auth, moduleControllers.updateModule);
router.delete("/:moduleId", auth, moduleControllers.deleteModule);

module.exports = router;
