const Discussion = require("../models/discussion");

const GetChats = async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    let discussion = await Discussion.findOne({
      course: courseId,
      userId: userId,
    })
      .populate("messages.sender", "name profilePhotoUrl")
      .exec();

    if (discussion) {
      return res.status(200).json(discussion);
    } else {
      discussion = new Discussion({
        course: courseId,
        userId: userId,
        messages: [],
      });
      await discussion.save();
      return res.status(201).json(discussion);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const AddChats = async (req, res) => {
  const { courseId, userId, text, senderId } = req.body;
  try {
    let discussion = await Discussion.findOne({
      course: courseId,
      userId: userId,
    });

    if (discussion) {
      discussion.messages.push({ text: text, sender: senderId });
      await discussion.save();
      return res.status(200).json({
        success: true,
        newMessage: discussion.messages[discussion.messages.length - 1],
      });
    } else {
      return res.status(404).json({ error: "Discussion not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { GetChats, AddChats };
