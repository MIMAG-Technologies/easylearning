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
      { title: "For Individuals", ref: "/courses?belongTo=For+Individuals" },
      { title: "For Corporates", ref: "/courses?belongTo=For+Corporates" },
      { title: "For Universities", ref: "/courses?belongTo=For+Universities" },
      { title: "For Governments", ref: "/courses?belongTo=For+Governments" },
    ],
  ];
  const socialLinks = {
    facebook: "https://www.facebook.com/psycortex.bt?mibextid=rS40aB7S9Ucbxw6v",
    twitter: "https://x.com/PPsycortex",
    linkedin: "http://www.linkedin.com/in/psycortex-private-limited-720289301",
    youtube: "https://www.youtube.com/@psycortex_private_limited",
    instagram: "https://www.instagram.com/psycortex_pvt_ltd/",
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
          © {currentYear} Psycortex Education - A Unit of Narayana Brahma Seva
          Trust. All Rights Reserved.
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
