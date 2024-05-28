Sure, here's the updated README:

---

# Easy Learning Platform

Welcome to the Easy Learning Platform, a web application aimed at providing high-quality psychological courses for personal and professional development.

## Models

### 1. User Model

The User model represents the users of the platform.

**Attributes**:

- `name`: String, required - Name of the user.
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

## Routes

### Get Started

#### 1. Check API Status

**Route**: `GET http://localhost:5000/api/v1/`

- **Description**: This route is used to check if the API is running.
- **Response**:
  ```json
  {
    "message": "API Running"
  }
  ```

#### 2. Handle Undefined Routes

**Route**: `GET /*`

- **Response**:
  ```json
  {
    "message": "Route not found"
  }
  ```

### Auth Routes

#### 1. Send OTP to Student

**Route**: `POST http://localhost:5000/api/v1/auth/student/sendOTP`

- **Body**:
  ```json
  {
    "email": "student@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP sent successfully"
  }
  ```

#### 2. Check OTP for Student

**Route**: `POST http://localhost:5000/api/v1/auth/student/checkOTP`

- **Body**:
  ```json
  {
    "email": "student@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP verified successfully"
  }
  ```

#### 3. Register Student

**Route**: `POST http://localhost:5000/api/v1/auth/student/register`

- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "student@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

#### 4. Login Student

**Route**: `POST http://localhost:5000/api/v1/auth/student/login`

- **Body**:
  ```json
  {
    "email": "student@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

#### 5. Register Teacher

**Route**: `POST http://localhost:5000/api/v1/auth/teacher/register`

- **Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "teacher@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

#### 6. Login Teacher

**Route**: `POST http://localhost:5000/api/v1/auth/teacher/login`

- **Body**:
  ```json
  {
    "email": "teacher@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

#### 7. Login Admin

**Route**: `POST http://localhost:5000/api/v1/auth/admin/login`

- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "adminpassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

---

### Category Routes

All routes except `GET /categories/:categoryId` (when requesting a specific category by ID) require an `Authorization` header with a valid JWT token.

#### Headers

- `Authorization`: `Bearer <token>`

#### 1. Create Category

**Route**: `POST http://localhost:5000/api/v1/categories/create`

**Headers**:

```json
{
  "Authorization": "Bearer <token>"
}
```

**Request Body**:

```json
{
  "name": "Psychology"
}
```

**Sample Response**:

```json
{
  "_id": "60b7c2b5f1d2b10c8c8d2b10",
  "name": "Psychology",
  "__v": 0
}
```

#### 2. Get Category By ID

**Route**: `GET http://localhost:5000/api/v1/categories/:categoryId`

**Request (Single Category)**:

- `GET http://localhost:5000/api/v1/categories/60b7c2b5f1d2b10c8c8d2b10`

**Sample Response**:

```json
{
  "_id": "60b7c2b5f1d2b10c8c8d2b10",
  "name": "Psychology",
  "__v": 0
}
```

**Request (All Categories)**:

- `GET http://localhost:5000/api/v1/categories/all`

**Sample Response**:

```json
[
  {
    "_id": "6650bdb5a5f777b66e243a05",
    "name": "Psychology",
    "numCourses": 0
  },
  {
    "_id": "6650be0ca5f777b66e243a08",
    "name": "Sociology",
    "numCourses": 2
  },
  {
    "_id": "6650be15a5f777b66e243a0b",
    "name": "Cognitive Science",
    "numCourses": 0
  },
  {
    "_id": "6650be25a5f777b66e243a0e",
    "name": "Neuroscience",
    "numCourses": 0
  },
  {
    "_id": "6650be2ea5f777b66e243a11",
    "name": "Behavioral Economics",
    "numCourses": 0
  },
  {
    "_id": "6650be38a5f777b66e243a15",
    "name": "Clinical Psychology",
    "numCourses": 0
  }
]
```

#### 3. Update Category

**Route**: `PUT http://localhost:5000/api/v1/categories/:categoryId`

**Headers**:

```json
{
  "Authorization": "Bearer <token>"
}
```

**Request Body**:

```json
{
  "name": "Advanced Psychology"
}
```

**Sample Response**:

```json
{
  "_id": "60b7c2b5f1d2b10c8c8d2b10",
  "name": "Advanced Psychology",
  "__v": 0
}
```

#### 4. Delete Category

**Route**: `DELETE http://localhost:5000/api/v1/categories/:categoryId`

**Headers**:

```json
{
  "Authorization": "Bearer <token>"
}
```

**Sample Response**:

```json
{
  "message": "Category deleted successfully"
}
```

---

### Course Routes

1. **Create a Course**

   - **Endpoint**: `POST /courses/create`
   - **Headers**: `{ "Authorization": "Bearer <token>" }`
   - **Body**:
     ```json
     {
       "title": "Introduction to Python",
       "price": 2999,
       "category": "6650be0ca5f777b66e243a08",
       "whatWillLearn": [
         "Learn Python basics",
         "Understand data types and structures",
         "Write basic programs in Python",
         "Implement functions and loops"
       ],
       "description": "This course covers the basics of Python programming...",
       "thumbnailUrl": "http://example.com/thumbnail.jpg"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "courseId",
       "title": "Introduction to Python",
       "price": 2999,
       "category": "6650be0ca5f777b66e243a08",
       "instructor": "userId",
       "whatWillLearn": [
         "Learn Python basics",
         "Understand data types and structures",
         "Write basic programs in Python",
         "Implement functions and loops"
       ],
       "description": "This course covers the basics of Python programming...",
       "thumbnailUrl": "http://example.com/thumbnail.jpg",
       "modules": [],
       "reviews": [],
       "studentsEnrolled": [],
       "createdAt": "2024-05-24T12:00:00.000Z",
       "updatedAt": "2024-05-24T12:00:00.000Z"
     }
     ```

2. **Assign Teacher to a Course**

   - **Endpoint**: `POST /courses/assignTeacher/:action`
   - **Headers**: `{ "Authorization": "Bearer <token>" }`
   - **Body**:
     ```json
     {
       "teacherId": "teacherUserId"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Teacher assigned successfully",
       "course": {
         "_id": "courseId",
         "title": "Introduction to Python",
         "instructor": "teacherUserId"
       }
     }
     ```

3. **Get Course by ID or Category**

   - **Endpoint**: `GET /courses/:courseId`
   - **Headers**: None
   - **Response**:
     - For `:courseId = all`:
       ```json
       [
         {
           "_id": "courseId1",
           "title": "Introduction to Python",
           "price": 2999,
           "category": "6650be0ca5f777b66e243a08",
           "instructor": "userId",
           "whatWillLearn": [
             "Learn Python basics",
             "Understand data types and structures",
             "Write basic programs in Python",
             "Implement functions and loops"
           ],
           "description": "This course covers the basics of Python programming...",
           "thumbnailUrl": "http://example.com/thumbnail.jpg",
           "modules": [],
           "reviews": [],
           "studentsEnrolled": [],
           "createdAt": "2024-05-24T12:00:00.000Z",
           "updatedAt": "2024-05-24T12:00:00.000Z"
         },
         {
           "_id": "courseId2",
           "title": "Advanced Python",
           "price": 3999,
           "category": "6650be0ca5f777b66e243a08",
           "instructor": "userId",
           "whatWillLearn": [
             "Master advanced Python concepts",
             "Implement complex data structures",
             "Work with libraries and frameworks"
           ],
           "description": "This course covers advanced Python programming...",
           "thumbnailUrl": "http://example.com/thumbnail.jpg",
           "modules": [],
           "reviews": [],
           "studentsEnrolled": [],
           "createdAt": "2024-05-24T12:00:00.000Z",
           "updatedAt": "2024-05-24T12:00:00.000Z"
         }
       ]
       ```
     - For a specific `:courseId`:
       ```json
       {
         "_id": "courseId",
         "title": "Introduction to Python",
         "price": 2999,
         "category": "6650be0ca5f777b66e243a08",
         "instructor": "userId",
         "whatWillLearn": [
           "Learn Python basics",
           "Understand data types and structures",
           "Write basic programs in Python",
           "Implement functions and loops"
         ],
         "description": "This course covers the basics of Python programming...",
         "thumbnailUrl": "http://example.com/thumbnail.jpg",
         "modules": [],
         "reviews": [],
         "studentsEnrolled": [],
         "createdAt": "2024-05-24T12:00:00.000Z",
         "updatedAt": "2024-05-24T12:00:00.000Z"
       }
       ```

4. **Update a Course**

   - **Endpoint**: `PUT /courses/:courseId`
   - **Headers**: `{ "Authorization": "Bearer <token>" }`
   - **Body**:
     ```json
     {
       "title": "Updated Course Title",
       "price": 3500,
       "category": "6650be0ca5f777b66e243a08",
       "whatWillLearn": ["Updated learning outcomes"],
       "description": "Updated course description...",
       "thumbnailUrl": "http://example.com/updated-thumbnail.jpg"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "courseId",
       "title": "Updated Course Title",
       "price": 3500,
       "category": "6650be0ca5f777b66e243a08",
       "instructor": "userId",
       "whatWillLearn": ["Updated learning outcomes"],
       "description": "Updated course description...",
       "thumbnailUrl": "http://example.com/updated-thumbnail.jpg",
       "modules": [],
       "reviews": [],
       "studentsEnrolled": [],
       "createdAt": "2024-05-24T12:00:00.000Z",
       "updatedAt": "2024-05-24T12:00:00.000Z"
     }
     ```

5. **Delete a Course**
   - **Endpoint**: `DELETE /courses/:courseId`
   - **Headers**: `{ "Authorization": "Bearer <token>" }`
   - **Response**:
     ```json
     {
       "message": "Course deleted successfully"
     }
     ```

### Module Routes

1. **Create a Module**

   - **Endpoint**: `POST /modules/create/:courseId`
   - **Headers**: `{ "Authorization": "Bearer <token>" }`
   - **Body**:
     ```json
     {
       "title": "Introduction to Programming",
       "order": 1,
       "about": "This module introduces the basics of programming.",
       "timeToComplete": 120
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "moduleId",
       "title": "Introduction to Programming",
       "course": "courseId",
       "order": 1,
       "about": "This module introduces the basics of programming.",
       "timeToComplete": 120,
       "topics": [],
       "createdAt": "2024-05-24T12:00:00.000Z",
       "updatedAt": "2024-05-24T12:00:00.000Z"
     }
     ```

2. **Get Module(s)**

   - **Endpoint**: `GET /modules/:courseId/:moduleId`
   - **Headers**: None
   - **Responses**:
     - For `:moduleId = all`:
       ```json
       [
         {
           "_id": "moduleId1",
           "title": "Introduction to Programming",
           "course": "courseId",
           "order": 1,
           "about": "This module introduces the basics of programming.",
           "timeToComplete": 120,
           "topics": []
         },
         {
           "_id": "moduleId2",
           "title": "Advanced Programming",
           "course": "courseId",
           "order": 2,
           "about": "This module covers advanced programming concepts.",
           "timeToComplete": 150,
           "topics": []
         }
       ]
       ```
     - For a specific `:moduleId`:
       ```json
       {
         "_id": "moduleId",
         "title": "Introduction to Programming",
         "course": "courseId",
         "order": 1,
         "about": "This module introduces the basics of programming.",
         "timeToComplete": 120,
         "topics": []
       }
       ```

3. **Update a Module**
   - **Endpoint**: `PUT /modules/:moduleId`
   - **Headers**: `{ "Authorization": "Bearer <token>" }`
   - **Body**:
     ```json
     {
       "title": "Updated Module Title",
       "order": 2,
       "about": "Updated module description.",
       "timeToComplete": 130
     }
     ```
