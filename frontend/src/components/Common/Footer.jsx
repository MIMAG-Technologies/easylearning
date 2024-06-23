import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

function Footer() {
  const footerLinks = [
    [
      { title: "Psycortex Online Education", ref: "heading" },
      { title: "About", ref: "/aboutus" },
      { title: "Mission, Vision & Values", ref: "/mission-vision-and-values" },
      { title: "Offices", ref: "/offices" },
      { title: "Careers", ref: "/carrer" },
    ],
    [
      { title: "Community", ref: "heading" },
      { title: "Blogs", ref: "/blogs" },
      { title: "For Individuals", ref: "#" },
      { title: "For Corporates", ref: "#" },
      { title: "For Universities", ref: "#" },
      { title: "For Governments", ref: "#" },
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
        <div className="footer-right">
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
          <img src="/assets/logo/PsycortexLogo.png" alt="" />
        </div>
      </div>
      <div className="socialLinks">
        <p>
          © {currentYear} Psycortex Online Education Inc. All Rights Reserved.
        </p>
        <span>
          <Link to={"/psycortex-online-education/privacypolicy"}>
            Privacy Policy
          </Link>
          <Link to={"/psycortex-online-education/termsandcondition"}>
            Terms & Conditions
          </Link>
          <Link to={"/psycortex-online-education/returnpolicy"}>
            Refund Policy
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
