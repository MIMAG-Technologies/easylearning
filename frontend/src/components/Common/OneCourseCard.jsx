import React from "react";
import { Link } from "react-router-dom";

function OneCourseCard() {
  const course = {
    _id: "courseId1",
    title: "Introduction to Python",
    price: 2999,
    category: "6650be0ca5f777b66e243a08",
    instructor: "userId",
    whatWillLearn: [
      "Learn Python basics",
      "Understand data types and structures",
      "Write basic programs in Python",
      "Implement functions and loops",
    ],
    description: "This course covers the basics of Python programming...",
    thumbnailUrl:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/14/b2d530f1ad11e7ab380fc0c6c817a8/Search-Thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=204&fit=crop&q=50",
    modules: [],
    reviews: [],
    studentsEnrolled: [],
    createdAt: "2024-05-24T12:00:00.000Z",
    updatedAt: "2024-05-24T12:00:00.000Z",
  };
  return (
    <Link to={"#"} className="OneCourseCard">
      <img src={course.thumbnailUrl} alt="" />
    </Link>
  );
}

export default OneCourseCard;
