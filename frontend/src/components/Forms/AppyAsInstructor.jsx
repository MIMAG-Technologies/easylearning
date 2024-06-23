import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ApplyAsInstructor() {
  const history = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
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
        <X className="x-btn" onClick={() => history(-1)} />
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
