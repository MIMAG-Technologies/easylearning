import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createModule, fetchModule, UpdateModule } from "../utils/moduleUtils";

function CreateModule() {
  const history = useNavigate();
  const [decodedCourseId, setdecodedCourseId] = useState(null);
  const { courseId, moduleId, userId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const loc = useLocation();

  const [module, setModule] = useState({
    title: "",
    order: 0,
    about: "",
    timeToComplete: 0,
    isCommon: userId === undefined,
  });

  const handleChange = (e) => {
    setModule({ ...module, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await UpdateModule(module, moduleId);
        window.alert("Module updated successfully");
      } else {
        const moduleToSubmit = { ...module, userid: userId };
        await createModule(moduleToSubmit, decodedCourseId);
        window.alert("Module created successfully");
      }
      history(-1);
    } catch (error) {
      window.alert(`Error ${editMode ? "updating" : "creating"} module`);
    }
  };

  useEffect(() => {
    if (userId === undefined) {
      setdecodedCourseId(atob(courseId));
    } else {
      setdecodedCourseId(courseId);
    }

    if (loc.pathname.includes("edit-module")) {
      setEditMode(true);
      fetchModule(decodedCourseId, moduleId)
        .then((data) => setModule(data))
        .catch((error) => console.error("Error fetching module:", error));
    } else {
      setEditMode(false);
    }
  }, [loc.pathname, decodedCourseId, moduleId, userId]);

  return (
    <div className="FormContainer">
      <div className="Forms">
        <X className="x-btn" onClick={() => history(-1)} />
        <form className="create_module" onSubmit={handleSubmit}>
          <label htmlFor="module_title">Enter Title</label>
          <input
            type="text"
            id="module_title"
            name="title"
            value={module.title}
            onChange={handleChange}
          />
          <label htmlFor="module_order">Set Order</label>
          <input
            type="number"
            id="module_order"
            name="order"
            value={module.order}
            onChange={handleChange}
          />
          <label htmlFor="module_about">About</label>
          <textarea
            id="module_about"
            name="about"
            value={module.about}
            onChange={handleChange}
          />
          <label htmlFor="module_timeToComplete">
            Expected Time to Complete (in hours)
          </label>
          <input
            type="number"
            id="module_timeToComplete"
            name="timeToComplete"
            value={module.timeToComplete}
            onChange={handleChange}
          />
          <button type="submit">{editMode ? "Update" : "Create"} Module</button>
        </form>
      </div>
    </div>
  );
}

export default CreateModule;
