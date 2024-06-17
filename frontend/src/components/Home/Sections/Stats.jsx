import React, { useState, useEffect, useRef } from "react";

function Stats() {
  const stats = [
    {
      title: "Number of Students",
      value: 10000,
      bgColor: "#ffccc3",
      imgSrc: "/assets/stat1.png",
    },
    {
      title: "Number of Teacher",
      value: 30,
      bgColor: "#f8cef9",
      imgSrc: "/assets/stat1.png",
    },
    {
      title: "Number of Courses",
      value: 500,
      bgColor: "#f9ecbe",
      imgSrc: "/assets/stat1.png",
    },
    {
      title: "Year of Experience",
      value: 9,
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
      { threshold: 0.5 }
    ); // Trigger animation when at least 50% of the component is visible

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateStats = () => {
    const duration = 5000; // 7 seconds in milliseconds
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        aliquid quisquam cupiditate, similique aspernatur qui, dolore nihil ab
        non, facilis quasi. Ullam quisquam optio, necessitatibus tempora eum
        iure adipisci provident!
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
            <h3>{stat.animatedValue}+</h3>
            <p>{stat.title}</p>
            <img src={stat.imgSrc} alt={stat.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
