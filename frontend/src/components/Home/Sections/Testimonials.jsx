import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Testimonials() {
  const testimonialData = [
    {
      name: "Anamika Debnath",
      job: "Student",
      message:
        "The courses not only helped me focus on my mental health but also encouraged me to explore new topics and strategies for self-improvement. Thank you, Psycortex Online Education, for providing such supportive and understanding instructors. Your guidance has truly helped me grow. Thank you so much, Psycortex Online Education, you are the best.",
    },
    {
      name: "Vijayshree Joshi",
      job: "Student",
      message:
        "I highly recommend the online courses from Psycortex Online Education. Despite the extensive material, the instructors make complex topics easy to understand. I've found the courses extremely beneficial for my personal growth. Thank you from the bottom of my heart. The online platform is user-friendly and effective. Excellent learning experience.",
    },
    {
      name: "Ramesh Babu",
      job: "Student",
      message:
        "The positive changes in my mindset and the way the courses have transformed my approach to challenges make me feel so satisfied and happy. I would highly recommend Psycortex Online Education. It has given me a new perspective on life! Thanks, Psycortex Online Education.",
    },
    {
      name: "Neha Nimran",
      job: "Student",
      message:
        "The instructors at Psycortex Online Education are really good listeners; they show empathy and understanding. There is a sense of security knowing you are learning from the best. I wish them all the best and will recommend Psycortex Online Education to everyone looking to improve their mental health. The online platform is smooth and easy to navigate.",
    },
    {
      name: "Urvashi Soni",
      job: "Student",
      message:
        "The service that I receive from Psycortex Online Education is excellent. The instructors and staff are friendly and very understanding about the issues we face. Very helpful, I would have no qualms in recommending them to family and friends.",
    },
    {
      name: "Piyush Dethe",
      job: "Student",
      message:
        "Psycortex Online Education is incredible. Not only have they taken great care of my mental health through their courses, but they are also lovely to interact with during every session. It's rare to find a platform like this; I highly recommend their courses.",
    },
    {
      name: "Deoki Nandan",
      job: "Student",
      message:
        "The instructors at Psycortex Online Education are very good educators, and their behavior is excellent. They try to extend help to the students in every possible way. The support team is very polite and helpful too.",
    },
    {
      name: "Sheetal Ahuja",
      job: "Student",
      message:
        "During the pandemic, my son was struggling with stress and anxiety. I was really worried about his mental state. Then I came across Psycortex Online Education. The courses did a wonderful job helping him overcome these issues. Thank you, Psycortex Online Education.",
    },
    {
      name: "Misty Johnson",
      job: "Student",
      message:
        "In particular, my personal life has flourished as a result of all the excellent things I've learned and the ways in which the courses have transformed me. I would highly suggest Psycortex Online Education due to the outstanding care and education they provide. For me, it's like being given a second chance at life. Psycortex Online Education, you have been greatly valued.",
    },
    {
      name: "Megha",
      job: "Student",
      message:
        "Psycortex Online Education is the ideal place where I have been able to pursue my aspirations and improve my mental health. Thank you very much for this wonderful online learning experience. I am fortunate to have access to such knowledgeable and caring instructors. Thank you very much, Psycortex Online Education. Excellent educators.",
    },
  ];

  const CardLoaders = () => {
    return testimonialData.map((onecard, index) => (
      <SwiperSlide>
        <div
          className="one-testimonial"
          key={index}
          // ref={(el) => el && observedElements.current.push(el)}
        >
          <i
            className="fa-solid fa-quote-right"
            style={{ color: "#ffffff" }}
          ></i>
          <p>{onecard.message}</p>
          <div className="whowrotethat">
            <span>
              <h3>{onecard.name}</h3>
              <p>{onecard.job}</p>
            </span>
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className="Testimonials">
      <h1>From the Psycortex Online Education community</h1>
      <p> 148+ million people have already joined Psycortex Online Education</p>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {CardLoaders()}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ChevronLeft />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ChevronRight />
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Testimonials;
