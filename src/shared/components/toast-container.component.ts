import { Component, Input } from "@angular/core";
import {LucideAngularModule,  CheckCircle2, AlertCircle, AlertTriangle, Info, X} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-toast-container",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      @for (toast of toasts(); track toast.id) {
        <div
          class="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-elevated animate-slide-in-right dark:bg-surface-900"
          [class]="borderClass(toast.type)"
        >
          <lucide-icon [img]="iconComponent(toast.type)" class="h-5 w-5 shrink-0" [class]="iconClass(toast.type)"></lucide-icon>
          <span class="text-sm font-medium text-surface-800 dark:text-surface-100">{{ toast.message }}</span>
          <button class="ml-2 text-surface-400 hover:text-surface-600" (click)="toastService.dismiss(toast.id)">
            <lucide-icon [img]="X" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  X = X;

  constructor(public toastService: ToastService) {}
  readonly toasts = this.toastService.toasts;

  iconComponent(type: string) {
    const icons: Record<string, any> = {
      success: CheckCircle2,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info,
    };
    return icons[type];
  }

  iconClass(type: string): string {
    const classes: Record<string, string> = {
      success: "text-success-500",
      error: "text-error-500",
      warning: "text-warning-500",
      info: "text-brand-500",
    };
    return classes[type];
  }

  borderClass(type: string): string {
    const classes: Record<string, string> = {
      success: "border-success-200 dark:border-success-800",
      error: "border-error-200 dark:border-error-800",
      warning: "border-warning-200 dark:border-warning-800",
      info: "border-brand-200 dark:border-brand-800",
    };
    return classes[type];
  }
}
