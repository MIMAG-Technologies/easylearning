const User = require("../models/user"); // Assuming the User model is in the ../models/user path

const getUsers = async (req, res) => {
  const { role, indentifier } = req.params;

  try {
    let query = {};

    if (role && role !== "all") {
      query.role = role;
    }

    if (indentifier === "all") {
      const users = await User.find(query);
      return res.status(200).json(users);
    } else {
      if (indentifier.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findById(indentifier);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (role && role !== "all" && user.role !== role) {
          return res
            .status(404)
            .json({ message: "User not found for the specified role" });
        }
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ message: "Invalid identifier" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchMe = async (req, res) => {
  try {
    const id = req.user && req.user.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is not provided or invalid" });
    }

    const user = await User.findOne({ _id: id }).select(
      "name email role profilePhotoUrl"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetMe = async (req, res) => {
  try {
    const id = req.user && req.user.id;
    if (!id) {
      return res.status(400).json({ message: "User ID is not provided" });
    }

    const user = await User.findById(id)
      .select("-password") // Exclude password field
      .populate("enrolledCourses")
      .populate("assignedCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateMe = async (req, res) => {
  try {
    const id = req.user && req.user.id;
    const updatedUser = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is not provided" });
    }

    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, fetchMe, GetMe, UpdateMe };
