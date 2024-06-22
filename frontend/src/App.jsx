import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import "./components/Forms/Forms.css";
import { AuthContext } from "./context/AuthContext";
// COMPONENTS IMPORTS
import SignIn from "./components/Auth/SignIn";
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
          <Route path="course/:id" element={<OneCoursePage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:section" element={<Blog />} />
        </Route>

        {/* Auth Routes */}
        <Route path="auth">
          <Route path="signin/:who" element={<SignIn />} />
          <Route path="login/:who" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminNav />}>
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="course-management">
            <Route index element={<CourseManagement />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course/:id" element={<CreateCourse />} />
            <Route path="view-course/:id">
              <Route index element={<OneCoursePage />} />
              <Route path="create-module" element={<CreateModule />} />
              <Route path="edit-module/:module_id" element={<CreateModule />} />
            </Route>
          </Route>
          <Route path="student-management" element={<StudentMangement />} />
          <Route path="teacher-management" element={<TeacherManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
