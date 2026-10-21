# 🎓 Alumni Tracking System

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com/zhevadpal-dev/Alumni)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Alumni Tracking System** is a scalable, containerized web platform designed for higher education institutions to maintain enduring relationships with graduates, track career pathways, foster professional networking, and streamline institutional communication.

The backend is built with **Node.js** and **Express**, utilizing **PostgreSQL** for relational data persistence, fully containerized with **Docker & Docker Compose** for streamlined deployment, and hosted on **GitHub** for version control and CI/CD pipelines.

---

## 🚀 Key Features

- **👤 Alumni Profile Management:** Comprehensive tracking of contact information, academic records, graduation year, and ongoing career histories.
- **💼 Career & Opportunities Portal:** Job and internship board enabling alumni and partner organizations to share opportunities and track applications.
- **📅 Events & Reunions:** Scheduling and RSVP tracking for homecomings, professional webinars, networking sessions, and panels.
- **🤝 Alumni Networking & Mentorship:** Directory search and mentorship matching connecting current students with established alumni.
- **📊 Analytics & Institutional Insights:** Aggregated metrics on employment rates, industry distribution, and geographic alumni dispersal.
- **🔐 Security & Access Control:** JWT-based stateless authentication and Role-Based Access Control (Admin, Alumni, Student).

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Runtime & Backend** | [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) | Non-blocking, asynchronous RESTful API framework |
| **Database** | [PostgreSQL 15](https://www.postgresql.org/) | ACID-compliant relational database management system |
| **Containerization** | [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) | Isolated, reproducible container execution environments |
| **Version Control** | [Git](https://git-scm.com/) & [GitHub](https://github.com/) | Source code management, issue tracking, and workflow automation |
| **Authentication** | JWT (JSON Web Tokens) & bcrypt | Cryptographic token sessions and salted password hashing |

---

## 🏛️ MVC Architecture & Project Structure

The Alumni Tracking System backend follows the **Model-View-Controller (MVC)** architectural design pattern to achieve a strict separation of concerns, high maintainability, testability, and scalability.

```
                                 ┌─────────────────────────┐
                                 │   Client (Browser/API)  │
                                 └────────────┬────────────┘
                                              │ HTTP Request
                                              ▼
                                 ┌─────────────────────────┐
                                 │   Main App (app.js)     │
                                 │   & Middleware Stack    │
                                 └────────────┬────────────┘
                                              │
                                              ▼
                                 ┌─────────────────────────┐
                                 │  Routes (src/routes/)   │
                                 │  - Endpoint definitions │
                                 │  - URL / Method routing │
                                 └────────────┬────────────┘
                                              │
                                              ▼
                               ┌─────────────────────────────┐
                               │ Controllers                 │
                               │ (src/controllers/)          │
                               │ - Input validation          │
                               │ - Request orchestration     │
                               │ - Business workflow logic   │
                               └───┬─────────────────────┬───┘
                                   │                     │
                     Fetches / Mutates                   │ Sends data / triggers
                     data entity                         │ presentation
                                   ▼                     ▼
              ┌──────────────────────────┐         ┌──────────────────────────┐
              │   Models (src/models/)   │         │   Views (src/views/)     │
              │ - Data layer & schema    │         │ - HTML presentation      │
              │ - State management       │         │ - Browser UI templates   │
              │ - Database abstraction   │         └─────────────┬────────────┘
              └────────────┬─────────────┘                       │
                           │                                     │
                           └───────────────┬─────────────────────┘
                                           │
                                           ▼
                               ┌─────────────────────────────┐
                               │     HTTP Response           │
                               │ (JSON Payload / HTML Page)  │
                               └───────────┬─────────────────┘
                                           │
                                           ▼
                                 ┌─────────────────────────┐
                                 │         Client          │
                                 └─────────────────────────┘
```

---

### 📂 Directory & File Hierarchy

```text
Alumni/
├── src/
│   ├── config/                      # CONFIGURATION LAYER (Database & Environment)
│   │   └── db.js                    # PostgreSQL connection pool, query helper & connection test
│   │
│   ├── migrations/                  # DATABASE MIGRATIONS (DDL & Seed Data)
│   │   ├── 001_create_initial_tables.sql # PostgreSQL schema for users, announcements & seed data
│   │   ├── 002_create_job_postings_table.sql # PostgreSQL schema for job_postings, indexes & seed data
│   │   └── runner.js                # Migration runner script (executed via npm run migrate)
│   │
│   ├── factories/                   # FACTORY LAYER (Test & Mock Data Generation)
│   │   ├── announcementFactory.js   # Announcement factory (buildAnnouncement, createAnnouncements)
│   │   ├── jobPostingFactory.js     # Job posting factory (buildJobPosting, createJobPostings)
│   │   └── userFactory.js           # User factory (buildUser, createUsers)
│   │
│   ├── seeds/                       # DATABASE SEEDERS
│   │   └── seed.js                  # Database seeder (safe truncate, default data + factory generation)
│   │
│   ├── models/                      # MODEL LAYER (Data Access & Relational Persistence)
│   │   ├── announcementModel.js     # Announcement entity with PostgreSQL CRUD & User relations
│   │   ├── jobPostingModel.js       # JobPosting entity with PostgreSQL CRUD & User relations
│   │   ├── userModel.js             # User entity with PostgreSQL CRUD & Announcement/Job relations
│   │   └── index.js                 # Central model aggregator & relational registry (RELATIONS)
│   │
│   ├── views/                       # VIEW LAYER (Presentation & UI)
│   │   ├── announcementViews.js     # Server-rendered HTML templates for announcements (List, Detail, Form)
│   │   └── htmlViews.js             # Server-rendered HTML page templates (Home, About, Users)
│   │
│   ├── controllers/                 # CONTROLLER LAYER (Application & Business Logic)
│   │   ├── apiAnnouncementController.js # RESTful API controller for /api/announcements (JSON CRUD, status codes)
│   │   ├── announcementController.js    # Web MVC controller for /announcements (HTML views & web responses)
│   │   ├── apiUserController.js     # RESTful API controller for /api/users (JSON CRUD, status codes)
│   │   ├── userController.js        # Web MVC controller for /users (HTML views & web responses)
│   │   ├── healthController.js      # System health telemetry, uptime, memory & OS metrics
│   │   ├── coreController.js        # Lab endpoints, greeting generators, math calculations
│   │   └── swaggerController.js     # Swagger UI page rendering & OpenAPI JSON provider
│   │
│   ├── routes/                      # ROUTING LAYER (Endpoint Definitions & Dispatching)
│   │   ├── index.js                 # Central router aggregating all sub-routers
│   │   ├── apiAnnouncementRoutes.js # RESTful API announcement routes (/api/announcements, /api/announcements/:id)
│   │   ├── announcementRoutes.js    # Web MVC announcement routes (/announcements, /announcements/:id)
│   │   ├── apiUserRoutes.js         # RESTful API user routes (/api/users, /api/users/:id)
│   │   ├── userRoutes.js            # Web MVC user routes (/users, /users/:id)
│   │   ├── healthRoutes.js          # Health check endpoints (/api/health, /health)
│   │   ├── coreRoutes.js            # Base routes (/, /home, /about, /hello, /sum)
│   │   └── swaggerRoutes.js         # Documentation routes (/api/swagger, /api/swagger.json)
│   │
│   ├── docs/                        # DOCUMENTATION LAYER (OpenAPI & Interactive UI)
│   │   ├── swaggerSpec.js           # OpenAPI 3.0 specification definition (paths, schemas)
│   │   └── swaggerUiHtml.js         # Swagger UI HTML shell generator with CDN bundles
│   │
│   └── app.js                       # Express app configuration, CORS, parsers, route mounting
│
├── index.js                         # Production server entrypoint binding HTTP listener (PORT 5001)
├── Dockerfile                       # Multi-stage production Node.js 20 Alpine container image
├── docker-compose.yml               # Multi-container orchestration (Node app & PostgreSQL db)
├── .dockerignore                    # Build context exclusions (node_modules, logs, .git)
├── .env.example                     # Environment configuration variable template
├── .env                             # Local environment variables (PORT, DB credentials)
├── .gitignore                       # Git repository ignore rules
├── alumni-api.postman_collection.json # Complete Postman API collection (v2.1 format)
├── tests/                           # TEST SUITE & VERIFICATION
│   └── forgetting-test.sh           # Automated in-memory lifecycle verification script (Forgetting Test)
├── docs/                            # ARCHITECTURAL DOCUMENTATION
│   └── ddd.md                       # Comprehensive Data Design & Architecture Documentation (DDD)
├── package.json                     # Node.js project manifest, dependencies, and npm scripts
└── README.md                        # Master project documentation
```

---

### 🧩 Architectural Layers & Responsibilities

#### 1. 🗄️ Model Layer (`src/models/`)
- Encapsulates entity representation, data validation, and persistence operations completely decoupled from HTTP/controller logic.
- **PostgreSQL Relational Persistence:** Directly connects to PostgreSQL 15 via a robust connection pool (`src/config/db.js`), executing parameterized SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) with ACID transaction safety and persistent named volume storage.
- **`userModel.js`**: Features complete async/await CRUD operations, schema validation, multi-criteria filtering, and data consistency safeguards.

##### 📋 User Entity Schema

| Attribute | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `Integer` | System-generated | Unique auto-increment primary key | `1` |
| `name` | `String` | Yes | Full name of the user / graduate | `"Zeynep Naz"` |
| `email` | `String` | Yes (Unique) | Unique, validated email (case-insensitive) | `"zeynep@example.com"` |
| `role` | `String` | No (Default: `'alumni'`) | Allowed values: `alumni`, `student`, `faculty`, `admin` | `"alumni"` |
| `department` | `String` | No | Degree program or academic department | `"Computer Engineering"` |
| `graduationYear` | `Integer` | No | Valid graduation year between 1900 and 2100 | `2024` |
| `phone` | `String` | No | Contact phone number | `"+90 555 123 4567"` |
| `company` | `String` | No | Current company / employer | `"Tech Corp"` |
| `jobTitle` | `String` | No | Current job or professional title | `"Software Engineer"` |
| `createdAt` | `ISO 8601 String` | System-generated | Timestamp of creation | `"2026-10-07T07:30:00.000Z"` |
| `updatedAt` | `ISO 8601 String` | System-generated | Timestamp of last modification (PUT/PATCH) | `"2026-10-07T07:35:00.000Z"` |

##### 🛠️ Implemented CRUD Functions (Async / PostgreSQL)

```javascript
const UserModel = require('../models/userModel');

// 1. CREATE (C)
const newUser = await UserModel.create({
  name: 'Ayşe Kaya',
  email: 'ayse@example.com',
  role: 'alumni',
  department: 'Electrical Engineering',
  graduationYear: 2022
});

// 2. READ (R)
const allUsers     = await UserModel.findAll();                      // All records
const filtered     = await UserModel.findAll({ role: 'alumni' });   // Filter by role
const searched     = await UserModel.findAll({ search: 'Kaya' });   // Free text search
const paginated    = await UserModel.findAll({ page: 1, limit: 10 });// Pagination
const userById     = await UserModel.findById(1);                    // Find by primary ID
const userByEmail  = await UserModel.findByEmail('ayse@example.com');// Case-insensitive email
const isExisting   = await UserModel.exists(1);                      // Boolean existence check
const totalCount   = await UserModel.count({ role: 'alumni' });      // Filtered record count

// 3. UPDATE (U)
// Full replacement (PUT semantics - requires name & email)
const updatedUser  = await UserModel.update(1, {
  name: 'Ayşe Kaya Demir',
  email: 'ayse.demir@example.com',
  department: 'Computer Science',
  graduationYear: 2022
});

// Partial modification (PATCH semantics - modifies only provided keys)
const patchedUser  = await UserModel.patch(1, {
  department: 'Software Engineering',
  graduationYear: 2023
});

// 4. DELETE (D)
const deletedUser  = await UserModel.delete(1);                      // Delete by ID
```

##### 🛡️ Validation & Data Integrity Safeguards (User)
- **Email Uniqueness:** Enforces unique emails across the database schema (`UNIQUE` constraint) and model validation.
- **Format Validation:** RFC-compliant regex validation (`isValidEmail()`) ensures emails are structurally valid.
- **Role Enforcement:** Restricts roles strictly to predefined whitelist (`alumni`, `student`, `faculty`, `admin`).
- **Graduation Year Range:** Enforces realistic integer years between 1900 and 2100.
- **ACID Transactions & Safe Queries:** Parameterized SQL queries via `pg.Pool` protect against SQL injection and guarantee transactional integrity.

---

- **`announcementModel.js`**: Provides persistent PostgreSQL data access for institutional announcements, events, and news updates with full async CRUD capabilities, parameterized SQL queries, search, and category validation.

##### 📋 Announcement Entity Schema

| Attribute | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `Integer` | System-generated | Unique auto-increment primary key | `1` |
| `title` | `String` | Yes | Headline / title of the announcement | `"Annual Alumni Homecoming 2026"` |
| `content` | `String` | Yes | Full announcement body text | `"We are thrilled to welcome all alumni..."` |
| `author` | `String` | No (Default: `'Alumni Relations Office'`) | Department or person publishing the notice | `"Alumni Relations Office"` |
| `category` | `String` | No (Default: `'General'`) | Whitelist: `General`, `Event`, `Career`, `Academic`, `News`, `Urgent` | `"Event"` |
| `createdAt` | `ISO 8601 String` | System-generated | Timestamp of creation | `"2026-10-01T10:00:00.000Z"` |
| `updatedAt` | `ISO 8601 String` | System-generated | Timestamp of last modification | `"2026-10-01T10:00:00.000Z"` |

##### 🛠️ Implemented Announcement CRUD Functions (Async / PostgreSQL)

```javascript
const AnnouncementModel = require('../models/announcementModel');

// 1. CREATE (C)
const newNotice = await AnnouncementModel.create({
  title: 'Spring 2026 Career Fair',
  content: 'Join over 50 top employers on campus for internships and full-time hiring.',
  author: 'Career Development Center',
  category: 'Career'
});

// 2. READ (R)
const allNotices = await AnnouncementModel.getAll();                      // All records (sorted newest first)
const filtered   = await AnnouncementModel.getAll({ category: 'Event' }); // Filter by category
const searched   = await AnnouncementModel.getAll({ search: 'Career' });  // Free text search in title/content/author
const paginated  = await AnnouncementModel.getAll({ page: 1, limit: 10 });// Pagination
const noticeById = await AnnouncementModel.getById(1);                    // Find by primary ID
const isExisting = await AnnouncementModel.exists(1);                    // Boolean existence check
const count      = await AnnouncementModel.count({ category: 'Career' }); // Filtered record count

// 3. UPDATE (U)
const updatedNotice = await AnnouncementModel.update(1, {
  title: 'Annual Alumni Homecoming 2026 - Registration Open',
  category: 'Event'
});

// 4. DELETE (D)
const deletedNotice = await AnnouncementModel.delete(1);                  // Delete by ID
```

##### 🛡️ Validation & Data Integrity Safeguards (Announcement)
- **Required Fields:** Enforces mandatory presence of non-empty `title` and `content`.
- **Category Whitelist:** Restricts category values strictly to `General`, `Event`, `Career`, `Academic`, `News`, `Urgent`.
- **Relational Integrity (`author_id`):** Links each notice to a verified author user in PostgreSQL with `ON DELETE SET NULL` cascade safety.
- **Relational Persistence & Automated Timestamps:** Records are persisted in PostgreSQL with automated `created_at` and `updated_at` timestamps.

---

- **`jobPostingModel.js`**: Provides persistent PostgreSQL data access for career postings and opportunities shared by alumni and recruiters, featuring full CRUD, relational poster joins, filtering, and constraint validation.

##### 📋 JobPosting Entity Schema

| Attribute | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `Integer` | System-generated | Unique auto-increment primary key | `1` |
| `title` | `String` | Yes | Job position title | `"Senior Backend Engineer"` |
| `company` | `String` | Yes | Hiring enterprise name | `"TechCorp Solutions"` |
| `location` | `String` | No (Default: `'Remote'`) | Workplace location | `"Istanbul / Remote"` |
| `jobType` | `String` | No (Default: `'Full-Time'`) | Employment category | `"Full-Time"`, `"Internship"` |
| `description` | `String` | Yes | Role responsibilities & overview | `"Architect high-throughput microservices..."` |
| `requirements` | `String` | No | Qualifications & prerequisites | `"3+ years Node.js, PostgreSQL, Docker"` |
| `salaryRange` | `String` | No | Compensation package | `"$85,000 - $115,000"` |
| `applicationUrl`| `String` | No | External application portal link | `"https://careers.example.com/apply"` |
| `contactEmail` | `String` | No | Recruiter / inquiry email | `"recruiting@example.com"` |
| `posterId` | `Integer` | No (Relational FK) | ID of User posting the opportunity | `1` |
| `status` | `String` | No (Default: `'Active'`) | Publication status | `"Active"`, `"Closed"` |
| `deadline` | `TIMESTAMPTZ` | No | Application closing timestamp | `"2026-12-31T23:59:59Z"` |

##### 💻 Model Relations & Relational Methods (`src/models/index.js`)

The system establishes explicit domain associations across all three entities:

```javascript
const { UserModel, AnnouncementModel, JobPostingModel, RELATIONS } = require('./models');

// 1. One-to-Many: User -> Announcements & JobPostings
const user = await UserModel.findByIdWithRelations(1);
// user.announcements -> Array of announcements authored by User #1
// user.jobPostings   -> Array of job postings posted by User #1

// Direct relation accessors:
const userNotices = await UserModel.getAnnouncements(1);
const userJobs    = await UserModel.getJobPostings(1);

// 2. Belongs-To: Announcement -> User (Author)
const noticeWithAuthor = await AnnouncementModel.getByIdWithAuthor(1);
// noticeWithAuthor.authorUser -> { id, name, email, role, department }

// 3. Belongs-To: JobPosting -> User (Poster)
const jobWithPoster = await JobPostingModel.getByIdWithPoster(1);
// jobWithPoster.poster -> { id, name, email, role, department, company }

const allJobsWithPosters = await JobPostingModel.getAllWithPoster({ status: 'Active' });
```

#### 2. 🎨 View Layer (`src/views/`)
- Responsible for the presentation output sent to clients, cleanly decoupling UI layout, CSS styling, and HTML templates from controller orchestration.
- **Direct PostgreSQL Integration & Live Feedback:** All views are connected directly to PostgreSQL data queries, featuring live database connection badges (`🐘 PostgreSQL Database: Connected`), dismissible flash alert banners (`renderFlashBanner`), and defensive error styling for database constraint failures.
- **`announcementViews.js`**: Generates responsive, modern server-rendered HTML management interfaces:
  - **`GET /announcements` (Directory & Management View):** Renders `renderList(announcements, filter)` with analytical summary cards, live PostgreSQL records count, visual flash feedback alerts, tabular listings with action buttons, and an embedded quick-publish form.
  - **`GET /announcements/new` (Creation Form):** Renders `renderNewForm()` with accessible inputs, category selector, author override, and responsive design.
  - **`GET /announcements/:id` (Detail View):** Renders `renderDetail(announcement, query)` directly fetching from PostgreSQL by primary key ID with timestamps, author attribution, and flash status banners.
  - **`GET /announcements/:id/edit` (Edit Form):** Renders `renderEditForm(announcement, query)` pre-populated with live database values for updates.
  - **Success & Confirmation Views:** `renderCreateSuccess(announcement)`, `renderUpdateSuccess(announcement)`, `renderDeleteSuccess(announcement)` or automatic redirect with immediate table re-rendering.
- **`htmlViews.js`**: Generates responsive, server-rendered HTML view templates:
  - **`GET /users` (Directory & Form View):** Renders `renderUsersList(users, query)` displaying live database records, dismissible status alerts, and an embedded interactive HTML registration form (`<form action="/users" method="POST">`) inserting directly into PostgreSQL.
  - **`POST /users` (Create Action):** Inserts new records into PostgreSQL, automatically enforcing email uniqueness and role validation, then re-renders directory with flash confirmation.
  - **`GET /users/:id` (Profile View):** Renders `renderUserProfile(user, query)` directly fetching by ID from PostgreSQL with full attributes, timestamps, and edit/delete actions.
  - **`GET /users/:id/edit` (Edit View):** Renders `renderUserEditForm(user, query)` pre-populated with existing database attributes.
  - **`POST /users/:id/delete` (Delete Action):** Executes SQL `DELETE` in PostgreSQL and immediately redirects back to the directory table with the record removed and a green flash indicator.
  - **`GET /` & `GET /about`:** Renders baseline layout templates (`renderHome()`, `renderAbout()`).

#### 3. 🧠 Controller Layer (`src/controllers/`)
- Acts as the intermediary orchestrating application flow directly with the PostgreSQL connection pool.
- Accepts parsed HTTP requests from routes, executes defensive input validation, invokes appropriate database Model methods, selects output views or JSON representations, and emits HTTP status codes.
- **`apiAnnouncementController.js` (REST API Controller):**
  - Dedicated to `/api/announcements` and `/api/announcements/:id`.
  - Implements complete database-backed JSON CRUD operations: `getAll` (with SQL filtering by category, search, author, pagination), `getById`, `create`, `update`, `remove`.
  - Emits standardized JSON response contracts (`{ status: 'success', data: ... }`) and HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `204 No Content`).
- **`announcementController.js` (Web / MVC View Controller):**
  - Dedicated to `/announcements`, `/announcements/new`, `/announcements/:id`, `/announcements/:id/edit`, `/announcements/:id/delete`.
  - Implements web-oriented CRUD operations backed directly by PostgreSQL tables.
  - Form submissions write real rows into PostgreSQL; deletions execute SQL deletes and immediately redirect to the re-rendered table with flash notifications.
- **`apiUserController.js` (REST API Controller):**
  - Dedicated to `/api/users` and `/api/users/:id`.
  - Implements complete database-backed JSON CRUD operations: `getAllUsers` (with SQL filtering, search, pagination), `getUserById`, `createUser`, `updateUserPut`, `updateUserPatch`, `deleteUser`.
  - Emits standardized JSON response contracts (`{ status: 'success', data: ... }`) and HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`).
- **`userController.js` (Web / MVC View Controller):**
  - Dedicated to `/users`, `/users/:id`, `/users/:id/edit`, `/users/:id/delete`.
  - Implements web-oriented CRUD operations backed directly by PostgreSQL tables.
  - Form submissions persist real rows; deletions execute SQL deletes and immediately reflect in the directory table with visual feedback; constraint violations (e.g. duplicate email) are caught and presented gracefully.
- **`healthController.js`**: Extracts node process uptime, platform architecture, and memory usage metrics (`rss`, `heapTotal`, `heapUsed`) for monitoring systems.
- **`coreController.js`**: Handles base endpoints, content-negotiated responses, arithmetic calculations (`/sum/:num1/:num2`), and personalized greetings.
- **`swaggerController.js`**: Serves the interactive Swagger UI and OpenAPI 3.0 specification JSON.

#### 4. 🚦 Routing Layer (`src/routes/`)
- Strictly maps incoming HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and URL patterns to controller action handlers.
- Promotes modularity by partitioning routes into dedicated modules:
  - **`apiAnnouncementRoutes.js`**: Routes `/api/announcements` and `/api/announcements/:id` to `ApiAnnouncementController`.
  - **`announcementRoutes.js`**: Routes `/announcements`, `/announcements/new`, `/announcements/:id`, `/announcements/:id/edit`, `/announcements/:id/delete` to `AnnouncementController`.
  - **`apiUserRoutes.js`**: Routes `/api/users` and `/api/users/:id` to `ApiUserController`.
  - **`userRoutes.js`**: Routes `/users` and `/users/:id` to `UserController`.
  - **`healthRoutes.js`**: Routes `/api/health` and `/health` to `HealthController`.
  - **`coreRoutes.js`**: Routes `/`, `/home`, `/about`, `/hello`, `/sum` to `CoreController`.
  - **`swaggerRoutes.js`**: Routes `/api/swagger`, `/api/swagger.json` to `SwaggerController`.
  - **`index.js`**: Central router aggregating all sub-routers onto the main Express app.

#### 5. ⚙️ Application & Server Configuration (`src/app.js` & `index.js`)
- **`src/app.js`**: Configures middleware pipelines (CORS, JSON parser, urlencoded parser, multipart form parser) and mounts the master router. Decoupled from the port listener for seamless integration testing with supertest/jest.
- **`index.js`**: Server bootstrap entry point that imports `app.js`, reads the `PORT` environment variable (`5001`), and binds the HTTP server.

---

## 🗄️ Data Design & Architecture

The Alumni Tracking System employs a structured relational data model strictly encapsulated within the **Model Layer** (`src/models/`):

- **PostgreSQL Relational Persistence:** Active models ([`userModel.js`](src/models/userModel.js) and [`announcementModel.js`](src/models/announcementModel.js)) connect to PostgreSQL 15 (`alumni_db` container) via a robust connection pool (`src/config/db.js`), using parameterized SQL queries with ACID guarantees and named volume persistence (`postgres_data`).
- **Factory Pattern & Mock Generators (`src/factories/`):**
  - **`userFactory.js`**: Implements `buildUser(overrides)` and `createUsers(count, overrides)` to generate realistic mock users with normalized ASCII emails, randomized roles (`alumni`, `student`, `teacher`), departments, and graduation years.
  - **`announcementFactory.js`**: Implements `buildAnnouncement(overrides)` and `createAnnouncements(count, overrides)` to generate institutional announcements with realistic titles, bodies, authors, and whitelisted categories.
- **Database Migrations & Seeding:**
  - **DDL Migration (`src/migrations/runner.js`):** Sequentially executes all pending `.sql` migration files (`001_create_initial_tables.sql`, `002_create_job_postings_table.sql`) via `npm run migrate` or `docker compose exec app npm run migrate`.
  - **Database Seeder (`src/seeds/seed.js`):** Safely truncates tables (`TRUNCATE ... RESTART IDENTITY CASCADE`) and populates default users (Said Hasan, Zeynep Naz, Ece, Rumeysa, Ceyda) alongside factory-generated alumni records and initial announcements via `npm run seed` or `docker compose exec app npm run seed`.
- **Domain Validation & Integrity Rules:**
  - **User Entity:** Enforces mandatory RFC-compliant emails (`UNIQUE` constraint & case-insensitive validation), whitelist role authorization (`alumni`, `student`, `faculty`, `teacher`, `admin`), and valid graduation years (1900–2100).
  - **Announcement Entity:** Enforces mandatory title/content bodies, category whitelist (`General`, `Event`, `Career`, `Academic`, `News`, `Urgent`), and automated timestamps.
- **Relational Schema:**
  - `users`: `id` (SERIAL PK), `name` (VARCHAR), `email` (VARCHAR UNIQUE NOT NULL), `role` (VARCHAR), `department` (VARCHAR), `graduation_year` (INTEGER), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).
  - `announcements`: `id` (SERIAL PK), `title` (VARCHAR NOT NULL), `content` (TEXT NOT NULL), `author` (VARCHAR), `category` (VARCHAR), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).
  - `job_postings`: `id` (SERIAL PK), `title` (VARCHAR NOT NULL), `company` (VARCHAR NOT NULL), `location` (VARCHAR), `job_type` (VARCHAR), `description` (TEXT NOT NULL), `requirements` (TEXT), `salary_range` (VARCHAR), `application_url` (VARCHAR), `contact_email` (VARCHAR), `poster_id` (INTEGER FK), `status` (VARCHAR), `deadline` (TIMESTAMPTZ), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).

📖 For comprehensive entity specifications, schema definitions, validation rules, Mermaid ER diagrams, and PostgreSQL migration DDL, see the full document:  
👉 **[Data Design Documentation](docs/ddd.md)**

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine (v20+)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/zhevadpal-dev/Alumni.git
cd Alumni
```

---

### 2. Configure Environment Variables

Create a `.env` file in the root directory by copying the template:

```bash
cp .env.example .env
```

Default configuration values:

```env
# Server Configuration
NODE_ENV=development
PORT=5001
HOST=0.0.0.0

# PostgreSQL Database Configuration
DB_HOST=db
DB_PORT=5432
DB_USER=alumni_user
DB_PASSWORD=alumni_password
DB_NAME=alumni_db
DATABASE_URL=postgresql://alumni_user:alumni_password@db:5432/alumni_db

# Security & Authentication (JWT)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Documentation Configuration
SWAGGER_ENABLED=true
SWAGGER_ROUTE=/api/swagger
```

---

### 3. Run with Docker Compose (Recommended) 🐳

Launch the full containerized application stack orchestrated via `docker-compose.yml`:
- **`app` Service (`alumni_app`):** Node.js backend API listening on container port `5001` and mapped to host port `5001:5001` (safely avoiding macOS AirPlay Receiver conflicts on port 5000). Features live source code volume mounting with isolated `node_modules`.
- **`db` Service (`alumni_db`):** PostgreSQL 15 Alpine database exposed on host port `5432:5432` with durable named volume `postgres_data:/var/lib/postgresql/data` ensuring data persistence across restarts.

```bash
# Build and start services in detached mode
docker compose up -d --build

# Run database migrations (creates tables and initial seeds)
docker compose exec app npm run migrate

# Run database seeder (cleans & populates default records + factory data)
docker compose exec app npm run seed

# Inspect container output and logs
docker compose logs -f
```

The application server will become reachable at `http://localhost:5001`.

The seeder automatically populates:
- **Default Core Users (5):** Said Hasan (Admin), Zeynep Naz (Alumni), Ece (Alumni), Rumeysa (Student), Ceyda (Faculty).
- **Factory-Generated Alumni Records (5+):** Realistic alumni with academic departments and graduation years.
- **Initial Announcements (5):** "Welcome to Alumni Portal", "Upcoming Career Fair", "Mentorship Program", plus factory-generated updates.

To terminate containers and tear down the network:

```bash
docker compose down
```

---

### 4. Local Development

To run the backend directly on your host machine:

```bash
# Install dependencies
npm install

# Run database migrations (requires local PostgreSQL or alumni_db running)
npm run migrate

# Run database seeder
npm run seed

# Start the server with Node
node index.js

# Or start in watch mode with Nodemon
npm run dev
```

---

## 📡 API Endpoints

### Core & Laboratory Routes

| Method | Endpoint | Description | Example Request / Output |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/swagger` | Interactive Swagger UI Documentation | Visual interactive OpenAPI playground |
| `GET` | `/api/swagger.json` | Raw OpenAPI 3.0 Specification JSON | Full API schema in JSON |
| `GET` | `/api/health` | Comprehensive system health check JSON | `{"status": "OK", "uptime": 12.34, "memory": {...}}` |
| `GET` | `/` | API ping / Home placeholder | Terminal/curl: `"ok"` \| Browser: `"temporary one main page"` |
| `GET` | `/home` | Placeholder home page | `"temporary one main page"` |
| `GET` | `/about` | Placeholder about page | `"temp. about page"` |
| `GET` | `/hello` | Standard greeting | `"Hello, World!"` |
| `GET` | `/hello/:name` | Parameterized greeting | `/hello/emre` -> `"Hello, Emre!"` |
| `GET` | `/sum/:num1/:num2` | Summation of two integers | `/sum/15/25` -> `40` |

### 🚀 REST API User Endpoints (`ApiUserController` ➡️ `/api/users`)

| Method | Endpoint | Description | Example Request / Output |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | List all users (supports `role`, `department`, `search`, `limit`, `page`) | Returns JSON array of user records |
| `POST` | `/api/users` | Create new user (JSON or urlencoded) | Body: `name`, `email`, `role`, `department` |
| `GET` | `/api/users/:id` | Retrieve single user by ID | Returns JSON user record |
| `PUT` | `/api/users/:id` | Full replacement of user record | Body: `name`, `email`, `role`, etc. |
| `PATCH` | `/api/users/:id` | Partial update of specific fields | Body: fields to update (e.g. `department`) |
| `DELETE` | `/api/users/:id` | Delete user record by ID | Returns deleted user JSON |

### 🌐 Web MVC User Endpoints with View Layer (`UserController` ➡️ `/users`)

| Method | Endpoint | CRUD Role | View Layer Output | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/users` | **Read (List)** | `renderUsersList(users)` | Server-rendered HTML directory with embedded registration form |
| `POST` | `/users` | **Create** | `renderUserCreatedSuccess(user)` | Processes form submission and renders HTML success confirmation |
| `GET` | `/users/:id` | **Read (Detail)** | `renderUserProfile(user)` | Server-rendered HTML single user profile card |
| `GET` | `/users/:id/edit` | **Update (Form)** | `renderUserEditForm(user)` | Pre-populated HTML edit form for browser modification |
| `PUT` / `POST` | `/users/:id` & `/users/:id/edit` | **Update (Full)** | `renderUserUpdatedSuccess(user)` | Replaces user record and renders HTML updated view |
| `PATCH` | `/users/:id` | **Update (Partial)** | `renderUserUpdatedSuccess(user)` | Partially updates fields and renders HTML updated view |
| `DELETE` / `POST` | `/users/:id` & `/users/:id/delete` | **Delete** | `renderUserDeletedSuccess(user)` | Deletes user record and renders HTML deletion confirmation |

### 📢 REST API Announcement Endpoints (`ApiAnnouncementController` ➡️ `/api/announcements`)

| Method | Endpoint | Description | Example Request / Output |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/announcements` | List announcements (supports `category`, `search`, `author`, `limit`, `page`) | Returns JSON array of announcement records |
| `POST` | `/api/announcements` | Create new announcement (JSON or urlencoded) | Body: `title`, `content`, `author`, `category` |
| `GET` | `/api/announcements/:id` | Retrieve single announcement by ID | Returns JSON announcement record |
| `PUT` | `/api/announcements/:id` | Full / partial update of announcement record | Body: `title`, `content`, `category`, `author` |
| `PATCH` | `/api/announcements/:id` | Partial update of announcement fields | Body: fields to update |
| `DELETE` | `/api/announcements/:id` | Delete announcement by ID | Returns `204 No Content` or deleted announcement JSON |

### 🌐 Web MVC Announcement Endpoints with View Layer (`AnnouncementController` ➡️ `/announcements`)

| Method | Endpoint | CRUD Role | View Layer Output | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/announcements` | **Read (List)** | `renderList(announcements, stats)` | Responsive HTML announcement directory with stats and embedded create form |
| `GET` | `/announcements/new` | **Create (Form)** | `renderNewForm()` | Standalone HTML form for publishing a new announcement |
| `POST` | `/announcements` | **Create (Action)** | `renderCreateSuccess(announcement)` | Processes form submission and renders HTML success confirmation |
| `GET` | `/announcements/:id` | **Read (Detail)** | `renderDetail(announcement)` | Server-rendered HTML announcement detail view with metadata |
| `GET` | `/announcements/:id/edit` | **Update (Form)** | `renderEditForm(announcement)` | Pre-populated HTML edit form for browser modification |
| `POST` / `PUT` | `/announcements/:id` & `/announcements/:id/edit` | **Update (Action)** | `renderUpdateSuccess(announcement)` | Updates announcement and renders HTML updated view |
| `POST` / `DELETE` | `/announcements/:id` & `/announcements/:id/delete` | **Delete (Action)** | `renderDeleteSuccess(announcement)` | Deletes announcement and renders HTML deletion confirmation |

### Planned Alumni Management Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user profile |
| `POST` | `/api/auth/login` | Authenticate user and issue JWT bearer token |
| `GET` | `/api/alumni` | Search and filter graduate records |
| `GET` | `/api/alumni/:id` | Retrieve comprehensive alumni profile |
| `PUT` | `/api/alumni/:id` | Update profile information |
| `GET` | `/api/jobs` | Retrieve active career opportunities |
| `POST` | `/api/jobs` | Submit a new career or internship listing |

---

## 🔒 Security & Architecture Standards

- **Modular Separation of Concerns:** Application configuration (`src/app.js`), route handlers (`src/routes/`), and process listeners (`index.js`) are decoupled for testability and maintainability.
- **Input Validation:** Route parameters and body payloads are parsed and validated to prevent type errors.
- **Environment Isolation:** Sensitive credentials, connection strings, and tokens remain isolated in `.env` files and excluded from source control.
- **Cross-Origin Resource Sharing (CORS):** Pre-configured middleware permits secure integration with external web clients and SPAs.

---

## 📋 Route Development & Documentation Workflow

Whenever a new route or endpoint is defined in this project, the following protocol is strictly enforced:
1. **Implementation:** Define the route logic in `src/routes/`.
2. **Swagger Documentation:** Document the path, parameters, request body, and response schemas in `src/docs/swaggerSpec.js` so it automatically appears in the interactive UI at `/api/swagger`.
3. **README Synchronization:** Add the endpoint to the **API Endpoints** table in `README.md`.
4. **Postman Collections:** Update both `alumni-api.postman_collection.json` and `Alumni Tracking System API/` with pre-configured requests.
5. **Live Server Reload:** Restart the running container (`docker compose restart app`).
6. **Git Version Control:** Automatically stage all changes, write a descriptive commit message, and push directly to `origin main`.

---

## 🤝 Contributing

1. Fork this repository.
2. Create a dedicated feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: implement amazing feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request** on GitHub.

---

## 📄 License

This project is licensed under the [MIT](LICENSE) License.