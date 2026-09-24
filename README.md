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

## 📁 Project Structure

```text
Alumni/
├── src/
│   ├── routes/              # Express API route modules
│   │   └── index.js         # Endpoint declarations (lab & application routes)
│   └── app.js               # Express application initialization and middleware
├── index.js                 # Server entry point binding HTTP listener
├── Dockerfile               # Production-ready Node.js container definition
├── docker-compose.yml       # Multi-container orchestration (App & PostgreSQL)
├── .dockerignore            # Build context exclusion rules
├── .env.example             # Template configuration for environment variables
├── .gitignore               # Version control ignore rules
├── package.json             # NPM package manifests and execution scripts
└── README.md                # Project documentation
```

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
PORT=5000
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

The application server will become reachable at `http://localhost:5000`.

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
| `GET` | `/` | API ping / Home placeholder | Terminal/curl: `"ok"` \| Browser: `"temporary one main page"` |
| `GET` | `/home` | Placeholder home page | `"temporary one main page"` |
| `GET` | `/about` | Placeholder about page | `"temp. about page"` |
| `GET` | `/hello` | Standard greeting | `"Hello, World!"` |
| `GET` | `/hello/:name` | Parameterized greeting | `/hello/emre` -> `"Hello, Emre!"` |
| `GET` | `/sum/:num1/:num2` | Summation of two integers | `/sum/15/25` -> `40` |
| `GET` | `/api/health` | Service health status JSON | `{"status": "success", "message": "..."}` |

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