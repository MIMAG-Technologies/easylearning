import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/Forms/Forms.css";
import { AuthContext } from "./context/AuthContext";
// COMPOENETS IMPORTS
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
import Home from "./components/Home/Home";
import { useContext } from "react";

function App() {
  const { isLoading } = useContext(AuthContext);
  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin/:who" element={<SignIn />} />
        <Route path="/auth/login/:who" element={<Login />} />
        <Route path="/admin" element={<AdminNav />}>
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="course-management" element={<CourseManagement />}>
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course/:id" element={<CreateCourse />} />
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
