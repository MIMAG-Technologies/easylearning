const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const uploadRoute = require("./routes/uploads");
const connectDB = require("./config/connection");
const notFoundHandler = require("./middlewares/notFoundHandler");
const authRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const courseRouter = require("./routes/course");
const moduleRouter = require("./routes/module");
const materialRouter = require("./routes/material");
const { createAdminUser } = require("./controllers/authControllers");

const app = express();

connectDB().then(() => {
  createAdminUser();
});

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

const BASE_URL = "/api/v1";

// Middleware to create uploads folder if it doesn't exist
const createUploadsFolder = (req, res, next) => {
  const uploadsFolderPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath);
  }
  next();
};

// Routes
app.get("/", (req, res) => res.send("API Running"));
app.use(BASE_URL, authRouter);
app.use(BASE_URL, categoryRouter);
app.use(BASE_URL, courseRouter);
app.use(BASE_URL, moduleRouter);
app.use(BASE_URL, uploadRoute);
app.use(BASE_URL, materialRouter);

// Serve the uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add middleware to create uploads folder if it doesn't exist
app.use(createUploadsFolder);

// Add not found handler middleware
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
