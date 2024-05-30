const { Router } = require("express");
const authControllers = require("../controllers/authControllers");
const userControllers = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/auth/student/sendOTP", authControllers.sendOTP);
router.post("/auth/student/checkOTP", authControllers.checkOTP);
router.post("/auth/student/register", authControllers.createStudent);
router.post("/auth/student/login", authControllers.studentLogin);
router.post("/auth/teacher/register", authControllers.createTeacher);
router.post("/auth/teacher/login", authControllers.teacherLogin);
router.post("/auth/admin/login", authControllers.adminLogin);
router.get("/fetch/users/:role/:indentifier", userControllers.getUsers);
router.get("/fetch/user", auth, userControllers.fetchMe); //For Fetching users using token

module.exports = router;
