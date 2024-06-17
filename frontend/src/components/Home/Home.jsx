import Collaborations from "./Sections/Collaborations";
import ExploreCategories from "./Sections/ExploreCategories";
import LandingPage from "./Sections/LandingPage";
import NewCourses from "./Sections/NewCourses";
import OutCome from "./Sections/OutCome";
import Testimonials from "./Sections/Testimonials";
import "./Home.css";
import AboutUs from "./Sections/AboutUs";
import Stats from "./Sections/Stats";
function Home() {
  const isCollaboration = false;
  return (
    <>
      <LandingPage />
      {isCollaboration && <Collaborations />}
      <AboutUs />
      <NewCourses />
      <ExploreCategories />
      <Stats />
      <OutCome />
      <Testimonials />
    </>
  );
}

export default Home;
