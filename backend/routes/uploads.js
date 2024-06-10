const express = require("express");
const uploadImage = require("../utils/upload");

const router = express.Router();

// Endpoint for uploading course thumbnails
router.post(
  "/upload/coursethumbnail",
  uploadImage("coursethumbnail"),
  (req, res) => {
    const imageUrl = `${req.protocol}://${req.get("host")}${req.file.filepath}`;
    res.send({ imageUrl });
  }
);

// Endpoint for uploading user profile images
router.post("/upload/userprofile", uploadImage("userprofile"), (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}${req.file.filepath}`;
  res.send({ imageUrl });
});

module.exports = router;
