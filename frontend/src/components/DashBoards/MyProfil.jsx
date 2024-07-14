import React, { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfilePhoto from "../../assets/Images/profile-pic.png";
import { uploadFile } from "../utils/courseUtils";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { toast } from "react-toastify";

function MyProfil() {
  const { fetchMyData, UpdatehMyData } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const borderNormalColor = "black";
  const borderUpdateColor = "orange";
  const GetMe = async () => {
    const response = await fetchMyData();
    setUser(response);
    setInitialUser(response);
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 1024 * 1024) {
      alert("File size should be less than 1MB");
      setFile(null);
      fileInputRef.current.value = null;
    } else {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.warn("Please select a file first.");
      return;
    }
    setIsUploading(true);

    try {
      const uploadResult = await uploadFile(file, "userprofile");
      setUser((prevUser) => ({
        ...prevUser,
        profilePhotoUrl: uploadResult.imageUrl,
      }));
      toast.success("File uploaded successfully.");
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const UpdateMe = async () => {
    setIsUpdating(true);
    const response = await UpdatehMyData(user);
    if (response === "success") {
      toast.success("Profile updated successfully!");
      setInitialUser(user); // Update initialUser to current user state
    } else {
      toast.error("Something went wrong");
    }
    setIsUpdating(false);
  };

  useEffect(() => {
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

  const isChanged = (field, value) => {
    return value !== initialUser?.[field];
  };

  const isAddressChanged = (field, value) => {
    return value !== initialUser?.address?.[field];
  };

  const isSocialMediaChanged = (field, value) => {
    return value !== initialUser?.socialMedia?.[field];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MyProfile">
      <div className="left-side">
        <img
          src={user?.profilePhotoUrl || ProfilePhoto}
          onError={handleImageError}
          alt="Profile"
        />
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <button onClick={handleFileUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
        <h2>{user?.name}</h2>
        <div>
          <Facebook />
          <input
            type="text"
            name="facebook"
            value={user?.socialMedia?.facebook || ""}
            onChange={handleSocialMediaChange}
            style={{
              borderColor: isSocialMediaChanged(
                "facebook",
                user?.socialMedia?.facebook
              )
                ? borderUpdateColor
                : borderNormalColor,
            }}
          />
        </div>
        <div>
          <Twitter />
          <input
            type="text"
            name="twitter"
            value={user?.socialMedia?.twitter || ""}
            onChange={handleSocialMediaChange}
            style={{
              borderColor: isSocialMediaChanged(
                "twitter",
                user?.socialMedia?.twitter
              )
                ? borderUpdateColor
                : borderNormalColor,
            }}
          />
        </div>
        <div>
          <Linkedin />
          <input
            type="text"
            name="linkedin"
            value={user?.socialMedia?.linkedin || ""}
            onChange={handleSocialMediaChange}
            style={{
              borderColor: isSocialMediaChanged(
                "linkedin",
                user?.socialMedia?.linkedin
              )
                ? borderUpdateColor
                : borderNormalColor,
            }}
          />
        </div>
        <div>
          <Instagram />
          <input
            type="text"
            name="instagram"
            value={user?.socialMedia?.instagram || ""}
            onChange={handleSocialMediaChange}
            style={{
              borderColor: isSocialMediaChanged(
                "instagram",
                user?.socialMedia?.instagram
              )
                ? borderUpdateColor
                : borderNormalColor,
            }}
          />
        </div>
        <div>
          <Youtube />
          <input
            type="text"
            name="youtube"
            value={user?.socialMedia?.youtube || ""}
            onChange={handleSocialMediaChange}
            style={{
              borderColor: isSocialMediaChanged(
                "youtube",
                user?.socialMedia?.youtube
              )
                ? borderUpdateColor
                : borderNormalColor,
            }}
          />
        </div>
        <button onClick={UpdateMe} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Links"}
        </button>
      </div>
      <div className="right-side">
        <h1>Personal Information</h1>
        <div className="input-containers">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={user?.name || ""}
              onChange={handleInputChange}
              style={{
                borderColor: isChanged("name", user?.name)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
          <div>
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              name="headline"
              value={user?.headline || ""}
              onChange={handleInputChange}
              style={{
                borderColor: isChanged("headline", user?.headline)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
          <div className="bio-div">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              value={user?.bio || ""}
              onChange={handleInputChange}
              style={{
                borderColor: isChanged("bio", user?.bio)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
        </div>
        <h1>Contact Information</h1>
        <div className="input-containers">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={user?.email || ""}
              onChange={handleInputChange}
              style={{
                borderColor: isChanged("email", user?.email)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={user?.contactNumber || ""}
              onChange={handleInputChange}
              style={{
                borderColor: isChanged("contactNumber", user?.contactNumber)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
        </div>
        <h1>Address</h1>
        <div className="input-containers">
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={user?.address?.city || ""}
              onChange={handleAddressChange}
              style={{
                borderColor: isAddressChanged("city", user?.address?.city)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              value={user?.address?.state || ""}
              onChange={handleAddressChange}
              style={{
                borderColor: isAddressChanged("state", user?.address?.state)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              value={user?.address?.country || ""}
              onChange={handleAddressChange}
              style={{
                borderColor: isAddressChanged("country", user?.address?.country)
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={user?.address?.postalCode || ""}
              onChange={handleAddressChange}
              style={{
                borderColor: isAddressChanged(
                  "postalCode",
                  user?.address?.postalCode
                )
                  ? borderUpdateColor
                  : borderNormalColor,
              }}
            />
          </div>
        </div>
        <button onClick={UpdateMe} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Information"}
        </button>
      </div>
    </div>
  );
}

export default MyProfil;
