import { Component, Input } from "@angular/core";
import {LucideAngularModule,  Sparkles, TrendingUp, FileText, Users, Briefcase} from "lucide-angular";
import { ProgressBarComponent } from "./progress-bar.component";

@Component({
  selector: "app-stats-card",
  standalone: true,
  imports: [LucideAngularModule, ProgressBarComponent],
  template: `
    <div class="card-hover p-5">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-surface-500 dark:text-surface-400">{{ label }}</p>
          <p class="mt-1 text-2xl font-bold text-surface-900 dark:text-surface-100">{{ value }}</p>
        </div>
        <div class="flex h-10 w-10 items-center justify-center rounded-xl" [class]="iconBg">
          <lucide-icon [img]="iconComponent" class="h-5 w-5" [class]="iconColor"></lucide-icon>
        </div>
      </div>
      @if (progress !== undefined) {
        <div class="mt-4">
          <app-progress-bar [value]="progress" [color]="progressColor"></app-progress-bar>
        </div>
      }
      @if (subtitle) {
        <p class="mt-2 text-xs text-surface-500 dark:text-surface-400">{{ subtitle }}</p>
      }
    </div>
  `,
})
export class StatsCardComponent {
  @Input() label = "";
  @Input() value: string | number = "";
  @Input() subtitle = "";
  @Input() icon: "sparkles" | "trending" | "file" | "users" | "briefcase" = "trending";
  @Input() progress?: number;
  @Input() progressColor: "brand" | "success" | "warning" | "error" | "accent" = "brand";

  get iconComponent() {
    const icons = { sparkles: Sparkles, trending: TrendingUp, file: FileText, users: Users, briefcase: Briefcase };
    return icons[this.icon];
  }

  get iconBg(): string {
    const bgs: Record<string, string> = {
      sparkles: "bg-brand-50 dark:bg-brand-950",
      trending: "bg-success-50 dark:bg-success-950",
      file: "bg-accent-50 dark:bg-accent-950",
      users: "bg-warning-50 dark:bg-warning-950",
      briefcase: "bg-brand-50 dark:bg-brand-950",
    };
    return bgs[this.icon];
  }

  get iconColor(): string {
    const colors: Record<string, string> = {
      sparkles: "text-brand-500",
      trending: "text-success-500",
      file: "text-accent-500",
      users: "text-warning-500",
      briefcase: "text-brand-500",
    };
    return colors[this.icon];
  }
}
