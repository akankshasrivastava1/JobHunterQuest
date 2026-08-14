import { Component, inject, signal, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule, 
  Brain, Search, FileText, BookOpen, ArrowRight, Sparkles,
  TrendingUp, Zap, Code2, Database, Cloud, ChevronRight,
  Clock, CheckCircle2, Circle, Bookmark} from "lucide-angular";
import { MockDataService } from "../../core/services/mock-data.service";
import { JobService } from "../../core/services/job.service";
import { JobMatch } from "../../core/models";
import { StatsCardComponent } from "../../shared/components/stats-card.component";
import { JobCardComponent } from "../../shared/components/job-card.component";
import { ProgressRingComponent } from "../../shared/components/progress-ring.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { AiInsightComponent } from "../../shared/components/ai-insight.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, StatsCardComponent, JobCardComponent, ProgressRingComponent, ProgressBarComponent, AiInsightComponent],
  template: `
    <div class="animate-fade-in">
      <!-- Greeting -->
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-100">
            {{ greeting() }}, {{ user()?.name ? user().name.split(' ')[0] : '' }} 👋
          </h1>
          <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">Here's your career progress.</p>
        </div>
        <a routerLink="/jobs/ai-search" class="btn-primary">
          <lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>
          Find New Jobs
        </a>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <app-stats-card label="Interview Readiness" value="78%" [progress]="78" icon="trending" progressColor="brand" subtitle="Up 12% this week"></app-stats-card>
        <app-stats-card label="Job Match" value="12 new" [progress]="65" icon="briefcase" progressColor="accent" subtitle="3 strong matches"></app-stats-card>
        <app-stats-card label="Applications" value="8 active" [progress]="55" icon="briefcase" progressColor="warning" subtitle="2 interviews this week"></app-stats-card>
        <app-stats-card label="Learning Progress" value="64%" [progress]="64" icon="file" progressColor="success" subtitle="On track"></app-stats-card>
      </div>

      <!-- AI Insight -->
      <div class="mt-6">
        <app-ai-insight
          label="AI Recommendation"
          icon="sparkles"
          insight="Based on your target role (Senior .NET Developer), focus on System Design and Microservices next. 68% of matching jobs require these skills."
        ></app-ai-insight>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-3">
        <!-- Recommended -->
        <div class="lg:col-span-2">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-100">Recommended for you</h2>
            <a routerLink="/learning" class="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400">View all</a>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            @for (rec of recommendations; track rec.title) {
              <div class="card-hover flex items-start gap-3 p-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" [class]="rec.bg">
                  <lucide-icon [img]="rec.icon" class="h-5 w-5" [class]="rec.color"></lucide-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ rec.title }}</p>
                  <p class="mt-0.5 text-xs text-surface-500 dark:text-surface-400">{{ rec.subtitle }}</p>
                  <div class="mt-2 flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                    Start now <lucide-icon [img]="ChevronRight" class="h-3 w-3"></lucide-icon>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- AI Job Matches -->
          <div class="mt-6">
            <div class="mb-3 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-100">AI Job Matches</h2>
                <span class="badge-brand">3 new</span>
              </div>
              <a routerLink="/jobs/ai-search" class="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400">View all</a>
            </div>
            <div class="grid gap-4">
              @for (match of jobMatches().slice(0, 3); track match.jobId) {
                <app-job-card [match]="match"></app-job-card>
              }
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="space-y-6">
          <!-- Interview Prep Progress -->
          <div class="card p-5">
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Interview Preparation</h3>
            <div class="mt-4 flex items-center justify-center">
              <app-progress-ring [value]="78" [size]="120" subLabel="Ready"></app-progress-ring>
            </div>
            <div class="mt-4 space-y-3">
              @for (area of prepAreas; track area.label) {
                <app-progress-bar [value]="area.progress" [label]="area.label" [color]="area.color"></app-progress-bar>
              }
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card p-5">
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Recent Activity</h3>
            <div class="mt-4 space-y-3">
              @for (activity of recentActivity; track activity.title) {
                <div class="flex items-start gap-3">
                  <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" [class]="activity.bg">
                    <lucide-icon [img]="activity.icon" class="h-3.5 w-3.5" [class]="activity.color"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-medium text-surface-900 dark:text-surface-100">{{ activity.title }}</p>
                    <p class="text-[11px] text-surface-500 dark:text-surface-400">{{ activity.time }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  ChevronRight = ChevronRight;
  Sparkles = Sparkles;

  private mockDataService = inject(MockDataService);
  private jobService = inject(JobService);

  user = this.mockDataService.currentUser;
  greeting = this.mockDataService.greeting;
  jobMatches = signal<JobMatch[]>([]);

  ngOnInit() {
    this.jobService.getJobMatches().subscribe((matches) => this.jobMatches.set(matches));
  }

  recommendations = [
    { title: "Prepare ASP.NET Core DI", subtitle: "20 min · Intermediate", icon: Zap, bg: "bg-brand-50 dark:bg-brand-950", color: "text-brand-500" },
    { title: "Practice SQL Window Functions", subtitle: "30 min · Advanced", icon: Database, bg: "bg-accent-50 dark:bg-accent-950", color: "text-accent-500" },
    { title: "Complete Azure Interview Module", subtitle: "45 min · Intermediate", icon: Cloud, bg: "bg-success-50 dark:bg-success-950", color: "text-success-500" },
    { title: "Take a .NET Mock Interview", subtitle: "60 min · Hard", icon: Brain, bg: "bg-warning-50 dark:bg-warning-950", color: "text-warning-500" },
  ];

  prepAreas = [
    { label: "Technical Knowledge", progress: 82, color: "brand" as const },
    { label: "System Design", progress: 55, color: "warning" as const },
    { label: "Project Explanation", progress: 72, color: "accent" as const },
    { label: "Communication", progress: 88, color: "success" as const },
  ];

  recentActivity = [
    { title: "Completed mock interview - Senior .NET Developer", time: "2 hours ago", icon: Brain, bg: "bg-brand-50 dark:bg-brand-950", color: "text-brand-500" },
    { title: "Analyzed JD: Full Stack Developer at CloudNative Labs", time: "5 hours ago", icon: Search, bg: "bg-accent-50 dark:bg-accent-950", color: "text-accent-500" },
    { title: "Applied to Senior .NET Developer at TechVerda", time: "1 day ago", icon: FileText, bg: "bg-success-50 dark:bg-success-950", color: "text-success-500" },
    { title: "Completed module: Middleware Pipeline", time: "2 days ago", icon: BookOpen, bg: "bg-warning-50 dark:bg-warning-950", color: "text-warning-500" },
  ];
}
