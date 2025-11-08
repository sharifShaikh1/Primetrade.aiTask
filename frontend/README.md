# Frontend - Task Manager UI

A modern Next.js frontend application with TypeScript for interacting with the Backend API.

## 🚀 Features

- ✅ User Registration & Login UI
- ✅ JWT Token Management (stored in cookies)
- ✅ Protected Dashboard with Authentication
- ✅ Task CRUD Interface
- ✅ Task Filtering by Status & Priority
- ✅ Real-time Success/Error Notifications
- ✅ Responsive Design
- ✅ Form Validation
- ✅ TypeScript for Type Safety

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Update the API URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📱 Pages

### Public Pages
- `/` - Home (redirects to login or dashboard)
- `/register` - User registration
- `/login` - User login

### Protected Pages
- `/dashboard` - Task management dashboard (requires authentication)

## 🎨 Features Overview

### Authentication
- **Register**: Create a new account with name, email, and password
- **Login**: Sign in with email and password
- **Logout**: Sign out and clear session
- **Auto-redirect**: Automatically redirects to login if not authenticated

### Task Management
- **Create Task**: Add new tasks with title, description, status, and priority
- **View Tasks**: See all your tasks in a card layout
- **Edit Task**: Update task details
- **Delete Task**: Remove tasks with confirmation
- **Filter Tasks**: Filter by status (pending/in-progress/completed) and priority (low/medium/high)

### User Experience
- **Toast Notifications**: Real-time feedback for all actions
- **Form Validation**: Client-side validation with helpful error messages
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Dashboard page (protected)
│   │   ├── login/
│   │   │   └── page.tsx      # Login page
│   │   ├── register/
│   │   │   └── page.tsx      # Register page
│   │   ├── layout.tsx        # Root layout with ToastContainer
│   │   ├── page.tsx          # Home page (redirect)
│   │   └── globals.css       # Global styles
│   ├── lib/
│   │   ├── axios.ts          # Axios instance with interceptors
│   │   └── auth.ts           # Auth utility functions
│   └── services/
│       ├── authService.ts    # Authentication API calls
│       └── taskService.ts    # Task API calls
├── .env.local.example
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT token received from API
3. Token stored in cookies (7-day expiry)
4. Token automatically included in all API requests
5. If token expires or is invalid, user is redirected to login

## 🎯 API Integration

The frontend communicates with the backend API using axios. All API calls are centralized in service files:

- `authService.ts`: Registration, login, logout, profile
- `taskService.ts`: CRUD operations for tasks

### Axios Interceptors

**Request Interceptor**: Automatically adds JWT token to all requests

**Response Interceptor**: Handles 401 errors and redirects to login

## 🎨 Styling

The application uses custom CSS with CSS variables for theming. Main style features:

- Utility classes for common patterns
- Responsive grid layouts
- Status and priority badges
- Form components
- Button variations
- Toast notifications from `react-toastify`

## 📊 Task Status & Priority

### Status Options
- **Pending**: Task not started
- **In Progress**: Task being worked on
- **Completed**: Task finished

### Priority Levels
- **Low**: Can wait
- **Medium**: Normal priority
- **High**: Urgent task

## 🔄 State Management

The application uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- `useRouter` for navigation
- `useForm` (react-hook-form) for form handling

## 🚀 Building for Production

```bash
npm run build
npm start
```

The optimized production build will be created in the `.next` directory.

## 🧪 Testing the Application

### 1. Register a New User
- Navigate to `http://localhost:3000/register`
- Fill in name, email, and password
- Click "Register"

### 2. Login
- Navigate to `http://localhost:3000/login`
- Enter email and password
- Click "Login"

### 3. Create Tasks
- On the dashboard, click "+ Create Task"
- Fill in task details
- Click "Create"

### 4. Manage Tasks
- View all your tasks
- Filter by status or priority
- Edit or delete tasks as needed

### 5. Logout
- Click "Logout" button in the navbar

## 🔒 Security Features

- JWT tokens stored in HTTP-only cookies (7-day expiry)
- Automatic token cleanup on logout
- Protected routes with authentication checks
- Form validation to prevent invalid submissions
- CORS handling for secure API communication

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

For production, update this to your production API URL.

## 📝 Additional Notes

### Toast Notifications
The app uses `react-toastify` for user feedback:
- Success messages (green)
- Error messages (red)
- Auto-dismiss after 3 seconds

### Form Validation
Forms use `react-hook-form` for validation:
- Email format validation
- Password length requirements
- Required field checks
- Real-time error messages

### Responsive Design
The UI adapts to different screen sizes:
- Mobile: Single column layout
- Desktop: Grid layouts for tasks and filters

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend server is running on `http://localhost:4000`
- Check `.env.local` has correct API URL
- Verify CORS settings in backend allow frontend origin

### Authentication Issues
- Clear browser cookies if experiencing login issues
- Check browser console for error messages
- Verify JWT token in browser developer tools

### Build Issues
- Delete `.next` folder and rebuild
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

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
