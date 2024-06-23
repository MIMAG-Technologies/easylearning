import React from "react";
import { Link } from "react-router-dom";

function Carrer() {
  return (
    <div className="Carrer">
      <div className="sec2">
        <h4>Become an Instructor</h4>
        <p>
          Want to make a difference by working directly with learners? Consider
          becoming an instructor with Online Psycortex Education.
        </p>
        <p>
          Our courses prepare learners to enhance their mental well-being and
          emotional resilience. These immersive learning experiences equip
          learners with practical skills, comprehensive support services, and
          valuable resources they need to pursue life-changing personal growth.
        </p>
        <p>
          Our expert instructors are central to that mission. If you’re an
          experienced professional with expertise in mental health and a passion
          for education, visit the link below to see open instructor roles.
        </p>
        <Link to={"/apply-as-instructor"}> Apply Now</Link>
      </div>
    </div>
  );
}

export default Carrer;
