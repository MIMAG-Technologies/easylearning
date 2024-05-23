const { Router } = require("express");
const authControllers = require("../controllers/authControllers");

const router = Router();

router.post("/auth/student/sendOTP", authControllers.sendOTP);
router.post("/auth/student/checkOTP", authControllers.checkOTP);
router.post("/auth/student/register", authControllers.createStudent);
router.post("/auth/student/login", authControllers.studentLogin);
router.post("/auth/teacher/register", authControllers.createTeacher);
router.post("/auth/teacher/login", authControllers.teacherLogin);
router.post("/auth/admin/login", authControllers.adminLogin);

module.exports = router;
