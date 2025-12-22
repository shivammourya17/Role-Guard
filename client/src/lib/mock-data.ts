export type User = {
  id: string;
  email: string;
  role: "admin" | "student";
  name: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: "active" | "inactive" | "graduated";
  gpa: number;
};

export const mockUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@edu.com",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "student-1",
    email: "alice@edu.com",
    role: "student",
    name: "Alice Johnson",
  },
  {
    id: "student-2",
    email: "bob@edu.com",
    role: "student",
    name: "Bob Smith",
  },
];

export const mockStudents: Student[] = [
  {
    id: "student-1",
    name: "Alice Johnson",
    email: "alice@edu.com",
    course: "Computer Science",
    enrollmentDate: "2023-09-01",
    status: "active",
    gpa: 3.8,
  },
  {
    id: "student-2",
    name: "Bob Smith",
    email: "bob@edu.com",
    course: "Mathematics",
    enrollmentDate: "2023-09-15",
    status: "active",
    gpa: 3.5,
  },
  {
    id: "student-3",
    name: "Charlie Brown",
    email: "charlie@edu.com",
    course: "Physics",
    enrollmentDate: "2024-01-10",
    status: "inactive",
    gpa: 2.9,
  },
  {
    id: "student-4",
    name: "Diana Prince",
    email: "diana@edu.com",
    course: "History",
    enrollmentDate: "2022-09-01",
    status: "graduated",
    gpa: 4.0,
  },
  {
    id: "student-5",
    name: "Evan Wright",
    email: "evan@edu.com",
    course: "Computer Science",
    enrollmentDate: "2023-11-05",
    status: "active",
    gpa: 3.2,
  },
];

// Global data store for dynamically created users and students
let allUsers = [...mockUsers];
let allStudents = [...mockStudents];

export const dataStore = {
  getAllUsers: () => allUsers,
  getAllStudents: () => allStudents,
  addUser: (user: User) => {
    allUsers.push(user);
  },
  addStudent: (student: Student) => {
    allStudents.push(student);
  },
  findUserByEmail: (email: string) => {
    return allUsers.find((u) => u.email === email);
  },
  findStudentByEmail: (email: string) => {
    return allStudents.find((s) => s.email === email);
  },
  emailExists: (email: string) => {
    return allUsers.some((u) => u.email === email);
  },
};

export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}
