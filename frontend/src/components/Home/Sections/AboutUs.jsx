import React, { useState } from "react";

function AboutUs() {
  const msv = [
    {
      title: "Mission",
      p: "Lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliquy at voluptate velit esse cillum dolore magna",
      img: "/assets/mission.png",
      primaryColor: "rgb(241,250,255)",
      hoverColor: "rgb(218,242,255)",
    },
    {
      title: "Vision",
      p: "Lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliquy at voluptate velit esse cillum dolore magna",
      img: "/assets/vision.png",
      primaryColor: "rgb(255,249,238)",
      hoverColor: "rgb(255,239,210)",
    },
    {
      title: "Values",
      p: "Lorem ipsum dolor sit amet dolor sit amet, consectetur adipiscing elit sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliquy at voluptate velit esse cillum dolore magna",
      img: "/assets/values.png",
      primaryColor: "rgb(232,255,246)",
      hoverColor: "rgb(211,255,238)",
    },
  ];

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="AboutUs">
      <h1>What we do?</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        aliquid quisquam cupiditate, similique aspernatur qui, dolore nihil ab
        non, facilis quasi. Ullam quisquam optio, necessitatibus tempora eum
        iure adipisci provident!
      </p>
      <div className="msv">
        {msv.map((aspect, index) => (
          <div
            key={index}
            className="msv-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor:
                hoveredItem === index ? aspect.hoverColor : aspect.primaryColor,
            }}
          >
            <h3>{aspect.title}</h3>
            <p>{aspect.p}</p>
            <img src={aspect.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
