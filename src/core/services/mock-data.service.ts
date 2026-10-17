import { Injectable, signal, computed } from "@angular/core";
import { User, Skill } from "../models";

@Injectable({ providedIn: "root" })
export class MockDataService {
  private readonly _currentUser = signal<User>({
    id: "u1",
    name: "Akanksha Sharma",
    email: "akanksha@example.com",
    avatarUrl: "",
    title: "Full Stack Developer",
    experienceYears: 4,
    location: "Bangalore, India",
    currentRole: "Software Engineer",
    targetRole: "Senior .NET Developer",
    bio: "Full stack developer with 4 years of experience in .NET, Angular, and Azure. Passionate about building scalable applications.",
    profileCompleteness: 85,
    plan: "pro",
    skills: [
      { id: "s1", name: "C#", proficiency: "advanced", yearsOfExperience: 4, category: "Backend" },
      { id: "s2", name: "ASP.NET Core", proficiency: "advanced", yearsOfExperience: 3, category: "Backend" },
      { id: "s3", name: "Angular", proficiency: "intermediate", yearsOfExperience: 2, category: "Frontend" },
      { id: "s4", name: "SQL Server", proficiency: "advanced", yearsOfExperience: 4, category: "Database" },
      { id: "s5", name: "Azure", proficiency: "intermediate", yearsOfExperience: 2, category: "Cloud" },
      { id: "s6", name: "TypeScript", proficiency: "intermediate", yearsOfExperience: 2, category: "Frontend" },
      { id: "s7", name: "Docker", proficiency: "beginner", yearsOfExperience: 1, category: "DevOps" },
      { id: "s8", name: "Microservices", proficiency: "beginner", yearsOfExperience: 1, category: "Architecture" },
    ],
  });

  readonly currentUser = this._currentUser.asReadonly();

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  });

  updateUser(updates: Partial<User>) {
    this._currentUser.update((u) => ({ ...u, ...updates }));
  }
}
