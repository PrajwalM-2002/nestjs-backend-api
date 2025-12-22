# NestJS Backend API – Assessment

## Description
This project is a backend REST API built using **NestJS** as part of a technical assessment.
It demonstrates CRUD operations, JWT-based authentication and authorization, PostgreSQL integration, and unit testing.

---

## Tech Stack
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- bcrypt
- Jest (Unit Testing)

---

## Features
- User CRUD operations (Create, Read, Update, Delete)
- Input validation using DTOs
- JWT-based authentication (Register & Login)
- Protected routes using JWT Guard
- Unit tests for core services

---

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

---

### 2. Configure Database

Create a PostgreSQL database:
```sql
CREATE DATABASE nest_assignment;
```

Update database credentials in the file:
```
src/app.module.ts
```

Example configuration:
```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password',
  database: 'nest_assignment',
  autoLoadEntities: true,
  synchronize: true,
});
```

---

### 3. Run the Application
```bash
npm run start:dev
```

The server will start at:
```
http://localhost:3000
```

---

## API Authentication

JWT-based authentication is implemented.

After logging in, include the JWT token in request headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## Running Tests

Run unit tests using:
```bash
npm run test
```

---

## Author
Prajwal Mohankumar