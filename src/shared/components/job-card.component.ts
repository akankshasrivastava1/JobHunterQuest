import { Component, Input } from "@angular/core";
import {LucideAngularModule,  MapPin, Building2, Clock, Zap} from "lucide-angular";
import { JobMatch } from "../../core/models";
import { MatchScoreComponent } from "./match-score.component";
import { BadgeComponent } from "./badge.component";

@Component({
  selector: "app-job-card",
  standalone: true,
  imports: [LucideAngularModule, MatchScoreComponent, BadgeComponent],
  template: `
    <div class="card-hover group p-5">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start gap-3">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 text-sm font-bold text-brand-600 dark:from-brand-900 dark:to-accent-900 dark:text-brand-300">
            {{ match.job.companyName.slice(0, 2).toUpperCase() }}
          </div>
          <div>
            <h3 class="font-semibold text-surface-900 group-hover:text-brand-600 dark:text-surface-100 dark:group-hover:text-brand-400 transition-colors">{{ match.job.title }}</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400">{{ match.job.companyName }}</p>
          </div>
        </div>
        <app-match-score [score]="match.matchScore" [size]="56"></app-match-score>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-surface-500 dark:text-surface-400">
        <span class="flex items-center gap-1"><lucide-icon [img]="MapPin" class="h-3.5 w-3.5"></lucide-icon>{{ match.job.location }}</span>
        <span class="flex items-center gap-1"><lucide-icon [img]="Clock" class="h-3.5 w-3.5"></lucide-icon>{{ match.job.experienceMin }}-{{ match.job.experienceMax }} yrs</span>
        <app-badge variant="neutral">{{ match.job.workMode }}</app-badge>
        @if (match.job.salaryMin) {
          <span class="font-medium text-surface-700 dark:text-surface-300">{{ match.job.salaryMin / 100000 }}-{{ match.job.salaryMax! / 100000 }} LPA</span>
        }
      </div>

      <div class="mt-3 flex flex-wrap gap-1.5">
        @for (skill of match.matchedSkills.slice(0, 4); track skill) {
          <span class="badge-success">{{ skill }}</span>
        }
        @if (match.skillGaps.length > 0) {
          <span class="badge-error">{{ match.skillGaps.length }} gaps</span>
        }
      </div>

      <div class="mt-4 flex items-center gap-2 border-t border-surface-100 pt-3 dark:border-surface-800">
        <button class="btn-primary !text-xs !py-1.5">View Job</button>
        <button class="btn-ghost !text-xs !py-1.5">
          <lucide-icon [img]="Zap" class="h-3.5 w-3.5"></lucide-icon>
          Analyze JD
        </button>
      </div>
    </div>
  `,
})
export class JobCardComponent {
  Zap = Zap;
  MapPin = MapPin;
  Clock = Clock;

  @Input() match!: JobMatch;
}
