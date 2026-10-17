import { Component, Input } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  template: `
    <div class="w-full">
      @if (label) {
        <div class="mb-1.5 flex items-center justify-between text-xs">
          <span class="font-medium text-surface-600 dark:text-surface-400">{{ label }}</span>
          <span class="font-semibold text-surface-900 dark:text-surface-100">{{ value }}%</span>
        </div>
      }
      <div class="h-2 w-full overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
        <div
          class="h-full rounded-full transition-all duration-500 ease-out"
          [class]="colorClass"
          [style.width.%]="value"
        ></div>
      </div>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() label = "";
  @Input() color: "brand" | "success" | "warning" | "error" | "accent" = "brand";

  get colorClass(): string {
    const colors: Record<string, string> = {
      brand: "bg-brand-500",
      success: "bg-success-500",
      warning: "bg-warning-500",
      error: "bg-error-500",
      accent: "bg-accent-500",
    };
    return colors[this.color];
  }
}
