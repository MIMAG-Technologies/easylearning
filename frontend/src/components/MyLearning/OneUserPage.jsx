import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProfilePhoto from "../../assets/Images/profile-pic.png";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import OneCourseCard from "../Courses/OneCourseCard";

function OneUserPage() {
  const { userId, role } = useParams();
  const [user, setuser] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fetch/users/${role}/${userId}`
        );
        if (isMounted) {
          setuser(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching teachers:", error);
          toast.error("Error fetching teachers");
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Add a loading state while the user data is being fetched
  }

  return (
    <div className="OneUserPage">
      <div className="upp">
        <img
          src={
            user.profilePhotoUrl === "" ? ProfilePhoto : user.profilePhotoUrl
          }
          alt=""
        />
        <div>
          <h2>{user.name}</h2>
          <p>{role}</p>
          <p>{user.email}</p>
          <div>
            {user.socialMedia.facebook !== "" && (
              <a href={user.socialMedia.facebook} target="_blank">
                {" "}
                <Facebook />
              </a>
            )}
            {user.socialMedia.instagram !== "" && (
              <a href={user.socialMedia.instagram} target="_blank">
                {" "}
                <Instagram />{" "}
              </a>
            )}
            {user.socialMedia.twitter !== "" && (
              <a href={user.socialMedia.twitter} target="_blank">
                {" "}
                <Twitter />{" "}
              </a>
            )}
            {user.socialMedia.linkedin !== "" && (
              <a href={user.socialMedia.linkedin} target="_blank">
                {" "}
                <Linkedin />{" "}
              </a>
            )}
            {user.socialMedia.youtube !== "" && (
              <a href={user.socialMedia.youtube} target="_blank">
                {" "}
                <Youtube />{" "}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div>
        <h2>Bio</h2>
        <p>{user.bio}</p>
      </div>
      <div className="line"></div>
      <div>
        <h2>{role === "student" ? "Enrolled Courses" : "Courses"}</h2>
        <div className="courseContainer">
          {user.enrolledCourses.map((course) => (
            <OneCourseCard key={course._id} course={course} />
          ))}
          {user.assignedCourses.map((course) => (
            <OneCourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OneUserPage;
