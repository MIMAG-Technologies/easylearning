import React from "react";
import { Link } from "react-router-dom";

function OutCome() {
  return (
    <div className="OutCome">
      <img src="\assets\outcomes.png" alt="" />
      <div>
        <h1>Learner outcomes on Easy Learning</h1>
        <p>
          77% of learners report career benefits, such as new skills, increased
          pay, and new job opportunities.
        </p>
        <Link to={"/auth/signin/student"}>Join for free</Link>
      </div>
    </div>
  );
}

export default OutCome;
