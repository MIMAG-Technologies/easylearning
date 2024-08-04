import React, { useEffect, useState, useContext } from "react";
import "./Payment.css";
import { fetchCourse, enrollCourse } from "../utils/courseUtils";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { initiateTransaction } from "../utils/paymentUtils.js";
import { toast } from "react-toastify";

function Payment() {
  const { id } = useParams();
  const courseId = atob(id);
  const [course, setCourse] = useState({});
  const [haveToUpdateAddress, setHaveToUpdateAddress] = useState(false);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    let intervalId = setInterval(() => {
      const status = localStorage.getItem("isTransactionDone");

      if (status === "success" || status === "failure") {
        localStorage.removeItem("isTransactionDone");
        localStorage.removeItem("TransactionToken");
        localStorage.removeItem("transactionPaymentAmount");
        if (status === "success") {
          toast.success("Payment completed!");
          doEnroll();
          navigate("/dashboard/mylearning");
        } else if (status === "failure") {
          toast.error("Failed to Make Payment!");
          navigate(-1);
        }
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const doEnroll = async () => {
    setIsLoading(true);
    try {
      await enrollCourse(user.email, courseId);
      toast.success("Course Enrolled Successfully!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Course enrollment failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitiateTransaction = async () => {
    const res = await initiateTransaction(user.id, courseId, `${course.price}`);
    if (res.status === 200) {
      localStorage.setItem("TransactionToken", res.token);
      localStorage.setItem("transactionPaymentAmount", course.price);
      setIsPaymentInitiated(true);
      toast.info("Transaction Initiated!");
    } else if (res.status === 400) {
      setIsPaymentInitiated(true);
      setHaveToUpdateAddress(true);
      toast.error(
        "Please Update Your Address from Profile Section and try Again!!"
      );
    } else if (res.status === 401) {
      toast.warn("You are  already enrolled in this course");
    } else {
      toast.error("Failed to initiate transaction");
    }
  };

  if (isLoading) {
    return <p>Loading course...</p>;
  }

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
          <input type="checkbox" id="ticktermandcondition" /> You agree to all
          the terms & conditions mentioned on the website. No charge back would
          be entertained once the payment is completed.
        </label>
        {!isPaymentInitiated && (
          <a className="card__cta cta" onClick={handleInitiateTransaction}>
            Initiate Transaction
          </a>
        )}
        {isPaymentInitiated && haveToUpdateAddress && (
          <Link className="card__cta cta" to="/dashboard/myprofile">
            Go To Profile Section
          </Link>
        )}
        {isPaymentInitiated && !haveToUpdateAddress && (
          <>
            <label id="wordline-select">
              <input type="radio" checked />
              Pay with Worldline
              <img src="/assets/worldline-logo.svg" alt="Worldline" />
            </label>
            <a className="card__cta cta" id="btnSubmit">
              Checkout
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
