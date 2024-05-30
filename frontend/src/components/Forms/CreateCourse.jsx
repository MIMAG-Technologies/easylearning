import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import noImg from "../../assets/Images/no-thumbnail.jpg";
import { X } from "lucide-react";

function CreateCourse(props) {
  const { action, setisCourseEditorOpen } = props;
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    instructor: "",
    category: "",
    whatWillLearn: "",
    thumbnailUrl: "",
    description: "",
    providingInstitution: "",
    level: "Beginner",
    expectedDuration: "",
  });

  useEffect(() => {
    // Fetch instructors
    axios
      .get("http://localhost:5000/api/v1/fetch/users/teacher/all")
      .then((response) => {
        setInstructors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });

    // Fetch categories
    axios
      .get("http://localhost:5000/api/v1/categories/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

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
      // 1MB limit
      window.alert("File size should be less than 1MB");
      setFile(null);
      fileInputRef.current.value = null; // Clear the file input
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      window.alert("Please select a file first.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      window.alert("File uploaded successfully.");
      setFormData((prevData) => ({
        ...prevData,
        thumbnailUrl: response.data.imageUrl,
      }));
      // Clear the file input after successful upload
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      window.alert("Error uploading the file.");
      // Clear the file input on error
      setFile(null);
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="FormContainer">
      <div className="Forms">
        <X className="x-btn" onClick={() => setisCourseEditorOpen(false)} />
        <form onSubmit={handleSubmit}>
          <div className="LeftForm">
            <label htmlFor="title">Enter Title of Course</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="expectedDuration">Expected Duration</label>
            <input
              type="text"
              id="expectedDuration"
              name="expectedDuration"
              value={formData.expectedDuration}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="providingInstitution">Providing Institution</label>
            <input
              type="text"
              id="providingInstitution"
              name="providingInstitution"
              value={formData.providingInstitution}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="whatWillLearn">What Will You Learn</label>
            <textarea
              id="whatWillLearn"
              name="whatWillLearn"
              value={formData.whatWillLearn}
              onChange={handleInputChange}
              required
              rows="5"
            ></textarea>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="5"
            ></textarea>
          </div>
          <div className="RightForm">
            <img
              src={formData.thumbnailUrl === "" ? noImg : formData.thumbnailUrl}
              alt=""
            />
            <label htmlFor="thumbnail">Upload Thumbnail</label>
            <span>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
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
              <option value="" selected disabled>
                Select Instructor
              </option>

              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
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
              <option value="" selected disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
