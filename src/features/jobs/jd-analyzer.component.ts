import { Component, signal, inject } from "@angular/core";
import {LucideAngularModule, 
  FileText, Upload, Sparkles, CheckCircle2, AlertTriangle,
  Target, Zap, ArrowRight, Clipboard, Clock, MapPin, Building2} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";
import { JDAnalysisResult } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { MatchScoreComponent } from "../../shared/components/match-score.component";
import { AiBadgeComponent } from "../../shared/components/ai-badge.component";

@Component({
  selector: "app-jd-analyzer",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, ProgressBarComponent, MatchScoreComponent, AiBadgeComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Analyze a Job Description" subtitle="Paste or upload a JD and let AI analyze it for you.">
        <div header-actions>
          <app-ai-badge label="AI Powered"></app-ai-badge>
        </div>
      </app-page-header>

      <!-- Input -->
      <div class="card mb-6 p-5">
        <div class="mb-4 flex gap-2">
          <button class="btn !py-1.5 !text-xs" [class]="!uploadMode ? 'btn-primary' : 'btn-ghost'" (click)="uploadMode.set(false)">
            <lucide-icon [img]="Clipboard" class="h-3.5 w-3.5"></lucide-icon>Paste JD
          </button>
          <button class="btn !py-1.5 !text-xs" [class]="uploadMode() ? 'btn-primary' : 'btn-ghost'" (click)="uploadMode.set(true)">
            <lucide-icon [img]="Upload" class="h-3.5 w-3.5"></lucide-icon>Upload JD
          </button>
        </div>

        @if (!uploadMode()) {
          <textarea
            class="input-field min-h-[200px] resize-y font-mono text-xs"
            placeholder="Paste the job description here..."
            [(value)]="jdText"
          ></textarea>
        } @else {
          <div class="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-surface-300 dark:border-surface-700">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-100 dark:bg-surface-800">
              <lucide-icon [img]="Upload" class="h-6 w-6 text-surface-400"></lucide-icon>
            </div>
            <p class="mt-3 text-sm font-medium text-surface-700 dark:text-surface-300">Drop your JD file here</p>
            <p class="text-xs text-surface-500">PDF, DOCX, or TXT up to 5MB</p>
            <button class="btn-outline mt-3 !text-xs">Browse Files</button>
          </div>
        }

        <div class="mt-4">
          <button class="btn-primary" (click)="analyze()">
            <lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>
            Analyze with AI
          </button>
        </div>
      </div>

      <!-- Loading -->
      @if (analyzing()) {
        <div class="card p-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="relative flex h-8 w-8 items-center justify-center">
              <div class="absolute h-8 w-8 rounded-full border-2 border-brand-200"></div>
              <div class="absolute h-8 w-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></div>
            </div>
            <span class="text-sm font-medium text-surface-900 dark:text-surface-100">AI is analyzing the job description...</span>
          </div>
          <div class="space-y-2">
            @for (step of analyzeSteps; track step) {
              <div class="flex items-center gap-2 text-xs text-surface-500">
                <div class="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse"></div>
                {{ step }}
              </div>
            }
          </div>
        </div>
      }

      <!-- Results -->
      @if (result()) {
        <div class="space-y-6">
          <!-- Match Score -->
          <div class="card p-5">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-base font-semibold text-surface-900 dark:text-surface-100">Your Match</h2>
                <p class="text-sm text-surface-500 dark:text-surface-400">Based on your profile and the JD analysis</p>
              </div>
              <app-match-score [score]="result()!.matchPercentage" [size]="80" label="Match"></app-match-score>
            </div>
          </div>

          <!-- Job Summary -->
          <div class="card p-5">
            <h2 class="mb-3 text-base font-semibold text-surface-900 dark:text-surface-100">Job Summary</h2>
            <p class="text-sm text-surface-700 dark:text-surface-300">{{ result()!.jobSummary }}</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                <p class="text-xs text-surface-500">Experience Required</p>
                <p class="mt-0.5 text-sm font-medium text-surface-900 dark:text-surface-100">{{ result()!.experienceRequired }}</p>
              </div>
              <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                <p class="text-xs text-surface-500">Domain</p>
                <p class="mt-0.5 text-sm font-medium text-surface-900 dark:text-surface-100">{{ result()!.domain }}</p>
              </div>
              <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                <p class="text-xs text-surface-500">Location</p>
                <p class="mt-0.5 text-sm font-medium text-surface-900 dark:text-surface-100">{{ result()!.location }}</p>
              </div>
              <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                <p class="text-xs text-surface-500">Work Mode</p>
                <p class="mt-0.5 text-sm font-medium text-surface-900 dark:text-surface-100">{{ result()!.workMode }}</p>
              </div>
              @if (result()!.salary) {
                <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                  <p class="text-xs text-surface-500">Salary</p>
                  <p class="mt-0.5 text-sm font-medium text-surface-900 dark:text-surface-100">{{ result()!.salary }}</p>
                </div>
              }
              <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                <p class="text-xs text-surface-500">Tech Stack</p>
                <div class="mt-1 flex flex-wrap gap-1">
                  @for (tech of result()!.techStack; track tech) {
                    <span class="badge-brand">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="card p-5">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Required Skills</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (skill of result()!.requiredSkills; track skill) {
                  <span class="badge-error">{{ skill }}</span>
                }
              </div>
            </div>
            <div class="card p-5">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Preferred Skills</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (skill of result()!.preferredSkills; track skill) {
                  <span class="badge-warning">{{ skill }}</span>
                }
              </div>
            </div>
          </div>

          <!-- Responsibilities -->
          <div class="card p-5">
            <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Responsibilities</h3>
            <ul class="space-y-2">
              @for (r of result()!.responsibilities; track r) {
                <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                  <lucide-icon [img]="CheckCircle2" class="mt-0.5 h-4 w-4 shrink-0 text-success-500"></lucide-icon>
                  {{ r }}
                </li>
              }
            </ul>
          </div>

          <!-- Skill Gap Analysis -->
          <div class="card p-5">
            <div class="mb-3 flex items-center gap-2">
              <lucide-icon [img]="Target" class="h-4 w-4 text-brand-500"></lucide-icon>
              <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Skill Gap Analysis</h3>
            </div>
            <div class="space-y-2">
              @for (gap of result()!.skillGaps; track gap.skill) {
                <div class="flex items-center gap-3 rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg" [class]="gap.priority === 'high' ? 'bg-error-50 dark:bg-error-950' : gap.priority === 'medium' ? 'bg-warning-50 dark:bg-warning-950' : 'bg-surface-100 dark:bg-surface-800'">
                    <lucide-icon [img]="AlertTriangle" class="h-4 w-4" [class]="gap.priority === 'high' ? 'text-error-500' : gap.priority === 'medium' ? 'text-warning-500' : 'text-surface-400'"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <span class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ gap.skill }}</span>
                    <span class="ml-2 text-xs text-surface-500 capitalize">{{ gap.priority }} priority · {{ gap.level }}</span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- CTA -->
          <div class="flex gap-2">
            <button class="btn-primary"><lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>Prepare for this Job</button>
            <button class="btn-outline"><lucide-icon [img]="FileText" class="h-4 w-4"></lucide-icon>Tailor Resume</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class JdAnalyzerComponent {
  FileText = FileText;
  Clipboard = Clipboard;
  CheckCircle2 = CheckCircle2;
  Target = Target;
  Upload = Upload;
  Sparkles = Sparkles;
  AlertTriangle = AlertTriangle;
  Zap = Zap;

  toast = inject(ToastService);
  uploadMode = signal(false);
  analyzing = signal(false);
  result = signal<JDAnalysisResult | null>(null);
  jdText = "";

  analyzeSteps = [
    "Extracting key information from JD...",
    "Identifying required and preferred skills...",
    "Analyzing experience requirements...",
    "Comparing with your profile...",
    "Calculating match score and skill gaps...",
  ];

  analyze() {
    this.analyzing.set(true);
    this.result.set(null);
    setTimeout(() => {
      this.analyzing.set(false);
      this.result.set({
        jobSummary: "Senior .NET Developer role focused on building scalable microservices using ASP.NET Core, with Azure cloud deployment. Requires strong experience in backend architecture and database optimization.",
        requiredSkills: ["C#", "ASP.NET Core", "SQL Server", "Azure", "Microservices"],
        preferredSkills: ["Docker", "Kubernetes", "Redis", "Event-Driven Architecture"],
        experienceRequired: "4-7 years",
        responsibilities: [
          "Design and develop scalable REST APIs using ASP.NET Core",
          "Work with microservices architecture",
          "Deploy and manage applications on Azure",
          "Optimize database performance",
          "Mentor junior developers",
        ],
        techStack: [".NET 8", "ASP.NET Core", "Entity Framework", "SQL Server", "Azure", "Docker"],
        domain: "FinTech",
        location: "Bangalore, India",
        workMode: "Hybrid",
        salary: "18-28 LPA",
        matchPercentage: 82,
        skillGaps: [
          { skill: "Kubernetes", priority: "high", level: "missing" },
          { skill: "System Design", priority: "high", level: "weak" },
          { skill: "Azure Service Bus", priority: "medium", level: "missing" },
          { skill: "Redis", priority: "medium", level: "weak" },
          { skill: "gRPC", priority: "low", level: "missing" },
        ],
      });
      this.toast.success("JD analysis complete!");
    }, 2500);
  }
}
