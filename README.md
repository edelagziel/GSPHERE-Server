# GSPHERE - Server

This is the **backend server** for **GSPHERE**, the Game Collaboration Hub — a platform that connects developers, designers, musicians, and other creators to form and manage game development teams, post jobs, apply for roles, and collaborate efficiently.

> The frontend is located here: [GSPHERE-Client](https://github.com/edelagziel/GSPHERE-Client)

---

## ⚙️ Tech Stack

- **Node.js** – runtime environment
- **Express.js** – web server framework
- **PostgreSQL** – relational database
- **pg** – Node.js PostgreSQL driver
- **JWT** – authentication via tokens
- **cookie-parser** – handle cookies
- **dotenv** – manage environment variables
- **CORS** – configure cross-origin access
- **Cloudinary** – for image uploads (profile pictures)
- **MVC structure** – modular, scalable backend code

---

## 📁 Folder Structure

```
GSPHERE-Server/
├── controllers/                # Logic for handling requests
│   ├── authController.js       # Login/register logic
│   ├── jobsController.js       # Create/update job postings
│   ├── news.Controller.js      # News articles
│   ├── profile.Controller.js   # Profile data handling
│   ├── uploadController.js     # File upload logic (to Cloudinary)
│   └── projectController/
│       ├── projectController.js       # Create/edit projects
│       └── projectMemberController.js # Manage project members
│
├── middleware/
│   └── authService.js          # Token verification (JWT)
│
├── models/                     # SQL queries for each feature
│   ├── authModel.js
│   ├── jobsModel.js
│   ├── profile.model.js
│   ├── News.models.js
│   └── projectModels/
│       ├── projectModel.js
│       └── projectMemberModel.js
│
├── routes/                     # Express route definitions
│   ├── auth.js
│   ├── jobs.js
│   ├── news.routes.js
│   ├── routes.profile.js
│   ├── uplodeFile.js
│   └── prodects/               # (typo: should be "projects")
│       ├── projects.js
│       └── projectMembers.js
│
├── utils/
│   ├── cloudinaryConfig.js     # Cloudinary setup
│   └── dto/                    # Data transformers
│       ├── jobs.dto.js
│       ├── project.dto.js
│       └── user.dto.js
│
├── db.js                       # PostgreSQL pool
├── server.js                   # Entry point
├── .env                        # Environment variables (not included)
├── .gitignore
├── package.json
└── README.md
```

---

## 🔐 Authentication & Security

- Passwords are hashed using `bcrypt`
- JWT tokens are signed and stored in cookies
- Protected routes use middleware (`verifyToken`)
- Uses role-based permissions (e.g., recruiter vs candidate)

---

## 📦 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/edelagziel/GSPHERE-Server.git
   cd GSPHERE-Server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=gsphere
   DB_USER=your_user
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret
   CLIENT_URL=http://localhost:5500
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## 🧠 Key Features

- ✅ Full **JWT authentication** system
- ✅ **Projects** and **members** management
- ✅ **Job posting** and applications
- ✅ **Profile editing** and **avatar upload**
- ✅ **News system** (articles for users)
- ✅ **DTOs** to clean responses
- ✅ Organized into controller-model-route pattern

---

## 🧪 Example API Endpoints

| Method | Endpoint                         | Description                     |
|--------|----------------------------------|---------------------------------|
| POST   | `/auth/register`                 | Register a new user             |
| POST   | `/auth/login`                    | Login with credentials          |
| GET    | `/projects/`                     | Get all projects                |
| POST   | `/projects/`                     | Create new project              |
| GET    | `/projects/:id/members`          | List members in a project       |
| POST   | `/projects/:id/members`          | Add member to project           |
| DELETE | `/projects/:id/members/:memberId`| Remove member from project      |
| GET    | `/jobs/`                         | List all jobs                   |
| POST   | `/jobs/`                         | Post a new job                  |
| GET    | `/profile/`                      | Get current user profile        |
| PATCH  | `/profile/`                      | Update user profile             |
| POST   | `/upload`                        | Upload avatar to Cloudinary     |

> Note: All protected routes require a valid cookie token.

---

## 📌 To-Do / Improvements

- [ ] Add unit & integration tests
- [ ] Swagger/OpenAPI docs
- [ ] Error response unification
- [ ] Add user notifications

---

## 👥 Contributors

- [Eden Lagziel](https://github.com/edelagziel)
- [Avner Mikhaeli](https://github.com/av-ner)

---

## 📄 License

This project is licensed under the MIT License.
