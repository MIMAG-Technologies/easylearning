import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProfilePhoto from "../../assets/Images/profile-pic.png";
import { fetchCourse } from "../utils/courseUtils";
import { Check, ChevronDown, CirclePlus, PenLine, Star } from "lucide-react";
import Markdown from "react-markdown";

function OneCoursePage() {
  const { id } = useParams();
  const courseId = atob(id);
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);

  const fetchCoursesData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCourse(courseId);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const toggleModuleDetails = (index) => {
    setExpandedModuleIndex(expandedModuleIndex === index ? null : index);
  };

  const loc = useLocation();

  return (
    <>
      {!isLoading && (
        <div
          className="OneCoursePage"
          style={{
            paddingTop: loc.pathname.includes("/admin/course-management")
              ? "0vh"
              : "",
            marginBottom: loc.pathname.includes("/admin/course-management")
              ? "10vh"
              : "0vh",
          }}
        >
          <div>
            <div className="bacgroudcolor"></div>
            <div className="onecourserhs">
              <section id="overview">
                <h1>{course.title}</h1>
                <p>Provided by {course.providingInstitution}</p>
                <p>
                  <img
                    src={
                      course.instructor.profilePhotoUrl === ""
                        ? ProfilePhoto
                        : course.instructor.profilePhotoUrl
                    }
                    alt=""
                  />
                  Instructors:
                  <Link>{course.instructor.name}</Link>
                </p>
                <span className="enrollprice">
                  <button>Enroll now</button>
                  <p>{"Price: Rs " + course.price}</p>
                </span>
                <p>
                  <b>{course.studentsEnrolled.length}</b> already enrolled
                </p>
              </section>
              <nav className="oneCourseNavbar">
                <a href="" className="activeNavcourse">
                  About
                </a>
                <a href="#modules">Modules</a>
                <a href="">Reviews</a>
              </nav>
              <section id="about">
                <h3>What you'll learn</h3>
                <div id="whatwillyoulearn">
                  {course.whatWillLearn.map((point, index) => (
                    <p key={index}>
                      <Check /> {point}
                    </p>
                  ))}
                </div>
              </section>
            </div>
            <div className="coursedescard">
              <h3>Course</h3>
              <p>Gain insight into a topic and learn the fundamentals</p>
              <div className="line"></div>
              <span>
                <h3>0.0</h3>
                <Star color="#702b88" size={20} className="ccardstar" />
                <p>(0 reviews)</p>
              </span>
              <h3>{course.level}</h3>
              <h3>{course.expectedDuration} (approximately)</h3>
              <h3>Flexible schedule</h3>
              <p>Learn at your own pace</p>
              <div className="line"></div>
              <a href="#">View course modules</a>
            </div>
          </div>
          <div id="earncertificate">
            <span>
              <h2>Earn a career certificate</h2>
              <p>
                Add this credential to your LinkedIn profile, resume, or CV
                Share it on social media and in your performance review
              </p>
            </span>
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/de1a6556fbe605411e8c1c2ca4ba45f1.png?auto=format%2Ccompress&dpr=1&w=333&h=215&q=40"
              alt=""
            />
          </div>
          <section id="modules">
            <h3>There are {course.modules.length} modules in this course</h3>
            <div className="mkd">
              <Markdown>{course.description}</Markdown>
            </div>
            {loc.pathname.includes("/admin/course-management") && (
              <Link to={`create-module`} className="addModule">
                <CirclePlus />
                Add Module
              </Link>
            )}
            <div className="all_modules">
              {course.modules.map((module, index) => (
                <>
                  <div key={index} className="one_module">
                    <span className="module_text">
                      <h3>{module.title}</h3>
                      <p>
                        Module {module.order} ● {module.timeToComplete} hours to
                        complete
                      </p>
                    </span>
                    <span
                      className="module_details"
                      onClick={() => toggleModuleDetails(index)}
                    >
                      {window.innerWidth > 600 && <h3>Module Details</h3>}
                      <ChevronDown />
                      {loc.pathname.includes("/admin/course-management") && (
                        <Link to={`edit-module/${module._id}`}>
                          <PenLine />
                        </Link>
                      )}
                    </span>
                  </div>
                  <p
                    className="module_about"
                    style={{
                      transition: "all 5s ease-in-out",
                      height: expandedModuleIndex === index ? "auto" : "0",
                    }}
                  >
                    <Markdown>{module.about}</Markdown>
                  </p>
                  {index !== course.modules.length - 1 && (
                    <div className="line"></div>
                  )}
                </>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default OneCoursePage;
