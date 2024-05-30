import React, { useState } from "react";
import CreateCourse from "../../Forms/CreateCourse";
import { CirclePlus } from "lucide-react";
function CourseManagement() {
  const [isCourseEditorOpen, setisCourseEditorOpen] = useState(false);

  return (
    <>
      {isCourseEditorOpen ? (
        <CreateCourse setisCourseEditorOpen={setisCourseEditorOpen} />
      ) : (
        <></>
      )}
      <div className="admin-searchbar">
        <input placeholder="Search" className="input-style" type="text" />
        <button onClick={() => setisCourseEditorOpen(true)}>
          <CirclePlus />
          Add Course
        </button>
      </div>
    </>
  );
}

export default CourseManagement;
