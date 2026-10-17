import { Component, Input } from "@angular/core";

@Component({
  selector: "app-progress-ring",
  standalone: true,
  template: `
    <div class="relative inline-flex items-center justify-center" [style.width.px]="size" [style.height.px]="size">
      <svg [style.width.px]="size" [style.height.px]="size" class="-rotate-90">
        <circle
          [attr.cx]="size / 2"
          [attr.cy]="size / 2"
          [attr.r]="radius"
          fill="none"
          stroke="currentColor"
          stroke-width="6"
          class="text-surface-100 dark:text-surface-800"
        />
        <circle
          [attr.cx]="size / 2"
          [attr.cy]="size / 2"
          [attr.r]="radius"
          fill="none"
          [attr.stroke]="'url(#gradient-' + gradientId + ')'"
          stroke-width="6"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashoffset"
          class="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient [attr.id]="'gradient-' + gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" [attr.stop-color]="gradientStart" />
            <stop offset="100%" [attr.stop-color]="gradientEnd" />
          </linearGradient>
        </defs>
      </svg>
      <div class="absolute flex flex-col items-center justify-center">
        <span class="text-lg font-bold text-surface-900 dark:text-surface-100">{{ value }}{{ suffix }}</span>
        @if (subLabel) {
          <span class="text-[10px] text-surface-500 dark:text-surface-400">{{ subLabel }}</span>
        }
      </div>
    </div>
  `,
})
export class ProgressRingComponent {
  @Input() value = 0;
  @Input() size = 80;
  @Input() suffix = "%";
  @Input() subLabel = "";
  @Input() gradientStart = "#6366f1";
  @Input() gradientEnd = "#14b8a6";

  private static counter = 0;
  gradientId = ++ProgressRingComponent.counter;

  get radius(): number {
    return (this.size - 6) / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get dashoffset(): number {
    return this.circumference - (this.value / 100) * this.circumference;
  }
}
