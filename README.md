# EduDash - Student Management System

A modern, full-stack educational dashboard for managing students and academic records with role-based access control. Built with React, Node.js, Express, and Tailwind CSS.

## 🎯 Features

- **User Authentication**
  - Secure signup and login with email and password
  - Role-based access (Student & Admin)
  - Session persistence with localStorage
  - Prevent duplicate email registrations

- **Admin Dashboard**
  - View all enrolled students
  - Add new students to the system
  - Edit student details
  - Delete student records
  - Manage student statuses (active, inactive, graduated)

- **Student Dashboard**
  - View personal profile
  - Update own profile information
  - Track enrollment date and course details
  - View academic status

- **Role-Based Access Control**
  - Admin-only routes and features
  - Student-only profile pages
  - Automatic redirection based on user role
  - Protected routes with authentication checks

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Radix UI Components
- **Routing:** Wouter (lightweight client-side router)
- **Forms:** React Hook Form with Zod validation
- **State Management:** React Context API
- **UI Components:** Custom Shadcn/UI components
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eduDash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev:client
   ```

   The app will run at `http://localhost:5000`

## 📖 Usage

### Demo Accounts (Pre-loaded)

**Admin Account:**
- Email: `admin@edu.com`
- Password: `password`
- Access: Admin Dashboard with student management

**Student Account:**
- Email: `alice@edu.com`
- Password: `password`
- Access: Student Dashboard with profile view

### Creating New Accounts

1. Click "Sign Up" on the authentication page
2. Select your role (Student or Admin)
3. Enter your name, email, and password
4. Submit to create account and auto-login

### Admin Features

1. **View Students:** All enrolled students displayed in a table
2. **Add Student:** Click "Add Student" button to open form
3. **Edit Student:** Click edit icon to update student details
4. **Delete Student:** Click delete icon to remove student
5. **Search:** Filter students by name or email

### Student Features

1. **View Profile:** See your enrolled course and enrollment date
2. **Edit Profile:** Click "Edit Profile" to update your details
3. **Update Information:** Change name, email, and course
4. **Logout:** Click "Logout" in header to exit

## 🔐 Authentication Flow

```
Sign Up (Select Role) → Create Account → Auto-Login → Dashboard
       ↓
    Login → Verify Credentials → Redirect to Dashboard
       ↓
     Dashboard → Logout → Return to Login
```

## 📁 Project Structure

```
eduDash/
├── client/
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   └── ... (other UI components)
│   │   │   └── layout.tsx
│   │   ├── hooks/
│   │   │   └── use-toast.ts
│   │   ├── lib/
│   │   │   ├── auth-context.tsx       # Authentication context
│   │   │   ├── mock-data.ts           # Mock users and students
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── auth-page.tsx          # Login/Signup page
│   │   │   ├── admin-dashboard.tsx    # Admin student management
│   │   │   ├── student-dashboard.tsx  # Student profile
│   │   │   └── not-found.tsx
│   │   ├── App.tsx                    # Main app and routing
│   │   ├── index.css                  # Global styles
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🔑 Key Files

- **`src/lib/auth-context.tsx`** - Manages authentication state and login/signup logic
- **`src/lib/mock-data.ts`** - Mock user and student data with global data store
- **`src/pages/auth-page.tsx`** - Login and signup interface
- **`src/pages/admin-dashboard.tsx`** - Student management interface
- **`src/pages/student-dashboard.tsx`** - Student profile view
- **`src/App.tsx`** - Main app component with routing and protected routes

## 🔒 Security Features

- Email uniqueness validation across all roles
- Password validation (minimum 6 characters)
- Protected routes requiring authentication
- Role-based authorization checks
- Session persistence with localStorage
- Logout clears all stored user data

## 🎨 Styling & Theme

- **Color Scheme:** Indigo primary with gray accents
- **Typography:** Outfit (headings) + Inter (body)
- **Components:** Custom Shadcn/UI with Tailwind CSS
- **Responsive:** Mobile-friendly design with responsive grid layouts

## 📊 Data Management

### User Data Structure
```typescript
{
  id: string;
  email: string;
  role: "admin" | "student";
  name: string;
}
```

### Student Data Structure
```typescript
{
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;      // YYYY-MM-DD format
  status: "active" | "inactive" | "graduated";
  gpa: number;
}
```

## 📝 Available Scripts

```bash
# Development
npm run dev:client          # Start development server (Port 5000)

# Build
npm run build              # Build for production

# Type checking
npm check                  # Run TypeScript type checking

# Database
npm run db:push            # Push database schema
```

## 🚢 Deployment

### Netlify Deployment

1. **Connect Repository**
   - Push code to GitHub
   - Connect repo to Netlify

2. **Build Settings**
   - **Base directory:** (leave empty or `.`)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Environment Variables** (if needed)
   - No environment variables required for current setup
   - Add as needed for future API integrations

4. **Deploy**
   - Push to main branch
   - Netlify automatically builds and deploys

### Local Production Build

```bash
npm run build
npm start
```

## 🔄 Data Persistence

- User and student data stored in-memory with global data store
- localStorage persists current user session
- Data resets on page refresh (for demo purposes)
- Production version would use a database backend

## 🐛 Troubleshooting

**Issue:** "Login Failed - Invalid credentials"
- **Solution:** Ensure you're using correct email/password or create a new account

**Issue:** "User already exists"
- **Solution:** The email is already registered. Use a different email or login with existing account.

**Issue:** Admin/Student roles not showing correctly
- **Solution:** Ensure you selected the correct role during signup

**Issue:** Student data not updating
- **Solution:** Make sure you're logged in as the correct student and click "Save Changes"

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Wouter Router](https://github.com/molefrog/wouter)
- [React Hook Form](https://react-hook-form.com)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

MIT License - feel free to use this project for personal and commercial use.

## 📞 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using React and Tailwind CSS**

Happy Learning! 🎓
