# GSPHERE - Server

Backend for **GSPHERE**, the Gaming Collaboration Hub — a platform to connect developers, designers, musicians, and other creators to manage game projects, apply for jobs, and collaborate efficiently.

> This is the backend. The client-side is available here: [GSPHERE-Client](https://github.com/edelagziel/GSPHERE-Client)

---

## ⚙️ Tech Stack

- 🟦 Node.js
- 🚂 Express.js
- 🗃 PostgreSQL
- 🧩 RESTful API
- 🔐 JWT-based authentication (with cookies)
- 🍪 cookie-parser middleware
- 🌍 CORS setup for frontend communication

---

## 📁 Folder Structure

```
GSPHERE-Server/
├── controllers/            # Request handlers for routes
│   ├── authController/     # Login / register logic
│   ├── jobController/      # Job CRUD
│   ├── projectController/  # Project + member logic
│   └── userController/     # User info
│
├── middleware/             # Auth middleware (JWT verify)
├── models/                 # PostgreSQL queries
├── routes/                 # Express routers split by feature
├── utils/                  # Helpers, shared utilities
├── .env                    # Environment variables
├── app.js                  # Main Express app setup
├── server.js               # Entry point (starts the server)
└── package.json
```

---

## 🔐 Authentication

- Uses **JWT tokens**
- Tokens are stored in **cookies**
- Middleware (`verifyToken`) protects routes

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

3. Create a `.env` file in the root with the following:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=gsphere
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5500
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API will run on: `http://localhost:3000`

---

## 🌐 API Endpoints (Examples)

| Method | Route                        | Description               |
|--------|------------------------------|---------------------------|
| POST   | `/auth/register`             | Register new user         |
| POST   | `/auth/login`                | Log in and get token      |
| GET    | `/projects/`                 | Get all projects          |
| POST   | `/projects/`                 | Create new project        |
| POST   | `/jobs/`                     | Create job posting        |
| GET    | `/projects/:id/members`      | Get project members       |
| DELETE | `/projects/:id/members/:id`  | Remove member from project|

> Full documentation is in progress.

---

## 📌 To-Do

- [ ] Add Swagger/OpenAPI docs
- [ ] Add testing (Jest or Supertest)
- [ ] Add rate limiting
- [ ] Upload user profile images (optional)
- [ ] Use `dotenv-safe` for better .env validation

---

## 👤 Contributors

- [Eden Lagziel](https://github.com/edelagziel)
- [Avner Mikhaeli](https://github.com/av-ner)

---

## 📄 License

MIT License
