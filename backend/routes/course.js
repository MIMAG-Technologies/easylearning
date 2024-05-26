const { Router } = require("express");
const courseControllers = require("../controllers/courseControllers");
const auth = require("../middlewares/auth");

const router = Router();

// COURSES
router.post("/courses/create", auth, courseControllers.createCourse);
router.post(
  "/courses/assignTeacher/:action",
  auth,
  courseControllers.assignTeacher
);
router.get("/courses/:courseId", courseControllers.getCourseById);
router.put("/courses/:courseId", auth, courseControllers.updateCourse);
router.delete("/courses/:courseId", auth, courseControllers.deleteCourse);

module.exports = router;
