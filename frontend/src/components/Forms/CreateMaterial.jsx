import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createMaterial,
  fetchMaterial,
  updateMaterial,
} from "../utils/materialUtils";

const allowedDomains = [
  "meet.google.com",
  "zoom.us",
  "teams.microsoft.com",
  "webex.com",
  "gotomeeting.com",
  "bluejeans.com",
  "skype.com",
  "join.me",
  "whereby.com",
  "bigbluebutton.org",
];

function isValidMeetLink(link) {
  if (!link.startsWith("https://") && !link.startsWith("www.")) {
    return false;
  }
  try {
    const url = new URL(link);
    return allowedDomains.some((domain) => url.hostname.includes(domain));
  } catch (error) {
    return false;
  }
}

function CreateMaterial() {
  const history = useNavigate();
  const { moduleId, mode, kind, materialId } = useParams();
  const editMode = mode === "edit";

  const [template, setTemplate] = useState({
    title: "",
    module: moduleId,
    isCompleted: false,
    kind: kind || "",
    link: "",
    scheduledTime: "",
    content: "",
    questions: "",
  });

  const [linkError, setLinkError] = useState("");

  const getMaterials = async () => {
    try {
      const material = await fetchMaterial(materialId);
      setTemplate((prevTemplate) => ({
        ...prevTemplate,
        ...material,
        scheduledTime: material.scheduledTime
          ? material.scheduledTime.slice(0, 16)
          : "",
        questions: material.questions ? material.questions.join(", ") : "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (kind) {
      const updatedTemplate = { kind };

      if (kind === "OnlineClassLink") {
        updatedTemplate.link = "";
        updatedTemplate.scheduledTime = "";
      } else if (kind === "Notes") {
        updatedTemplate.content = "";
      } else if (kind === "MCQ") {
        updatedTemplate.questions = "";
      }

      setTemplate((prevTemplate) => ({
        ...prevTemplate,
        ...updatedTemplate,
      }));

      if (editMode) {
        getMaterials();
      }
    }
  }, [kind, editMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "link") {
      if (!isValidMeetLink(value)) {
        setLinkError("Please enter a valid meet link from a recognized site.");
      } else {
        setLinkError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (kind === "OnlineClassLink" && linkError) {
      window.alert(linkError);
      return;
    }
    const finalTemplate = {
      ...template,
      questions: template.questions
        ? template.questions.split(",").map((q) => q.trim())
        : [],
    };

    try {
      if (editMode) {
        await updateMaterial(finalTemplate, materialId);
        window.alert("Material updated successfully");
      } else {
        await createMaterial(finalTemplate);
        window.alert("Material created successfully");
      }
      history(-1);
    } catch (error) {
      window.alert(`Error ${editMode ? "updating" : "creating"} material`);
    }
  };

  return (
    <div className="FormContainer">
      <div className="Forms">
        <h1
          style={{
            textAlign: "center",
            margin: "0px",
          }}
        >
          {editMode ? "Edit" : "Create"} a {kind}
        </h1>
        <X className="x-btn" onClick={() => history(-1)} />
        <form
          className="apply_as_instructor"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={template.title}
            onChange={handleChange}
          />
          {kind === "OnlineClassLink" && (
            <>
              <label htmlFor="link">Online Class Link</label>
              <input
                type="text"
                id="link"
                name="link"
                value={template.link}
                onChange={handleChange}
              />
              {linkError && <p style={{ color: "red" }}>{linkError}</p>}
              <label htmlFor="scheduledTime">Scheduled Time</label>
              <input
                type="datetime-local"
                id="scheduledTime"
                name="scheduledTime"
                value={template.scheduledTime}
                onChange={handleChange}
              />
            </>
          )}
          {kind === "Notes" && (
            <>
              <label htmlFor="content">Notes Content</label>
              <textarea
                id="content"
                name="content"
                value={template.content}
                onChange={handleChange}
                placeholder="Write in Markdown"
              />
            </>
          )}
          {kind === "MCQ" && (
            <>
              <label htmlFor="questions">MCQ Questions</label>
              <input
                type="text"
                id="questions"
                name="questions"
                value={template.questions}
                onChange={handleChange}
                placeholder="Enter each question followed by a comma (,)"
              />
            </>
          )}
          {editMode && (
            <span>
              <input
                type="checkbox"
                name="isCompleted"
                id="isCompleted"
                checked={template.isCompleted}
                onChange={handleChange}
              />
              <label htmlFor="isCompleted">Is Completed</label>
            </span>
          )}
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
}

export default CreateMaterial;