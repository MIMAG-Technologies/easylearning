import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ResoursesContext } from "../../../context/ResoursesContext";

function ExploreCategories() {
  const { categoriesList } = useContext(ResoursesContext);

  if (!Array.isArray(categoriesList)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ExploreCategories">
      <video autoPlay loop muted playsInline>
        <source
          src="\assets\bgvideo.mp4"
          type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'
        />
        Your browser does not support the video tag.
      </video>
      <h1>Explore Psycortex Online Education</h1>
      <div>
        <h3>Find Courses from the below Categories which suits you </h3>
        <span>
          <hr />
          <p>
            <span>{categoriesList.length}</span> Categories Available
          </p>
          <hr />
        </span>
        <div className="categories-div">
          {categoriesList.map((category) => {
            return (
              <Link
                key={category._id}
                className="category-item"
                to={`/courses?category=${encodeURIComponent(category.name)}`}
              >
                <img src="\assets\category.jpg" alt="" />
                <span>
                  <p>{category.name}</p>
                  <p style={{ color: "#373a3c" }}>
                    {category.numCourses} courses
                  </p>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreCategories;
