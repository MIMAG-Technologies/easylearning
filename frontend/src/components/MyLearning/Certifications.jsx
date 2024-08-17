import { Download, Lock, Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Rating from "../Common/Rating";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { apiisCourseCompleted, rateCourse } from "../utils/courseUtils";
import { useParams } from "react-router-dom";

function Certifications() {
  const [isCourseCompleted, setisCourseCompleted] = useState(false);
  const [willrate, setwillrate] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [comment, setcomment] = useState("");
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/assets/Certificates/certificate.png`;
    link.download = "certificate.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchisCourseCompleted = async () => {
    const res = await apiisCourseCompleted({
      courseId: courseId,
      userId: user.id,
    });
    setisCourseCompleted(res);
  };

  useEffect(() => {
    fetchisCourseCompleted();
  }, []);

  const rateIt = async () => {
    try {
      if (!selectedStar || !comment) {
        toast.error("Please give rating and provide a comment");
        return;
      }
      const ratingData = {
        courseId: courseId,
        userId: user.id,
        rating: selectedStar,
        review: comment,
      };
      const res = await rateCourse(ratingData);
      if (res.code !== 500) {
        toast.success(res.message);
      } else {
        toast.error("Internal Server Error");
      }
      setwillrate(false);
    } catch (error) {
      toast.error("Failed to rate the course");
    }
  };
  return (
    <section className="module-container certificates">
      <div>
        {isCourseCompleted ? (
          <img src="\assets\Certificates\certificate.png" alt="" />
        ) : (
          <div className="cncmsg">
            <Lock />
            <p>Please Complete the Course in order to receive Certificate</p>
          </div>
        )}
        {isCourseCompleted && (
          <div className="dwd_rate">
            <button onClick={handleDownload}>
              Download Certificate <Download />{" "}
            </button>
            <button
              onClick={() => {
                setwillrate(!willrate);
                const scrollAmount = window.innerHeight * 0.5;
                window.scrollBy({ top: scrollAmount, behavior: "smooth" });
              }}
            >
              Rate this Course:
              <Star />
            </button>
          </div>
        )}
      </div>
      {willrate && (
        <div className="rating-section">
          <h3>How would you rate this course ?</h3>
          <Rating
            selectedStar={selectedStar}
            setSelectedStar={setSelectedStar}
          />
          <textarea
            value={comment}
            onChange={(e) => {
              setcomment(e.target.value);
            }}
            rows={7}
            cols={30}
            placeholder="Your feedback"
          ></textarea>
          <button onClick={rateIt}>Submit</button>
        </div>
      )}
    </section>
  );
}

export default Certifications;
