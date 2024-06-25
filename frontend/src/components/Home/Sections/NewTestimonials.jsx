import { useState } from "react";
import noProfilePhoto from "../../../assets/Images/profile-pic.png";

function NewTestimonials() {
  const [isHovered, setIsHovered] = useState(false);
  const testimonialData = [
    {
      name: "Rahul Sharma",
      job: "Student",
      message:
        "The service that I receive from Psycortex Online Education is excellent. The instructors and staff are friendly and very understanding about the issues we face.",
    },
    {
      name: "Pooja Verma",
      job: "Student",
      message:
        "I highly recommend the online courses from Psycortex Online Education. Despite the extensive material, the instructors make complex topics easy to understand.",
    },
    {
      name: "Vikram Singh",
      job: "Student",
      message:
        "The positive changes in my mindset and the way the courses have transformed my approach to challenges make me feel so satisfied and happy. I would highly recommend Psycortex Online Education.",
    },
    {
      name: "Anjali Gupta",
      job: "Student",
      message:
        "The instructors at Psycortex Online Education are really good listeners; they show empathy and understanding. There is a sense of security knowing you are learning from the best.",
    },
    {
      name: "Meera Patel",
      job: "Student",
      message:
        "The service that I receive from Psycortex Online Education is excellent. The instructors and staff are friendly and very understanding about the issues we face.",
    },
    {
      name: "Arjun Mehta",
      job: "Student",
      message:
        "Psycortex Online Education is incredible. Not only have they taken great care of my mental health through their courses, but they are also lovely to interact with during every session.",
    },
    {
      name: "Kiran Kumar",
      job: "Student",
      message:
        "The instructors at Psycortex Online Education are very good educators, and their behavior is excellent. They try to extend help to the students in every possible way.",
    },
    {
      name: "Nisha Reddy",
      job: "Student",
      message:
        "During the pandemic, my son was struggling with stress and anxiety. I was really worried about his mental state. Then I came across Psycortex Online Education. The courses did a wonderful job.",
    },
    {
      name: "Rohit Bansal",
      job: "Student",
      message:
        "In particular, my personal life has flourished as a result of all the excellent things I've learned and the ways in which the courses have transformed me. I would highly suggest Psycortex Online Education.",
    },
    {
      name: "Priya Desai",
      job: "Student",
      message:
        "Psycortex Online Education is the ideal place where I have been able to pursue my aspirations and improve my mental health. Thank you very much for this wonderful online learning experience.",
    },
  ];

  const oneTestimonialCard = (person) => {
    return (
      <div
        className="oneTestimonialCard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <img src={noProfilePhoto} alt="" />
          <span>
            <h4>{person.name}</h4>
            <p>{person.job}</p>
          </span>
        </div>
        <h4>{person.message}</h4>
      </div>
    );
  };

  return (
    <div className="NewTestimonials">
      <h1>See What Our Community Say</h1>
      <div className={`alltestmonials ${isHovered ? "hovered" : ""}`}>
        <div className="one-row">
          {testimonialData.slice(0, 4).map((person, index) => {
            return oneTestimonialCard(person);
          })}
          {testimonialData.slice(0, 4).map((person, index) => {
            return oneTestimonialCard(person);
          })}
        </div>
        <div className="one-row">
          {testimonialData.slice(5, 10).map((person, index) => {
            return oneTestimonialCard(person);
          })}
          {testimonialData.slice(5, 10).map((person, index) => {
            return oneTestimonialCard(person);
          })}
        </div>
      </div>
    </div>
  );
}

export default NewTestimonials;
