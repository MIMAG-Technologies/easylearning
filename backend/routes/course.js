const { Router } = require("express");
const courseControllers = require("../controllers/courseControllers");
const auth = require("../middlewares/auth");

const router = Router();

// COURSES
router.post("/courses/create", auth, courseControllers.createCourse);
router.post("/courses/rate", auth, courseControllers.rateCourse);
router.post(
  "/courses/isCourseCompleted",
  auth,
  courseControllers.isCourseCompleted
);
router.get("/courses/user/:userId", auth, courseControllers.getUserCourses);
router.get(
  "/courses/userList/:courseId",
  auth,
  courseControllers.getEnrolledStudents
);
router.get("/courses/:courseId", courseControllers.getCourseById);
router.put("/courses/user/enroll", auth, courseControllers.enrollCourse);
router.put("/courses/:courseId", auth, courseControllers.updateCourse);
router.delete("/courses/:courseId", auth, courseControllers.deleteCourse);

module.exports = router;
