import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockUsers, mockStudents, User, Student } from "./mock-data";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role: "admin" | "student") => Promise<void>;
  logout: () => void;
  register: (email: string, role: "admin" | "student", name?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem("edu_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: "admin" | "student") => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple mock auth logic
    const foundUser = mockUsers.find((u) => u.email === email && u.role === role);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("edu_user", JSON.stringify(foundUser));
      toast({
        title: "Welcome back!",
        description: `Logged in as ${foundUser.role}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials or user not found.",
      });
      throw new Error("Invalid credentials");
    }
    setIsLoading(false);
  };

  const register = async (email: string, role: "admin" | "student", name?: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "User already exists.",
      });
      setIsLoading(false);
      throw new Error("User exists");
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: name || email.split("@")[0],
    };

    // In a real app we would POST to server. Here we just update local state logic if we were tracking all users globally
    // For this mock, we'll just log them in immediately
    setUser(newUser);
    localStorage.setItem("edu_user", JSON.stringify(newUser));
    
    toast({
      title: "Account Created",
      description: "Welcome to EduDash!",
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edu_user");
    toast({
      title: "Logged Out",
      description: "See you soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
