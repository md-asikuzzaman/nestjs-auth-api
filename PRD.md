# Project Requirements Document (PRD)

## Project Name

**Authentication & User Management API**

---

# 1. Project Overview

XYZ Company is building a reusable Authentication & User Management API that will serve as the foundation for all future products.

The API must be secure, scalable, maintainable, and production-ready.

---

# 2. Objective

The system should provide:

- Secure Authentication
- User Management
- Role-Based Access Control (RBAC)
- Redis Integration
- Clean Architecture
- RESTful APIs

---

# 3. Technology Stack

## Backend

- NestJS
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Cache

- Redis

## Authentication

- JWT
- Refresh Token

## Validation

- class-validator
- class-transformer

## Documentation

- Swagger

## Testing

- Jest

## Containerization

- Docker
- Docker Compose

---

# 4. User Roles

## User

A normal user can:

- Register
- Login
- Logout
- View own profile
- Update own profile
- Change password

---

## Admin

An administrator can:

- View all users
- View user details
- Block users
- Unblock users

---

# 5. Functional Requirements

## 5.1 Authentication Module

### User Registration

The system shall allow users to register.

### Required Fields

- Name
- Email
- Password

### Validation Rules

- Email must be unique.
- Email must be valid.
- Password minimum length: 8 characters.
- Password must be hashed before storing.

---

### User Login

Users shall log in using:

- Email
- Password

On successful login, the API shall return:

- Access Token
- Refresh Token

---

### Logout

Authenticated users can log out.

The refresh token must become invalid after logout.

---

### Refresh Token

The system shall generate a new Access Token using a valid Refresh Token.

Refresh Tokens must be stored in Redis.

---

# 5.2 User Module

Authenticated users can:

## Get Profile

Retrieve their own profile.

---

## Update Profile

Editable fields:

- Name

Email cannot be updated.

---

## Change Password

Requirements:

- Current password required.
- New password must be hashed.
- Old password cannot be reused.

---

# 5.3 Admin Module

## Get All Users

Admin can retrieve all registered users.

Support:

- Pagination
- Search by email or name

---

## Get User Details

Admin can retrieve a specific user.

---

## Block User

Admin can block any user.

Blocked users cannot log in.

---

## Unblock User

Admin can restore blocked users.

---

# 6. Authorization

Implement Role-Based Access Control.

Supported roles:

- User
- Admin

Use:

- JWT Authentication Guard
- Roles Guard
- Custom @Roles() Decorator

---

# 7. Database Requirements

## Users Table

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| email | String |
| password_hash | String |
| role | Enum |
| is_blocked | Boolean |
| created_at | Timestamp |
| updated_at | Timestamp |

---

# 8. Redis Requirements

Redis shall be used for:

## Refresh Token Storage

Store active Refresh Tokens.

---

## User Profile Cache

Cache authenticated user profiles.

TTL: **5 Minutes**

---

# 9. Security Requirements

The API must implement:

- Password Hashing (bcrypt or Argon2)
- JWT Authentication
- Refresh Token Validation
- Helmet
- CORS
- Global Validation Pipe
- Rate Limiting

---

# 10. Validation Rules

## Name

- Required
- Minimum 3 characters

---

## Email

- Required
- Valid email format
- Unique

---

## Password

- Required
- Minimum 8 characters

---

# 11. API Endpoints

## Authentication

| Method | Endpoint |
|----------|------------------------|
| POST | /auth/register |
| POST | /auth/login |
| POST | /auth/logout |
| POST | /auth/refresh |

---

## User

| Method | Endpoint |
|----------|---------------------------|
| GET | /users/me |
| PATCH | /users/me |
| PATCH | /users/change-password |

---

## Admin

| Method | Endpoint |
|----------|-----------------------------|
| GET | /admin/users |
| GET | /admin/users/:id |
| PATCH | /admin/users/:id/block |
| PATCH | /admin/users/:id/unblock |

---

# 12. Response Format

## Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

# 13. Swagger Documentation

Swagger documentation must include:

- Authentication APIs
- User APIs
- Admin APIs
- Request examples
- Response examples
- Authorization support

---

# 14. Testing Requirements

Write tests for:

- Authentication Service
- User Service

Testing framework:

- Jest

---

# 15. Docker Requirements

Docker Compose must include:

- NestJS Application
- PostgreSQL
- Redis

The project should be runnable using:

```bash
docker compose up
```

---

# 16. Project Structure

```
src/
│
├── auth/
├── users/
├── redis/
├── prisma/
├── common/
├── config/
├── shared/
├── app.module.ts
└── main.ts
```

---

# 17. Acceptance Criteria

The project will be considered complete when:

- [ ] User registration works.
- [ ] Login works.
- [ ] Logout works.
- [ ] Refresh Token flow works.
- [ ] Refresh Tokens are stored in Redis.
- [ ] JWT authentication works.
- [ ] RBAC works correctly.
- [ ] User profile can be viewed.
- [ ] User profile can be updated.
- [ ] Password can be changed.
- [ ] Admin can retrieve all users.
- [ ] Admin can block/unblock users.
- [ ] Swagger documentation is complete.
- [ ] Docker setup works successfully.
- [ ] Unit tests pass successfully.

---

# 18. Out of Scope (Phase 2)

The following features are **not included** in this phase:

- Forgot Password
- Email Verification
- OTP Authentication
- File Upload
- BullMQ / Queue
- Email Service
- Notifications
- WebSocket
- AWS Deployment
- CI/CD Pipeline
- Monitoring
- Logging System
- Microservices
- Event-Driven Architecture