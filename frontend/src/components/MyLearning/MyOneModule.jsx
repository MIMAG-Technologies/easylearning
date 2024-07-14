import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchModule } from "../utils/moduleUtils";
import { fetchMaterial } from "../utils/materialUtils";
import {
  CirclePlus,
  NotebookPen,
  PenLine,
  ScrollText,
  Video,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

function MyOneModule() {
  const { user } = useContext(AuthContext);
  const loc = useLocation();
  const { moduleId, courseId } = useParams();
  const [moduleInfo, setModuleInfo] = useState(null);
  const [material, setMaterial] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const getModule = async () => {
    try {
      const response = await fetchModule(courseId, moduleId);
      setModuleInfo(response);
    } catch (error) {
      console.error("Error fetching module:", error);
    }
  };

  const getMaterial = async () => {
    try {
      const response = await fetchMaterial(moduleId);
      setMaterial(response);
    } catch (error) {
      console.error("Error fetching material:", error);
    }
  };
  useEffect(() => {
    getModule();
    getMaterial();
  }, [moduleId, courseId]);

  useEffect(() => {
    getMaterial();
  }, [loc.pathname]);

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${dateTime.toString().substr(0, 3)} ${dateTime.getDate()} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][dateTime.getMonth()]
    } ${dateTime.getFullYear()} ${formattedHours}:${minutes}${ampm.toLowerCase()}`;
  }

  if (!moduleInfo || !material) {
    return (
      <section className="module-container">
        <h1>
          {moduleId === "no-module"
            ? "There are no Modules here to display"
            : "Loading..."}
        </h1>
      </section>
    );
  }

  return (
    <section className="module-container">
      <h3>{moduleInfo.title}</h3>
      <p>{moduleInfo.about}</p>
      <div className="line"></div>
      {user.role !== "student" && (
        <div
          className="add-options"
          style={{
            justifyContent: isVisible ? "space-evenly" : "flex-end",
          }}
        >
          <Link
            to={"material/create/MCQ"}
            className={isVisible ? "add-option-visible" : ""}
            style={{ backgroundColor: "#ffeb3b" }}
          >
            <ScrollText />
            Add Quiz
          </Link>
          <Link
            to={"material/create/Notes"}
            className={isVisible ? "add-option-visible" : ""}
            style={{ backgroundColor: "#8bc34a" }}
          >
            <NotebookPen />
            Add Notes
          </Link>
          <Link
            to={"material/create/OnlineClassLink"}
            className={isVisible ? "add-option-visible" : ""}
            style={{ backgroundColor: "#2196f3" }}
          >
            <Video />
            Schedule Meet
          </Link>
          <button onClick={() => setIsVisible(!isVisible)}>
            <CirclePlus /> Add Material
          </button>
        </div>
      )}
      <div className="materialcontainer">
        {material.map((item, index) => (
          <div
            className="onematerial"
            key={index}
            style={{
              backgroundColor: item.isCompleted
                ? "#a5ffa5"
                : "rgb(222, 222, 222)",
            }}
          >
            {item.kind === "MCQ" ? (
              <ScrollText size={30} style={{ fill: "#ffeb3b" }} />
            ) : item.kind === "OnlineClassLink" ? (
              <Video size={30} style={{ fill: "#2196f3" }} />
            ) : (
              <NotebookPen size={30} style={{ fill: "#8bc34a" }} />
            )}
            <span>
              <h4>{item.title}</h4>
              <p>
                {item.kind === "MCQ"
                  ? `Quiz`
                  : item.kind === "OnlineClassLink"
                  ? `Online Session ● ${formatDateTime(item.scheduledTime)}`
                  : `Notes ● ${item.content.split(" ").length} words long`}
              </p>
            </span>
            {item.kind === "MCQ" && (
              <Link
                style={{
                  marginLeft: "auto",
                }}
                to={`doQuiz/${item._id}`}
              >
                Attempt Quiz
              </Link>
            )}
            {item.kind === "OnlineClassLink" && (
              <a
                style={{
                  marginLeft: "auto",
                }}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meet
              </a>
            )}

            {item.kind === "Notes" && (
              <Link
                style={{
                  marginLeft: "auto",
                }}
                to={`readNotes/${item._id}`}
              >
                Read Notes
              </Link>
            )}

            {user.role !== "student" && (
              <Link to={`material/edit/${item.kind}/${item._id}`}>
                <PenLine />
              </Link>
            )}
          </div>
        ))}
      </div>
      <Outlet />
    </section>
  );
}

export default MyOneModule;
