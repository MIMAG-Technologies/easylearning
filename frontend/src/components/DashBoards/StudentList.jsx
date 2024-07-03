import { CirclePlus, UserX } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfilePhoto from "../../assets/Images/profile-pic.png";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/courses/userList/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudents(response.data.enrolledStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [courseId]);

  const oneStudent = (student) => {
    return (
      <Link key={student._id} className="oneteachercard">
        <img
          src={
            student.profilePhotoUrl === ""
              ? ProfilePhoto
              : student.profilePhotoUrl
          }
          alt=""
        />
        <span>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
        </span>
        <Link to={`/mylearning/${student._id}/${courseId}`}>
          Go to Student Dashboard
        </Link>
      </Link>
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <>
        <div className="admin-searchbar">
          <input
            placeholder="Search"
            className="input-style"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="teachersContainer">
          {filteredStudents.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>No Student to Display</h1>
          ) : (
            filteredStudents.map((student) => oneStudent(student))
          )}
        </div>
      </>
    </div>
  );
}

export default StudentList;
