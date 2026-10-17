import { Component, inject } from "@angular/core";
import {LucideAngularModule, 
  User, Mail, MapPin, Briefcase, Target, BookOpen, GitBranch,
  GraduationCap, FileText, Calendar, Award, Zap, CheckCircle2} from "lucide-angular";
import { MockDataService } from "../../core/services/mock-data.service";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { ProgressRingComponent } from "../../shared/components/progress-ring.component";
import { SkillTagComponent } from "../../shared/components/skill-tag.component";
import { BadgeComponent } from "../../shared/components/badge.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, ProgressRingComponent, SkillTagComponent, BadgeComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Profile" subtitle="Your developer profile and career preferences."></app-page-header>

      <div class="grid gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <!-- Basic Info -->
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Basic Information</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-xs text-surface-500">Full Name</label>
                <input class="input-field" [value]="user().name" />
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Email</label>
                <input class="input-field" [value]="user().email" />
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Location</label>
                <input class="input-field" [value]="user().location" />
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Current Role</label>
                <input class="input-field" [value]="user().currentRole" />
              </div>
            </div>
          </div>

          <!-- Professional Info -->
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Professional Information</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-xs text-surface-500">Experience (Years)</label>
                <input class="input-field" [value]="user().experienceYears" />
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Target Role</label>
                <input class="input-field" [value]="user().targetRole" />
              </div>
            </div>
            <div class="mt-3">
              <label class="mb-1 block text-xs text-surface-500">Bio</label>
              <textarea class="input-field min-h-[80px] resize-y" [value]="user().bio"></textarea>
            </div>
          </div>

          <!-- Skills -->
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Skills</h3>
            <div class="flex flex-wrap gap-2">
              @for (skill of user().skills; track skill.id) {
                <app-skill-tag [skill]="skill" [showProficiency]="true"></app-skill-tag>
              }
            </div>
          </div>

          <!-- Experience -->
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Experience</h3>
            <div class="space-y-3">
              @for (exp of experiences; track exp.company) {
                <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ exp.role }}</span>
                    <span class="text-xs text-surface-500">{{ exp.duration }}</span>
                  </div>
                  <p class="text-xs text-surface-500 mt-0.5">{{ exp.company }}</p>
                  <p class="text-xs text-surface-600 dark:text-surface-400 mt-1">{{ exp.description }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Projects -->
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Projects</h3>
            <div class="space-y-3">
              @for (proj of projects; track proj.name) {
                <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                  <p class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ proj.name }}</p>
                  <p class="text-xs text-surface-600 dark:text-surface-400 mt-0.5">{{ proj.description }}</p>
                  <div class="mt-1.5 flex flex-wrap gap-1">
                    @for (tech of proj.technologies; track tech) {
                      <span class="badge-neutral">{{ tech }}</span>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Education -->
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Education</h3>
            @for (edu of education; track edu.degree) {
              <div class="flex items-center justify-between text-sm">
                <div>
                  <p class="font-medium text-surface-900 dark:text-surface-100">{{ edu.degree }}</p>
                  <p class="text-xs text-surface-500">{{ edu.institution }}</p>
                </div>
                <span class="text-xs text-surface-500">{{ edu.year }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Profile Completeness -->
          <div class="card p-5">
            <div class="flex flex-col items-center">
              <app-progress-ring [value]="user().profileCompleteness" [size]="100" subLabel="Complete"></app-progress-ring>
              <p class="mt-2 text-sm font-semibold text-surface-900 dark:text-surface-100">Profile Completeness</p>
              <p class="text-xs text-surface-500">Add your GitHub and LinkedIn to reach 100%</p>
            </div>
          </div>

          <!-- Job Preferences -->
          <div class="card p-5">
            <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Job Preferences</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between"><span class="text-surface-500">Target Role</span><span class="font-medium text-surface-700 dark:text-surface-300">{{ user().targetRole }}</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Location</span><span class="font-medium text-surface-700 dark:text-surface-300">Bangalore, Remote</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Work Mode</span><span class="font-medium text-surface-700 dark:text-surface-300">Hybrid</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Salary Expectation</span><span class="font-medium text-surface-700 dark:text-surface-300">20-30 LPA</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Notice Period</span><span class="font-medium text-surface-700 dark:text-surface-300">30 days</span></div>
            </div>
          </div>

          <!-- Subscription -->
          <div class="card p-5 border-brand-200 dark:border-brand-800">
            <div class="flex items-center gap-2 mb-2">
              <lucide-icon [img]="Award" class="h-4 w-4 text-brand-500"></lucide-icon>
              <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">Pro Plan</span>
            </div>
            <p class="text-xs text-surface-500 mb-3">You're on the Pro plan with unlimited AI features.</p>
            <a href="/pricing" class="btn-outline w-full !text-xs">Manage Subscription</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  Award = Award;

  private mockDataService = inject(MockDataService);
  user = this.mockDataService.currentUser;

  experiences = [
    { company: "TechCorp India", role: "Software Engineer", duration: "2021 - Present", description: "Building scalable web applications using ASP.NET Core and Angular. Leading a team of 3 developers." },
    { company: "StartUp Inc", role: "Junior Developer", duration: "2020 - 2021", description: "Developed REST APIs and worked on frontend features with React." },
  ];

  projects = [
    { name: "E-Commerce Platform", description: "Full-featured platform with payment integration, inventory management, and real-time analytics", technologies: ["ASP.NET Core", "Angular", "SQL Server", "Azure"] },
    { name: "Task Management System", description: "Real-time task management with SignalR notifications and role-based access", technologies: ["ASP.NET Core", "SignalR", "Azure"] },
  ];

  education = [
    { degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2020" },
  ];
}
