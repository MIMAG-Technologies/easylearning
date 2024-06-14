import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

function Footer() {
  const footerLinks = [
    [
      { title: "Psycortex Online Education", ref: "heading" },
      { title: "About", ref: "#" },
      { title: "What We Offer", ref: "#" },
      { title: "Leadership", ref: "#" },
      { title: "Careers", ref: "#" },
      { title: "Catalog", ref: "#" },
      { title: "Psycortex Online Education Plus", ref: "#" },
      { title: "Professional Certificates", ref: "#" },
      { title: "MasterTrack® Certificates", ref: "#" },
      { title: "Degrees", ref: "#" },
      { title: "For Enterprise", ref: "#" },
      { title: "For Government", ref: "#" },
      { title: "For Campus", ref: "#" },
      { title: "Become a Partner", ref: "#" },
      { title: "Social Impact", ref: "#" },
    ],
    [
      { title: "Community", ref: "heading" },
      { title: "Learners", ref: "#" },
      { title: "Partners", ref: "#" },
      { title: "Beta Testers", ref: "#" },
      { title: "Blog", ref: "#" },
      { title: "The Psycortex Online Education Podcast", ref: "#" },
      { title: "Tech Blog", ref: "#" },
      { title: "Teaching Center", ref: "#" },
    ],
    [
      { title: "More", ref: "heading" },
      { title: "Press", ref: "#" },
      { title: "Investors", ref: "#" },
      { title: "Terms", ref: "#" },
      { title: "Privacy", ref: "#" },
      { title: "Help", ref: "#" },
      { title: "Accessibility", ref: "#" },
      { title: "Contact", ref: "#" },
      { title: "Articles", ref: "#" },
      { title: "Directory", ref: "#" },
      { title: "Affiliates", ref: "#" },
      { title: "Modern Slavery Statement", ref: "#" },
      { title: "Manage Cookie Preferences", ref: "#" },
    ],
  ];
  const socialLinks = {
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="linksSection">
        {footerLinks.map((onesection, index) => (
          <div key={index}>
            <h3>{onesection[0].title}</h3>
            {onesection.slice(1).map((link, index) => (
              <Link to={link.ref} key={index}>
                {link.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="socialLinks">
        <p>
          © {currentYear} Psycortex Online Education Inc. All rights reserved.
        </p>
        <span>
          <Link to={socialLinks.facebook} target="_blank">
            <Facebook />
          </Link>
          <Link to={socialLinks.linkedin} target="_blank">
            <Linkedin />
          </Link>
          <Link to={socialLinks.twitter} target="_blank">
            <Twitter />
          </Link>
          <Link to={socialLinks.youtube} target="_blank">
            <Youtube />
          </Link>
          <Link to={socialLinks.instagram} target="_blank">
            <Instagram />
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
