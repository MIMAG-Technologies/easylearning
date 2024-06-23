import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="Main-AboutUs">
      <div className="sec1">
        <div className="slantLine"></div>
        <h4>ABOUT PSYCORTEX ONLINE EDUCATION</h4>
        <h1>Empowering Minds Globally</h1>
      </div>
      <div className="sec2">
        <p>
          Online Psycortex Education empowers individuals globally with
          meticulously curated mental health, well-being, and psychology
          courses. Founded to make the best education accessible to all, our
          platform offers personalized learning experiences to foster growth and
          resilience.
        </p>
        <p>
          Today, Online Psycortex connects millions worldwide with practical
          skills in stress management, emotional intelligence, and mindfulness.
          Collaborating with top experts, we provide tailored programs to
          enhance mental and emotional health, equipping learners to navigate
          life's complexities with confidence and achieve lasting fulfillment.
        </p>
      </div>
      <div className="sec3">
        <img src="\assets\goals.jpg" alt="" />
        <div>
          <h4>Our Goals</h4>
          <p>
            Online Psycortex Education believes in the transformative power of
            high-quality mental health and well-being education to create a
            better future for all. Through our platform, we envision a world
            where individuals everywhere have access to…
          </p>
          <ul>
            <li>Expert-led mental health and well-being courses.</li>
            <li>
              Personalized learning experiences for personal and professional
              growth.
            </li>
            <li>
              Accessible educational opportunities tailored to individual needs.
            </li>
          </ul>
        </div>
      </div>
      <div className="sec3">
        <div>
          <h4>Helping organizations foster mental well-being</h4>
          <p>
            Companies and institutions partner with Online Psycortex Education
            to bring high-quality mental health and well-being education to
            employees worldwide.
          </p>
          <p>
            On our platform, we offer a range of expertly designed courses,
            certifications, and personalized learning experiences. Our programs
            provide tools for stress management, emotional intelligence, and
            mindfulness, enhancing workplace resilience and productivity.
          </p>
          <p>
            Together with our partners, we are shaping the future of workplace
            well-being and preparing employees for a balanced, fulfilling life.
            Our innovative approaches ensure each learner's journey is
            impactful, fostering a lasting sense of mental and emotional health.
          </p>
        </div>
        <img src="\assets\corporates.jpg" alt="" />
      </div>
    </div>
  );
}

export default AboutUs;
