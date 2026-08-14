import { Component, Input } from "@angular/core";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: "app-empty-state",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 dark:bg-surface-800">
        <lucide-icon [img]="icon" class="h-8 w-8 text-surface-400"></lucide-icon>
      </div>
      <h3 class="mb-1 text-base font-semibold text-surface-700 dark:text-surface-300">{{ title }}</h3>
      <p class="max-w-sm text-sm text-surface-500 dark:text-surface-400">{{ description }}</p>
      @if (actionLabel) {
        <button class="btn-primary mt-4">{{ actionLabel }}</button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() icon: any;
  @Input() title = "Nothing here yet";
  @Input() description = "";
  @Input() actionLabel = "";
}
