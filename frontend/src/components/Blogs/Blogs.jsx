import React, { useEffect } from "react";
import data from "./Blogs.json";
import "./Blog.css";
import { Link } from "react-router-dom";

function Blogs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const truncateMarkdown = (markdown, length) => {
    // Remove Markdown headers and other unwanted characters
    let plainText = markdown
      .replace(/^###?\s+/gm, "") // Remove headers
      .replace(/(\[.*?\]\(.*?\))/g, "") // Remove Markdown links
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
      .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
      .replace(/(~|`)(.*?)\1/g, "$2") // Remove strikethrough/inline code
      .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
      .replace(/\n/g, " "); // Replace newlines with spaces
    return plainText.length > length
      ? plainText.substring(0, length) + "..."
      : plainText;
  };

  const oneblog = (blog) => {
    const plainTextContent = blog.content; // content is now treated as a single markdown string
    return (
      <div className="oneblog" key={blog.searchkey}>
        <img src={blog.img} alt="" />
        <Link to={`/blog/${blog.searchkey}`}>{blog.title}</Link>
        <div>
          <p className="lineP">{blog.by}</p>
          <p className="lineP">{blog.Date}</p>
          <p>{blog.tag}</p>
        </div>
        <span>
          {truncateMarkdown(plainTextContent, 200)}{" "}
          <Link to={`/blog/${blog.searchkey}`}>Read More</Link>
        </span>
      </div>
    );
  };

  return (
    <div id="Blogs">
      <div className="blog-container">{data.map((blog) => oneblog(blog))}</div>
    </div>
  );
}

export default Blogs;
