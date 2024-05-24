const { Router } = require("express");
const courseControllers = require("../controllers/courseControllers");
const auth = require("../middlewares/auth");

const router = Router();

// COURSES
router.post("/create", auth, courseControllers.createCourse);
router.post("/assignTeacher/:action", auth, courseControllers.assignTeacher);
router.get("/:courseId", courseControllers.getCourseById);
router.put("/:courseId", auth, courseControllers.updateCourse);
router.delete("/:courseId", auth, courseControllers.deleteCourse);

module.exports = router;
