import { Component, signal, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule, 
  Search, MapPin, Briefcase, DollarSign, Building2, Clock,
  Sparkles, Save, Filter, ChevronDown, Zap, Target, X,
  CheckCircle2, Brain, TrendingUp, Bookmark} from "lucide-angular";
import { JobService } from "../../core/services/job.service";
import { ToastService } from "../../core/services/toast.service";
import { JobMatch, AIAnalysisStep } from "../../core/models";
import { JobCardComponent } from "../../shared/components/job-card.component";
import { MatchScoreComponent } from "../../shared/components/match-score.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { SkillGapCardComponent } from "../../shared/components/skill-gap-card.component";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { AiBadgeComponent } from "../../shared/components/ai-badge.component";

@Component({
  selector: "app-ai-job-search",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, JobCardComponent, MatchScoreComponent, ProgressBarComponent, SkillGapCardComponent, PageHeaderComponent, AiBadgeComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="AI Job Search Agent" subtitle="Find jobs that match your skills, experience and career goals.">
        <div header-actions>
          <app-ai-badge label="AI Powered"></app-ai-badge>
        </div>
      </app-page-header>

      <!-- Search Preferences Panel -->
      <div class="card mb-6 p-5">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Target Role</label>
            <div class="relative">
              <lucide-icon [img]="Briefcase" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
              <input type="text" value="Senior .NET Developer" class="input-field pl-9" />
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Location</label>
            <div class="relative">
              <lucide-icon [img]="MapPin" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
              <input type="text" value="Bangalore, India" class="input-field pl-9" />
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Experience</label>
            <select class="input-field">
              <option>3-5 years</option>
              <option>5-7 years</option>
              <option>7-10 years</option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Skills</label>
            <input type="text" value="C#, ASP.NET Core, Angular, Azure" class="input-field" />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Salary (LPA)</label>
            <div class="relative">
              <lucide-icon [img]="DollarSign" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
              <input type="text" value="15-30" class="input-field pl-9" />
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Work Mode</label>
            <select class="input-field">
              <option>Any</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Job Type</label>
            <select class="input-field">
              <option>Full-time</option>
              <option>Contract</option>
              <option>Part-time</option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Preferred Companies</label>
            <input type="text" placeholder="TechVerda, CloudNative..." class="input-field" />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">Notice Period</label>
            <select class="input-field">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>Immediately</option>
            </select>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button class="btn-primary" (click)="startSearch()">
            <lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>
            Find Matching Jobs
          </button>
          <button class="btn-outline" (click)="toast.info('Search preferences saved!')">
            <lucide-icon [img]="Save" class="h-4 w-4"></lucide-icon>
            Save Search
          </button>
        </div>
      </div>

      <!-- AI Search Status -->
      @if (searching()) {
        <div class="card mb-6 p-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="relative flex h-8 w-8 items-center justify-center">
              <div class="absolute h-8 w-8 rounded-full border-2 border-brand-200"></div>
              <div class="absolute h-8 w-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></div>
              <lucide-icon [img]="Sparkles" class="h-4 w-4 text-brand-500"></lucide-icon>
            </div>
            <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">AI is analyzing opportunities...</span>
          </div>
          <div class="space-y-2.5">
            @for (step of analysisSteps(); track step.label) {
              <div class="flex items-center gap-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full" [class]="step.status === 'done' ? 'bg-success-100 dark:bg-success-900' : step.status === 'active' ? 'bg-brand-100 dark:bg-brand-900' : 'bg-surface-100 dark:bg-surface-800'">
                  @if (step.status === 'done') {
                    <lucide-icon [img]="CheckCircle2" class="h-3.5 w-3.5 text-success-600"></lucide-icon>
                  } @else if (step.status === 'active') {
                    <div class="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></div>
                  } @else {
                    <div class="h-2 w-2 rounded-full bg-surface-300"></div>
                  }
                </div>
                <span class="text-sm" [class]="step.status === 'done' ? 'text-surface-600 dark:text-surface-400' : step.status === 'active' ? 'font-medium text-surface-900 dark:text-surface-100' : 'text-surface-400'">
                  {{ step.label }}
                </span>
              </div>
            }
          </div>
        </div>
      }

      <!-- Results Summary -->
      @if (showResults()) {
        <div class="mb-6 grid grid-cols-3 gap-4">
          <div class="card p-4 text-center">
            <p class="text-2xl font-bold text-surface-900 dark:text-surface-100">124</p>
            <p class="text-xs text-surface-500 dark:text-surface-400">Jobs analyzed</p>
          </div>
          <div class="card p-4 text-center border-success-200 dark:border-success-800">
            <p class="text-2xl font-bold text-success-600 dark:text-success-400">18</p>
            <p class="text-xs text-surface-500 dark:text-surface-400">Strong matches</p>
          </div>
          <div class="card p-4 text-center border-warning-200 dark:border-warning-800">
            <p class="text-2xl font-bold text-warning-600 dark:text-warning-400">7</p>
            <p class="text-xs text-surface-500 dark:text-surface-400">Potential matches</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <span class="flex items-center gap-1 text-xs font-medium text-surface-500"><lucide-icon [img]="Filter" class="h-3.5 w-3.5"></lucide-icon>Filters:</span>
          <button class="badge-neutral hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">Match Score <lucide-icon [img]="ChevronDown" class="h-3 w-3"></lucide-icon></button>
          <button class="badge-neutral hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">Experience <lucide-icon [img]="ChevronDown" class="h-3 w-3"></lucide-icon></button>
          <button class="badge-neutral hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">Location <lucide-icon [img]="ChevronDown" class="h-3 w-3"></lucide-icon></button>
          <button class="badge-neutral hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">Remote <lucide-icon [img]="ChevronDown" class="h-3 w-3"></lucide-icon></button>
          <button class="badge-neutral hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">Salary <lucide-icon [img]="ChevronDown" class="h-3 w-3"></lucide-icon></button>
          <button class="badge-neutral hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">Technology <lucide-icon [img]="ChevronDown" class="h-3 w-3"></lucide-icon></button>
        </div>

        <!-- Job Cards with detailed match info -->
        <div class="space-y-4">
          @for (match of jobMatches(); track match.jobId) {
            <div class="card-hover p-5">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start">
                <!-- Left: Company & Job info -->
                <div class="flex-1">
                  <div class="flex items-start gap-3">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 text-sm font-bold text-brand-600 dark:from-brand-900 dark:to-accent-900 dark:text-brand-300">
                      {{ match.job.companyName.slice(0, 2).toUpperCase() }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <h3 class="font-semibold text-surface-900 dark:text-surface-100">{{ match.job.title }}</h3>
                        <a [routerLink]="['/jobs', match.job.id]" class="text-xs text-brand-600 hover:underline dark:text-brand-400">View Details</a>
                      </div>
                      <p class="text-sm text-surface-500 dark:text-surface-400">{{ match.job.companyName }}</p>
                      <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
                        <span class="flex items-center gap-1"><lucide-icon [img]="MapPin" class="h-3.5 w-3.5"></lucide-icon>{{ match.job.location }}</span>
                        <span class="flex items-center gap-1"><lucide-icon [img]="Briefcase" class="h-3.5 w-3.5"></lucide-icon>{{ match.job.experienceMin }}-{{ match.job.experienceMax }} yrs</span>
                        <span class="badge-neutral">{{ match.job.workMode }}</span>
                        @if (match.job.salaryMin) {
                          <span class="font-medium text-surface-700 dark:text-surface-300">{{ match.job.salaryMin / 100000 }}-{{ match.job.salaryMax! / 100000 }} LPA</span>
                        }
                        <span class="flex items-center gap-1"><lucide-icon [img]="Clock" class="h-3.5 w-3.5"></lucide-icon>{{ match.job.postedDate }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Match Breakdown -->
                  <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    @for (item of breakdownItems(match); track item.label) {
                      <div class="rounded-lg border border-surface-200 p-2.5 dark:border-surface-700">
                        <div class="flex items-center justify-between text-xs">
                          <span class="text-surface-500 dark:text-surface-400">{{ item.label }}</span>
                          <span class="font-semibold" [class]="item.color">{{ item.value }}%</span>
                        </div>
                        <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                          <div class="h-full rounded-full" [class]="item.bar" [style.width.%]="item.value"></div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Why this matches -->
                  <div class="mt-4">
                    <p class="text-xs font-semibold text-surface-700 dark:text-surface-300">Why this matches you</p>
                    <ul class="mt-1.5 space-y-1">
                      @for (reason of match.matchReasons; track reason) {
                        <li class="flex items-start gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                          <lucide-icon [img]="CheckCircle2" class="mt-0.5 h-3 w-3 shrink-0 text-success-500"></lucide-icon>
                          {{ reason }}
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Skill Gaps -->
                  @if (match.skillGaps.length > 0) {
                    <div class="mt-3">
                      <p class="text-xs font-semibold text-surface-700 dark:text-surface-300">Skill gaps</p>
                      <div class="mt-1.5 flex flex-wrap gap-1.5">
                        @for (gap of match.skillGaps; track gap.skill) {
                          <span class="badge" [class]="gap.priority === 'high' ? 'bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300' : 'bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300'">
                            {{ gap.skill }}
                          </span>
                        }
                      </div>
                    </div>
                  }

                  <!-- Actions -->
                  <div class="mt-4 flex flex-wrap items-center gap-2">
                    <a [routerLink]="['/jobs', match.job.id]" class="btn-primary !text-xs !py-1.5">View Job</a>
                    <a routerLink="/jobs/analyze" class="btn-ghost !text-xs !py-1.5"><lucide-icon [img]="Zap" class="h-3.5 w-3.5"></lucide-icon>Analyze JD</a>
                    <button class="btn-ghost !text-xs !py-1.5"><lucide-icon [img]="Brain" class="h-3.5 w-3.5"></lucide-icon>Prepare</button>
                    <button class="btn-ghost !text-xs !py-1.5" (click)="toast.success('Job saved!')"><lucide-icon [img]="Bookmark" class="h-3.5 w-3.5"></lucide-icon>Save</button>
                    <button class="btn-ghost !text-xs !py-1.5" (click)="toast.success('Application submitted!')"><lucide-icon [img]="Target" class="h-3.5 w-3.5"></lucide-icon>Apply</button>
                  </div>
                </div>

                <!-- Right: Match Score -->
                <div class="flex shrink-0 flex-col items-center justify-center lg:w-32">
                  <app-match-score [score]="match.matchScore" [size]="80" label="Match Score"></app-match-score>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AiJobSearchComponent implements OnInit {
  Briefcase = Briefcase;
  DollarSign = DollarSign;
  ChevronDown = ChevronDown;
  CheckCircle2 = CheckCircle2;
  Bookmark = Bookmark;
  Clock = Clock;
  Target = Target;
  Save = Save;
  Sparkles = Sparkles;
  Zap = Zap;
  MapPin = MapPin;
  Brain = Brain;
  Filter = Filter;

  private jobService = inject(JobService);
  toast = inject(ToastService);

  searching = signal(false);
  showResults = signal(false);
  jobMatches = signal<JobMatch[]>([]);
  analysisSteps = signal<AIAnalysisStep[]>([]);

  ngOnInit() {
    this.jobService.getJobMatches().subscribe((matches) => this.jobMatches.set(matches));
  }

  startSearch() {
    this.searching.set(true);
    this.showResults.set(false);
    const steps = [
      "Understanding your profile...",
      "Searching relevant opportunities...",
      "Analyzing job requirements...",
      "Matching your skills...",
      "Ranking opportunities...",
    ];
    this.analysisSteps.set(steps.map((label) => ({ label, status: "pending" as const })));

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        this.analysisSteps.update((prev) => {
          const updated = [...prev];
          if (i > 0) updated[i - 1].status = "done";
          updated[i].status = "active";
          return updated;
        });
        i++;
      } else {
        clearInterval(interval);
        this.analysisSteps.update((prev) => prev.map((s) => ({ ...s, status: "done" as const })));
        setTimeout(() => {
          this.searching.set(false);
          this.showResults.set(true);
          this.toast.success(`Found ${this.jobMatches().length} matching jobs!`);
        }, 500);
      }
    }, 800);
  }

  breakdownItems(match: JobMatch) {
    const b = match.matchBreakdown;
    return [
      { label: "Technical", value: b.technical, color: b.technical >= 80 ? "text-success-600 dark:text-success-400" : "text-brand-600 dark:text-brand-400", bar: b.technical >= 80 ? "bg-success-500" : "bg-brand-500" },
      { label: "Experience", value: b.experience, color: b.experience >= 80 ? "text-success-600 dark:text-success-400" : "text-brand-600 dark:text-brand-400", bar: b.experience >= 80 ? "bg-success-500" : "bg-brand-500" },
      { label: "Location", value: b.location, color: b.location >= 80 ? "text-success-600 dark:text-success-400" : "text-brand-600 dark:text-brand-400", bar: b.location >= 80 ? "bg-success-500" : "bg-brand-500" },
      { label: "Domain", value: b.domain, color: b.domain >= 80 ? "text-success-600 dark:text-success-400" : "text-brand-600 dark:text-brand-400", bar: b.domain >= 80 ? "bg-success-500" : "bg-brand-500" },
    ];
  }
}
