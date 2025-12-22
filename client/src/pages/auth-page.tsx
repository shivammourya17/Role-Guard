import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const { login, register, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    try {
      if (activeTab === "login") {
        // For demo purposes, we try to login as admin first, then student if it fails, 
        // OR we can just add a role selector. 
        // Let's keep it simple: Determine role by email for the mock, or just try both.
        // Actually, let's just default to "admin" for "admin@edu.com" and "student" for others for the LOGIN flow.
        const role = data.email.includes("admin") ? "admin" : "student";
        await login(data.email, role);
      } else {
        const role = data.email.includes("admin") ? "admin" : "student";
        await register(data.email, role);
      }
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,theme(colors.primary),theme(colors.blue.800))] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-2xl font-heading font-bold">
            <GraduationCap className="h-8 w-8" />
            <span>EduDash</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="text-5xl font-heading font-bold leading-tight">
            Manage your academic journey with confidence.
          </h1>
          <p className="text-lg text-primary-foreground/80 font-light">
            A comprehensive platform for students and administrators to track progress, courses, and performance in one place.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 text-sm opacity-60">
          <span>© 2024 EduDash Inc.</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {activeTab === "login" ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
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
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                  )}
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : activeTab === "login" ? "Sign In" : "Create Account"}
                </Button>

                {activeTab === "login" && (
                  <div className="mt-4 text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
                    <p className="font-semibold mb-1">Demo Credentials:</p>
                    <p>Admin: admin@edu.com / password</p>
                    <p>Student: alice@edu.com / password</p>
                  </div>
                )}
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
