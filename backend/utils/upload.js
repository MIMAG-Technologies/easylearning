const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// Set up memory storage for multer
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

const uploadImage = (uploadType) => (req, res, next) => {
  const uploadSingle = upload.single("image");
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      const subfolder =
        uploadType === "coursethumbnail" ? "coursethumbnail" : "userprofile";
      const uploadsFolderPath = path.join(__dirname, "../uploads", subfolder);

      // Ensure the subfolder exists
      if (!fs.existsSync(uploadsFolderPath)) {
        fs.mkdirSync(uploadsFolderPath, { recursive: true });
      }

      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
      const filepath = path.join(uploadsFolderPath, filename);

      await sharp(req.file.buffer)
        .resize({ width: 1280, height: 720, fit: "cover" }) // 16:9 aspect ratio
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(filepath);

      req.file.filename = filename;
      req.file.filepath = `/uploads/${subfolder}/${filename}`;
      next();
    } catch (error) {
      console.error("Error processing the image:", error); // Log the actual error
      res.status(500).send("Error processing the image.");
    }
  });
};

module.exports = uploadImage;
