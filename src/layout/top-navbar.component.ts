import { Component, inject, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import {LucideAngularModule,  Search, Bell, Menu, Moon, Sun, Zap} from "lucide-angular";
import { ThemeService } from "../core/services/theme.service";
import { AvatarComponent } from "../shared/components/avatar.component";

@Component({
  selector: "app-top-navbar",
  standalone: true,
  imports: [LucideAngularModule, AvatarComponent],
  template: `
    <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-surface-200 bg-white/80 px-4 backdrop-blur-lg dark:border-surface-800 dark:bg-surface-900/80 md:px-6">
      <button class="btn-ghost !p-2 lg:hidden" (click)="onMenuToggle.emit()">
        <lucide-icon [img]="Menu" class="h-5 w-5"></lucide-icon>
      </button>

      <!-- Search -->
      <div class="relative hidden flex-1 md:block">
        <lucide-icon [img]="Search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
        <input
          type="text"
          placeholder="Search jobs, courses, questions..."
          class="input-field !py-2 pl-9 pr-4 !bg-surface-50 dark:!bg-surface-800/50 max-w-md"
        />
      </div>

      <div class="flex flex-1 items-center justify-end gap-2 md:flex-none">
        <!-- AI Assistant Quick Access -->
        <button class="btn-ghost !p-2 hidden sm:flex" title="AI Career Assistant" (click)="navigateToAssistant()">
          <lucide-icon [img]="Zap" class="h-5 w-5 text-brand-500"></lucide-icon>
        </button>

        <!-- Theme Toggle -->
        <button class="btn-ghost !p-2" (click)="themeService.toggle()">
          <lucide-icon [img]="themeService.isDark() ? Sun : Moon" class="h-5 w-5"></lucide-icon>
        </button>

        <!-- Notifications -->
        <button class="btn-ghost !p-2 relative">
          <lucide-icon [img]="Bell" class="h-5 w-5"></lucide-icon>
          <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error-500"></span>
        </button>

        <!-- User -->
        <div class="flex items-center gap-2 border-l border-surface-200 pl-2 dark:border-surface-700">
          <app-avatar name="Akanksha Sharma" size="sm"></app-avatar>
        </div>
      </div>
    </header>
  `,
})
export class TopNavbarComponent {
  Menu = Menu;
  Sun = Sun;
  Moon = Moon;
  Bell = Bell;
  Zap = Zap;
  Search = Search;

  themeService = inject(ThemeService);
  private router = inject(Router);

  @Output() onMenuToggle = new EventEmitter<void>();

  navigateToAssistant() {
    this.router.navigate(["/career-assistant"]);
  }
}
