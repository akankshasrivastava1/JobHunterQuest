import { Component, signal, inject } from "@angular/core";
import { Router } from "@angular/router";
import {LucideAngularModule, 
  Brain, Sparkles, Target, Zap, ChevronRight, Check,
  Code2, User, Users, Settings, Building2} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { AiBadgeComponent } from "../../shared/components/ai-badge.component";

@Component({
  selector: "app-mock-interview-setup",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, AiBadgeComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="AI Mock Interview" subtitle="Practice realistic interviews with your AI interviewer.">
        <div header-actions>
          <app-ai-badge label="AI Coach"></app-ai-badge>
        </div>
      </app-page-header>

      <div class="mx-auto max-w-2xl">
        <div class="card p-6 space-y-5">
          <!-- Role -->
          <div>
            <label class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Role</label>
            <div class="relative">
              <lucide-icon [img]="Building2" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
              <input type="text" value="Senior .NET Developer" class="input-field pl-9" />
            </div>
          </div>

          <!-- Experience -->
          <div>
            <label class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Experience</label>
            <div class="grid grid-cols-5 gap-2">
              @for (exp of experiences; track exp) {
                <button class="rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
                  [class]="selectedExp() === exp ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'border-surface-200 text-surface-600 hover:border-surface-300 dark:border-surface-700 dark:text-surface-400'"
                  (click)="selectedExp.set(exp)">{{ exp }}</button>
              }
            </div>
          </div>

          <!-- Technology -->
          <div>
            <label class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Technology</label>
            <select class="input-field">
              <option>ASP.NET Core</option>
              <option>C#</option>
              <option>Angular</option>
              <option>SQL Server</option>
              <option>Azure</option>
              <option>Microservices</option>
            </select>
          </div>

          <!-- Interview Type -->
          <div>
            <label class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Interview Type</label>
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
              @for (type of interviewTypes; track type.name) {
                <button class="flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors"
                  [class]="selectedType() === type.name ? 'border-brand-500 bg-brand-50 dark:bg-brand-950' : 'border-surface-200 hover:border-surface-300 dark:border-surface-700'"
                  (click)="selectedType.set(type.name)">
                  <lucide-icon [img]="type.icon" class="h-5 w-5" [class]="selectedType() === type.name ? 'text-brand-500' : 'text-surface-400'"></lucide-icon>
                  <span class="text-xs font-medium" [class]="selectedType() === type.name ? 'text-brand-700 dark:text-brand-300' : 'text-surface-600 dark:text-surface-400'">{{ type.name }}</span>
                </button>
              }
            </div>
          </div>

          <!-- Difficulty -->
          <div>
            <label class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Difficulty</label>
            <div class="grid grid-cols-3 gap-2">
              @for (diff of difficulties; track diff) {
                <button class="rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
                  [class]="selectedDiff() === diff ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'border-surface-200 text-surface-600 hover:border-surface-300 dark:border-surface-700 dark:text-surface-400'"
                  (click)="selectedDiff.set(diff)" class="capitalize">{{ diff }}</button>
              }
            </div>
          </div>

          <!-- Number of Questions -->
          <div>
            <label class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Number of Questions</label>
            <div class="grid grid-cols-4 gap-2">
              @for (n of [5, 10, 15, 20]; track n) {
                <button class="rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
                  [class]="selectedNum() === n ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'border-surface-200 text-surface-600 hover:border-surface-300 dark:border-surface-700 dark:text-surface-400'"
                  (click)="selectedNum.set(n)">{{ n }} Qs</button>
              }
            </div>
          </div>

          <button class="btn-primary w-full !py-3" (click)="start()">
            <lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>
            Start Mock Interview
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MockInterviewSetupComponent {
  Building2 = Building2;
  Sparkles = Sparkles;

  toast = inject(ToastService);
  private router = inject(Router);

  experiences = ["1-2", "2-3", "3-5", "5-7", "7-10"];
  selectedExp = signal("3-5");

  interviewTypes = [
    { name: "Technical", icon: Code2 },
    { name: "Project", icon: Building2 },
    { name: "HR", icon: User },
    { name: "Managerial", icon: Users },
    { name: "System Design", icon: Settings },
    { name: "Full Interview", icon: Brain },
  ];
  selectedType = signal("Technical");

  difficulties = ["easy", "medium", "hard"];
  selectedDiff = signal("medium");

  selectedNum = signal(10);

  start() {
    this.toast.info("Starting your AI mock interview...");
    setTimeout(() => this.router.navigate(["/mock-interview/session"]), 500);
  }
}
