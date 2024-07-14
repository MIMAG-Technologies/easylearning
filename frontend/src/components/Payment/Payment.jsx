import React, { useEffect, useState, useContext } from "react";
import "./Payment.css";
import { fetchCourse, enrollCourse } from "../utils/courseUtils";
import { AuthContext } from "../../context/AuthContext";

import { useParams } from "react-router-dom";

function Payment() {
  const { id } = useParams();
  const courseId = atob(id);
  const [course, setCourse] = useState({});
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ispaymentDone, setispaymentDone] = useState(false);

  const fetchCoursesData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCourse(courseId);
      setCourse(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCoursesData();
  }, []);

  if (isLoading) {
    return <p>Loading course...</p>;
  }

  const doEnroll = async () => {
    setIsLoading(true);
    try {
      await enrollCourse(user.email, courseId);
      alert("Course enrolled successfully!");
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Course failed to be enroll ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cards__inner">
      <div className="cards__card card">
        <p className="card__heading">{course.title}</p>
        <p className="card__price">₹ {course.price.toLocaleString()}</p>
        <ul className="card_bullets flow" role="list">
          <li>Course by {course.providingInstitution}</li>
          <li>{course.expectedDuration} long course</li>
          <li>{course.level} level Course</li>
        </ul>
        <label htmlFor="ticktermandcondition">
          <input type="checkbox" name="" id="ticktermandcondition" /> Please
          tick this to continue.By ticking this you will agree to our term and
          conditions
        </label>
        {ispaymentDone ? (
          <a className="card__cta cta" onClick={doEnroll}>
            Continue
          </a>
        ) : (
          <a className="card__cta cta" id="btnSubmit">
            <span
              onClick={() => {
                setispaymentDone(!ispaymentDone);
              }}
            >
              Checkout
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

export default Payment;
