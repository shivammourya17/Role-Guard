import { useState } from "react";
import Layout from "@/components/layout";
import { useAuth } from "@/lib/auth-context";
import { dataStore } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Book, Calendar } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Get student data from the dataStore using the logged-in user's email
  const studentFromStore = dataStore.findStudentByEmail(user?.email || "");
  const [studentData, setStudentData] = useState(
    studentFromStore || {
      id: user?.id || "",
      name: user?.name || "",
      email: user?.email || "",
      course: "Not Selected",
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "active",
      gpa: 0.0,
    }
  );

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setStudentData((prev) => ({
      ...prev,
      name: (formData.get("name") as string) || prev.name,
      email: (formData.get("email") as string) || prev.email,
      course: (formData.get("course") as string) || prev.course,
    }));

    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          <p className="text-gray-600 text-sm mt-1">View and manage your personal information</p>
        </div>

        <Card className="max-w-2xl border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
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
                  <Input id="email" name="email" type="email" defaultValue={studentData.email} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" name="course" defaultValue={studentData.course} />
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-medium w-32">Name:</span>
                  <span className="text-gray-900">{studentData.name}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-medium w-32 flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email:
                  </span>
                  <span className="text-gray-900">{studentData.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-medium w-32 flex items-center gap-2">
                    <Book className="h-4 w-4" /> Course:
                  </span>
                  <span className="text-gray-900">{studentData.course}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-medium w-32 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Enrolled:
                  </span>
                  <span className="text-gray-900">{studentData.enrollmentDate}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-gray-50 flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button form="profile-form" type="submit">
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
