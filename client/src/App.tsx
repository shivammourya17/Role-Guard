import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin-dashboard";
import StudentDashboard from "@/pages/student-dashboard";

function ProtectedRoute({ 
  component: Component, 
  allowedRoles 
}: { 
  component: React.ComponentType, 
  allowedRoles: ("admin" | "student")[] 
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard if they try to access wrong one
    return <Redirect to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"} />;
  }

  return <Component />;
}

function Router() {
  const { user, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/login" component={AuthPage} />
      
      {/* Root redirect logic */}
      <Route path="/">
        {user ? (
           <Redirect to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"} />
        ) : (
           <Redirect to="/login" />
        )}
      </Route>

      <Route path="/dashboard/admin">
        <ProtectedRoute component={AdminDashboard} allowedRoles={["admin"]} />
      </Route>
      <Route path="/dashboard/admin/students">
        <ProtectedRoute component={AdminDashboard} allowedRoles={["admin"]} />
      </Route>

      <Route path="/dashboard/student">
        <ProtectedRoute component={StudentDashboard} allowedRoles={["student"]} />
      </Route>
      <Route path="/dashboard/student/courses">
        {/* Reusing dashboard for demo simplicity, but normally would be a separate page */}
        <ProtectedRoute component={StudentDashboard} allowedRoles={["student"]} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
