import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsonData from "./Blogs.json";

function Blog() {
  const { section } = useParams();
  const blog = jsonData.find((item) => item.searchkey === section);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const observedElements = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "scale(1)";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.transform = "scale(0.95)";
            entry.target.style.opacity = "0";
          }
        });
      },
      { threshold: 0.1 }
    );

    observedElements.current.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!blog) {
    return "NO BLOG FOUND";
  }

  return (
    <div className="One-Blog">
      <h1 ref={(el) => el && observedElements.current.push(el)}>
        {blog.title}
      </h1>
      <div>
        <p
          ref={(el) => el && observedElements.current.push(el)}
          className="lineP"
        >
          {blog.by}
        </p>
        <p
          ref={(el) => el && observedElements.current.push(el)}
          className="lineP"
        >
          {blog.Date}
        </p>
        <p ref={(el) => el && observedElements.current.push(el)}>{blog.tag}</p>
      </div>
      <img
        ref={(el) => el && observedElements.current.push(el)}
        src={blog.img}
        alt=""
      />
      <ReactMarkdown
        ref={(el) => el && observedElements.current.push(el)}
        remarkPlugins={[remarkGfm]}
      >
        {blog.content}
      </ReactMarkdown>
    </div>
  );
}

export default Blog;
