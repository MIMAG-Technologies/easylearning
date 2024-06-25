import React, { useState, useEffect, useRef } from "react";

function Stats() {
  const stats = [
    {
      title: "Number of Students",
      value: 500,
      bgColor: "#ffccc3",
      imgSrc: "/assets/stat1.png",
    },
    {
      title: "Number of Teacher",
      value: 10,
      bgColor: "#f8cef9",
      imgSrc: "/assets/stat1.png",
    },
    {
      title: "Number of Courses",
      value: 50,
      bgColor: "#f9ecbe",
      imgSrc: "/assets/stat1.png",
    },
    {
      title: "Number of Categories",
      value: 10,
      bgColor: "#d5d4ea",
      imgSrc: "/assets/stat1.png",
    },
  ];

  const [animatedStats, setAnimatedStats] = useState(
    stats.map((stat) => ({
      ...stat,
      animatedValue: 0,
    }))
  );

  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: window.innerWidth < 768 ? 0.5 : 0.75, // Adjust threshold for smaller screens
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateStats = () => {
    const duration = 5000; // 5 seconds in milliseconds
    const startTime = performance.now();

    const updateStats = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      const newStats = stats.map((stat) => ({
        ...stat,
        animatedValue: Math.min(
          stat.value,
          Math.floor((elapsed / duration) * stat.value)
        ),
      }));

      setAnimatedStats(newStats);

      if (elapsed < duration) {
        requestAnimationFrame(updateStats);
      }
    };

    requestAnimationFrame(updateStats);
  };

  return (
    <div className="Stats" ref={statsRef}>
      <h1>A Platform Trusted by Students Worldwide</h1>
      <p>
        Our platform has earned the trust of students worldwide by consistently
        delivering exceptional educational experiences in mental health,
        well-being, and psychology. With a commitment to excellence and
        innovation, we provide a diverse range of courses designed to meet the
        evolving needs of our global community. Through rigorous adherence to
        evidence-based practices and expert-led instruction, we empower
        individuals to navigate life's challenges and cultivate resilience. Our
        dedication to inclusivity ensures that everyone, regardless of
        background or location, can access transformative learning opportunities
        that promote personal growth and happiness.
      </p>
      <div className="statsdiv">
        {animatedStats.map((stat) => (
          <div
            className="stat"
            key={stat.title}
            style={{
              backgroundColor: stat.bgColor,
            }}
          >
            <h3>{Math.floor(stat.animatedValue)}+</h3>
            <p>{stat.title}</p>
            <img src={stat.imgSrc} alt={stat.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
