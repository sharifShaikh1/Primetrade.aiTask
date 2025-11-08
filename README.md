# Scalable REST API with Authentication & Role-Based Access

A full-stack application demonstrating secure backend API development with a modern frontend interface. Built for the Backend Developer Intern Assignment.

## 📋 Project Overview

This project includes:
- **Backend**: Node.js + Express + TypeScript + MongoDB + Redis
- **Frontend**: Next.js + TypeScript + React

## 🎯 Assignment Requirements Met

✅ **Backend (Primary Focus)**
- User registration & login APIs with password hashing (bcrypt)
- JWT authentication with token blacklisting (Redis)
- Role-based access control (user/admin roles)
- CRUD APIs for tasks (secondary entity)
- API versioning (`/api/v1/`)
- Comprehensive error handling and validation
- Swagger API documentation
- MongoDB database with proper schemas
- Winston logging for error tracking
- Rate limiting and security headers

✅ **Frontend (Supportive)**
- Built with Next.js 14 and TypeScript
- User registration and login pages
- Protected dashboard requiring JWT
- CRUD interface for tasks
- Success/error messages from API responses
- Form validation and user feedback

✅ **Security & Scalability**
- JWT token handling with Redis blacklisting
- Password hashing with bcrypt (10 rounds)
- Input sanitization with express-validator
- CORS configuration
- Helmet security headers
- Rate limiting to prevent abuse
- Modular architecture for easy scaling
- Environment-based configuration

## 🏗️ Project Structure

```
.
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database and Redis connections
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # JWT, logger, token blacklist
│   │   └── server.ts       # Application entry
│   ├── logs/               # Winston logs
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js 14 app directory
│   │   ├── lib/           # Axios and auth utilities
│   │   └── services/      # API service layers
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── instruction.txt         # Original assignment requirements
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud)
- Redis (local or cloud)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB and Redis URLs

# Start the server
npm run dev
```

Backend runs on: `http://localhost:4000`
API Docs: `http://localhost:4000/api-docs`

### 2. Frontend Setup

```bash
cd frontend
npm install

# Configure environment
cp .env.local

# Start the dev server
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🔧 Configuration

### Backend `.env`
```env
PORT=4000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Redis - UPDATE WITH YOUR REMOTE URL
REDIS_URL=redis://your-redis-url:6379
REDIS_PASSWORD=your_redis_password

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## 📚 API Documentation

Once the backend is running, access the interactive Swagger documentation at:
```
http://localhost:4000/api-docs
```

### Key Endpoints

**Authentication**
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout (blacklist token)
- `GET /api/v1/auth/me` - Get current user profile

**Tasks**
- `GET /api/v1/tasks` - Get all user tasks
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/:id` - Get single task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/tasks/admin/all` - Get all tasks (admin only)

## 🔐 Authentication Flow

1. User registers via `/api/v1/auth/register`
2. User logs in via `/api/v1/auth/login` and receives JWT token
3. Frontend stores token in cookies
4. All subsequent requests include token in `Authorization: Bearer <token>` header
5. Backend validates token and checks Redis blacklist
6. On logout, token is added to Redis blacklist
7. Blacklisted tokens are rejected for remaining lifetime

## 🎨 Frontend Features

- **Registration Page**: Create account with validation
- **Login Page**: Authenticate with email/password
- **Dashboard**: Protected page showing all tasks
- **Task Management**: Create, edit, delete tasks
- **Filtering**: Filter tasks by status and priority
- **Toast Notifications**: Real-time feedback for all actions
- **Responsive Design**: Works on all devices

## 🔒 Security Implementation

### Password Security
- Bcrypt hashing with 10 salt rounds
- Passwords never stored in plain text
- Password validation (minimum 6 characters)

### JWT Security
- Secure token generation with expiry
- Token blacklisting on logout using Redis
- Automatic token validation on protected routes
- Token expiration handling

### API Security
- Helmet middleware for security headers
- CORS configuration for allowed origins
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- SQL injection protection via Mongoose
- XSS protection via input sanitization

### Role-Based Access Control
- User role: Access own tasks
- Admin role: Access all tasks across all users
- Middleware to enforce role permissions

## 📊 Database Schema

### User Model
```typescript
{
  name: string,
  email: string (unique),
  password: string (hashed),
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```typescript
{
  title: string,
  description: string,
  status: 'pending' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📈 Scalability Considerations

### Current Implementation
- **Modular Architecture**: Separation of concerns for easy maintenance
- **Token Blacklisting**: Redis for fast token validation
- **Database Indexing**: Optimized MongoDB queries
- **Logging**: Comprehensive Winston logging
- **API Versioning**: `/api/v1/` for backward compatibility

### Future Enhancements

1. **Microservices Architecture**
   - Split auth and task services
   - Independent scaling of services
   - Service mesh for communication

2. **Caching Strategy**
   - Redis caching for frequently accessed data
   - Cache invalidation strategies
   - CDN for static assets

3. **Load Balancing**
   - Horizontal scaling with load balancers
   - Session management across instances
   - Sticky sessions or distributed sessions

4. **Database Optimization**
   - MongoDB replica sets for high availability
   - Read replicas for scaling reads
   - Sharding for large datasets

5. **Message Queue**
   - RabbitMQ/Kafka for async processing
   - Email notifications
   - Background job processing

6. **Containerization**
   - Docker containers for consistent deployment
   - Docker Compose for local development
   - Kubernetes for orchestration

7. **CI/CD Pipeline**
   - Automated testing
   - Continuous integration with GitHub Actions
   - Automated deployment to cloud platforms

8. **Monitoring & Observability**
   - APM tools (New Relic, Datadog)
   - Error tracking (Sentry)
   - Performance monitoring
   - Log aggregation (ELK stack)

9. **API Gateway**
   - Centralized routing
   - Rate limiting at gateway level
   - API composition
   - Authentication/Authorization

10. **Performance Optimization**
    - Response compression
    - Database query optimization
    - Connection pooling
    - Lazy loading

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment (Example: Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
cd frontend
vercel deploy
```

### Environment Variables
Ensure all production environment variables are set:
- Strong JWT_SECRET
- Production database URLs
- Production Redis URL
- CORS origins for production domains

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB Connection**: Verify MONGODB_URI is correct
- **Redis Connection**: Check REDIS_URL and REDIS_PASSWORD
- **Port Already in Use**: Change PORT in .env
- **JWT Errors**: Verify JWT_SECRET is set

### Frontend Issues
- **API Connection**: Ensure NEXT_PUBLIC_API_URL is correct
- **CORS Errors**: Add frontend URL to backend ALLOWED_ORIGINS
- **Authentication**: Clear browser cookies if issues persist

## 📝 Log Files

Backend logs are stored in `backend/logs/`:
- `error.log` - Error logs only
- `combined.log` - All logs

These log files should be submitted with the assignment.

## 🎓 Learning Points

This project demonstrates:
- RESTful API design principles
- Secure authentication with JWT
- Token blacklisting for logout
- Role-based access control
- Database design and relationships
- Error handling and validation
- API documentation
- Frontend-backend integration
- TypeScript for type safety
- Modern development practices

## 📧 Submission

**Submit to**: 
- saami@bajarangs.com
- nagasai@bajarangs.com
- chetan@bajarangs.com
- CC: sonika@primetrade.ai

**Subject**: Backend Developer Task

**Include**:
- GitHub repository link
- Log files from `backend/logs/`
- Any additional documentation or notes

## 👤 Author

[Your Name]
Backend Developer Intern Candidate

## 📄 License

ISC
