const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");
const notFoundHandler = require("./middlewares/notFoundHandler");
const authRouter = require("./routes/user");
const catagoryRouter = require("./routes/catagory");
const courseRouter = require("./routes/course");
const materialRouter = require("./routes/material");
const moduleRouter = require("./routes/module");
const topicRouter = require("./routes/topic");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

const BASE_URL = "/api/v1";

// Routes
app.get("/", (req, res) => res.send("API Running"));
app.use(BASE_URL, authRouter);
app.use(BASE_URL, catagoryRouter);
app.use(BASE_URL, courseRouter);
app.use(BASE_URL, materialRouter);
app.use(BASE_URL, moduleRouter);
app.use(BASE_URL, topicRouter);

// Add not found handler middleware
app.use(notFoundHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
