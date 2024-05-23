const express = require("express");
const connectDB = require("./config/connection");
const notFoundHandler = require("./middlewares/notFoundHandler");
require("dotenv").config();

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Add not found handler middleware
app.use(notFoundHandler);

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
