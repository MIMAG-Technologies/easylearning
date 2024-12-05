import React from "react";
import { Link } from "react-router-dom";

function OutCome() {
  return (
    <div className="OutCome">
      <img src="\assets\outcomes.png" alt="" />
      <div>
        <h1>Learner Outcomes On Psycortex Online Education</h1>
        <p>
          Through our meticulously curated courses in mental health, individuals
          experience profound personal growth and enhanced resilience. Learners
          gain practical skills in stress management, emotional intelligence,
          and mindfulness, navigating life's complexities with confidence. Our
          personalized approach ensures tailored guidance, fostering a deeper
          understanding and application of course material. As a result, our
          students improve their mental and emotional health, cultivating a
          lasting sense of fulfillment and purpose.
        </p>
        <Link to={"/auth/login/student"}>Join Now</Link>
      </div>
    </div>
  );
}

export default OutCome;
