import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export default function AuthPage() {
  const { login, register, isLoading, user } = useAuth();
  const [, setLocation] = useLocation();
  const [isSignup, setIsSignup] = useState(true);
  const [selectedRole, setSelectedRole] = useState<"admin" | "student">("student");

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (user) {
      const redirectPath = user.role === "admin" ? "/dashboard/admin" : "/dashboard/student";
      setLocation(redirectPath);
    }
  }, [user, setLocation]);

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    try {
      if (isSignup) {
        await register(data.email, selectedRole, data.name);
      } else {
        const role = data.email.includes("admin") ? "admin" : "student";
        await login(data.email, role);
      }
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="flex justify-center">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">EduDash</CardTitle>
          <CardDescription>
            {isSignup ? "Create your account to get started" : "Welcome back! Sign in to continue"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {isSignup && (
              <>
                <div className="space-y-2">
                  <Label className="font-semibold">Select Your Role</Label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("student")}
                      className={`flex-1 p-3 rounded-lg border-2 font-medium text-sm transition-all ${
                        selectedRole === "student"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("admin")}
                      className={`flex-1 p-3 rounded-lg border-2 font-medium text-sm transition-all ${
                        selectedRole === "admin"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...form.register("name")}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  form.reset();
                }}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {!isSignup && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-blue-900 mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-blue-800 text-xs">
                <p><span className="font-medium">Admin:</span> admin@edu.com / password</p>
                <p><span className="font-medium">Student:</span> alice@edu.com / password</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
