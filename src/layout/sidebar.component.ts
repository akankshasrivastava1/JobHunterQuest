import { Component, Input, Output, EventEmitter } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {LucideAngularModule, 
  LayoutDashboard, Search, FileText, MessageSquare, Brain,
  BookOpen, Code2, Users, Sparkles, Target, Map, User,
  Settings, ChevronLeft, ChevronRight, Crown, Zap} from "lucide-angular";
import { AvatarComponent } from "../shared/components/avatar.component";

interface NavItem {
  label: string;
  icon: any;
  route: string;
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, AvatarComponent],
  template: `
    <aside
      class="flex flex-col border-r border-surface-200 bg-white transition-all duration-300 dark:border-surface-800 dark:bg-surface-900"
      [class]="collapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo -->
      <div class="flex h-16 items-center gap-2 border-b border-surface-200 px-4 dark:border-surface-800">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white">
          <lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>
        </div>
        @if (!collapsed) {
          <span class="text-sm font-bold text-surface-900 dark:text-surface-100">JobHunterQuest</span>
        }
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto scrollbar-thin px-2 py-3">
        @for (section of sections; track section.title) {
          <div class="mb-4">
            @if (!collapsed) {
              <p class="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">{{ section.title }}</p>
            }
            @for (item of section.items; track item.label) {
              <a
                [routerLink]="item.route"
                routerLinkActive="nav-link-active"
                class="nav-link mb-0.5"
                [title]="collapsed ? item.label : ''"
              >
                <lucide-icon [img]="item.icon" class="h-4.5 w-4.5 shrink-0"></lucide-icon>
                @if (!collapsed) {
                  <span>{{ item.label }}</span>
                }
              </a>
            }
          </div>
        }
      </nav>

      <!-- Upgrade Card -->
      @if (!collapsed) {
        <div class="mx-3 mb-3 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 p-3 dark:border-brand-800 dark:from-brand-950 dark:to-accent-950">
          <div class="flex items-center gap-2">
            <lucide-icon [img]="Crown" class="h-4 w-4 text-brand-600 dark:text-brand-400"></lucide-icon>
            <span class="text-xs font-semibold text-brand-700 dark:text-brand-300">Upgrade to Premium</span>
          </div>
          <p class="mt-1 text-[11px] text-surface-600 dark:text-surface-400">Unlock unlimited AI features</p>
          <button class="btn-primary mt-2 w-full !text-xs !py-1.5">Upgrade</button>
        </div>
      }

      <!-- User -->
      <div class="border-t border-surface-200 p-3 dark:border-surface-800">
        <div class="flex items-center gap-2">
          <app-avatar [name]="userName" size="sm"></app-avatar>
          @if (!collapsed) {
            <div class="flex-1 overflow-hidden">
              <p class="truncate text-xs font-semibold text-surface-900 dark:text-surface-100">{{ userName }}</p>
              <p class="truncate text-[10px] text-surface-500 dark:text-surface-400">{{ userPlan }} plan</p>
            </div>
          }
        </div>
      </div>

      <!-- Collapse Toggle -->
      <button
        class="absolute top-20 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-surface-200 bg-white shadow-sm dark:border-surface-700 dark:bg-surface-800"
        (click)="onToggle.emit()"
      >
        <lucide-icon [img]="collapsed ? ChevronRight : ChevronLeft" class="h-3.5 w-3.5 text-surface-500"></lucide-icon>
      </button>
    </aside>
  `,
  styles: [`aside { position: relative; height: 100vh; position: sticky; top: 0; }`],
})
export class SidebarComponent {
  Zap = Zap;
  ChevronRight = ChevronRight;
  ChevronLeft = ChevronLeft;
  Crown = Crown;

  @Input() collapsed = false;
  @Input() userName = "Akanksha Sharma";
  @Input() userPlan = "Pro";
  @Output() onToggle = new EventEmitter<void>();

  sections = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
        { label: "AI Job Search", icon: Search, route: "/jobs/ai-search" },
        { label: "Applications", icon: FileText, route: "/applications" },
        { label: "Resume", icon: FileText, route: "/resume" },
        { label: "Interview Prep", icon: MessageSquare, route: "/interview" },
        { label: "Mock Interview", icon: Brain, route: "/mock-interview" },
        { label: "Learning", icon: BookOpen, route: "/learning" },
        { label: "Practice", icon: Code2, route: "/practice" },
        { label: "Community", icon: Users, route: "/community" },
      ],
    },
    {
      title: "Tools",
      items: [
        { label: "AI Career Assistant", icon: Sparkles, route: "/career-assistant" },
        { label: "Skill Gap", icon: Target, route: "/roadmap" },
        { label: "Roadmap", icon: Map, route: "/roadmap" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Profile", icon: User, route: "/profile" },
        { label: "Settings", icon: Settings, route: "/settings" },
      ],
    },
  ];
}
