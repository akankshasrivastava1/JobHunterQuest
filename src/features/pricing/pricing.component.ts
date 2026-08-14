import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule,  Check, Zap, Sparkles, Crown} from "lucide-angular";
import { ThemeService } from "../../core/services/theme.service";

@Component({
  selector: "app-pricing",
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white dark:bg-surface-950">
      <nav class="sticky top-0 z-40 border-b border-surface-200/50 bg-white/80 backdrop-blur-lg dark:border-surface-800/50 dark:bg-surface-950/80">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a routerLink="/" class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white">
              <lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>
            </div>
            <span class="text-lg font-bold text-surface-900 dark:text-surface-100">JobHunterQuest</span>
          </a>
          <a routerLink="/dashboard" class="btn-ghost">Back to App</a>
        </div>
      </nav>

      <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div class="mb-12 text-center">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Simple, transparent pricing</h1>
          <p class="mt-3 text-surface-600 dark:text-surface-400">Start free. Upgrade when you're ready to accelerate your career.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          @for (plan of plans; track plan.name) {
            <div
              class="relative rounded-2xl border p-6 transition-all"
              [class]="plan.highlighted
                ? 'border-brand-300 bg-white shadow-elevated ring-2 ring-brand-500/20 dark:border-brand-700 dark:bg-surface-900 md:scale-105'
                : 'border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900'"
            >
              @if (plan.highlighted) {
                <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span class="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                    <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
                    Most Popular
                  </span>
                </div>
              }
              <div class="flex items-center gap-2">
                @if (plan.name === 'FREE') {
                  <lucide-icon [img]="Zap" class="h-5 w-5 text-surface-400"></lucide-icon>
                } @else if (plan.name === 'PRO') {
                  <lucide-icon [img]="Sparkles" class="h-5 w-5 text-brand-500"></lucide-icon>
                } @else {
                  <lucide-icon [img]="Crown" class="h-5 w-5 text-accent-500"></lucide-icon>
                }
                <h3 class="text-lg font-bold text-surface-900 dark:text-surface-100">{{ plan.name }}</h3>
              </div>
              <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">{{ plan.tagline }}</p>
              <div class="mt-4">
                <span class="text-4xl font-bold text-surface-900 dark:text-surface-100">{{ plan.price }}</span>
                @if (plan.price !== 'Free') {
                  <span class="text-sm text-surface-500">/month</span>
                }
              </div>
              <ul class="mt-6 space-y-2.5">
                @for (feature of plan.features; track feature) {
                  <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                    <lucide-icon [img]="Check" class="mt-0.5 h-4 w-4 shrink-0 text-success-500"></lucide-icon>
                    {{ feature }}
                  </li>
                }
              </ul>
              <a
                routerLink="/register"
                class="mt-6 block text-center"
                [class]="plan.highlighted ? 'btn-primary' : 'btn-outline'"
              >
                {{ plan.cta }}
              </a>
            </div>
          }
        </div>

        <p class="mt-8 text-center text-xs text-surface-500">All plans include access to the community. Cancel anytime. Prices in USD.</p>
      </div>
    </div>
  `,
})
export class PricingComponent {
  Zap = Zap;
  Crown = Crown;
  Check = Check;
  Sparkles = Sparkles;

  plans = [
    {
      name: "FREE", tagline: "For developers getting started.", price: "Free", cta: "Get Started",
      features: ["Basic interview questions", "Basic learning content", "Limited job search", "Limited AI usage", "Application tracker"],
      highlighted: false,
    },
    {
      name: "PRO", tagline: "For serious job seekers.", price: "$29", cta: "Start Free Trial",
      features: ["AI Job Search Agent", "Unlimited JD analysis", "Resume Analyzer", "AI Mock Interviews", "Personalized Roadmaps", "Skill Gap Analysis", "AI Career Assistant", "Advanced interview prep"],
      highlighted: true,
    },
    {
      name: "CAREER", tagline: "For intensive preparation.", price: "$79", cta: "Start Free Trial",
      features: ["Everything in Pro", "Advanced mock interviews", "Advanced system design", "Personalized career insights", "Advanced analytics", "Priority AI features"],
      highlighted: false,
    },
  ];
}
