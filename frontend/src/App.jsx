import { Routes, Route } from "react-router-dom";
// COMPOENETS IMPORTS
import SignIn from "./components/Auth/SignIn";
import Login from "./components/Auth/Login";
import NotFound from "./components/Common/NotFound";

import AdminNav from "./components/Admin/AdminNav";
import CategoryManagement from "./components/Admin/Sections/CategoryManagement";
import CourseManagement from "./components/Admin/Sections/CourseManagement";
import StudentMangement from "./components/Admin/Sections/StudentMangement";
import TeacherManagement from "./components/Admin/Sections/TeacherManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/auth/signin/:who" element={<SignIn />} />
        <Route path="/auth/login/:who" element={<Login />} />
        <Route path="/admin" element={<AdminNav />}>
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="student-management" element={<StudentMangement />} />
          <Route path="teacher-management" element={<TeacherManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
