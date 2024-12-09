import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePhoto from "../../../assets/Images/profile-pic.png";
import { toast } from "react-toastify";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/fetch/users/student/all`
        );
        if (isMounted) {
          setStudents(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching students:", error);
          toast.error("Error fetching students");
        }
      }
    };

    fetchStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  const oneStudent = (student) => {
    return (
      <div
        key={student._id}
        className="oneteachercard"
      >
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
          <button
            className="view-btn"
            style={{
              marginLeft:"auto"
            }}
            onClick={() => {
              navigate(`/admin/transaction-management/${student._id}`);
            }}
          >

            View Transactions
          </button>
          <button
            className="view-btn"
            onClick={() => {
              navigate(`/user/student/${student._id}`);
            }}
          >

            View User
          </button>
      </div>
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="admin-searchbar">
        <input
          placeholder="Search"
          className="input-style"
          type="text"
          value={searchQuery}
          style={{
            width: "100%",
          }}
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
  );
}

export default StudentManagement;
