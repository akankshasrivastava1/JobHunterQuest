import { Component, Input, Output, EventEmitter } from "@angular/core";
import {LucideAngularModule,  X, CheckCircle2, AlertCircle, AlertTriangle, Info} from "lucide-angular";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-surface-950/50 backdrop-blur-sm" (click)="onClose.emit()"></div>
        <div class="relative z-10 w-full max-w-lg rounded-2xl border border-surface-200 bg-white p-6 shadow-elevated animate-scale-in dark:border-surface-800 dark:bg-surface-900">
          @if (title) {
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100">{{ title }}</h3>
              <button class="btn-ghost !p-1.5" (click)="onClose.emit()">
                <lucide-icon [img]="X" class="h-4 w-4"></lucide-icon>
              </button>
            </div>
          }
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  X = X;

  @Input() open = false;
  @Input() title = "";
  @Output() onClose = new EventEmitter<void>();
}
