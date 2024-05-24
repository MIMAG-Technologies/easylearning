const { Router } = require("express");
const categoryControllers = require("../controllers/categoryControllers");
const auth = require("../middlewares/auth");

const router = Router();

// CATEGORIES
router.post("/categories/create", auth, categoryControllers.createCategory);
router.get("/categories/:categoryId", categoryControllers.getCategoryById);
router.put("/categories/:categoryId", auth, categoryControllers.updateCategory);
router.delete(
  "/categories/:categoryId",
  auth,
  categoryControllers.deleteCategory
);

module.exports = router;
