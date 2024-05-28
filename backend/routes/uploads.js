const express = require("express");
const path = require("path");
const uploadImage = require("../utils/upload");

const router = express.Router();

// Endpoint for uploading images
router.post("/upload", uploadImage, (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.send({ imageUrl });
});

module.exports = router;
