# Task Manager API

A production-ready REST API built with Node.js, Express, Prisma ORM, and SQLite (configured for easy migration to MySQL/PostgreSQL).

## Features
- **User Authentication**: JWT-based login and registration.
- **Task Management**: Create, read, update, and delete tasks. Pagination, searching, and filtering.
- **File Uploads**: Attach files (images/PDFs) to tasks using Multer.
- **Security**: Helmet, CORS, and Express Rate Limiting.
- **Validation**: Request validation using Joi.
- **Centralized Error Handling**: Unified and consistent JSON error responses.

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy the `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Initialize the database and apply migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Seed the database with initial demo data:
   ```bash
   npm run seed
   # Note: For Prisma 6 and above, use `npx prisma db seed` 
   # Demo User Credentials:
   # Email: demo@example.com
   # Password: password123
   ```

### Running the Application
- **Development**: `npm run dev` (uses nodemon)
- **Production**: `npm start`

## API Endpoints

### Auth Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login to receive a JWT token
- `GET /api/auth/me` - Get current user profile (requires Auth)

### Task Endpoints
*All task endpoints require a valid JWT token passed in the `Authorization: Bearer <token>` header.*

- `GET /api/tasks` - Get all tasks (supports query params: `?page=1&limit=10&status=pending&search=query`)
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task (supports `multipart/form-data` with an `attachment` field)
- `PUT /api/tasks/:id` - Update a task (supports `multipart/form-data` with an `attachment` field)
- `DELETE /api/tasks/:id` - Delete a task

### Static Files
- Uploaded files can be accessed publicly via `GET /uploads/<filename>`.

## Deployment to AWS
1. Provision an **RDS instance (MySQL)** and update the `DATABASE_URL` in your `.env` file. Change the Prisma `provider` to `mysql` in `schema.prisma`.
2. (Optional) Replace Multer disk storage with AWS S3 storage (`multer-s3`) for scalable file uploads.
3. Deploy the Node.js application to **EC2**, **Elastic Beanstalk**, or **AWS App Runner**.

## Tech Stack
- **Node.js** & **Express**
- **Prisma ORM**
- **SQLite** (Default local DB) / **MySQL** (Target Production DB)
- **jsonwebtoken**, **bcrypt**, **Joi**
