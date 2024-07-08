import React from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfilePhoto from "../../assets/Images/profile-pic.png";
import { uploadFile } from "../utils/courseUtils";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

function MyProfil() {
  const { fetchMyData, UpdatehMyData } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const GetMe = async () => {
    const response = await fetchMyData();
    setUser(response);
    setLoading(false);
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

  const handleFileUpload = async () => {
    if (!file) {
      window.alert("Please select a file first.");
      return;
    }

    try {
      console.log("Selected file:", file);

      const uploadResult = await uploadFile(file, "userprofile");

      console.log("Upload result:", uploadResult);
      s;

      setUser((prevUser) => ({
        ...prevUser,
        profilePhotoUrl: uploadResult.imageUrl,
      }));

      window.alert("File uploaded successfully.");
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error uploading file:", error);
      window.alert("Error uploading the file.");
      setFile(null);
      fileInputRef.current.value = null;
    }
  };

  const UpdateMe = async () => {
    const response = await UpdatehMyData(user);
    if (response === "success") {
      GetMe();
      alert("Profile updated successfully!");
    } else {
      alert("Something went wrong");
    }
  };

  React.useEffect(() => {
    GetMe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      socialMedia: {
        ...prevUser.socialMedia,
        [name]: value,
      },
    }));
  };

  const handleImageError = (e) => {
    e.target.src = ProfilePhoto;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="MyProfile">
    //   <div className="left-side">
    //     <img src={user.profilePhotoUrl} onError={handleImageError} alt="" />
    //     <input type="file" onChange={handleFileChange} ref={fileInputRef} />
    //     <button onClick={handleFileUpload}>Update Image</button>
    //     <h2>{user.name}</h2>
    //     <div>
    //       <Facebook />
    //       <input
    //         type="text"
    //         name="facebook"
    //         value={user.socialMedia.facebook}
    //         onChange={handleSocialMediaChange}
    //       />
    //     </div>
    //     <div>
    //       <Twitter />
    //       <input
    //         type="text"
    //         name="twitter"
    //         value={user.socialMedia.twitter}
    //         onChange={handleSocialMediaChange}
    //       />
    //     </div>
    //     <div>
    //       <Linkedin />
    //       <input
    //         type="text"
    //         name="linkedin"
    //         value={user.socialMedia.linkedin}
    //         onChange={handleSocialMediaChange}
    //       />
    //     </div>
    //     <div>
    //       <Instagram />
    //       <input
    //         type="text"
    //         name="instagram"
    //         value={user.socialMedia.instagram}
    //         onChange={handleSocialMediaChange}
    //       />
    //     </div>
    //     <div>
    //       <Youtube />
    //       <input
    //         type="text"
    //         name="youtube"
    //         value={user.socialMedia.youtube}
    //         onChange={handleSocialMediaChange}
    //       />
    //     </div>
    //     <button onClick={UpdateMe}>Update Links</button>
    //   </div>
    //   <div className="right-side">
    //     <h1>Personal Information</h1>
    //     <div className="input-containers">
    //       <div>
    //         <label htmlFor="name">Name</label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={user.name}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="headline">Headline</label>
    //         <input
    //           type="text"
    //           name="headline"
    //           value={user.headline}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="bio">Bio</label>
    //         <textarea
    //           name="bio"
    //           value={user.bio}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <h1>Contact Information</h1>
    //       <div>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           type="text"
    //           name="email"
    //           value={user.email}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="contactNumber">Contact Number</label>
    //         <input
    //           type="text"
    //           name="contactNumber"
    //           value={user.contactNumber}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <h1>Address</h1>
    //       <div>
    //         <label htmlFor="street">Street</label>
    //         <input
    //           type="text"
    //           name="street"
    //           value={user.address.street}
    //           onChange={handleAddressChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="city">City</label>
    //         <input
    //           type="text"
    //           name="city"
    //           value={user.address.city}
    //           onChange={handleAddressChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="state">State</label>
    //         <input
    //           type="text"
    //           name="state"
    //           value={user.address.state}
    //           onChange={handleAddressChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="country">Country</label>
    //         <input
    //           type="text"
    //           name="country"
    //           value={user.address.country}
    //           onChange={handleAddressChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="postalCode">Postal Code</label>
    //         <input
    //           type="text"
    //           name="postalCode"
    //           value={user.address.postalCode}
    //           onChange={handleAddressChange}
    //         />
    //       </div>
    //       <button onClick={UpdateMe}>Update Information</button>
    //     </div>
    //   </div>
    // </div>
    <h1>It will be ready soon</h1>
  );
}

export default MyProfil;
