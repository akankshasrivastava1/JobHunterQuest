import { Component, signal, inject, OnInit } from "@angular/core";
import {LucideAngularModule, 
  Map, CheckCircle2, Circle, Lock, Sparkles, ChevronRight,
  Clock, TrendingUp, Target} from "lucide-angular";
import { RoadmapService } from "../../core/services/mock-services";
import { LearningRoadmap } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";
import { AiInsightComponent } from "../../shared/components/ai-insight.component";

@Component({
  selector: "app-roadmap",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, ProgressBarComponent, AiInsightComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Learning Roadmap" subtitle="Your personalized path to Senior .NET Developer.">
        <div header-actions>
          <span class="badge-brand">6 phases</span>
        </div>
      </app-page-header>

      @if (roadmap()) {
        <!-- AI Recommendation -->
        <div class="mb-6">
          <app-ai-insight
            label="AI Recommendation"
            icon="sparkles"
            [insight]="roadmap()!.aiRecommendation"
          ></app-ai-insight>
        </div>

        <!-- Overall Progress -->
        <div class="card mb-6 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ roadmap()!.title }}</p>
              <p class="text-xs text-surface-500">Target: {{ roadmap()!.targetRole }}</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-brand-600 dark:text-brand-400">42%</p>
              <p class="text-xs text-surface-500">Overall</p>
            </div>
          </div>
          <div class="mt-3">
            <app-progress-bar [value]="42" color="brand"></app-progress-bar>
          </div>
        </div>

        <!-- Phases -->
        <div class="space-y-3">
          @for (phase of roadmap()!.phases; track phase.id) {
            <div class="card-hover p-5" [class]="phase.status === 'locked' ? 'opacity-60' : ''">
              <div class="flex items-start gap-4">
                <!-- Status Icon -->
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" [class]="phaseIconClass(phase.status)">
                  @if (phase.status === 'completed') {
                    <lucide-icon [img]="CheckCircle2" class="h-5 w-5"></lucide-icon>
                  } @else if (phase.status === 'in-progress') {
                    <lucide-icon [img]="Circle" class="h-5 w-5"></lucide-icon>
                  } @else {
                    <lucide-icon [img]="Lock" class="h-5 w-5"></lucide-icon>
                  }
                </div>

                <!-- Content -->
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-medium text-surface-500">Phase {{ phase.order }}</span>
                        <span class="badge" [class]="phaseBadgeClass(phase.status)">{{ phaseStatusLabel(phase.status) }}</span>
                      </div>
                      <h3 class="mt-0.5 text-base font-semibold text-surface-900 dark:text-surface-100">{{ phase.name }}</h3>
                    </div>
                    <div class="text-right">
                      <p class="text-lg font-bold" [class]="phase.status === 'completed' ? 'text-success-600 dark:text-success-400' : 'text-brand-600 dark:text-brand-400'">{{ phase.progress }}%</p>
                      <p class="text-[10px] text-surface-500 flex items-center gap-0.5"><lucide-icon [img]="Clock" class="h-3 w-3"></lucide-icon>{{ phase.estimatedTime }}</p>
                    </div>
                  </div>

                  <!-- Topics -->
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    @for (topic of phase.topics; track topic) {
                      <span class="badge-neutral">{{ topic }}</span>
                    }
                  </div>

                  @if (phase.status !== 'locked') {
                    <div class="mt-3">
                      <app-progress-bar [value]="phase.progress" [color]="phase.status === 'completed' ? 'success' : 'brand'"></app-progress-bar>
                    </div>
                    <div class="mt-3">
                      <button class="btn-ghost !text-xs !py-1.5">
                        {{ phase.status === 'completed' ? 'Review' : phase.status === 'in-progress' ? 'Continue' : 'Start' }}
                        <lucide-icon [img]="ChevronRight" class="h-3.5 w-3.5"></lucide-icon>
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class RoadmapComponent implements OnInit {
  Circle = Circle;
  Clock = Clock;
  CheckCircle2 = CheckCircle2;
  Lock = Lock;
  ChevronRight = ChevronRight;

  private roadmapService = inject(RoadmapService);

  roadmap = signal<LearningRoadmap | null>(null);

  ngOnInit() {
    this.roadmapService.getRoadmap().subscribe((r) => this.roadmap.set(r));
  }

  phaseIconClass(status: string): string {
    if (status === "completed") return "bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-400";
    if (status === "in-progress") return "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400";
    return "bg-surface-100 text-surface-400 dark:bg-surface-800";
  }

  phaseBadgeClass(status: string): string {
    if (status === "completed") return "bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300";
    if (status === "in-progress") return "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300";
    return "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400";
  }

  phaseStatusLabel(status: string): string {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Locked";
  }
}
