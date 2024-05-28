import React, { useState, useRef } from "react";
import axios from "axios";

function CourseManagement() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

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

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      window.alert("File uploaded successfully.");
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CourseManagement;
