import React from "react";
import "./NotFound.css"; // Ensure you have the appropriate styles

const NotFound = () => {
  return (
    <div className="notfound_main_wrapper">
      <div className="notfound_main">
        <div className="notfound_antenna">
          <div className="notfound_antenna_shadow"></div>
          <div className="notfound_a1"></div>
          <div className="notfound_a1d"></div>
          <div className="notfound_a2"></div>
          <div className="notfound_a2d"></div>
          <div className="notfound_a_base"></div>
        </div>
        <div className="notfound_tv">
          <div className="notfound_curve">
            <svg
              xmlSpace="preserve"
              viewBox="0 0 189.929 189.929"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="notfound_curve_svg"
            >
              <path
                d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
                C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
              ></path>
            </svg>
          </div>
          <div className="notfound_display_div">
            <div className="notfound_screen_out">
              <div className="notfound_screen_out1">
                <div className="notfound_screen">
                  <span className="notfound_text">NOT FOUND</span>
                </div>
              </div>
            </div>
          </div>
          <div className="notfound_lines">
            <div className="notfound_line1"></div>
            <div className="notfound_line2"></div>
            <div className="notfound_line3"></div>
          </div>
          <div className="notfound_buttons_div">
            <div className="notfound_b1">
              <div></div>
            </div>
            <div className="notfound_b2"></div>
            <div className="notfound_speakers">
              <div className="notfound_g1">
                <div className="notfound_g11"></div>
                <div className="notfound_g12"></div>
                <div className="notfound_g13"></div>
              </div>
              <div className="notfound_g"></div>
              <div className="notfound_g"></div>
            </div>
          </div>
        </div>
        <div className="notfound_bottom">
          <div className="notfound_base1"></div>
          <div className="notfound_base2"></div>
          <div className="notfound_base3"></div>
        </div>
      </div>
      <div className="notfound_text_404">
        <div className="notfound_text_4041">4</div>
        <div className="notfound_text_4042">0</div>
        <div className="notfound_text_4043">4</div>
      </div>
    </div>
  );
};

export default NotFound;
