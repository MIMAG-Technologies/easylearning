import React, { useState, useEffect, useRef } from "react";
import {
  fetchInstructors,
  fetchCategories,
  uploadFile,
  createCourse,
  fetchCourse,
  updateCourse, // Add the updateCourse function
} from "../utils/courseUtils";
import noImg from "../../assets/Images/no-thumbnail.jpg";
import { X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function CreateCourse() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const loc = useLocation();
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const belongsTo = [
    "For Individuals",
    "For Corporates",
    "For Universities",
    "For Governments",
  ];
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    instructor: "",
    category: "",
    belongTo: "",
    whatWillLearn: "",
    thumbnailUrl: "",
    description: "",
    providingInstitution: "",
    level: "Beginner",
    expectedDuration: "",
  });

  const isEditMode = loc.pathname.includes("edit-course");
  const courseId = isEditMode ? loc.pathname.split("/")[4] : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsData = await fetchInstructors();
        setInstructors(instructorsData);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        if (isEditMode) {
          const courseData = await fetchCourse(courseId);
          setFormData({
            title: courseData.title,
            price: courseData.price,
            instructor: courseData.instructor._id,
            category: courseData.category._id,
            belongTo: courseData.belongTo,
            whatWillLearn: courseData.whatWillLearn.join("\n"),
            thumbnailUrl: courseData.thumbnailUrl,
            description: courseData.description,
            providingInstitution: courseData.providingInstitution,
            level: courseData.level,
            expectedDuration: courseData.expectedDuration,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isEditMode, courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 1024 * 1024) {
      window.alert("File size should be less than 1MB");
      setFile(null);
      fileInputRef.current.value = null;
    } else {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      window.alert("Please select a file first.");
      return;
    }

    try {
      const uploadResult = await uploadFile(file, "coursethumbnail");
      setFormData((prevData) => ({
        ...prevData,
        thumbnailUrl: uploadResult.imageUrl,
      }));
      window.alert("File uploaded successfully.");
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      window.alert("Error uploading the file.");
      setFile(null);
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      whatWillLearn: formData.whatWillLearn.split("\n"),
    };

    try {
      if (isEditMode) {
        await updateCourse(courseId, courseData); // Call the update function
        window.alert("Course updated successfully.");
      } else {
        await createCourse(courseData); // Call the create function
        window.alert("Course created successfully.");
      }
      navigate("/admin/course-management");
    } catch (error) {
      window.alert(`Error ${isEditMode ? "updating" : "creating"} course.`);
    }
  };

  return (
    <div className="FormContainer">
      <div className="Forms">
        <X
          className="x-btn"
          onClick={() => navigate("/admin/course-management")}
        />
        <form onSubmit={handleSubmit}>
          <div className="LeftForm">
            <label htmlFor="title">Enter Title of Course</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter the course title"
              required
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter the course price"
              required
            />

            <label htmlFor="expectedDuration">Expected Duration</label>
            <select
              id="expectedDuration"
              name="expectedDuration"
              value={formData.expectedDuration}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Duration
              </option>{" "}
              <option value="1-4 weeks">1-4 weeks</option>
              <option value="1-4 months">1-4 months</option>
              <option value="4-8 months">4-8 months</option>
              <option value="8-12 months">8-12 months</option>
              <option value="1-2 years">1-2 years</option>
            </select>

            <label htmlFor="providingInstitution">Providing Institution</label>
            <input
              type="text"
              id="providingInstitution"
              name="providingInstitution"
              value={formData.providingInstitution}
              onChange={handleInputChange}
              placeholder="Enter the providing institution"
              required
            />

            <label htmlFor="whatWillLearn">What Will You Learn</label>
            <textarea
              id="whatWillLearn"
              name="whatWillLearn"
              value={formData.whatWillLearn}
              onChange={handleInputChange}
              placeholder="Enter the key learning outcomes, separated by new lines"
              required
              rows="5"
            ></textarea>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the course description"
              required
              rows="5"
            ></textarea>
            <button type="submit">{isEditMode ? "Edit" : "Submit"}</button>
          </div>
          <div className="RightForm">
            <img
              src={formData.thumbnailUrl === "" ? noImg : formData.thumbnailUrl}
              alt="Course Thumbnail"
            />
            <label htmlFor="thumbnail">Upload Thumbnail</label>
            <span>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <button onClick={handleFileUpload}>Upload</button>
            </span>
            <label htmlFor="level">Level</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              required
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>

            <label htmlFor="instructor">Instructor</label>
            <select
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Instructor
              </option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
            <label htmlFor="belongTo">Belongs To</label>
            <select
              id="belongTo"
              name="belongTo"
              value={formData.belongTo}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Sector
              </option>
              {belongsTo.map((belong) => (
                <option key={belong} value={belong}>
                  {belong}
                </option>
              ))}
            </select>

            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
