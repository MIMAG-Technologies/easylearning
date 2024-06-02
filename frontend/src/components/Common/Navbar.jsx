import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [translated, setTranslated] = useState(false);

  const handleScroll = () => {
    if (!translated && window.scrollY >= window.innerHeight * 0.06) {
      setTranslated(true);
    } else if (translated && window.scrollY < window.innerHeight * 0.06) {
      setTranslated(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <nav
      id="CommonNavbar"
      style={{ transform: `translateY(${translated ? "-6vh" : "0"})` }}
    >
      <div className="upperNav">
        <Link className="sector-active"> For Individuals</Link>
        <Link> For Businesses</Link>
        <Link> For Universities</Link>
        <Link> For Governments</Link>
      </div>
      <div className="lowerNav">
        <Link to={"/"} className="logo">
          Easy Learning
        </Link>
        <button>
          Explore <ChevronDown strokeWidth={1.5} />
        </button>
        <div className="searchbox">
          <input type="text" placeholder="What do you want to learn?" />
          <Link>
            <Search size={20} strokeWidth={1.5} />{" "}
          </Link>
        </div>
        <p>
          <Link>Login</Link>
        </p>

        <button>
          <Link>Join For Free</Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
