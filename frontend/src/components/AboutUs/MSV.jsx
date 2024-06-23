import React from "react";
import { Brain, Smile, Leaf, Star, Users, CheckCircle } from "lucide-react";

function MSV() {
  const size = 36;
  return (
    <div className="MSV">
      <div className="M">
        <h4>Mission</h4>
        <div className="M-card-div">
          <div className="M-card">
            <Brain
              size={size}
              style={{
                fill: "#FFB6C1",
              }}
            />
            <p>Enhance mental well-being</p>
          </div>
          <div className="M-card">
            <Smile
              style={{
                fill: "#FFD700",
              }}
              size={size}
            />
            <p>Promote personal happiness</p>
          </div>
          <div className="M-card">
            <Leaf
              style={{
                fill: "#98FB98",
              }}
              size={size}
            />
            <p>Support individual growth</p>
          </div>
        </div>
      </div>
      <div className="S">
        <div>
          <h4>Vision</h4>
          <p>
            <Star
              color="yellow"
              style={{
                fill: "yellow",
              }}
            />{" "}
            <span>
              Provide universal access to mental well-being and happiness
              resources and education.
            </span>
          </p>
          <p>
            <Star
              color="yellow"
              style={{
                fill: "yellow",
              }}
            />{" "}
            <span>
              Inspire and support millions towards a fulfilling, balanced, and
              healthy life.
            </span>
          </p>
          <p>
            <Star
              color="yellow"
              style={{
                fill: "yellow",
              }}
            />
            Be the leading platform for well-being and psychological growth
            globally.
            <span></span>
          </p>
        </div>
        <img src="\assets\vision.png" alt="" />
      </div>
      <div className="V">
        <h4>Values</h4>
        <div className="V-card-div">
          <div className="V-card">
            <Star
              size={size}
              style={{
                fill: "#FFD700",
              }}
            />
            <p>Commitment to excellence</p>
          </div>
          <div className="V-card">
            <Users
              size={size}
              style={{
                fill: "#87CEFA",
              }}
            />
            <p>Fostering inclusivity and community</p>
          </div>
          <div className="V-card">
            <CheckCircle
              size={size}
              style={{
                fill: "#32CD32",
              }}
            />
            <p>Upholding integrity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MSV;
