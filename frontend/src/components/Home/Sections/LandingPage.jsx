import { Link } from "react-router-dom";
import { Brain, Settings } from "lucide-react";
import { useState, useEffect } from "react";

function LandingPage() {
  const [currentKW, setCurrentKW] = useState(0);
  const [scrollRange, setScrollRange] = useState(0); // New state for smooth scroll
  const [isVisible, setIsVisible] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false); // State to track image preloading
  const CONTAINER_HEIGHT = 350; // Height of the container in vh

  const keywords = [
    {
      word: "Grow",
      description:
        "Unlock your potential with our mental health and happiness courses, designed to transform you with science-backed strategies and personalized learning experiences tailored to your needs and goals.",
      color: "#ed6750",
      imgSrc: "/assets/nurture.png",
    },
    {
      word: "Achieve",
      description:
        "Unlock your potential with our mental health and happiness courses designed to help you achieve your goals. Our curriculum provides tools to manage stress, build resilience, and positivity.",
      color: "#ef64f2",
      imgSrc: "/assets/goal.png",
    },
    {
      word: "Prosper",
      description:
        "Our curriculum, grounded in scientific research, offers practical strategies to boost your well-being . Integrating mindfulness and stress management, our courses offer a holistic approach.",
      color: "#e2b102",
      imgSrc: "/assets/peace.png",
    },
    {
      word: "Thrive",
      description:
        "Empower yourself with tools and knowledge to thrive in all areas of life through our mental health and happiness courses. Our programs enhance emotional intelligence, and balance well-being.",
      color: "#6059ff",
      imgSrc: "/assets/intelligence.png",
    },
  ];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = keywords.map((keyword) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = keyword.imgSrc;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);
      setIsPreloaded(true);
    };

    preloadImages();
  }, [keywords]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;

      // Total height of the container in pixels
      const totalContainerHeightPx = (CONTAINER_HEIGHT * windowHeight) / 100;

      // Adjust calculation to change keywords at the correct time
      const scrollFraction =
        scrollTop / (totalContainerHeightPx - windowHeight);
      const currentSection = Math.min(
        Math.floor(scrollFraction * keywords.length),
        keywords.length - 1
      );

      // Update scrollRange for smooth scrolling
      const newScrollRange = Math.min(
        scrollFraction * (keywords.length - 1),
        keywords.length - 1
      );

      setScrollRange(newScrollRange);

      if (currentSection !== currentKW) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentKW(currentSection);
          setIsVisible(true);
        }, 300); // Timeout duration should match the CSS transition duration
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentKW, keywords.length]);

  const handleSliderChange = (event) => {
    const newKW = parseInt(event.target.value);
    if (newKW !== currentKW) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentKW(newKW);
        setIsVisible(true);
      }, 300); // Timeout duration should match the CSS transition duration
    }
  };

  if (!isPreloaded) {
    return <div>Loading...</div>; // Or a loader spinner
  }

  return (
    <div className="LandingPage" style={{ height: `${CONTAINER_HEIGHT}vh` }}>
      <div className="curve"></div>
      <div
        className="landinginfo"
        style={{
          marginBottom:
            window.innerWidth < 859
              ? currentKW > keywords.length - 2
                ? "60vh"
                : "0px"
              : "20vh",
        }}
      >
        <span>
          <h1>Learn to</h1>
          <h1
            className={`keyword-transition ${isVisible ? "visible" : ""}`}
            style={{
              color: keywords[currentKW].color,
              fontWeight: "700",
            }}
          >
            {keywords[currentKW].word}
          </h1>
        </span>
        <p>{keywords[currentKW].description}</p>

        <Link to={"/auth/login/student"}>Join Now</Link>
      </div>
      <div className="landingimg">
        <div className="contentdiv">
          <Settings
            strokeWidth={0.9}
            size={55}
            style={{
              fill: "gray",
              position: "absolute",
              left: "-27.5px",
              top: `${(scrollRange / keywords.length) * 100 + 4}%`,
              transform: `rotate(${
                (scrollRange / keywords.length) * 100 * 5
              }deg)`,
            }}
          />
          <Brain
            strokeWidth={0.9}
            size={55}
            style={{
              position: "absolute",
              right: "-27.5px",
              fill: "#ed6750",
              bottom: `${(scrollRange / keywords.length) * 100 + 4}%`,
              transform: `rotate(${
                (scrollRange / keywords.length) * 100 * 5
              }deg)`,
            }}
          />
          <div
            className={`landingimgcontainer ${isVisible ? "enter" : "exit"}`}
          >
            <img src={keywords[currentKW].imgSrc} alt="" />
          </div>
          <div className="progressbar">
            <input
              id="myRange"
              className="slider"
              value={scrollRange}
              max={keywords.length - 1}
              min="0"
              step="0.01"
              type="range"
              onChange={handleSliderChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
