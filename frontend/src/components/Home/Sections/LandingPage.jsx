import { Link } from "react-router-dom";
import LandingPageImg from "../../../assets/Images/LandingPageImg.png";

function LandingPage() {
  return (
    <div className="LandingPage">
      <div>
        <h1>Learn without limits</h1>
        <p>
          Start, switch, or advance your career with more than 7,000 courses,
          Professional Certificates, and degrees from world-class universities
          and companies
        </p>

        <Link to={"/auth/signin/student"}>Join for Free</Link>
      </div>
      <img src={LandingPageImg} alt="" />
    </div>
  );
}

export default LandingPage;
