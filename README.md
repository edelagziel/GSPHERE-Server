# GSPHERE Server

Backend for **GSPHERE**, a gaming collaboration platform where developers, designers, musicians, recruiters, and other creators can discover projects, build teams, publish opportunities, apply for roles, and manage collaboration around game development.

This repository contains the Node.js/Express backend. The browser client lives in [GSPHERE-Client](https://github.com/edelagziel/GSPHERE-Client).

## Project at a Glance

GSPHERE is a two-repository full-stack system:

```text
GSPHERE Client
HTML / CSS / Vanilla JavaScript / Bootstrap
        |
        | Fetch API + credentials: include
        v
GSPHERE Server
Node.js / Express
        |
        +--> JWT cookie authentication
        +--> PostgreSQL
        +--> Cloudinary uploads
        +--> Gaming news integration/cache
```

The backend is structured around Express routes, controllers, middleware, models, and DTO-style response helpers. PostgreSQL queries are issued through a centralized `pg` connection pool.

## Main Capabilities

- User registration, login, and logout.
- JWT-based authentication stored in a browser cookie.
- Protected API routes through authentication middleware.
- Project creation, discovery, updates, deletion, and ownership-related flows.
- Project-member listing, joining, role changes, and leaving.
- Recruiter job posting and management flows.
- Candidate job/application flows.
- User profile creation and updates.
- Multer + Cloudinary upload flow for profile-related media.
- Gaming news retrieval/cache functionality.

## Tech Stack

- Node.js
- Express 5
- PostgreSQL
- `pg`
- JSON Web Tokens (`jsonwebtoken`)
- `bcrypt`
- `cookie-parser`
- CORS
- Multer
- Cloudinary
- dotenv
- Nodemon for local development

## Backend Architecture

```text
HTTP Request
    |
    v
Express Route
    |
    +--> verifyToken middleware on protected areas
    |
    v
Controller
    |
    v
Model / SQL query
    |
    v
PostgreSQL
```

Supporting utilities provide Cloudinary configuration and DTO-style response shaping.

## Repository Structure

```text
GSPHERE-Server/
├── controllers/               Request-handling logic
├── middleware/                Authentication middleware
├── models/                    PostgreSQL queries / data access
├── routes/                    Express route definitions
│   └── prodects/              Legacy project-route directory name
├── utils/
│   └── dto/                   Response/data transformation helpers
├── db.js                      PostgreSQL connection pool
├── server.js                  Application entry point
├── package.json
└── README.md
```

Some filenames and directories preserve original project naming such as `prodects` and `uplodeFile`. They are documented as-is because route/file renames can affect the working client-server contract and are being evaluated separately from documentation cleanup.

## API Areas

The application mounts the following route groups:

| Area | Base route | Authentication |
| --- | --- | --- |
| Authentication | `/api/auth` | Public login/register flow |
| Projects | `/api/projects` | Protected |
| Jobs | `/api/jobs` | Protected |
| News | `/api/news` | Protected |
| Profile | `/api/profile` | Protected |
| Uploads | `/api/uplodeFile` | Protected |

Project-member endpoints are implemented beneath project-specific routes.

The client uses `/api` as part of its configured API base URL, so documentation and requests should include that prefix.

## Authentication Flow

At a high level:

1. The client sends credentials to the authentication API.
2. The server validates the user and compares the password using bcrypt.
3. A JWT is created after successful authentication.
4. The token is stored in a cookie named `token`.
5. The browser sends the cookie on authenticated requests using `credentials: "include"`.
6. Protected route groups use `verifyToken` middleware before executing route logic.

Authentication and cookie behavior are currently part of a separate security-hardening review. This README describes the current implementation and does not claim that the existing cookie configuration is production-hardened.

## Database

Database access is centralized in `db.js` using a PostgreSQL connection pool.

The current implementation reads the database connection from:

```env
DATABASE_URL=postgresql://...
```

The pool is shared by model modules that issue SQL for areas including users, projects, project membership, jobs, applications, profiles, and news-related data.

A schema/reference SQL file may also be present in the project workspace; treat database setup details as project-specific rather than assuming migrations are automated.

## Environment Configuration

Create a local `.env` file. Do not commit it.

Environment variables used by the application and integrations include values for areas such as:

```env
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=replace_me
```

Cloudinary and external news functionality also require their corresponding credentials/configuration values.

Use the names present in the local environment/configuration for those integrations rather than copying real credentials into documentation or source control.

## CORS and Client Integration

The server is configured for credentialed CORS and currently allows the deployed GSPHERE client plus selected localhost development origins.

The production client communicates with the deployed server through:

```text
https://gsphere-server.onrender.com/api
```

The server currently recognizes the deployed client origin:

```text
https://gsphere-client.onrender.com
```

Because authentication uses cross-origin cookies, changes to CORS, cookie flags, domains, or deployment URLs should be regression-tested in both local and deployed environments.

## File Upload Flow

The profile-related upload flow is:

```text
Browser FormData
    -> /api/uplodeFile
    -> Multer in-memory upload
    -> Cloudinary
    -> secure URL returned to the client
```

Upload limits and file validation are being reviewed separately as part of security hardening.

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/edelagziel/GSPHERE-Server.git
cd GSPHERE-Server
```

2. Install dependencies:

```bash
npm install
```

3. Create a local `.env` with the required database, JWT, and integration configuration.

4. Start the server:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The default local port is `3000` when `PORT` is not set.

5. Serve the [GSPHERE-Client](https://github.com/edelagziel/GSPHERE-Client) over HTTP from one of the allowed local origins.

## Testing Status

The current repository does not yet include a formal automated test suite. Authentication, authorization, uploads, jobs, project membership, and deployed cross-origin cookie behavior should therefore be manually regression-tested before behavior-changing cleanup.

Adding meaningful automated coverage is part of the planned hardening work rather than something this README claims is already complete.

## Security / Hardening Status

The current portfolio cleanup intentionally separates documentation from runtime changes.

Areas under active review include:

- authentication cookie configuration;
- authorization/ownership checks on sensitive operations;
- upload size/type validation;
- error-detail exposure;
- dependency and legacy-file cleanup;
- secret handling and historical repository artifacts.

This project should be treated as an existing student full-stack application being preserved and hardened, not as a production-security reference implementation.

## Related Repository

### GSPHERE Client

[https://github.com/edelagziel/GSPHERE-Client](https://github.com/edelagziel/GSPHERE-Client)

The client contains the static UI, page-specific JavaScript, project/job/profile flows, recruiter/candidate views, and environment-dependent API configuration.

## Contributors

- [Eden Lagziel](https://github.com/edelagziel)
- [Avner Mikhaeli](https://github.com/av-ner)

## License

This repository is distributed under the MIT License.