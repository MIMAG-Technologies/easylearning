import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function ApplyAsInstructor() {
  const navigate = useNavigate();
  const { setisLoading } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.position ||
      !form.resume
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (!form.email.includes("@")) {
      toast.error("Invalid email format");
      return false;
    }
    if (form.phone.length < 10) {
      toast.error("Invalid phone number");
      return false;
    }
    if (
      form.resume &&
      (form.resume.type !== "application/pdf" ||
        form.resume.size > 2 * 1024 * 1024)
    ) {
      toast.error("Resume must be a PDF file and less than 2MB");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setisLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("position", form.position);
    formData.append("resume", form.resume);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (
        response.data.message === "Application with this email already exists"
      ) {
        toast.info(response.data.message);
      } else {
        toast.success("Application submitted successfully");
        navigate(-1); // Go back to the previous page
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="FormContainer">
      <div className="Forms">
        <h1
          style={{
            textAlign: "center",
            margin: "0px",
          }}
        >
          Apply as Instructor
        </h1>
        <X className="x-btn" onClick={() => navigate(-1)} />
        <form
          className="apply_as_instructor"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <label htmlFor="position">Position</label>
          <select
            id="position"
            name="position"
            value={form.position}
            onChange={handleChange}
          >
            <option value="">Select Position</option>
            <option value="Mental Health Counselor">
              Mental Health Counselor
            </option>
            <option value="Psychologist">Psychologist</option>
            <option value="Therapist">Therapist</option>
            <option value="Mindfulness Coach">Mindfulness Coach</option>
            <option value="Stress Management Expert">
              Stress Management Expert
            </option>
          </select>
          <label htmlFor="resume">Resume/CV</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
          />
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
}

export default ApplyAsInstructor;
