const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");
const notFoundHandler = require("./middlewares/notFoundHandler");
const authRouter = require("./routes/user"); // Make sure the path is correct

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

const BASE_URL = "/api/v1";

// Routes
app.get("/", (req, res) => res.send("API Running"));
app.use(BASE_URL, authRouter);

// Add not found handler middleware
app.use(notFoundHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
