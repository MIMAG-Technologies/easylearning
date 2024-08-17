const Course = require("../models/course");
const User = require("../models/user");
const Category = require("../models/category");
const Module = require("../models/module");
const { sendEmail } = require("../utils/mailSender");
const course = require("../models/course");
const { isComplete } = require("../utils/isModuleComplete");
const Review = require("../models/review");

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
      const courses = await Course.find({ isDeleted: false })
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
        .populate("reviews")
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

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.studentsEnrolled.length === 0 || !course.studentsEnrolled) {
      // Hard delete: delete the course and its associated modules
      await Promise.all(
        course.modules.map(async (moduleId) => {
          await Module.findByIdAndDelete(moduleId);
        })
      );

      await Course.findByIdAndDelete(courseId);
      return res.status(200).json({ message: "Course deleted successfully" });
    } else {
      // Soft delete: mark the course as deleted
      await Course.findByIdAndUpdate(courseId, { isDeleted: true });
      return res.status(200).json({ message: "Course marked as deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
      delete newModuleData._id;

      const newModule = new Module(newModuleData);
      await newModule.save();
      newModules.push(newModule._id);
    }

    // Update the course with new modules
    course.modules.push(...newModules);
    course.studentsEnrolled.push(user._id);
    await course.save();

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Enrollment successful" });
    const emailContent = `
  <h1>Welcome to ${course.title}, ${user.name}!</h1>
  <p>Congratulations on enrolling in our course. We're excited to have you on board.</p>
  <p>This course is designed to provide you with the best learning experience, and we're here to support you every step of the way.</p>
  <p>Here are some quick tips to get you started:</p>
  <ul>
<li>Access the 'My Learning' section by selecting the user menu in the top right corner of the website on desktop or by tapping the 3-line button and then the user menu on mobile.</li>
    <li>Once there, you will see all your enrolled courses. Click on any course to access it.</li>
    <li>There will be modules, and the teacher will upload material frequently.</li>
    <li>For discussions, there is a chat section with the teacher.</li>
  </ul>
  <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
  <p>Happy Learning!</p>
  <p>Best regards,<br>Psycortex Online Education Team</p>
`;

    sendEmail(email, "Welcome to Your New Course!", emailContent).catch(
      (error) => {
        console.error("Error sending email:", error);
      }
    );
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
    const user = await User.findById(userId)
      .populate({
        path: "enrolledCourses assignedCourses",
        select: "thumbnailUrl providingInstitution title modules",
        populate: {
          path: "modules",
          select: "_id title order",
          match: { userid: userId }, // Filter modules by userId
        },
      })
      .lean(); // Converts Mongoose documents to plain JS objects

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

    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      courses.map(async (course) => {
        await Promise.all(
          course.modules.map(async (module) => {
            const isC = await isComplete(module._id);
            module.isCompleted = isC; // Add the new attribute
          })
        );
      })
    );

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrolledStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    // const { user } = req;
    // if (user.role !== "admin" && user.role !== "teacher") {
    //   return res.status(403).json({ message: "Access denied" });
    // }

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

const rateCourse = async (req, res) => {
  try {
    const { courseId, userId, rating, review } = req.body;

    const existingReview = await Review.findOne({
      course: courseId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(200)
        .json({ message: "You have already rated this course!", code: 200 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const Newreview = new Review({
      course: courseId,
      user: userId,
      rating,
      comment: review,
    });
    await Newreview.save();
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { reviews: { _id: Newreview._id, rating: Newreview.rating } } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Thank you for your valuable feedback!", code: 201 });
  } catch (error) {
    res
      .status(200)
      .json({ message: "Thank you for your valuable feedback!", code: 500 });
  }
};

const isCourseCompleted = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const mymodules = await Module.find({ course: courseId, userid: userId });

    for (const modul of mymodules) {
      const isC = await isComplete(modul._id);
      if (!isC) {
        return res
          .status(400)
          .json({ message: "Course is not completed", code: 400 });
      }
    }

    res.status(200).json({ message: "Course is completed", code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  rateCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getUserCourses,
  getEnrolledStudents,
  isCourseCompleted,
};
