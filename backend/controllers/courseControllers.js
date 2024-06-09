const Course = require("../models/course");
const User = require("../models/user");
const Category = require("../models/category");

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
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign or unassign a teacher to/from a course
const assignTeacher = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { action } = req.params; // action should be either "assign" or "unassign"
    const { courseId, teacherId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (action === "assign") {
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.role !== "teacher") {
        return res
          .status(404)
          .json({ message: "Teacher not found or not authorized" });
      }
      course.instructor = teacherId;
    } else if (action === "unassign") {
      course.instructor = null;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await course.save();
    res.status(200).json(course);
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
        .populate("modules");
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

module.exports = {
  createCourse,
  assignTeacher,
  getCourseById,
  updateCourse,
  deleteCourse,
};
