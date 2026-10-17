import { Component, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {LucideAngularModule,  Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  template: `
    <div class="flex min-h-screen">
      <!-- Left side -->
      <div class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 to-accent-600 p-12 lg:flex">
        <div class="absolute inset-0 grid-pattern opacity-10"></div>
        <div class="relative">
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur text-white">
              <lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>
            </div>
            <span class="text-lg font-bold text-white">JobHunterQuest</span>
          </div>
        </div>
        <div class="relative">
          <span class="ai-badge !bg-white/10 !text-white">
            <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
            AI Career Platform
          </span>
          <h2 class="mt-4 text-3xl font-bold text-white">Don't prepare for every interview.</h2>
          <h2 class="text-3xl font-bold text-white/80">Prepare for YOUR interview.</h2>
          <p class="mt-4 text-white/70">Join thousands of developers accelerating their careers with AI-powered job search, interview prep, and personalized roadmaps.</p>
          <div class="mt-8 flex items-center gap-6 text-white/70">
            <div>
              <p class="text-2xl font-bold text-white">12K+</p>
              <p class="text-xs">Active users</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-white">45K+</p>
              <p class="text-xs">Jobs analyzed</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-white">89K+</p>
              <p class="text-xs">Questions practiced</p>
            </div>
          </div>
        </div>
        <p class="relative text-xs text-white/50">© 2024 JobHunterQuest. All rights reserved.</p>
      </div>

      <!-- Right side -->
      <div class="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20">
        <div class="mx-auto w-full max-w-sm">
          <div class="mb-8 lg:hidden">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white">
                <lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>
              </div>
              <span class="text-lg font-bold text-surface-900 dark:text-surface-100">JobHunterQuest</span>
            </div>
          </div>

          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-100">Welcome back</h1>
          <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">Sign in to continue your career journey.</p>

          <form (submit)="onSubmit($event)" class="mt-8 space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
              <div class="relative">
                <lucide-icon [img]="Mail" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
                <input type="email" placeholder="you@example.com" class="input-field pl-9" required />
              </div>
            </div>
            <div>
              <div class="mb-1.5 flex items-center justify-between">
                <label class="block text-sm font-medium text-surface-700 dark:text-surface-300">Password</label>
                <a href="#" class="text-xs text-brand-600 hover:underline dark:text-brand-400">Forgot password?</a>
              </div>
              <div class="relative">
                <lucide-icon [img]="Lock" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
                <input
                  [type]="showPassword() ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="input-field px-9"
                  required
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600" (click)="showPassword.set(!showPassword())">
                  <lucide-icon [img]="showPassword() ? EyeOff : Eye" class="h-4 w-4"></lucide-icon>
                </button>
              </div>
            </div>
            <label class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
              <input type="checkbox" class="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500 dark:border-surface-700 dark:bg-surface-800" />
              Remember me for 30 days
            </label>
            <button type="submit" class="btn-primary w-full !py-2.5">
              Sign In
              <lucide-icon [img]="ArrowRight" class="h-4 w-4"></lucide-icon>
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Don't have an account?
            <a routerLink="/register" class="font-medium text-brand-600 hover:underline dark:text-brand-400">Create one</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  ArrowRight = ArrowRight;
  Sparkles = Sparkles;
  Zap = Zap;
  Eye = Eye;
  EyeOff = EyeOff;
  Lock = Lock;
  Mail = Mail;

  showPassword = signal(false);

  constructor(private toast: ToastService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.toast.success("Welcome back! Redirecting to dashboard...");
    setTimeout(() => this.router.navigate(["/dashboard"]), 500);
  }
}
