import React from "react";
import { Link } from "react-router-dom";

function OutCome() {
  return (
    <div className="OutCome">
      <img src="\assets\outcomes.png" alt="" />
      <div>
        <h1>Learner Outcomes On Psycortex Online Education</h1>
        <p>
          Through our meticulously curated courses in mental health, well-being,
          and psychology, individuals experience profound personal growth and
          enhanced resilience. Learners gain practical skills in stress
          management, emotional intelligence, and mindfulness, equipping them to
          navigate life's complexities with confidence and clarity. Our
          personalized learning approach ensures that each learner receives
          tailored guidance and support, fostering a deeper understanding and
          application of course material to real-life situations. As a result,
          our students not only improve their mental and emotional health but
          also cultivate a lasting sense of fulfilment and purpose
        </p>
        <Link to={"/auth/signin/student"}>Join Now</Link>
      </div>
    </div>
  );
}

export default OutCome;
