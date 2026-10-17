import { Component, Input, ContentChildren, QueryList, TemplateRef } from "@angular/core";

export interface TabItem {
  label: string;
  icon?: any;
}

@Component({
  selector: "app-tabs",
  standalone: true,
  template: `
    <div class="border-b border-surface-200 dark:border-surface-800">
      <div class="flex gap-1 overflow-x-auto no-scrollbar">
        @for (tab of tabs; track tab.label) {
          <button
            class="relative whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors"
            [class]="activeIndex === $index ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'"
            (click)="activeIndex = $index"
          >
            <div class="flex items-center gap-2">
              @if (tab.icon) {
                <lucide-icon [img]="tab.icon" class="h-4 w-4"></lucide-icon>
              }
              {{ tab.label }}
            </div>
          </button>
        }
      </div>
    </div>
    <div class="mt-4">
      @for (tab of tabs; track tab.label) {
        @if (activeIndex === $index) {
          <div class="animate-fade-in">
            <ng-container [ngTemplateOutlet]="templates.get($index) || null"></ng-container>
          </div>
        }
      }
    </div>
  `,
  imports: [],
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  activeIndex = 0;
  templates = new Map<number, TemplateRef<unknown>>();

  @ContentChildren(TemplateRef) set _templates(templates: QueryList<TemplateRef<unknown>>) {
    this.templates.clear();
    templates.forEach((t, i) => this.templates.set(i, t));
  }
}
