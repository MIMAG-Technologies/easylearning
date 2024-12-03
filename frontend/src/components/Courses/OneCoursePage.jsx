import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProfilePhoto from "../../assets/Images/profile-pic.png";
import { fetchCourse } from "../utils/courseUtils";
import {
  Check,
  ChevronDown,
  CirclePlus,
  PenLine,
  Star,
  Trash2,
} from "lucide-react";
import Markdown from "react-markdown";
import { DeleteModule } from "../utils/moduleUtils";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

function OneCoursePage() {
  const { courseId } = useParams();
  const decodedcourseId = atob(courseId);
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);
  const { cart, setCart } = useContext(AuthContext);
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
  const fetchCoursesData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCourse(decodedcourseId);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const addToCart = () => {
    const existingCart = cart;
    const productIndex = existingCart.findIndex(
      (item) => item.id === decodedcourseId
    );

    if (productIndex !== -1) {
      // Update quantity if the product with the same variant already exists
      existingCart[productIndex].quantity += 1;
    } else {
      const cartItem = {
        id: decodedcourseId,
        title: course.title,
        price: course.price,
        quantity: 1,
        level: course.level,
        expectedDuration: course.expectedDuration,
      };
      existingCart.push(cartItem);
    }

    setCart([...existingCart]);
    toast.success("Course added to cart!");
  };

  const avgrating = (rating) => {
    if (rating.length === 0) {
      return 0; // Return 0 or another appropriate value when there are no ratings
    }
    let sum = 0;
    rating.forEach((element) => {
      sum += element.rating;
    });
    return sum / rating.length;
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
                  <Link to={`/user/teacher/${course.instructor._id}`}>
                    {course.instructor.name}
                  </Link>
                </p>
                <span className="enrollprice">
                  <button
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={addToCart}
                    // id="btnSubmit"
                  >
                    Add to Cart
                  </button>
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
                <h3>{avgrating(course.reviews)}</h3>
                <Star color="#702b88" size={20} className="ccardstar" />
                <p>({course.reviews.length} reviews)</p>
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
                        <>
                          <Link to={`edit-module/${module._id}`}>
                            <PenLine />
                          </Link>
                          <Link
                            onClick={() => {
                              deleteMod(module._id);
                            }}
                            className="addModule"
                          >
                            <Trash2 />
                          </Link>
                        </>
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
