# 📊 Data Design & Persistence Architecture

This document specifies the data model design, entity relationships, validation rules, and persistence lifecycle for the **Alumni Tracking System** backend.

---

## 🏛️ 1. Architecture Overview

The Alumni Tracking System backend implements the **Model-View-Controller (MVC)** architectural pattern. Data access and entity lifecycle are strictly encapsulated within the **Model Layer** (`src/models/`).

```text
┌─────────────────────────────────┐
│     Controllers / Routes        │
└────────────────┬────────────────┘
                 │ Calls Model methods
                 ▼
┌─────────────────────────────────┐
│      Model Layer (src/models)   │
│   - Schema Validation           │
│   - Defensive Immutability      │
│   - Query & Pagination Engine   │
└────────────────┬────────────────┘
                 │
                 ├──▶ Active: In-Memory Datastore (Runtime Heap Arrays)
                 │    - Zero external DB dependency
                 │    - Instant bootstrap & isolated testing
                 │
                 └──▶ Target: PostgreSQL 15 Relational Persistence
                      - ACID transactions
                      - Durable Docker volume persistence
```

---

## 🗄️ 2. Entity Schemas & Validation Rules

### 2.1 User Entity (`src/models/userModel.js`)

Represents registered graduates, faculty members, current students, and system administrators.

| Attribute | Type | Nullable | Default | Constraints / Validation | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `Integer` | No | Auto-inc | Primary key, numeric identifier | Unique user ID |
| `name` | `String` | No | — | Min 1 char, trimmed string | Full legal or preferred name |
| `email` | `String` | No | — | Unique, RFC-compliant email regex | Case-insensitive email address |
| `role` | `String` | No | `'alumni'` | Whitelist: `alumni`, `student`, `faculty`, `admin` | User authorization role |
| `department` | `String` | Yes | `null` | String | Academic program or department |
| `graduationYear`| `Integer`| Yes | `null` | $1900 \le \text{year} \le 2100$ | Year of graduation |
| `phone` | `String` | Yes | `null` | E.164 or formatted contact number | Optional contact phone |
| `company` | `String` | Yes | `null` | String | Current employer organization |
| `jobTitle` | `String` | Yes | `null` | String | Current professional title |
| `createdAt` | `ISO8601`| No | Current | Automated system timestamp | Record creation timestamp |
| `updatedAt` | `ISO8601`| No | Current | Automated update timestamp | Last modification timestamp |

### 2.2 Announcement Entity (`src/models/announcementModel.js`)

Represents institutional news, career postings, webinars, and reunion notices.

| Attribute | Type | Nullable | Default | Constraints / Validation | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `Integer` | No | Auto-inc | Primary key, numeric identifier | Unique announcement ID |
| `title` | `String` | No | — | Required, non-empty trimmed string | Headline / subject |
| `content` | `String` | No | — | Required, non-empty body text | Detailed announcement content |
| `author` | `String` | No | `'Alumni Relations Office'` | Department or creator name | Author attribution |
| `category` | `String` | No | `'General'` | Whitelist: `General`, `Event`, `Career`, `Academic`, `News`, `Urgent` | Category taxonomy |
| `createdAt` | `ISO8601`| No | Current | Automated system timestamp | Creation timestamp |
| `updatedAt` | `ISO8601`| No | Current | Automated update timestamp | Last modification timestamp |

---

## 🛡️ 3. Data Integrity & Defensive Immutability

1. **Defensive Cloning:**
   - Both `UserModel` and `AnnouncementModel` return shallow clones (`{ ...item }` or `items.map(i => ({ ...i }))`) from query methods (`getAll`, `getById`, `findById`). This prevents controllers or view helpers from accidentally mutating the in-memory array state by reference.
2. **Schema Validation:**
   - All write operations (`create`, `update`, `patch`) pass through centralized static validator methods (`validate()`). If an invalid payload is submitted, standard HTTP 400 errors with descriptive violation messages are emitted.
3. **Email Uniqueness:**
   - Case-insensitive uniqueness checks prevent multiple users from registering with the same email.

---

## 🧪 4. The Forgetting Test (Lifecycle Verification)

### 4.1 Concept & Purpose
The **Forgetting Test** is an empirical systems test used to verify data persistence boundaries. When an application utilizes an in-memory datastore:
- Any entities created during runtime exist strictly inside the Node.js process heap memory.
- When the container environment is terminated (`docker compose down`) and restarted (`docker compose up -d`), unpersisted runtime state must be **forgotten** and reset cleanly to initial seed data.

### 4.2 Test Protocol & Evidence

```text
Step 1: POST /api/users
        Body: {"name": "Forgetting Test User", "email": "forgetting-test@example.com", ...}
        Response: HTTP 201 Created (ID: 2)

Step 2: GET /api/users/2
        Response: HTTP 200 OK (Verified active in memory)

Step 3: docker compose down && docker compose up -d
        Containers alumni_app & alumni_postgres stopped, removed, recreated, and started fresh.

Step 4: GET /api/users/2
        Response: HTTP 404 Not Found (Record forgotten as expected)
        GET /api/users count reset back to 1 seed record.
```

### 4.3 Automated Verification Script
A test script is provided in [`tests/forgetting-test.sh`](tests/forgetting-test.sh):
```bash
./tests/forgetting-test.sh
```

---

## 🚀 5. Roadmap: PostgreSQL Persistence Migration

The codebase is engineered with strict MVC boundary separation to enable seamless migration from in-memory arrays to persistent PostgreSQL storage:

1. **Model Abstraction:**
   Controllers (`apiUserController`, `apiAnnouncementController`) interact solely with Model static methods (`findAll`, `findById`, `create`, `update`, `delete`).
2. **Database Container:**
   `docker-compose.yml` already provisions an official PostgreSQL 15 Alpine container (`alumni_postgres`) with healthchecks and persistent named volume (`postgres_data`).
3. **Migration Steps:**
   - Add database connection pool via `pg` or query builder (`Knex.js`).
   - Implement relational table DDL in a schema migration file.
   - Replace internal array manipulations in `UserModel` and `AnnouncementModel` with SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) without modifying any routes, controllers, or views.
