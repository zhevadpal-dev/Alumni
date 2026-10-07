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
│   ├── models/                      # MODEL LAYER (Data Access & State)
│   │   └── userModel.js             # User data entity, in-memory data store, CRUD queries
│   │
│   ├── views/                       # VIEW LAYER (Presentation & UI)
│   │   └── htmlViews.js             # Server-rendered HTML page templates (Home, About)
│   │
│   ├── controllers/                 # CONTROLLER LAYER (Application & Business Logic)
│   │   ├── userController.js        # User CRUD orchestration, payload validation, status codes
│   │   ├── healthController.js      # System health telemetry, uptime, memory & OS metrics
│   │   ├── coreController.js        # Lab endpoints, greeting generators, math calculations
│   │   └── swaggerController.js     # Swagger UI page rendering & OpenAPI JSON provider
│   │
│   ├── routes/                      # ROUTING LAYER (Endpoint Definitions & Dispatching)
│   │   ├── index.js                 # Central router aggregating all sub-routers
│   │   ├── userRoutes.js            # User endpoints (/api/users, /api/users/:id)
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
├── Alumni Tracking System API/      # Postman v3 collection directory with .request.yaml files
├── package.json                     # Node.js project manifest, dependencies, and npm scripts
└── README.md                        # Master project documentation
```

---

### 🧩 Architectural Layers & Responsibilities

#### 1. 🗄️ Model Layer (`src/models/`)
- Encapsulates entity representation, data validation, and persistence operations completely decoupled from HTTP/controller logic.
- **In-Memory Architecture (Zero Database Dependency):** Operates on an internal structured memory array (`users`), allowing instantaneous execution, rapid prototyping, and automated unit testing without requiring an active PostgreSQL or MongoDB database connection.
- **`userModel.js`**: Features a robust, enterprise-grade class providing complete CRUD operations, schema validation, multi-criteria filtering, and data consistency safeguards.

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

##### 🛠️ Implemented CRUD Functions

```javascript
const UserModel = require('../models/userModel');

// 1. CREATE (C)
const newUser = UserModel.create({
  name: 'Ayşe Kaya',
  email: 'ayse@example.com',
  role: 'alumni',
  department: 'Electrical Engineering',
  graduationYear: 2022
});

// 2. READ (R)
const allUsers     = UserModel.findAll();                      // All records
const filtered     = UserModel.findAll({ role: 'alumni' });   // Filter by role
const searched     = UserModel.findAll({ search: 'Kaya' });   // Free text search
const paginated    = UserModel.findAll({ page: 1, limit: 10 });// Pagination
const userById     = UserModel.findById(1);                    // Find by primary ID
const userByEmail  = UserModel.findByEmail('ayse@example.com');// Case-insensitive email
const isExisting   = UserModel.exists(1);                      // Boolean existence check
const totalCount   = UserModel.count({ role: 'alumni' });      // Filtered record count

// 3. UPDATE (U)
// Full replacement (PUT semantics - requires name & email)
const updatedUser  = UserModel.update(1, {
  name: 'Ayşe Kaya Demir',
  email: 'ayse.demir@example.com',
  department: 'Computer Science',
  graduationYear: 2022
});

// Partial modification (PATCH semantics - modifies only provided keys)
const patchedUser  = UserModel.patch(1, {
  company: 'Global AI Lab',
  jobTitle: 'Senior Research Engineer'
});

// 4. DELETE (D)
const deletedUser  = UserModel.delete(1);                      // Delete by ID
const deletedEmail = UserModel.deleteByEmail('ayse@example.com');// Delete by email
UserModel.reset();                                             // Reset to seed dataset
```

##### 🛡️ Validation & Data Integrity Safeguards
- **Email Uniqueness:** Prevents duplicate registrations across `create`, `update`, and `patch`.
- **Format Validation:** RFC-compliant regex validation (`isValidEmail()`) ensures emails are structurally valid.
- **Role Enforcement:** Restricts roles strictly to predefined whitelist (`alumni`, `student`, `faculty`, `admin`).
- **Graduation Year Range:** Enforces realistic integer years between 1900 and 2100.
- **Defensive Immutability:** CRUD methods return shallow clones to avoid unintended external memory mutations.

#### 2. 🎨 View Layer (`src/views/`)
- Responsible for the presentation output sent to clients.
- Decouples UI structure, HTML markup, and response styling from controller logic.
- **`htmlViews.js`**: Renders browser-friendly HTML page layouts for human visitors accessing core routes such as the home page (`renderHome()`) and about page (`renderAbout()`).

#### 3. 🧠 Controller Layer (`src/controllers/`)
- Acts as the intermediary orchestrating the application flow.
- Accepts parsed HTTP requests from routes, executes defensive input validation, invokes appropriate Model methods, selects output views or JSON representations, and emits HTTP status codes.
- **`userController.js`**: Handles user listing, creation validation, single user retrieval, full updates (`PUT`), partial updates (`PATCH`), and deletion (`DELETE`).
- **`healthController.js`**: Extracts node process uptime, platform architecture, and memory usage metrics (`rss`, `heapTotal`, `heapUsed`) for monitoring systems.
- **`coreController.js`**: Handles base endpoints, content-negotiated responses, arithmetic calculations (`/sum/:num1/:num2`), and personalized greetings.
- **`swaggerController.js`**: Serves the interactive Swagger UI and OpenAPI 3.0 specification JSON.

#### 4. 🚦 Routing Layer (`src/routes/`)
- Strictly maps incoming HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and URL patterns to controller action handlers.
- Promotes modularity by partitioning routes into dedicated files (`userRoutes.js`, `healthRoutes.js`, `coreRoutes.js`, `swaggerRoutes.js`) and aggregating them via `index.js`.

#### 5. ⚙️ Application & Server Configuration (`src/app.js` & `index.js`)
- **`src/app.js`**: Configures middleware pipelines (CORS, JSON parser, urlencoded parser, multipart form parser) and mounts the master router. Decoupled from the port listener for seamless integration testing with supertest/jest.
- **`index.js`**: Server bootstrap entry point that imports `app.js`, reads the `PORT` environment variable (`5001`), and binds the HTTP server.

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
PORT=5001
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=alumni_db
DB_USER=alumni_user
DB_PASSWORD=alumni_secret_password
```

---

### 3. Run with Docker Compose (Recommended) 🐳

Launch both the Node.js backend and the PostgreSQL database in isolated containers:

```bash
# Build and start services in detached mode
docker compose up -d --build

# Inspect container output and logs
docker compose logs -f
```

The application server will become reachable at `http://localhost:5001`.

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
| `GET` | `/` | API ping / Home placeholder | Terminal/curl: `"ok"` \| Browser: `"temporary one main page"` |
| `GET` | `/home` | Placeholder home page | `"temporary one main page"` |
| `GET` | `/about` | Placeholder about page | `"temp. about page"` |
| `GET` | `/hello` | Standard greeting | `"Hello, World!"` |
| `GET` | `/hello/:name` | Parameterized greeting | `/hello/emre` -> `"Hello, Emre!"` |
| `GET` | `/sum/:num1/:num2` | Summation of two integers | `/sum/15/25` -> `40` |
| `GET` | `/api/health` | Comprehensive system health check JSON | `{"status": "OK", "uptime": 12.34, "memory": {...}}` |
| `POST` | `/api/users` | Add new user (form/JSON format, in-memory) | Body: `name`, `email`, `role`, `department` |
| `GET` | `/api/users` | List all registered in-memory users | Returns JSON array of users |
| `GET` | `/api/users/:id` | Retrieve single user by ID | `/api/users/1` |
| `PUT` | `/api/users/:id` | Full update/replacement of user record | Body: `name`, `email`, `role`, etc. |
| `PATCH` | `/api/users/:id` | Partial update of specific user fields | Body: fields to update (e.g. `department`) |
| `DELETE` | `/api/users/:id` | Delete user record by ID | `/api/users/1` |

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