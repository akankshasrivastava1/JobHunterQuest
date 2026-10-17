import { Component, Input } from "@angular/core";
import {LucideAngularModule,  AlertTriangle} from "lucide-angular";
import { SkillGap } from "../../core/models";

@Component({
  selector: "app-skill-gap-card",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="card-hover flex items-center gap-3 p-4">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" [class]="iconBg">
        <lucide-icon [img]="AlertTriangle" class="h-4 w-4" [class]="iconColor"></lucide-icon>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ gap.skill }}</span>
          <span class="badge" [class]="priorityBadge">{{ gap.priority }} priority</span>
        </div>
        <p class="text-xs text-surface-500 dark:text-surface-400">{{ gap.level === "missing" ? "Not found in your profile" : "Below required level" }}</p>
      </div>
    </div>
  `,
})
export class SkillGapCardComponent {
  AlertTriangle = AlertTriangle;

  @Input() gap!: SkillGap;

  get iconBg(): string {
    if (this.gap.priority === "high") return "bg-error-50 dark:bg-error-950";
    if (this.gap.priority === "medium") return "bg-warning-50 dark:bg-warning-950";
    return "bg-surface-100 dark:bg-surface-800";
  }

  get iconColor(): string {
    if (this.gap.priority === "high") return "text-error-500";
    if (this.gap.priority === "medium") return "text-warning-500";
    return "text-surface-400";
  }

  get priorityBadge(): string {
    if (this.gap.priority === "high") return "bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300";
    if (this.gap.priority === "medium") return "bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300";
    return "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400";
  }
}
