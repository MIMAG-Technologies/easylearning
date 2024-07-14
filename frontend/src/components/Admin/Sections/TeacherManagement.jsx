import { CirclePlus, UserX } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePhoto from "../../../assets/Images/profile-pic.png";
import { toast } from "react-toastify";

function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fetch/users/teacher/all`
        );
        if (isMounted) {
          setTeachers(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching teachers:", error);
          toast.error("Error fetching teachers");
        }
      }
    };

    fetchTeachers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemoveTeacher = (teacherId) => {
    // Add logic to remove the teacher
    toast.info("Teacher removal functionality not implemented yet");
  };

  const oneTeacher = (teacher) => {
    return (
      <Link key={teacher._id} className="oneteachercard">
        <img
          src={
            teacher.profilePhotoUrl === ""
              ? ProfilePhoto
              : teacher.profilePhotoUrl
          }
          alt=""
        />
        <span>
          <h3>{teacher.name}</h3>
          <p>{teacher.email}</p>
        </span>
        <UserX
          className="removeuserbtn"
          onClick={() => handleRemoveTeacher(teacher._id)}
        />
      </Link>
    );
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="admin-searchbar">
        <input
          placeholder="Search"
          className="input-style"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => {
            navigate("/auth/signin/teacher");
          }}
        >
          <CirclePlus />
          Add Teacher
        </button>
      </div>
      <div className="teachersContainer">
        {filteredTeachers.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>No Teacher to Display</h1>
        ) : (
          filteredTeachers.map((teacher) => oneTeacher(teacher))
        )}
      </div>
    </>
  );
}

export default TeacherManagement;
