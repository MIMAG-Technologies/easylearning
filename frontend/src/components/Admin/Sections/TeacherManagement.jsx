import { CirclePlus, UserX } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePhoto from "../../../assets/Images/profile-pic.png";

function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch teachers from the API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/fetch/users/teacher/all"
        );
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

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
          onClick={() => {
            window.alert("Remove user");
          }}
        />
      </Link>
    );
  };

  // Filter teachers based on the search query
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
        {filteredTeachers.map((teacher) => oneTeacher(teacher))}
      </div>
    </>
  );
}

export default TeacherManagement;
