import React, { useState } from "react";
import { Link } from "react-router-dom";

function ExploreCategories(props) {
  const { categoriesList } = props;
  return (
    <div className="ExploreCategories">
      <h1>Explore Easy Learning</h1>
      <div>
        {categoriesList.map((category) => {
          return (
            <Link key={category._id} className="category-item">
              <img src="\assets\category.jpg" alt="" />
              <span>
                <p>{category.name}</p>
                <p style={{ color: "#373a3c" }}>
                  {" "}
                  {category.numCourses} courses{" "}
                </p>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreCategories;
