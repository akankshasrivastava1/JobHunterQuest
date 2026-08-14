import { Component, signal, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule, 
  FileText, Upload, Sparkles, CheckCircle2, AlertTriangle,
  Plus, Download, Zap, Edit3, FileCheck, Award, Briefcase,
  FolderGit2, GraduationCap} from "lucide-angular";
import { ResumeService } from "../../core/services/mock-services";
import { ToastService } from "../../core/services/toast.service";
import { Resume } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { ProgressRingComponent } from "../../shared/components/progress-ring.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { BadgeComponent } from "../../shared/components/badge.component";
import { AiInsightComponent } from "../../shared/components/ai-insight.component";

@Component({
  selector: "app-resume",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, PageHeaderComponent, ProgressRingComponent, ProgressBarComponent, BadgeComponent, AiInsightComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Resume" subtitle="Analyze and optimize your resume for ATS and job matching.">
        <div header-actions>
          <button class="btn-outline !text-xs" (click)="toast.info('Upload feature coming soon!')">
            <lucide-icon [img]="Upload" class="h-3.5 w-3.5"></lucide-icon>Upload Resume
          </button>
          <button class="btn-primary !text-xs">
            <lucide-icon [img]="Plus" class="h-3.5 w-3.5"></lucide-icon>New Version
          </button>
        </div>
      </app-page-header>

      <!-- Resume Versions -->
      <div class="mb-6 grid gap-4 md:grid-cols-3">
        @for (resume of resumes(); track resume.id) {
          <div class="card-hover p-5" [class]="selectedResume()?.id === resume.id ? 'ring-2 ring-brand-500/20' : ''" (click)="selectResume(resume)">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950">
                  <lucide-icon [img]="FileText" class="h-5 w-5 text-brand-500"></lucide-icon>
                </div>
                <div>
                  <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ resume.name }}</p>
                  <p class="text-xs text-surface-500">{{ resume.targetRole }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xl font-bold" [class]="resume.atsScore >= 80 ? 'text-success-600 dark:text-success-400' : resume.atsScore >= 60 ? 'text-warning-600 dark:text-warning-400' : 'text-error-600 dark:text-error-400'">{{ resume.atsScore }}</p>
                <p class="text-[10px] text-surface-500">ATS Score</p>
              </div>
            </div>
            <div class="mt-3 flex gap-1.5">
              <button class="btn-ghost !text-xs !py-1 !px-2"><lucide-icon [img]="Edit3" class="h-3 w-3"></lucide-icon></button>
              <button class="btn-ghost !text-xs !py-1 !px-2"><lucide-icon [img]="Download" class="h-3 w-3"></lucide-icon></button>
              <button class="btn-ghost !text-xs !py-1 !px-2"><lucide-icon [img]="Zap" class="h-3 w-3"></lucide-icon></button>
            </div>
          </div>
        }
      </div>

      @if (selectedResume()) {
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
            <!-- ATS Score & Keyword Match -->
            <div class="card p-5">
              <h2 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Resume Analysis</h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="flex flex-col items-center rounded-xl border border-surface-200 p-4 dark:border-surface-700">
                  <app-progress-ring [value]="selectedResume()!.atsScore" [size]="100" subLabel="ATS Score"></app-progress-ring>
                  <p class="mt-2 text-xs text-surface-500">ATS Compatibility</p>
                </div>
                <div class="flex flex-col items-center rounded-xl border border-surface-200 p-4 dark:border-surface-700">
                  <app-progress-ring [value]="selectedResume()!.keywordMatch" [size]="100" [gradientStart]="'#14b8a6'" [gradientEnd]="'#6366f1'" subLabel="Match"></app-progress-ring>
                  <p class="mt-2 text-xs text-surface-500">Keyword Match</p>
                </div>
              </div>
            </div>

            <!-- Skills Detected -->
            <div class="card p-5">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Skills Detected</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (skill of selectedResume()!.skillsDetected; track skill) {
                  <span class="badge-success">{{ skill }}</span>
                }
              </div>
            </div>

            <!-- Missing Keywords -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="AlertTriangle" class="h-4 w-4 text-warning-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Missing Keywords</h3>
              </div>
              <div class="flex flex-wrap gap-1.5 mb-3">
                @for (kw of selectedResume()!.missingKeywords; track kw) {
                  <span class="badge-warning">{{ kw }}</span>
                }
              </div>
              <p class="text-xs text-surface-500 dark:text-surface-400 italic">
                Consider highlighting these skills if you genuinely have experience with them. Do not invent experience.
              </p>
            </div>

            <!-- Experience Analysis -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="Briefcase" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Experience Analysis</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ selectedResume()!.experienceAnalysis }}</p>
              <div class="mt-3 space-y-2">
                @for (exp of selectedResume()!.experience; track exp.company) {
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

            <!-- Project Analysis -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="FolderGit2" class="h-4 w-4 text-accent-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Project Analysis</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ selectedResume()!.projectAnalysis }}</p>
              <div class="mt-3 space-y-2">
                @for (proj of selectedResume()!.projects; track proj.name) {
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

            <!-- Formatting Suggestions -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="FileCheck" class="h-4 w-4 text-success-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Formatting Suggestions</h3>
              </div>
              <ul class="space-y-2">
                @for (sug of selectedResume()!.formattingSuggestions; track sug) {
                  <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                    <lucide-icon [img]="CheckCircle2" class="mt-0.5 h-4 w-4 shrink-0 text-success-500"></lucide-icon>
                    {{ sug }}
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Education -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="GraduationCap" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Education</h3>
              </div>
              @for (edu of selectedResume()!.education; track edu.degree) {
                <div class="text-sm">
                  <p class="font-medium text-surface-900 dark:text-surface-100">{{ edu.degree }}</p>
                  <p class="text-xs text-surface-500">{{ edu.institution }} · {{ edu.year }}</p>
                </div>
              }
            </div>

            <!-- AI Insight -->
            <app-ai-insight
              label="AI Recommendation"
              icon="sparkles"
              insight="Your resume scores {{ selectedResume()!.atsScore }} on ATS. Focus on adding Kubernetes and System Design keywords if you have relevant experience. Quantify your achievements with metrics."
            ></app-ai-insight>

            <!-- Actions -->
            <div class="card p-5 space-y-2">
              <button class="btn-primary w-full"><lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>Improve Resume</button>
              <button class="btn-outline w-full"><lucide-icon [img]="Download" class="h-4 w-4"></lucide-icon>Download PDF</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class ResumeComponent implements OnInit {
  Download = Download;
  FileText = FileText;
  Briefcase = Briefcase;
  GraduationCap = GraduationCap;
  CheckCircle2 = CheckCircle2;
  AlertTriangle = AlertTriangle;
  FileCheck = FileCheck;
  Upload = Upload;
  FolderGit2 = FolderGit2;
  Edit3 = Edit3;
  Sparkles = Sparkles;
  Zap = Zap;
  Plus = Plus;

  private resumeService = inject(ResumeService);
  toast = inject(ToastService);

  resumes = signal<Resume[]>([]);
  selectedResume = signal<Resume | null>(null);

  ngOnInit() {
    this.resumeService.getResumes().subscribe((r) => {
      this.resumes.set(r);
      this.selectedResume.set(r[0]);
    });
  }

  selectResume(resume: Resume) {
    this.selectedResume.set(resume);
  }
}
