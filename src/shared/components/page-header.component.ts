import { Component, Input } from "@angular/core";
import {LucideAngularModule,  ChevronRight} from "lucide-angular";

@Component({
  selector: "app-page-header",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="mb-6">
      @if (breadcrumbs.length > 0) {
        <nav class="mb-2 flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400">
          @for (crumb of breadcrumbs; track crumb; let last = $last) {
            <span [class]="last ? 'font-medium text-surface-700 dark:text-surface-300' : ''">{{ crumb }}</span>
            @if (!last) {
              <lucide-icon [img]="ChevronRight" class="h-3 w-3"></lucide-icon>
            }
          }
        </nav>
      }
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-100">{{ title }}</h1>
          @if (subtitle) {
            <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">{{ subtitle }}</p>
          }
        </div>
        @if (actions) {
          <div class="flex items-center gap-2">
            <ng-content select="[header-actions]"></ng-content>
          </div>
        }
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  ChevronRight = ChevronRight;

  @Input() title = "";
  @Input() subtitle = "";
  @Input() breadcrumbs: string[] = [];
  @Input() actions = false;
}
