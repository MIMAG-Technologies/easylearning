const { Router } = require("express");
const authControllers = require("../controllers/authControllers");
const userControllers = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/auth/sendOTP", authControllers.sendOTP);
router.post("/auth/checkOTP", authControllers.checkOTP);
router.put("/auth/updatePassword", authControllers.resetPassword);
router.post("/auth/student/register", authControllers.createStudent);
router.post("/auth/student/login", authControllers.studentLogin);
router.post("/auth/teacher/register", authControllers.createTeacher);
router.post("/auth/teacher/login", authControllers.teacherLogin);
router.post("/auth/admin/login", authControllers.adminLogin);
router.get("/fetch/users/:role/:indentifier", userControllers.getUsers);
router.get("/fetch/user", auth, userControllers.fetchMe);
router.get("/user", auth, userControllers.GetMe);
router.put("/user", auth, userControllers.UpdateMe);
router.put("/admin/resetpassword", auth, authControllers.resetAdminPassword);

module.exports = router;
