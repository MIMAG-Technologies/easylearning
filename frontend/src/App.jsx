import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import "./components/Forms/Forms.css";
import { AuthContext } from "./context/AuthContext";
// COMPONENTS IMPORTS
import Login from "./components/Auth/Login";
import NotFound from "./components/Common/NotFound";
import Loader from "./components/Common/Loader";
import AdminNav from "./components/Admin/AdminNav";
import CategoryManagement from "./components/Admin/Sections/CategoryManagement";
import CourseManagement from "./components/Admin/Sections/CourseManagement";
import StudentMangement from "./components/Admin/Sections/StudentMangement";
import TeacherManagement from "./components/Admin/Sections/TeacherManagement";
import CreateCourse from "./components/Forms/CreateCourse";
import CreateModule from "./components/Forms/CreateModule";
import Home from "./components/Home/Home";
import { useContext } from "react";
import NavFooter from "./components/Common/NavFooter";
import OneCoursePage from "./components/Courses/OneCoursePage";
import BrowseCourse from "./components/Courses/BrowseCourse";
import Blogs from "./components/Blogs/Blogs";
import Blog from "./components/Blogs/Blog";
import AboutUs from "./components/AboutUs/AboutUs";
import MSV from "./components/AboutUs/MSV";
import Carrer from "./components/AboutUs/Carrer";
import ApplyAsInstructor from "./components/Forms/AppyAsInstructor";
import Contact from "./components/AboutUs/Contact";
import PolicyTemplate from "./components/Policy/PolicyTemplate";
import Payment from "./components/Payment/Payment";
import DashBoard from "./components/DashBoards/DashBoard";
import UserCourses from "./components/DashBoards/UserCourses";
import MyProfil from "./components/DashBoards/MyProfil";
import LearningNav from "./components/MyLearning/LearningNav";
import MyOneModule from "./components/MyLearning/MyOneModule";
import StudentList from "./components/DashBoards/StudentList";
import CreateMaterial from "./components/Forms/CreateMaterial";
import ReadNotes from "./components/MyLearning/ReadNotes";
import DoQuiz from "./components/MyLearning/DoQuiz";
import StudentSignIn from "./components/Auth/StudentSignIn";
import TeacherSignIn from "./components/Auth/TeacherSignIn";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Messages from "./components/MyLearning/Messages";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const { isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading && <Loader />}

      <Routes>
        {/* Same For All Users Route */}
        <Route path="/" element={<NavFooter />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<BrowseCourse />} />
          <Route path="course/:courseId" element={<OneCoursePage />} />
          <Route path="payments/:id" element={<Payment />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:section" element={<Blog />} />
          {/* ABOUT US SECTIONS */}
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="mission-vision-and-values" element={<MSV />} />
          <Route path="offices" element={<Contact />} />
          <Route path="carrer" element={<Carrer />} />
          <Route path="apply-as-instructor" element={<ApplyAsInstructor />} />
          <Route
            path="psycortex-online-education/:section"
            element={<PolicyTemplate />}
          />
          {/* DASHBOARDS Routes*/}
          <Route path="dashboard" element={<DashBoard />}>
            <Route index element={<UserCourses />} />
            <Route
              path="mylearning/:courseId/students"
              element={<StudentList />}
            />
            <Route path="mylearning" element={<UserCourses />} />

            <Route path="myprofile" element={<MyProfil />} />
          </Route>
          {/* One Course Learning  */}
          <Route path="mylearning/:userId/:courseId" element={<LearningNav />}>
            <Route
              path="module/:moduleId/readNotes/:materialId"
              element={<ReadNotes />}
            />
            <Route
              path="module/:moduleId/doQuiz/:materialId"
              element={<DoQuiz />}
            />
            <Route path="discussion" element={<Messages />} />
            <Route path="module/:moduleId" element={<MyOneModule />}>
              <Route path="material/:mode/:kind" element={<CreateMaterial />} />
              <Route
                path="material/:mode/:kind/:materialId"
                element={<CreateMaterial />}
              />
            </Route>
            <Route path="create-module" element={<CreateModule />} />
            <Route path="edit-module/:moduleId" element={<CreateModule />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="auth">
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="signin/student" element={<StudentSignIn />} />
          <Route path="signin/teacher" element={<TeacherSignIn />} />
          <Route path="login/:who" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminNav />}>
          <Route
            path="category-management"
            index
            element={<CategoryManagement />}
          />
          <Route path="course-management">
            <Route index element={<CourseManagement />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course/:id" element={<CreateCourse />} />
            <Route path="view-course/:courseId">
              <Route index element={<OneCoursePage />} />
              <Route path="create-module" element={<CreateModule />} />
              <Route path="edit-module/:moduleId" element={<CreateModule />} />
            </Route>
          </Route>
          <Route path="student-management" element={<StudentMangement />} />
          <Route path="teacher-management" element={<TeacherManagement />} />
        </Route>

        <Route path="payments" element={<Payment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
