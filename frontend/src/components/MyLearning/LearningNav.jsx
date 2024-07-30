import React, { useEffect, useState } from "react";
import "./MyLearning.css";
import {
  Circle,
  Pencil,
  CirclePlus,
  X,
  SquareChevronRight,
  Trash2,
} from "lucide-react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getUserCourse } from "../utils/courseUtils";
import { AuthContext } from "../../context/AuthContext";
import { DeleteModule } from "../utils/moduleUtils";
import { toast } from "react-toastify";

function LearningNav() {
  const { user } = React.useContext(AuthContext);
  const { userId, courseId, moduleId } = useParams();
  const [course, setCourse] = useState(null);
  const [isSideMenuOn, setisSideMenuOn] = useState(false);
  const { pathname } = useLocation();
  const loc = useLocation();
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const response = await getUserCourse(userId);
      const selectedCourse = response.courses.find((c) => c._id === courseId);
      setCourse(selectedCourse);
      // console.log(selectedCourse);
      return selectedCourse;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteMod = async (moduleId) => {
    // Show confirmation dialog
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Module? All Material Associated With this Module Also be deleted ! This action cannot be reversed."
    );

    if (userConfirmed) {
      // Proceed with deletion if user confirms
      const res = await DeleteModule(moduleId);
      if (res === 200) {
        toast.success("Module deleted successfully!");
        fetchCourse();
      } else {
        toast.error("Failed to delete Module!");
      }
    } else {
      // Do nothing if user cancels
      toast.info("Deletion canceled.");
    }
  };
  useEffect(() => {
    setisSideMenuOn(false);
  }, [pathname]);

  useEffect(() => {
    const fetchAndNavigate = async () => {
      const selectedCourse = await fetchCourse();
      if (
        selectedCourse &&
        loc.pathname === `/mylearning/${userId}/${courseId}`
      ) {
        navigate(
          `/mylearning/${userId}/${courseId}/module/${
            selectedCourse.modules.length !== 0
              ? selectedCourse.modules[0]._id
              : "no-module"
          }`
        );
      }
    };

    fetchAndNavigate();
  }, [courseId, loc.pathname, navigate]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="LearningNav">
      {isSideMenuOn ? (
        <X
          style={{
            right: isSideMenuOn ? "10px" : "",
          }}
          className="LN-icons"
          onClick={() => {
            setisSideMenuOn(!isSideMenuOn);
          }}
        />
      ) : (
        <span
          style={{
            left: !isSideMenuOn ? "10px" : "",
          }}
          className="LN-icons"
          onClick={() => {
            setisSideMenuOn(!isSideMenuOn);
          }}
        >
          <SquareChevronRight />
          Menu
        </span>
      )}
      <section
        className="module-nav"
        style={{
          left: isSideMenuOn ? "0px" : "-100%",
        }}
      >
        <span>
          <h4>{course.title}</h4>
          <p>{course.providingInstitution}</p>
        </span>
        <h4>Course Modules</h4>

        {user.role !== "student" && (
          <Link
            to={"create-module"}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "#f1f1f1",
              color: "black",
            }}
          >
            <CirclePlus /> Add Module
          </Link>
        )}
        <div>
          {course.modules.map((module) => (
            <div
              onClick={() => {
                if (user.role === "student") {
                  navigate(
                    `/mylearning/${userId}/${courseId}/module/${module._id}`
                  );
                }
              }}
              key={module._id}
              style={{
                cursor: user.role === "student" ? "pointer" : "auto",
              }}
              className={`module-item ${
                module._id === moduleId && "module-active"
              }`}
            >
              <Circle />
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(
                    `/mylearning/${userId}/${courseId}/module/${module._id}`
                  );
                }}
              >
                Module {module.order}
              </p>
              {user.role !== "student" && (
                <>
                  <Link
                    to={`edit-module/${module._id}`}
                    style={{
                      marginLeft: "auto",
                      marginRight: "10px",
                    }}
                  >
                    <Pencil />
                  </Link>
                  <Link
                    onClick={() => {
                      deleteMod(module._id);
                    }}
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <Trash2 />
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
        <h4>
          <Link to="#">Certificates</Link>
        </h4>
        <h4>
          <Link to="discussion">Messages</Link>
        </h4>
      </section>
      <Outlet />
    </div>
  );
}

export default LearningNav;
