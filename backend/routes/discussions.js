const express = require("express");
const router = express.Router();
const { GetChats, AddChats } = require("../controllers/discussionController");
const auth = require("../middlewares/auth");

router.post("/getChats", auth, GetChats);
router.post("/addChats", auth, AddChats);

module.exports = router;
