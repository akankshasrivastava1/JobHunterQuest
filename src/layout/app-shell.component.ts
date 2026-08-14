import { Component, signal, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { TopNavbarComponent } from "./top-navbar.component";
import { ToastContainerComponent } from "../shared/components/toast-container.component";
import {LucideAngularModule,  X} from "lucide-angular";
import { RouterLink } from "@angular/router";
import {
  LayoutDashboard, Search, FileText, MessageSquare, Brain,
  BookOpen, Code2, Users, Sparkles, User, Settings
} from "lucide-angular";

@Component({
  selector: "app-app-shell",
  standalone: true,
  imports: [LucideAngularModule, RouterOutlet, RouterLink, SidebarComponent, TopNavbarComponent, ToastContainerComponent],
  template: `
    <div class="flex min-h-screen bg-surface-50 dark:bg-surface-950">
      <!-- Desktop Sidebar -->
      <div class="hidden lg:block">
        <app-sidebar [collapsed]="sidebarCollapsed()" (onToggle)="sidebarCollapsed.set(!sidebarCollapsed())"></app-sidebar>
      </div>

      <!-- Mobile Sidebar -->
      @if (mobileSidebarOpen()) {
        <div class="fixed inset-0 z-50 lg:hidden">
          <div class="absolute inset-0 bg-surface-950/50 backdrop-blur-sm animate-fade-in" (click)="mobileSidebarOpen.set(false)"></div>
          <div class="absolute left-0 top-0 h-full animate-slide-in-right">
            <app-sidebar></app-sidebar>
          </div>
          <button class="absolute right-4 top-4 text-white" (click)="mobileSidebarOpen.set(false)">
            <lucide-icon [img]="X" class="h-6 w-6"></lucide-icon>
          </button>
        </div>
      }

      <!-- Main Content -->
      <div class="flex flex-1 flex-col overflow-hidden">
        <app-top-navbar (onMenuToggle)="mobileSidebarOpen.set(true)"></app-top-navbar>
        <main class="flex-1 overflow-y-auto scrollbar-thin">
          <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>

      <app-toast-container></app-toast-container>
    </div>
  `,
})
export class AppShellComponent {
  X = X;

  sidebarCollapsed = signal(false);
  mobileSidebarOpen = signal(false);
}
