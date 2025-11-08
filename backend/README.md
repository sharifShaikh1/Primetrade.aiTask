# Backend API - Scalable REST API with Authentication

A robust and scalable REST API built with Node.js, Express, TypeScript, MongoDB, Redis, and JWT authentication.

## 🚀 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Role-Based Access Control (User & Admin)
- ✅ JWT Token Blacklisting using Redis
- ✅ Password Hashing with bcrypt
- ✅ CRUD Operations for Tasks
- ✅ Request Validation & Sanitization
- ✅ Centralized Error Handling
- ✅ Winston Logger for Application Logs
- ✅ API Documentation with Swagger
- ✅ Rate Limiting & Security Headers
- ✅ CORS Configuration
- ✅ TypeScript for Type Safety

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Redis (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update the following in `.env`:
```env
PORT=4000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Redis - Replace with your remote Redis URL
REDIS_URL=redis://your-redis-url:6379
REDIS_PASSWORD=your_redis_password

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

4. **Start the server**

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:4000/api-docs
```

## 🔐 Authentication

### Register a new user
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Protected Routes

Include the JWT token in the Authorization header:
```bash
Authorization: Bearer <your_jwt_token>
```

### Logout (Blacklist Token)
```bash
POST /api/v1/auth/logout
Authorization: Bearer <your_jwt_token>
```

## 📝 Task Management

### Create a task
```bash
POST /api/v1/tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "pending",
  "priority": "high"
}
```

### Get all tasks
```bash
GET /api/v1/tasks
Authorization: Bearer <your_jwt_token>
```

Query parameters:
- `status`: pending, in-progress, completed
- `priority`: low, medium, high

### Get single task
```bash
GET /api/v1/tasks/:id
Authorization: Bearer <your_jwt_token>
```

### Update task
```bash
PUT /api/v1/tasks/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "status": "completed"
}
```

### Delete task
```bash
DELETE /api/v1/tasks/:id
Authorization: Bearer <your_jwt_token>
```

### Admin: Get all tasks (all users)
```bash
GET /api/v1/tasks/admin/all
Authorization: Bearer <admin_jwt_token>
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # MongoDB connection
│   │   ├── redis.ts         # Redis connection
│   │   └── swagger.ts       # Swagger configuration
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── taskController.ts
│   ├── middleware/
│   │   ├── auth.ts          # JWT authentication & authorization
│   │   ├── errorHandler.ts # Centralized error handling
│   │   └── validator.ts     # Request validation
│   ├── models/
│   │   ├── User.ts          # User schema
│   │   └── Task.ts          # Task schema
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── taskRoutes.ts
│   ├── utils/
│   │   ├── jwt.ts           # JWT utilities
│   │   ├── logger.ts        # Winston logger
│   │   └── tokenBlacklist.ts # Redis token blacklisting
│   └── server.ts            # Application entry point
├── logs/                     # Application logs
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
└── tsconfig.json
```

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token generation and verification
3. **Token Blacklisting**: Redis-based token invalidation on logout
4. **Input Validation**: express-validator for request sanitization
5. **Rate Limiting**: Prevent brute-force attacks
6. **Helmet**: Security headers
7. **CORS**: Configurable allowed origins

## 📊 Logging

Winston logger is configured to:
- Log errors to `logs/error.log`
- Log all activity to `logs/combined.log`
- Console output in development mode

## 🔄 API Versioning

The API uses URL versioning:
- Current version: `/api/v1/`
- Future versions can be added as `/api/v2/`, etc.

## 🚀 Scalability Considerations

### Current Implementation
- **Modular Architecture**: Easy to add new features
- **Token Blacklisting**: Redis for fast token validation
- **Database Indexing**: Optimized queries
- **Logging**: Comprehensive error tracking

### Future Enhancements
1. **Microservices**: Split authentication and task services
2. **Caching**: Redis caching for frequently accessed data
3. **Load Balancing**: Horizontal scaling with load balancers
4. **Database Replication**: MongoDB replica sets for high availability
5. **Message Queue**: RabbitMQ/Kafka for async processing
6. **Docker**: Containerization for consistent deployment
7. **CI/CD**: Automated testing and deployment pipelines
8. **API Gateway**: Centralized routing and rate limiting
9. **Monitoring**: APM tools (New Relic, Datadog)
10. **CDN**: Static asset delivery

## 🧪 Testing

```bash
npm test
```

## 📦 Deployment

### Using Docker (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t backend-api .
docker run -p 4000:4000 --env-file .env backend-api
```

### Environment Variables for Production

Ensure all environment variables are properly set:
- Use strong JWT_SECRET
- Configure production database URLs
- Set NODE_ENV=production
- Configure CORS for production domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

ISC

## 📧 Contact

For questions or issues, please open a GitHub issue.
