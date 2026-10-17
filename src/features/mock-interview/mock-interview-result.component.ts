import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {LucideAngularModule, 
  Brain, Sparkles, CheckCircle2, XCircle, TrendingUp,
  Target, ArrowRight, Lightbulb, MessageCircle, Zap,
  Award, ChevronRight, RotateCcw} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";
import { ProgressRingComponent } from "../../shared/components/progress-ring.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { PageHeaderComponent } from "../../shared/components/page-header.component";

@Component({
  selector: "app-mock-interview-result",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, ProgressRingComponent, ProgressBarComponent, PageHeaderComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Interview Results" subtitle="Senior .NET Developer · Technical · 10 questions"></app-page-header>

      <!-- Overall Score -->
      <div class="card mb-6 p-6">
        <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <app-progress-ring [value]="82" [size]="120" subLabel="Overall"></app-progress-ring>
            <div>
              <h2 class="text-xl font-bold text-surface-900 dark:text-surface-100">Great job!</h2>
              <p class="text-sm text-surface-500 dark:text-surface-400">You scored 82% on this interview.</p>
              <div class="mt-2 flex items-center gap-2">
                <span class="badge-success">Passed</span>
                <span class="text-xs text-surface-500">Completed in 24:35</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="btn-outline !text-xs" (click)="restart()">
              <lucide-icon [img]="RotateCcw" class="h-3.5 w-3.5"></lucide-icon>Retake
            </button>
            <button class="btn-primary !text-xs">
              <lucide-icon [img]="Target" class="h-3.5 w-3.5"></lucide-icon>Practice Weak Areas
            </button>
          </div>
        </div>
      </div>

      <!-- Score Breakdown -->
      <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (score of scores; track score.label) {
          <div class="card p-4">
            <div class="flex items-center justify-between">
              <span class="text-xs text-surface-500 dark:text-surface-400">{{ score.label }}</span>
              <span class="text-lg font-bold" [class]="score.value >= 80 ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-400'">{{ score.value }}%</span>
            </div>
            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
              <div class="h-full rounded-full transition-all duration-500" [class]="score.value >= 80 ? 'bg-success-500' : 'bg-warning-500'" [style.width.%]="score.value"></div>
            </div>
          </div>
        }
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Strengths -->
        <div class="card p-5">
          <div class="mb-3 flex items-center gap-2">
            <lucide-icon [img]="CheckCircle2" class="h-4 w-4 text-success-500"></lucide-icon>
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Strengths</h3>
          </div>
          <ul class="space-y-2">
            @for (strength of strengths; track strength) {
              <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                <lucide-icon [img]="CheckCircle2" class="mt-0.5 h-4 w-4 shrink-0 text-success-500"></lucide-icon>
                {{ strength }}
              </li>
            }
          </ul>
        </div>

        <!-- Weak Areas -->
        <div class="card p-5">
          <div class="mb-3 flex items-center gap-2">
            <lucide-icon [img]="XCircle" class="h-4 w-4 text-error-500"></lucide-icon>
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Weak Areas</h3>
          </div>
          <ul class="space-y-2">
            @for (weak of weakAreas; track weak) {
              <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                <lucide-icon [img]="XCircle" class="mt-0.5 h-4 w-4 shrink-0 text-error-400"></lucide-icon>
                {{ weak }}
              </li>
            }
          </ul>
        </div>

        <!-- Missed Points -->
        <div class="card p-5">
          <div class="mb-3 flex items-center gap-2">
            <lucide-icon [img]="Lightbulb" class="h-4 w-4 text-warning-500"></lucide-icon>
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Missed Points</h3>
          </div>
          <ul class="space-y-2">
            @for (point of missedPoints; track point) {
              <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                <lucide-icon [img]="ChevronRight" class="mt-0.5 h-4 w-4 shrink-0 text-warning-500"></lucide-icon>
                {{ point }}
              </li>
            }
          </ul>
        </div>

        <!-- Better Answer -->
        <div class="card p-5 border-brand-200 dark:border-brand-800">
          <div class="mb-3 flex items-center gap-2">
            <lucide-icon [img]="Sparkles" class="h-4 w-4 text-brand-500"></lucide-icon>
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Better Answer</h3>
          </div>
          <p class="text-sm text-surface-700 dark:text-surface-300">{{ betterAnswer }}</p>
        </div>
      </div>

      <!-- Recommended Topics -->
      <div class="mt-6 card p-5">
        <div class="mb-3 flex items-center gap-2">
          <lucide-icon [img]="TrendingUp" class="h-4 w-4 text-brand-500"></lucide-icon>
          <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Recommended Topics</h3>
        </div>
        <div class="grid gap-2 sm:grid-cols-2">
          @for (topic of recommendedTopics; track topic) {
            <div class="flex items-center justify-between rounded-lg border border-surface-200 p-3 dark:border-surface-700">
              <span class="text-sm text-surface-700 dark:text-surface-300">{{ topic }}</span>
              <button class="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400">Study</button>
            </div>
          }
        </div>
      </div>

      <!-- Follow-up Questions -->
      <div class="mt-6 card p-5">
        <div class="mb-3 flex items-center gap-2">
          <lucide-icon [img]="MessageCircle" class="h-4 w-4 text-accent-500"></lucide-icon>
          <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Follow-up Questions to Practice</h3>
        </div>
        <div class="space-y-2">
          @for (fq of followUpQuestions; track fq) {
            <div class="rounded-lg bg-surface-50 p-3 text-sm text-surface-700 dark:bg-surface-800/50 dark:text-surface-300">
              {{ fq }}
            </div>
          }
        </div>
      </div>

      <div class="mt-6 flex gap-2">
        <button class="btn-primary" (click)="restart()">
          <lucide-icon [img]="RotateCcw" class="h-4 w-4"></lucide-icon>Take Another Interview
        </button>
        <a routerLink="/dashboard" class="btn-outline">Back to Dashboard</a>
      </div>
    </div>
  `,
})
export class MockInterviewResultComponent {
  XCircle = XCircle;
  MessageCircle = MessageCircle;
  CheckCircle2 = CheckCircle2;
  ChevronRight = ChevronRight;
  Lightbulb = Lightbulb;
  RotateCcw = RotateCcw;
  Target = Target;
  Sparkles = Sparkles;
  TrendingUp = TrendingUp;

  toast = inject(ToastService);
  private router = inject(Router);

  scores = [
    { label: "Technical Knowledge", value: 82 },
    { label: "Communication", value: 76 },
    { label: "Problem Solving", value: 88 },
    { label: "Project Understanding", value: 80 },
  ];

  strengths = [
    "Strong understanding of dependency injection and middleware pipeline",
    "Clear explanation of async/await patterns and TPL",
    "Good practical knowledge of Entity Framework and database concepts",
    "Well-structured answers with real-world examples",
  ];

  weakAreas = [
    "System design questions need a more structured approach",
    "Could provide more specific examples from production experience",
    "Rate limiting answer lacked discussion of distributed scenarios",
  ];

  missedPoints = [
    "Didn't mention circuit breaker pattern (Polly) for resilience",
    "Missed discussing connection pooling for database performance",
    "Didn't mention the outbox pattern for reliable event publishing",
    "Overlooked discussing monitoring and alerting for production issues",
  ];

  betterAnswer = "For the rate limiting question, structure your answer by first clarifying requirements (single server vs distributed, per-user or per-IP), then discuss algorithms (token bucket, sliding window, fixed window), then implementation details (Redis for distributed, .NET 8 built-in middleware), and finally monitoring and adjustment strategy. End with a 429 response and Retry-After header discussion.";

  recommendedTopics = [
    "System Design fundamentals",
    "Rate limiting and API protection",
    "Circuit breaker pattern with Polly",
    "Database connection pooling",
    "Outbox pattern for event-driven systems",
    "Distributed tracing and observability",
  ];

  followUpQuestions = [
    "How would you handle distributed rate limiting across multiple instances?",
    "Explain the saga pattern for distributed transactions.",
    "How would you implement health checks in ASP.NET Core?",
    "Describe how you would set up structured logging in production.",
  ];

  restart() {
    this.router.navigate(["/mock-interview/setup"]);
  }
}
