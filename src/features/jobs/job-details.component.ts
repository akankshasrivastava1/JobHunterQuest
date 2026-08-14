import { Component, signal, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {LucideAngularModule, 
  MapPin, Briefcase, DollarSign, Clock, Building2, ExternalLink,
  Bookmark, Target, Zap, Brain, CheckCircle2, AlertTriangle,
  ArrowLeft, FileText, Sparkles, Calendar} from "lucide-angular";
import { JobService } from "../../core/services/job.service";
import { ToastService } from "../../core/services/toast.service";
import { JobMatch } from "../../core/models";
import { MatchScoreComponent } from "../../shared/components/match-score.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { BadgeComponent } from "../../shared/components/badge.component";
import { AiInsightComponent } from "../../shared/components/ai-insight.component";
import { ButtonComponent } from "../../shared/components/button.component";

@Component({
  selector: "app-job-details",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, MatchScoreComponent, ProgressBarComponent, BadgeComponent, AiInsightComponent, ButtonComponent],
  template: `
    <div class="animate-fade-in">
      <a routerLink="/jobs/ai-search" class="mb-4 inline-flex items-center gap-1 text-sm text-surface-500 hover:text-surface-900 dark:hover:text-surface-100">
        <lucide-icon [img]="ArrowLeft" class="h-4 w-4"></lucide-icon> Back to Job Search
      </a>

      @if (loading()) {
        <div class="card p-8 space-y-4">
          <div class="skeleton h-8 w-64"></div>
          <div class="skeleton h-4 w-48"></div>
          <div class="skeleton h-32 w-full"></div>
        </div>
      } @else if (match()) {
        <!-- Job Header -->
        <div class="card mb-6 p-6">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 text-lg font-bold text-brand-600 dark:from-brand-900 dark:to-accent-900 dark:text-brand-300">
                {{ match()!.job.companyName.slice(0, 2).toUpperCase() }}
              </div>
              <div>
                <h1 class="text-xl font-bold text-surface-900 dark:text-surface-100">{{ match()!.job.title }}</h1>
                <p class="text-sm text-surface-500 dark:text-surface-400">{{ match()!.job.companyName }} · {{ match()!.job.domain }}</p>
                <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-surface-500 dark:text-surface-400">
                  <span class="flex items-center gap-1"><lucide-icon [img]="MapPin" class="h-3.5 w-3.5"></lucide-icon>{{ match()!.job.location }}</span>
                  <span class="flex items-center gap-1"><lucide-icon [img]="Briefcase" class="h-3.5 w-3.5"></lucide-icon>{{ match()!.job.experienceMin }}-{{ match()!.job.experienceMax }} yrs</span>
                  <app-badge variant="neutral">{{ match()!.job.workMode }}</app-badge>
                  @if (match()!.job.salaryMin) {
                    <span class="flex items-center gap-1 font-medium text-surface-700 dark:text-surface-300"><lucide-icon [img]="DollarSign" class="h-3.5 w-3.5"></lucide-icon>{{ (match()!.job.salaryMin! / 100000) }}-{{ (match()!.job.salaryMax! / 100000) }} LPA</span>
                  }
                  <span class="flex items-center gap-1"><lucide-icon [img]="Clock" class="h-3.5 w-3.5"></lucide-icon>{{ match()!.job.postedDate }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <app-match-score [score]="match()!.matchScore" [size]="80" label="Match Score"></app-match-score>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 border-t border-surface-100 pt-4 dark:border-surface-800">
            <app-button variant="primary" size="sm" (click)="toast.success('Application submitted!')">Apply</app-button>
            <app-button variant="outline" size="sm"><lucide-icon [img]="Bookmark" class="h-3.5 w-3.5"></lucide-icon>Save Job</app-button>
            <app-button variant="ghost" size="sm"><lucide-icon [img]="Brain" class="h-3.5 w-3.5"></lucide-icon>Prepare for this Job</app-button>
            <app-button variant="ghost" size="sm"><lucide-icon [img]="FileText" class="h-3.5 w-3.5"></lucide-icon>Add to Tracker</app-button>
            <a [href]="match()!.job.sourceUrl" target="_blank" class="btn-ghost !text-xs !py-1.5">
              <lucide-icon [img]="ExternalLink" class="h-3.5 w-3.5"></lucide-icon>Source
            </a>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
            <!-- AI Match Analysis -->
            <div class="card p-5">
              <div class="mb-4 flex items-center gap-2">
                <lucide-icon [img]="Sparkles" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h2 class="text-base font-semibold text-surface-900 dark:text-surface-100">AI Match Analysis</h2>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="mb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Why you're a good match</p>
                  <ul class="space-y-1.5">
                    @for (reason of match()!.matchReasons; track reason) {
                      <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                        <lucide-icon [img]="CheckCircle2" class="mt-0.5 h-4 w-4 shrink-0 text-success-500"></lucide-icon>
                        {{ reason }}
                      </li>
                    }
                  </ul>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p class="mb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Matched Skills</p>
                    <div class="flex flex-wrap gap-1.5">
                      @for (skill of match()!.matchedSkills; track skill) {
                        <span class="badge-success">{{ skill }}</span>
                      }
                    </div>
                  </div>
                  <div>
                    <p class="mb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Skill Gaps</p>
                    <div class="flex flex-wrap gap-1.5">
                      @for (gap of match()!.skillGaps; track gap.skill) {
                        <span class="badge" [class]="gap.priority === 'high' ? 'bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300' : 'bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300'">
                          {{ gap.skill }}
                        </span>
                      }
                    </div>
                  </div>
                </div>
                <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  @for (item of breakdownItems(); track item.label) {
                    <div class="rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                      <p class="text-xs text-surface-500">{{ item.label }}</p>
                      <p class="mt-1 text-lg font-bold" [class]="item.color">{{ item.value }}%</p>
                      <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                        <div class="h-full rounded-full" [class]="item.bar" [style.width.%]="item.value"></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Job Description -->
            <div class="card p-5">
              <h2 class="mb-3 text-base font-semibold text-surface-900 dark:text-surface-100">Job Description</h2>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ match()!.job.description }}</p>
              <h3 class="mt-4 mb-2 text-sm font-semibold text-surface-900 dark:text-surface-100">Responsibilities</h3>
              <ul class="space-y-1.5">
                @for (r of match()!.job.responsibilities; track r) {
                  <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500"></span>
                    {{ r }}
                  </li>
                }
              </ul>
            </div>

            <!-- Recommended Preparation -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="Brain" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h2 class="text-base font-semibold text-surface-900 dark:text-surface-100">Recommended Preparation</h2>
              </div>
              <div class="space-y-2">
                @for (topic of prepTopics; track topic) {
                  <div class="flex items-center justify-between rounded-lg border border-surface-200 p-3 dark:border-surface-700">
                    <span class="text-sm text-surface-700 dark:text-surface-300">{{ topic }}</span>
                    <button class="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400">Start</button>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Potential Questions -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="Zap" class="h-4 w-4 text-accent-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Potential Questions</h3>
              </div>
              <div class="space-y-2">
                @for (q of potentialQuestions; track q) {
                  <div class="rounded-lg bg-surface-50 p-3 text-xs text-surface-700 dark:bg-surface-800/50 dark:text-surface-300">
                    {{ q }}
                  </div>
                }
              </div>
            </div>

            <!-- Tech Stack -->
            <div class="card p-5">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Tech Stack</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (tech of match()!.job.techStack; track tech) {
                  <span class="badge-brand">{{ tech }}</span>
                }
              </div>
            </div>

            <!-- AI Insight -->
            <app-ai-insight
              label="AI Analysis"
              icon="target"
              insight="You have a {{ match()!.matchScore }}% match for this role. Focus on improving {{ match()!.skillGaps[0]?.skill || 'System Design' }} to increase your chances."
            ></app-ai-insight>
          </div>
        </div>
      } @else {
        <div class="card p-12 text-center">
          <p class="text-surface-500">Job not found.</p>
        </div>
      }
    </div>
  `,
})
export class JobDetailsComponent implements OnInit {
  FileText = FileText;
  Briefcase = Briefcase;
  DollarSign = DollarSign;
  Bookmark = Bookmark;
  CheckCircle2 = CheckCircle2;
  ArrowLeft = ArrowLeft;
  Sparkles = Sparkles;
  ExternalLink = ExternalLink;
  Clock = Clock;
  Zap = Zap;
  MapPin = MapPin;
  Brain = Brain;

  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);
  toast = inject(ToastService);

  match = signal<JobMatch | undefined>(undefined);
  loading = signal(true);

  prepTopics = [
    "ASP.NET Core Web API deep dive",
    "Microservices architecture patterns",
    "SQL Server query optimization",
    "Azure App Service deployment",
    "Docker containerization basics",
    "System design fundamentals",
  ];

  potentialQuestions = [
    "Explain how you would design a rate limiting solution for a public API.",
    "Your ASP.NET Core API returns 500 errors in production. How do you investigate?",
    "How would you migrate a monolith to microservices?",
    "Explain dependency injection lifetimes in ASP.NET Core.",
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.jobService.getJobMatch(id).subscribe((match) => {
      this.match.set(match);
      this.loading.set(false);
    });
  }

  breakdownItems() {
    const m = this.match()!;
    const b = m.matchBreakdown;
    return [
      { label: "Technical", value: b.technical, color: "text-brand-600 dark:text-brand-400", bar: "bg-brand-500" },
      { label: "Experience", value: b.experience, color: "text-brand-600 dark:text-brand-400", bar: "bg-brand-500" },
      { label: "Location", value: b.location, color: "text-success-600 dark:text-success-400", bar: "bg-success-500" },
      { label: "Domain", value: b.domain, color: "text-brand-600 dark:text-brand-400", bar: "bg-brand-500" },
    ];
  }
}
