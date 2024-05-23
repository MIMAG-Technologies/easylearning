---

# Easy Learning Platform

Welcome to the Easy Learning Platform, a web application aimed at providing high-quality psychological courses for personal and professional development.

## Models

### 1. User Model

The User model represents the users of the platform.

**Attributes**:
- `email`: String, required, unique - Email address of the user.
- `password`: String, required - Password of the user.
- `role`: String, enum: ['student', 'teacher', 'admin'], required - Role of the user (student, teacher, admin).
- `enrolledCourses`: Array of ObjectIds - Courses enrolled by the user.
- `assignedCourses`: Array of ObjectIds - Courses assigned to the user (for teachers).

### 2. Course Model

The Course model represents the courses offered on the platform.

**Attributes**:
- `title`: String, required - Title of the course.
- `price`: Number, required - Price of the course.
- `instructor`: ObjectId, ref: 'User', required - Instructor of the course.
- `category`: ObjectId, ref: 'Category', required - Category of the course.
- `whatWillLearn`: Array of Strings, required - Learning objectives of the course.
- `description`: String, required - Description of the course.
- `thumbnailUrl`: String, required - URL of the course thumbnail image.
- `modules`: Array of ObjectIds - Modules included in the course.
- `reviews`: Array of ObjectIds - Reviews given to the course.
- `studentsEnrolled`: Array of ObjectIds - Students enrolled in the course.
- `createdAt`: Date - Date of course creation.
- `updatedAt`: Date - Date of last course update.

### 3. Module Model

The Module model represents the modules within a course.

**Attributes**:
- `title`: String, required - Title of the module.
- `course`: ObjectId, ref: 'Course', required - Course to which the module belongs.
- `order`: Number, required - Order of the module within the course.
- `about`: String, required - Description of the module.
- `timeToComplete`: Number, required - Estimated time to complete the module (in hours).
- `topics`: Array of ObjectIds - Topics included in the module.

### 4. Topic Model

The Topic model represents the topics within a module.

**Attributes**:
- `title`: String, required - Title of the topic.
- `module`: ObjectId, ref: 'Module', required - Module to which the topic belongs.
- `order`: Number, required - Order of the topic within the module.
- `about`: String, required - Description of the topic.
- `materials`: Array of ObjectIds, ref: 'Material' - Learning materials associated with the topic.

### 5. Material Model

The Material model represents the different types of learning materials within a topic.

**Attributes**:
- `type`: String, enum: ['reading', 'video', 'quiz', 'online_class'], required - Type of the material.
- `content`: Mixed - Content of the material (can vary based on the type).

### 6. Quiz Model

The Quiz model represents quizzes within topics.

**Attributes**:
- `title`: String, required - Title of the quiz.
- `questions`: Array of ObjectIds - Questions included in the quiz.
- `topic`: ObjectId, ref: 'Topic', required - Topic to which the quiz belongs.

### 7. Question Model

The Question model represents individual questions within quizzes.

**Attributes**:
- `quiz`: ObjectId, ref: 'Quiz', required - Quiz to which the question belongs.
- `questionText`: String, required - Text of the question.
- `options`: Array of Strings - Options for the question.
- `correctAnswer`: String - Correct answer for the question.

### 8. Progress Model

The Progress model tracks the progress of users in courses.

**Attributes**:
- `user`: ObjectId, ref: 'User', required - User whose progress is being tracked.
- `course`: ObjectId, ref: 'Course', required - Course in which the user's progress is being tracked.
- `completedModules`: Array of ObjectIds - Modules completed by the user.
- `completedTopics`: Array of ObjectIds - Topics completed by the user.

### 9. Review Model

The Review model represents reviews given to courses by users.

**Attributes**:
- `course`: ObjectId, ref: 'Course', required - Course being reviewed.
- `user`: ObjectId, ref: 'User', required - User who gave the review.
- `rating`: Number, required - Rating given to the course.
- `comment`: String - Comment provided by the user.

### 10. Category Model

The Category model represents categories of courses.

**Attributes**:
- `name`: String, required, unique - Name of the category.

### 11. OTP Model

The OTP model manages OTP verification for user authentication.

**Attributes**:
- `email`: String, required - Email address to which OTP is sent.
- `otp`: String, required - OTP generated for verification.
- `createdAt`: Date - Date and time when OTP is generated.


---
