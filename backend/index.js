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
const discussionRouter = require("./routes/discussions");
const transactionRouter = require("./routes/transaction");
const { createAdminUser } = require("./controllers/authControllers");

const app = express();

connectDB().then(() => {
  createAdminUser();
});

let corsOptions;

if (process.env.ALLOW_ALL_ORIGINS) {
  corsOptions = {
    origin: "*",
  };
} else {
  corsOptions = {
    origin: [
      "http://edu.psycortex.in",
      "https://edu.psycortex.in",
      "http://psycortex.in",
      "https://psycortex.in",
    ],
  };
}

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

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
app.post("/paymentresponce", (req, res) => {
  console.log("API Hitted!");
  const data = req;
  console.log(data);
  res.status(200).send("Payment Response Received!");
});
app.use(BASE_URL, authRouter);
app.use(BASE_URL, categoryRouter);
app.use(BASE_URL, courseRouter);
app.use(BASE_URL, moduleRouter);
app.use(BASE_URL, uploadRoute);
app.use(BASE_URL, materialRouter);
app.use(BASE_URL, discussionRouter);
app.use(BASE_URL, transactionRouter);

// Serve the uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add middleware to create uploads folder if it doesn't exist
app.use(createUploadsFolder);

// Add not found handler middleware
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
