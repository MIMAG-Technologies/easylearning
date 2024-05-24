const { Router } = require("express");
const topicControllers = require("../controllers/topicControllers");
const auth = require("../middlewares/auth");

const router = Router();

// TOPICS
router.post("/create/:moduleId", auth, topicControllers.createTopic);
router.get("/:topicId/:moduleId", topicControllers.getTopicById);
router.put("/:topicId", auth, topicControllers.updateTopic);
router.delete("/:topicId", auth, topicControllers.deleteTopic);

module.exports = router;
