import { useState } from "react";
import Layout from "@/components/layout";
import { useAuth } from "@/lib/auth-context";
import { mockStudents } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, Book, Award } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // In a real app we'd fetch the specific student record. 
  // Here we'll just use the first mock student or match by email if possible.
  const initialStudent = mockStudents.find(s => s.email === user?.email) || mockStudents[0];
  const [studentData, setStudentData] = useState(initialStudent);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setStudentData(prev => ({
      ...prev,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      course: formData.get("course") as string,
    }));

    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user?.name}. Here's your academic overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-2 shadow-sm border-muted">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl">Student Profile</CardTitle>
              <CardDescription>View and manage your personal information</CardDescription>
            </div>
            <Badge variant={studentData.status === 'active' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
              {studentData.status}
            </Badge>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form id="profile-form" onSubmit={handleUpdate} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={studentData.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" defaultValue={studentData.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Current Course</Label>
                  <Input id="course" name="course" defaultValue={studentData.course} />
                </div>
              </form>
            ) : (
              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Full Name</Label>
                    <div className="font-medium text-lg">{studentData.name}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Email Address</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {studentData.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Course</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Book className="h-4 w-4 text-primary" />
                      {studentData.course}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Enrollment Date</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {studentData.enrollmentDate}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end border-t bg-muted/20 p-4">
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button form="profile-form" type="submit">Save Changes</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>

        {/* GPA Card / Stats */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90">Current GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold font-heading">{studentData.gpa.toFixed(1)}</div>
              <p className="text-sm opacity-80 mt-2">Top 15% of class</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">A+</div>
                <div>
                  <p className="font-medium text-sm">Perfect Attendance</p>
                  <p className="text-xs text-muted-foreground">Fall Semester 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">Hon</div>
                <div>
                  <p className="font-medium text-sm">Honor Roll</p>
                  <p className="text-xs text-muted-foreground">Academic Excellence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
