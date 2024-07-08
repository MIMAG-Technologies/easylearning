import React, { useState } from "react";

function AboutUs() {
  const msv = [
    {
      title: "Mission",
      p: "Our mission is to empower individuals to enhance their mental health, well-being, and overall happiness through accessible, high-quality educational courses. We strive to provide evidence-based, personalized learning experiences that foster personal growth, resilience, and a thriving community.",
      img: "/assets/mission.png",
      primaryColor: "rgb(236,245,255)",
      hoverColor: "rgb(218,242,255)",
    },
    {
      title: "Vision",
      p: "Our vision is to create a world where everyone has the knowledge and resources to achieve optimal mental well-being and happiness. We aim to be the leading platform for well-being and psychological education, inspiring and supporting millions of people on their journey to a fulfilling and balanced life.",
      img: "/assets/vision.png",
      primaryColor: "rgb(255,244,233)",
      hoverColor: "rgb(255,239,210)",
    },
    {
      title: "Values",
      p: "At the heart of our organization lies a steadfast commitment to excellence, inclusivity, integrity, community, personalization, and growth. We are dedicated to providing the highest quality courses, meticulously grounded in the latest scientific research and delivered by seasoned professionals.",
      img: "/assets/values.png",
      primaryColor: "rgb(225,255,239)",
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
        At our core, we are dedicated to empowering individuals to achieve their
        fullest potential through a diverse range of courses on well-being and
        mental health. Our platform offers a comprehensive selection of expertly
        crafted programs designed to enhance mental health, foster personal
        growth, and promote overall happiness. From foundational courses in
        mental health and emotional intelligence to advanced strategies for
        stress management and mindfulness, our curriculum is rooted in the
        latest scientific research and tailored to meet the unique needs of
        every learner. By providing a holistic approach to well-being, we ensure
        that our users have access to the tools and knowledge necessary to
        navigate life’s challenges and thrive in all aspects. Our supportive
        community, engaging content, and personalized learning experiences
        create an environment where you can not only learn but also grow and
        prosper.
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
