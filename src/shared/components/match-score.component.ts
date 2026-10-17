import { Component, Input } from "@angular/core";

@Component({
  selector: "app-match-score",
  standalone: true,
  template: `
    <div class="inline-flex flex-col items-center gap-1">
      <div class="relative inline-flex items-center justify-center" [style.width.px]="size" [style.height.px]="size">
        <svg [style.width.px]="size" [style.height.px]="size" class="-rotate-90">
          <circle
            [attr.cx]="size / 2" [attr.cy]="size / 2" [attr.r]="radius"
            fill="none" stroke="currentColor" stroke-width="5"
            class="text-surface-100 dark:text-surface-800"
          />
          <circle
            [attr.cx]="size / 2" [attr.cy]="size / 2" [attr.r]="radius"
            fill="none" [attr.stroke]="strokeColor" stroke-width="5"
            stroke-linecap="round"
            [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="dashoffset"
            class="transition-all duration-700 ease-out"
          />
        </svg>
        <span class="absolute text-sm font-bold" [class]="textColor">{{ score }}%</span>
      </div>
      @if (label) {
        <span class="text-xs font-medium text-surface-500 dark:text-surface-400">{{ label }}</span>
      }
    </div>
  `,
})
export class MatchScoreComponent {
  @Input() score = 0;
  @Input() size = 64;
  @Input() label = "";

  get radius(): number {
    return (this.size - 5) / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get dashoffset(): number {
    return this.circumference - (this.score / 100) * this.circumference;
  }

  get strokeColor(): string {
    if (this.score >= 85) return "#10b981";
    if (this.score >= 70) return "#6366f1";
    if (this.score >= 50) return "#f59e0b";
    return "#ef4444";
  }

  get textColor(): string {
    if (this.score >= 85) return "text-success-600 dark:text-success-400";
    if (this.score >= 70) return "text-brand-600 dark:text-brand-400";
    if (this.score >= 50) return "text-warning-600 dark:text-warning-400";
    return "text-error-600 dark:text-error-400";
  }
}
