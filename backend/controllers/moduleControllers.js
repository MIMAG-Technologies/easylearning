const Module = require("../models/module");
const Course = require("../models/course");

// Create a new module
const createModule = async (req, res) => {
  const { title, order, about, timeToComplete } = req.body;
  const { courseId } = req.params;
  const { user } = req;

  // Check if user is admin or assigned teacher
  if (user.role !== "admin" && user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const course = await Course.findById(courseId).populate("instructor");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is the assigned teacher for this course
    if (user.role === "teacher" && String(course.instructor._id) !== user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const moduleExists = await Module.findOne({ title, course: courseId });
    if (moduleExists) {
      return res
        .status(400)
        .json({ message: "Module title already exists in this course" });
    }

    // Adjust the order of existing modules if necessary
    await Module.updateMany(
      { course: courseId, order: { $gte: order } },
      { $inc: { order: 1 } }
    );

    const newModule = new Module({
      title,
      course: courseId,
      order,
      about,
      timeToComplete,
    });
    await newModule.save();

    course.modules.push(newModule._id);
    await course.save();

    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get module(s) by ID or all modules of a course
const getModuleById = async (req, res) => {
  const { courseId, moduleId } = req.params;

  try {
    if (moduleId === "all") {
      const modules = await Module.find({ course: courseId });
      return res.status(200).json(modules);
    }

    const module = await Module.findById(moduleId).populate("topics");
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a module
const updateModule = async (req, res) => {
  const { moduleId } = req.params;
  const { user } = req;

  // Check if user is admin or assigned teacher
  if (user.role !== "admin" && user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const module = await Module.findById(moduleId).populate("course");
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const course = await Course.findById(module.course._id).populate(
      "instructor"
    );
    if (user.role === "teacher" && String(course.instructor._id) !== user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.body.order && req.body.order !== module.order) {
      await Module.updateMany(
        { course: module.course._id, order: { $gte: req.body.order } },
        { $inc: { order: 1 } }
      );
    }

    const updatedModule = await Module.findByIdAndUpdate(moduleId, req.body, {
      new: true,
    });
    res.status(200).json(updatedModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a module
const deleteModule = async (req, res) => {
  const { moduleId } = req.params;
  const { user } = req;

  // Check if user is admin or assigned teacher
  if (user.role !== "admin" && user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const module = await Module.findByIdAndDelete(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Remove the module reference from the course
    const course = await Course.findById(module.course);
    if (course) {
      course.modules.pull(moduleId);
      await course.save();
    }

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createModule,
  getModuleById,
  updateModule,
  deleteModule,
};
