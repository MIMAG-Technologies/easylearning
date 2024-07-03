const Course = require("../models/course");
const User = require("../models/user");
const Category = require("../models/category");
const Module = require("../models/module");

// Create a new course
const createCourse = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const {
      title,
      belongTo,
      price,
      instructor,
      category,
      whatWillLearn,
      description,
      thumbnailUrl,
      modules,
      providingInstitution,
      level,
      expectedDuration,
    } = req.body;

    // Check if the course title already exists
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({ message: "Course title already exists" });
    }

    // Create a new course
    const newCourse = new Course({
      title,
      price,
      belongTo,
      instructor,
      category,
      whatWillLearn,
      description,
      thumbnailUrl,
      modules,
      providingInstitution,
      level,
      expectedDuration,
    });

    await newCourse.save();

    const teacher = await User.findById(instructor);

    if (teacher) {
      teacher.assignedCourses.push(newCourse._id);
      await teacher.save();
    }

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course(s) by ID, category, or all
const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (courseId === "all") {
      const courses = await Course.find()
        .select(
          "title price thumbnailUrl reviews providingInstitution level belongTo expectedDuration "
        )
        .populate("category");
      return res.status(200).json(courses);
    }

    const category = await Category.findOne({ name: courseId });
    if (category) {
      const courses = await Course.find({ category: category._id })
        .populate("instructor")
        .populate("category");
      return res.status(200).json(courses);
    }

    if (courseId.match(/^[0-9a-fA-F]{24}$/)) {
      const course = await Course.findById(courseId)
        .populate("instructor")
        .populate("category")
        .populate({
          path: "modules",
          match: { isCommon: true },
        });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json(course);
    }
    res.status(400).json({ message: "Invalid course ID" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is an admin or the assigned teacher
    if (
      req.user.role !== "admin" &&
      course.instructor.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const prevInstructorId = course.instructor;
    const newInstructorId = updates.instructor;

    // Check if instructor is being updated
    if (
      newInstructorId &&
      newInstructorId.toString() !== prevInstructorId.toString()
    ) {
      // Remove the course from the previous instructor
      const prevInstructor = await User.findById(prevInstructorId);
      if (prevInstructor) {
        prevInstructor.assignedCourses.pull(course._id);
        await prevInstructor.save();
      }

      // Add the course to the new instructor
      const newInstructor = await User.findById(newInstructorId);
      if (newInstructor) {
        newInstructor.assignedCourses.push(course._id);
        await newInstructor.save();
      }
    }

    Object.assign(course, updates);
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const { email, courseId } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User Not Found");

    // Check if the user is already enrolled in the course
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json("User is already enrolled in this course");
    }

    const course = await Course.findById(courseId).populate({
      path: "modules",
      match: { isCommon: true },
    });
    if (!course) return res.status(404).json("Course Not Found");

    // Enroll the user in the course
    user.enrolledCourses.push(courseId);

    // Create and save new modules for the user, and push them to the course's modules array
    const newModules = [];
    for (const onemodule of course.modules) {
      const newModuleData = {
        ...onemodule.toObject(),
        isCommon: false,
        userid: user._id,
      };
      delete newModuleData._id; // Ensure a new _id is generated

      const newModule = new Module(newModuleData);
      await newModule.save();
      newModules.push(newModule._id);
    }

    // Update the course with new modules
    course.modules.push(...newModules);
    await course.save();

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Enrollment successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserCourses = async (req, res) => {
  try {
    let userId;
    if (req.params.userId === "me") {
      userId = req.user.id;
    } else {
      userId = req.params.userId;
    }

    // Check if user exists
    const user = await User.findById(userId).populate({
      path: "enrolledCourses assignedCourses",
      select: "thumbnailUrl providingInstitution title modules",
      populate: {
        path: "modules",
        select: "_id title order",
        match: { userid: userId }, // Filter modules by userId
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let courses;
    if (user.role === "student") {
      courses = user.enrolledCourses;
    } else if (user.role === "teacher") {
      courses = user.assignedCourses;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid role for this operation" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrolledStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { user } = req;
    if (user.role !== "admin" && user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find users who are enrolled in this course
    const enrolledStudents = await User.find({
      enrolledCourses: { $in: [courseId] },
    }).select("name email profilePhotoUrl");

    res.status(200).json({ enrolledStudents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getUserCourses,
  getEnrolledStudents,
};
