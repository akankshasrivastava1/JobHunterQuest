import { Component, signal, inject, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import {LucideAngularModule, 
  LayoutDashboard, Users, BookOpen, FileText, Code2,
  HelpCircle, Briefcase, MessageSquare, BarChart3,
  CreditCard, Sparkles, TrendingUp, Zap, Crown,
  ArrowLeft, UserPlus, FileCheck, Brain} from "lucide-angular";
import { AdminService } from "../../core/services/mock-services";
import { AdminMetrics } from "../../core/models";
import { StatsCardComponent } from "../../shared/components/stats-card.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterOutlet, StatsCardComponent, ProgressBarComponent],
  template: `
    <div class="flex min-h-screen bg-surface-50 dark:bg-surface-950">
      <!-- Admin Sidebar -->
      <aside class="hidden w-56 flex-col border-r border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900 lg:flex">
        <div class="flex h-16 items-center gap-2 border-b border-surface-200 px-4 dark:border-surface-800">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-surface-700 to-surface-900 text-white">
            <lucide-icon [img]="Crown" class="h-4 w-4"></lucide-icon>
          </div>
          <span class="text-sm font-bold text-surface-900 dark:text-surface-100">Admin Panel</span>
        </div>
        <nav class="flex-1 overflow-y-auto p-2">
          <div class="mb-4">
            <p class="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-surface-400">Main</p>
            @for (item of navItems; track item.label) {
              <a [routerLink]="item.route" routerLinkActive="nav-link-active" class="nav-link mb-0.5">
                <lucide-icon [img]="item.icon" class="h-4 w-4 shrink-0"></lucide-icon>
                <span>{{ item.label }}</span>
              </a>
            }
          </div>
        </nav>
        <div class="border-t border-surface-200 p-3 dark:border-surface-800">
          <a routerLink="/dashboard" class="nav-link">
            <lucide-icon [img]="ArrowLeft" class="h-4 w-4"></lucide-icon>
            <span>Back to App</span>
          </a>
        </div>
      </aside>

      <!-- Admin Content -->
      <div class="flex flex-1 flex-col overflow-hidden">
        <header class="flex h-16 items-center gap-4 border-b border-surface-200 bg-white px-4 dark:border-surface-800 dark:bg-surface-900 md:px-6">
          <a routerLink="/dashboard" class="btn-ghost !p-2 lg:hidden">
            <lucide-icon [img]="ArrowLeft" class="h-5 w-5"></lucide-icon>
          </a>
          <h1 class="text-lg font-bold text-surface-900 dark:text-surface-100">Admin Dashboard</h1>
          <div class="ml-auto flex items-center gap-2">
            <span class="badge-warning">Admin Access</span>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 lg:p-8">
          <div class="mx-auto max-w-7xl">
            <!-- Metrics -->
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <app-stats-card label="Total Users" value="12,450" [progress]="100" icon="users" progressColor="brand" subtitle="+340 this month"></app-stats-card>
              <app-stats-card label="Active Users" value="8,230" [progress]="66" icon="trending" progressColor="success" subtitle="66% retention"></app-stats-card>
              <app-stats-card label="Premium Users" value="3,120" [progress]="25" icon="sparkles" progressColor="accent" subtitle="25% conversion"></app-stats-card>
              <app-stats-card label="AI Usage" value="234K" [progress]="78" icon="sparkles" progressColor="warning" subtitle="78% of limit"></app-stats-card>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <app-stats-card label="Jobs Analyzed" value="45,600" [progress]="82" icon="briefcase" progressColor="brand"></app-stats-card>
              <app-stats-card label="Mock Interviews" value="12,800" [progress]="65" icon="file" progressColor="accent"></app-stats-card>
              <app-stats-card label="Questions Practiced" value="89,200" [progress]="72" icon="trending" progressColor="success"></app-stats-card>
              <app-stats-card label="Revenue (MRR)" value="$94.2K" [progress]="88" icon="trending" progressColor="success" subtitle="+12% MoM"></app-stats-card>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <!-- Recent Users Table -->
              <div class="card p-5">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Recent Users</h3>
                  <button class="text-xs text-brand-600 hover:underline dark:text-brand-400">View all</button>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-b border-surface-200 dark:border-surface-700">
                        <th class="pb-2 text-left font-medium text-surface-500">Name</th>
                        <th class="pb-2 text-left font-medium text-surface-500 hidden sm:table-cell">Role</th>
                        <th class="pb-2 text-left font-medium text-surface-500">Plan</th>
                        <th class="pb-2 text-left font-medium text-surface-500 hidden sm:table-cell">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (u of recentUsers; track u.name) {
                        <tr class="border-b border-surface-100 dark:border-surface-800 last:border-0">
                          <td class="py-2 font-medium text-surface-900 dark:text-surface-100">{{ u.name }}</td>
                          <td class="py-2 text-surface-600 dark:text-surface-400 hidden sm:table-cell">{{ u.role }}</td>
                          <td class="py-2"><span class="badge" [class]="u.plan === 'Pro' ? 'badge-brand' : u.plan === 'Career' ? 'badge-success' : 'badge-neutral'">{{ u.plan }}</span></td>
                          <td class="py-2 text-surface-500 hidden sm:table-cell">{{ u.joined }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Platform Usage -->
              <div class="card p-5">
                <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Platform Usage by Feature</h3>
                <div class="space-y-3">
                  @for (feature of featureUsage; track feature.name) {
                    <div>
                      <div class="flex items-center justify-between text-xs mb-1">
                        <span class="text-surface-600 dark:text-surface-400">{{ feature.name }}</span>
                        <span class="font-medium text-surface-900 dark:text-surface-100">{{ feature.usage }}%</span>
                      </div>
                      <app-progress-bar [value]="feature.usage" [color]="feature.color"></app-progress-bar>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- AI Usage Chart (mock bar chart) -->
            <div class="mt-6 card p-5">
              <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">AI Usage (Last 7 Days)</h3>
              <div class="flex items-end justify-between gap-2 h-40">
                @for (day of aiUsageData; track day.day) {
                  <div class="flex flex-1 flex-col items-center gap-1">
                    <div class="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-brand-300 transition-all hover:from-brand-600 hover:to-brand-400" style="height: {{ day.height }}%"></div>
                    <span class="text-[10px] text-surface-500">{{ day.day }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AdminComponent implements OnInit {
  ArrowLeft = ArrowLeft;
  Crown = Crown;

  private adminService = inject(AdminService);
  metrics = signal<AdminMetrics | null>(null);

  navItems = [
    { label: "Dashboard", icon: LayoutDashboard, route: "/admin" },
    { label: "Users", icon: Users, route: "/admin" },
    { label: "Courses", icon: BookOpen, route: "/admin" },
    { label: "Lessons", icon: FileText, route: "/admin" },
    { label: "Interview Questions", icon: HelpCircle, route: "/admin" },
    { label: "Coding Problems", icon: Code2, route: "/admin" },
    { label: "Jobs", icon: Briefcase, route: "/admin" },
    { label: "Community", icon: MessageSquare, route: "/admin" },
    { label: "Reports", icon: BarChart3, route: "/admin" },
    { label: "Subscriptions", icon: CreditCard, route: "/admin" },
    { label: "AI Usage", icon: Sparkles, route: "/admin" },
    { label: "Analytics", icon: TrendingUp, route: "/admin" },
  ];

  recentUsers = [
    { name: "Rahul Verma", role: "Senior Developer", plan: "Pro", joined: "2h ago" },
    { name: "Priya Patel", role: "Full Stack Dev", plan: "Free", joined: "5h ago" },
    { name: "Arun Kumar", role: "Tech Lead", plan: "Career", joined: "1d ago" },
    { name: "Sneha Reddy", role: ".NET Developer", plan: "Pro", joined: "1d ago" },
    { name: "Vikram Singh", role: "Backend Engineer", plan: "Free", joined: "2d ago" },
  ];

  featureUsage = [
    { name: "AI Job Search", usage: 82, color: "brand" as const },
    { name: "Mock Interviews", usage: 65, color: "accent" as const },
    { name: "Interview Prep", usage: 78, color: "success" as const },
    { name: "Resume Analyzer", usage: 54, color: "warning" as const },
    { name: "Learning", usage: 43, color: "brand" as const },
    { name: "Community", usage: 38, color: "accent" as const },
  ];

  aiUsageData = [
    { day: "Mon", height: 65 },
    { day: "Tue", height: 45 },
    { day: "Wed", height: 72 },
    { day: "Thu", height: 88 },
    { day: "Fri", height: 95 },
    { day: "Sat", height: 52 },
    { day: "Sun", height: 38 },
  ];

  ngOnInit() {
    this.adminService.getMetrics().subscribe((m) => this.metrics.set(m));
  }
}
