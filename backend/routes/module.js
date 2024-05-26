const { Router } = require("express");
const moduleControllers = require("../controllers/moduleControllers");
const auth = require("../middlewares/auth");

const router = Router();

// MODULES
router.post("/modules/create/:courseId", auth, moduleControllers.createModule);
router.get("/modules/:courseId/:moduleId", moduleControllers.getModuleById);
router.put("/modules/:moduleId", auth, moduleControllers.updateModule);
router.delete("/modules/:moduleId", auth, moduleControllers.deleteModule);

module.exports = router;
