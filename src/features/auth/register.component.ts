import { Component, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {LucideAngularModule,  Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Check} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  template: `
    <div class="flex min-h-screen">
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
            Start your journey
          </span>
          <h2 class="mt-4 text-3xl font-bold text-white">Your AI-powered career companion.</h2>
          <p class="mt-4 text-white/70">Join thousands of developers using AI to find the right job, prepare smarter, and get hired faster.</p>
          <div class="mt-8 space-y-3">
            @for (benefit of benefits; track benefit) {
              <div class="flex items-center gap-2 text-white/80">
                <div class="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <lucide-icon [img]="Check" class="h-3 w-3 text-white"></lucide-icon>
                </div>
                <span class="text-sm">{{ benefit }}</span>
              </div>
            }
          </div>
        </div>
        <p class="relative text-xs text-white/50">© 2024 JobHunterQuest. All rights reserved.</p>
      </div>

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

          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-100">Create your account</h1>
          <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">Start your AI-powered career journey today.</p>

          <form (submit)="onSubmit($event)" class="mt-8 space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Full Name</label>
              <div class="relative">
                <lucide-icon [img]="User" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
                <input type="text" placeholder="Akanksha Sharma" class="input-field pl-9" required />
              </div>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
              <div class="relative">
                <lucide-icon [img]="Mail" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
                <input type="email" placeholder="you@example.com" class="input-field pl-9" required />
              </div>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Password</label>
              <div class="relative">
                <lucide-icon [img]="Lock" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"></lucide-icon>
                <input
                  [type]="showPassword() ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  class="input-field px-9"
                  required
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600" (click)="showPassword.set(!showPassword())">
                  <lucide-icon [img]="showPassword() ? EyeOff : Eye" class="h-4 w-4"></lucide-icon>
                </button>
              </div>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Years of Experience</label>
              <select class="input-field">
                <option>1-2 years</option>
                <option>2-3 years</option>
                <option selected>3-5 years</option>
                <option>5-7 years</option>
                <option>7-10 years</option>
              </select>
            </div>
            <label class="flex items-start gap-2 text-xs text-surface-600 dark:text-surface-400">
              <input type="checkbox" class="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500 dark:border-surface-700 dark:bg-surface-800" required />
              I agree to the Terms of Service and Privacy Policy
            </label>
            <button type="submit" class="btn-primary w-full !py-2.5">
              Create Account
              <lucide-icon [img]="ArrowRight" class="h-4 w-4"></lucide-icon>
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Already have an account?
            <a routerLink="/login" class="font-medium text-brand-600 hover:underline dark:text-brand-400">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  ArrowRight = ArrowRight;
  User = User;
  Lock = Lock;
  Check = Check;
  Sparkles = Sparkles;
  Zap = Zap;
  Eye = Eye;
  EyeOff = EyeOff;
  Mail = Mail;

  showPassword = signal(false);
  benefits = [
    "AI Job Search Agent",
    "Personalized interview preparation",
    "Resume & JD analysis",
    "AI mock interviews",
    "Skill gap analysis & roadmaps",
  ];

  constructor(private toast: ToastService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.toast.success("Account created! Welcome to JobHunterQuest.");
    setTimeout(() => this.router.navigate(["/dashboard"]), 500);
  }
}
