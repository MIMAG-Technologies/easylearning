import Collaborations from "./Sections/Collaborations";
import ExploreCategories from "./Sections/ExploreCategories";
import LandingPage from "./Sections/LandingPage";
import NewCourses from "./Sections/NewCourses";
import OutCome from "./Sections/OutCome";
import Testimonials from "./Sections/Testimonials";
import "./Home.css";
function Home() {
  return (
    <>
      <LandingPage />
      <Collaborations />
      <NewCourses />
      <ExploreCategories />
      <OutCome />
      <Testimonials />
    </>
  );
}

export default Home;
