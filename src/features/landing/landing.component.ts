import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule, 
  Zap, Search, FileText, Brain, Target, BookOpen, ClipboardList,
  ArrowRight, Check, Sparkles, Menu, X, Sun, Moon, Star,
  TrendingUp, Users, Code2, Award, ChevronRight} from "lucide-angular";
import { ThemeService } from "../../core/services/theme.service";

@Component({
  selector: "app-landing",
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white dark:bg-surface-950">
      <!-- Navbar -->
      <nav class="sticky top-0 z-40 border-b border-surface-200/50 bg-white/80 backdrop-blur-lg dark:border-surface-800/50 dark:bg-surface-950/80">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white">
              <lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>
            </div>
            <span class="text-lg font-bold text-surface-900 dark:text-surface-100">JobHunterQuest</span>
          </div>
          <div class="hidden items-center gap-1 md:flex">
            @for (link of navLinks; track link) {
              <a [href]="'#' + link.toLowerCase().replace(/\\s/g, '')" class="nav-link">{{ link }}</a>
            }
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-ghost !p-2" (click)="themeService.toggle()">
              <lucide-icon [img]="themeService.isDark() ? Sun : Moon" class="h-5 w-5"></lucide-icon>
            </button>
            <a routerLink="/login" class="btn-ghost hidden sm:block">Login</a>
            <a routerLink="/register" class="btn-primary hidden sm:block">Get Started</a>
            <button class="btn-ghost !p-2 md:hidden" (click)="mobileMenuOpen = !mobileMenuOpen">
              <lucide-icon [img]="mobileMenuOpen ? X : Menu" class="h-5 w-5"></lucide-icon>
            </button>
          </div>
        </div>
        @if (mobileMenuOpen) {
          <div class="border-t border-surface-200 px-6 py-4 dark:border-surface-800 md:hidden">
            @for (link of navLinks; track link) {
              <a [href]="'#' + link.toLowerCase().replace(/\\s/g, '')" class="nav-link block" (click)="mobileMenuOpen = false">{{ link }}</a>
            }
            <div class="mt-3 flex gap-2">
              <a routerLink="/login" class="btn-outline flex-1">Login</a>
              <a routerLink="/register" class="btn-primary flex-1">Get Started</a>
            </div>
          </div>
        }
      </nav>

      <!-- Hero -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 grid-pattern"></div>
        <div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20"></div>
        <div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20"></div>

        <div class="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div class="grid items-center gap-12 lg:grid-cols-2">
            <div class="animate-fade-in-up">
              <span class="ai-badge mb-6">
                <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
                AI Career Platform for Software Developers
              </span>
              <h1 class="text-4xl font-bold leading-tight tracking-tight text-surface-900 dark:text-surface-100 lg:text-5xl xl:text-6xl">
                Don't prepare for every interview.<br />
                <span class="gradient-text">Prepare for YOUR interview.</span>
              </h1>
              <p class="mt-6 max-w-xl text-lg text-surface-600 dark:text-surface-400">
                JobHunterQuest analyzes your skills, resume and target jobs to create a personalized path from job discovery to interview success.
              </p>
              <div class="mt-8 flex flex-wrap gap-3">
                <a routerLink="/register" class="btn-primary !text-base !px-6 !py-3">
                  Start Your Career Journey
                  <lucide-icon [img]="ArrowRight" class="h-4 w-4"></lucide-icon>
                </a>
                <a href="#features" class="btn-outline !text-base !px-6 !py-3">Explore Features</a>
              </div>
              <div class="mt-8 flex items-center gap-6 text-sm text-surface-500 dark:text-surface-400">
                <div class="flex items-center gap-2">
                  <lucide-icon [img]="Check" class="h-4 w-4 text-success-500"></lucide-icon>
                  No credit card required
                </div>
                <div class="flex items-center gap-2">
                  <lucide-icon [img]="Check" class="h-4 w-4 text-success-500"></lucide-icon>
                  Free tier available
                </div>
              </div>
            </div>

            <!-- Dashboard Preview -->
            <div class="animate-fade-in-up [animation-delay:200ms]">
              <div class="relative rounded-2xl border border-surface-200 bg-white p-5 shadow-elevated dark:border-surface-800 dark:bg-surface-900">
                <div class="mb-4 flex items-center justify-between">
                  <div>
                    <p class="text-xs text-surface-500 dark:text-surface-400">Your Career Dashboard</p>
                    <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">Interview Readiness</p>
                  </div>
                  <span class="ai-badge">
                    <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
                    AI Analysis
                  </span>
                </div>

                <!-- Mini stats -->
                <div class="grid grid-cols-2 gap-3">
                  @for (stat of heroStats; track stat.label) {
                    <div class="rounded-xl border border-surface-200 p-3 dark:border-surface-700">
                      <div class="flex items-center justify-between">
                        <span class="text-xs text-surface-500 dark:text-surface-400">{{ stat.label }}</span>
                        <lucide-icon [img]="stat.icon" class="h-3.5 w-3.5" [class]="stat.iconColor"></lucide-icon>
                      </div>
                      <p class="mt-1 text-xl font-bold" [class]="stat.textColor">{{ stat.value }}</p>
                      <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                        <div class="h-full rounded-full" [class]="stat.barColor" [style.width.%]="stat.progress"></div>
                      </div>
                    </div>
                  }
                </div>

                <!-- Job Match Card -->
                <div class="mt-3 rounded-xl border border-surface-200 p-3 dark:border-surface-700">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-600 dark:bg-brand-900 dark:text-brand-300">TV</div>
                      <div>
                        <p class="text-xs font-semibold text-surface-900 dark:text-surface-100">Senior .NET Developer</p>
                        <p class="text-[10px] text-surface-500 dark:text-surface-400">TechVerda Solutions</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-lg font-bold text-success-600 dark:text-success-400">92%</p>
                      <p class="text-[10px] text-surface-500">Match</p>
                    </div>
                  </div>
                </div>

                <!-- Roadmap Preview -->
                <div class="mt-3 rounded-xl border border-surface-200 p-3 dark:border-surface-700">
                  <div class="flex items-center gap-2">
                    <lucide-icon [img]="Target" class="h-4 w-4 text-brand-500"></lucide-icon>
                    <p class="text-xs font-semibold text-surface-900 dark:text-surface-100">Personalized Roadmap</p>
                  </div>
                  <div class="mt-2 space-y-1.5">
                    <div class="flex items-center gap-2 text-[11px]">
                      <span class="h-1.5 w-1.5 rounded-full bg-success-500"></span>
                      <span class="text-surface-600 dark:text-surface-400">ASP.NET Core</span>
                      <span class="ml-auto text-success-600 dark:text-success-400">Done</span>
                    </div>
                    <div class="flex items-center gap-2 text-[11px]">
                      <span class="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                      <span class="text-surface-600 dark:text-surface-400">Advanced SQL</span>
                      <span class="ml-auto text-brand-600 dark:text-brand-400">45%</span>
                    </div>
                    <div class="flex items-center gap-2 text-[11px]">
                      <span class="h-1.5 w-1.5 rounded-full bg-surface-300"></span>
                      <span class="text-surface-400">System Design</span>
                      <span class="ml-auto text-surface-400">Locked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="section-padding">
        <div class="container-max">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Everything you need to get interview-ready</h2>
            <p class="mt-3 text-surface-600 dark:text-surface-400">From job discovery to offer letter — all powered by AI.</p>
          </div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (feature of features; track feature.title) {
              <div class="card-hover p-6">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl" [class]="feature.bg">
                  <lucide-icon [img]="feature.icon" class="h-6 w-6" [class]="feature.color"></lucide-icon>
                </div>
                <h3 class="mt-4 text-lg font-semibold text-surface-900 dark:text-surface-100">{{ feature.title }}</h3>
                <p class="mt-2 text-sm text-surface-600 dark:text-surface-400">{{ feature.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Journey Timeline -->
      <section class="section-padding bg-surface-50 dark:bg-surface-900/50">
        <div class="container-max">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Your journey from Job Search to Offer</h2>
            <p class="mt-3 text-surface-600 dark:text-surface-400">A guided path with AI at every step.</p>
          </div>
          <div class="relative">
            <div class="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-brand-300 via-accent-300 to-brand-300 lg:block"></div>
            <div class="grid gap-6 lg:grid-cols-10">
              @for (step of journeySteps; track step; let i = $index) {
                <div class="relative flex flex-col items-center text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-200 bg-white text-sm font-bold text-brand-600 dark:border-brand-800 dark:bg-surface-900 dark:text-brand-400 z-10">
                    {{ i + 1 }}
                  </div>
                  <span class="mt-2 text-xs font-medium text-surface-700 dark:text-surface-300">{{ step }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Levels -->
      <section class="section-padding">
        <div class="container-max">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Built for experienced developers</h2>
            <p class="mt-3 text-surface-600 dark:text-surface-400">Interview preparation that adapts to your experience level.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-5">
            @for (level of experienceLevels; track level.years) {
              <div class="card-hover p-5 text-center">
                <p class="text-lg font-bold text-brand-600 dark:text-brand-400">{{ level.years }}</p>
                <p class="mt-1 text-xs text-surface-500 dark:text-surface-400">{{ level.desc }}</p>
              </div>
            }
          </div>
          <p class="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
            Interview questions become more practical and scenario-based as experience increases.
          </p>
        </div>
      </section>

      <!-- Prepare for YOUR Interview -->
      <section class="section-padding bg-surface-50 dark:bg-surface-900/50">
        <div class="container-max">
          <div class="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span class="ai-badge mb-4">
                <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
                AI-Powered Personalization
              </span>
              <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Prepare for YOUR interview</h2>
              <p class="mt-3 text-surface-600 dark:text-surface-400">AI generates personalized questions based on your target job and skills.</p>
              <div class="mt-6 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
                <p class="text-xs text-surface-500">Target Job</p>
                <p class="text-base font-semibold text-surface-900 dark:text-surface-100">Senior .NET Developer</p>
                <div class="mt-3 flex flex-wrap gap-1.5">
                  @for (skill of targetJobSkills; track skill) {
                    <span class="badge-brand">{{ skill }}</span>
                  }
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">AI generates:</p>
              @for (item of aiGenerates; track item) {
                <div class="flex items-center gap-3 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                    <lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>
                  </div>
                  <span class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ item }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Community Preview -->
      <section class="section-padding">
        <div class="container-max">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Join the developer community</h2>
            <p class="mt-3 text-surface-600 dark:text-surface-400">Share interview experiences, ask questions, and learn together.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            @for (post of communityPreview; track post.title) {
              <div class="card-hover p-5">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500 text-xs font-bold text-white">
                    {{ post.author.slice(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-surface-900 dark:text-surface-100">{{ post.author }}</p>
                    <p class="text-[10px] text-surface-500">{{ post.exp }} experience</p>
                  </div>
                </div>
                <p class="mt-3 text-sm font-medium text-surface-900 dark:text-surface-100">{{ post.title }}</p>
                <div class="mt-3 flex items-center gap-3 text-xs text-surface-500 dark:text-surface-400">
                  <span class="flex items-center gap-1"><lucide-icon [img]="TrendingUp" class="h-3 w-3"></lucide-icon>{{ post.upvotes }}</span>
                  <span class="flex items-center gap-1"><lucide-icon [img]="Users" class="h-3 w-3"></lucide-icon>{{ post.comments }} comments</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing" class="section-padding bg-surface-50 dark:bg-surface-900/50">
        <div class="container-max">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 lg:text-4xl">Simple, transparent pricing</h2>
            <p class="mt-3 text-surface-600 dark:text-surface-400">Start free. Upgrade when you're ready.</p>
          </div>
          <div class="grid gap-6 md:grid-cols-3">
            @for (plan of pricingPlans; track plan.name) {
              <div
                class="relative rounded-2xl border p-6 transition-all"
                [class]="plan.highlighted
                  ? 'border-brand-300 bg-white shadow-elevated ring-2 ring-brand-500/20 dark:border-brand-700 dark:bg-surface-900'
                  : 'border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900'"
              >
                @if (plan.highlighted) {
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span class="badge-brand bg-brand-600 text-white !px-3 !py-1">Most Popular</span>
                  </div>
                }
                <h3 class="text-lg font-bold text-surface-900 dark:text-surface-100">{{ plan.name }}</h3>
                <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">{{ plan.tagline }}</p>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-surface-900 dark:text-surface-100">{{ plan.price }}</span>
                  @if (plan.price !== "Free") {
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
                  Get Started
                </a>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="section-padding">
        <div class="container-max">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 px-8 py-16 text-center lg:px-16">
            <div class="absolute inset-0 grid-pattern opacity-10"></div>
            <div class="relative">
              <h2 class="text-3xl font-bold text-white lg:text-4xl">Find the right job. Know what to prepare. Practice with AI. Get hired.</h2>
              <p class="mt-4 text-lg text-white/80">Your AI-powered career companion. Start your journey today.</p>
              <div class="mt-8 flex flex-wrap justify-center gap-3">
                <a routerLink="/register" class="btn !bg-white !text-brand-700 hover:!bg-white/90 !px-6 !py-3 !text-base">
                  Start Your Career Journey
                  <lucide-icon [img]="ArrowRight" class="h-4 w-4"></lucide-icon>
                </a>
                <a href="#pricing" class="btn !border !border-white/30 !text-white hover:!bg-white/10 !px-6 !py-3 !text-base">View Pricing</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-surface-200 dark:border-surface-800">
        <div class="container-max px-6 py-12 lg:px-8">
          <div class="grid gap-8 md:grid-cols-4">
            <div>
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white">
                  <lucide-icon [img]="Zap" class="h-4 w-4"></lucide-icon>
                </div>
                <span class="text-lg font-bold text-surface-900 dark:text-surface-100">JobHunterQuest</span>
              </div>
              <p class="mt-3 text-sm text-surface-500 dark:text-surface-400">Don't prepare for every interview. Prepare for YOUR interview.</p>
            </div>
            @for (col of footerLinks; track col.title) {
              <div>
                <h4 class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ col.title }}</h4>
                <ul class="mt-3 space-y-2">
                  @for (link of col.links; track link) {
                    <li><a href="#" class="text-sm text-surface-500 hover:text-surface-900 dark:hover:text-surface-100">{{ link }}</a></li>
                  }
                </ul>
              </div>
            }
          </div>
          <div class="mt-8 border-t border-surface-200 pt-6 dark:border-surface-800">
            <p class="text-center text-xs text-surface-500">© 2024 JobHunterQuest. All rights reserved. Demo jobs are fictional.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class LandingComponent {
  ArrowRight = ArrowRight;
  Sun = Sun;
  Moon = Moon;
  Users = Users;
  Target = Target;
  Menu = Menu;
  X = X;
  Check = Check;
  Sparkles = Sparkles;
  Zap = Zap;
  TrendingUp = TrendingUp;

  themeService = inject(ThemeService);
  mobileMenuOpen = false;

  navLinks = ["Features", "AI Job Search", "Interview Prep", "Learning", "Community", "Pricing"];

  heroStats = [
    { label: "Interview Readiness", value: "78%", icon: Brain, iconColor: "text-brand-500", textColor: "text-brand-600 dark:text-brand-400", barColor: "bg-brand-500", progress: 78 },
    { label: "Job Match", value: "12 new", icon: Search, iconColor: "text-accent-500", textColor: "text-accent-600 dark:text-accent-400", barColor: "bg-accent-500", progress: 65 },
    { label: "Skill Gap", value: "3 gaps", icon: Target, iconColor: "text-warning-500", textColor: "text-warning-600 dark:text-warning-400", barColor: "bg-warning-500", progress: 45 },
    { label: "Roadmap", value: "64%", icon: BookOpen, iconColor: "text-success-500", textColor: "text-success-600 dark:text-success-400", barColor: "bg-success-500", progress: 64 },
  ];

  features = [
    { title: "AI Job Search Agent", desc: "Find jobs that actually match your skills and experience.", icon: Search, bg: "bg-brand-50 dark:bg-brand-950", color: "text-brand-500" },
    { title: "Resume Analyzer", desc: "Understand how your resume performs against real job requirements.", icon: FileText, bg: "bg-accent-50 dark:bg-accent-950", color: "text-accent-500" },
    { title: "AI Interview Coach", desc: "Practice realistic interviews based on your experience and target role.", icon: Brain, bg: "bg-brand-50 dark:bg-brand-950", color: "text-brand-500" },
    { title: "Skill Gap Analysis", desc: "Know exactly what you need to improve before applying.", icon: Target, bg: "bg-warning-50 dark:bg-warning-950", color: "text-warning-500" },
    { title: "Personalized Learning", desc: "Get a learning roadmap based on your career goals.", icon: BookOpen, bg: "bg-success-50 dark:bg-success-950", color: "text-success-500" },
    { title: "Application Tracker", desc: "Manage your applications, interviews and offers in one place.", icon: ClipboardList, bg: "bg-brand-50 dark:bg-brand-950", color: "text-brand-500" },
  ];

  journeySteps = ["Profile", "Resume", "Find Jobs", "Analyze JD", "Skill Gaps", "Prepare", "Mock Interview", "Apply", "Track", "Offer"];

  experienceLevels = [
    { years: "1–2 Years", desc: "Foundation building and core concepts" },
    { years: "2–3 Years", desc: "Practical implementation and debugging" },
    { years: "3–5 Years", desc: "Architecture and design decisions" },
    { years: "5–7 Years", desc: "System design and team leadership" },
    { years: "7–10 Years", desc: "Strategic architecture and mentoring" },
  ];

  targetJobSkills = [".NET Core", "C#", "ASP.NET Web API", "SQL Server", "Angular", "Azure"];

  aiGenerates = ["Technical questions", "Scenario questions", "Project questions", "System design questions", "Coding challenges", "SQL challenges", "Follow-up questions"];

  communityPreview = [
    { author: "Rahul Verma", exp: "5 years", title: "My interview experience at Microsoft for SDE-2", upvotes: 234, comments: 45 },
    { author: "Priya Patel", exp: "3 years", title: "How to explain a complex project in an interview?", upvotes: 189, comments: 32 },
    { author: "Arun Kumar", exp: "7 years", title: "System Design: Designing a URL Shortener", upvotes: 412, comments: 67 },
  ];

  pricingPlans = [
    {
      name: "FREE", tagline: "For developers getting started.", price: "Free",
      features: ["Basic interview questions", "Basic learning content", "Limited job search", "Limited AI usage", "Application tracker"],
      highlighted: false,
    },
    {
      name: "PRO", tagline: "For serious job seekers.", price: "$29",
      features: ["AI Job Search Agent", "Unlimited JD analysis", "Resume Analyzer", "AI Mock Interviews", "Personalized Roadmaps", "Skill Gap Analysis", "AI Career Assistant", "Advanced interview prep"],
      highlighted: true,
    },
    {
      name: "CAREER", tagline: "For intensive preparation.", price: "$79",
      features: ["Everything in Pro", "Advanced mock interviews", "Advanced system design", "Personalized career insights", "Advanced analytics", "Priority AI features"],
      highlighted: false,
    },
  ];

  footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "AI Job Search", "Mock Interview", "Resume Analyzer"] },
    { title: "Resources", links: ["Learning", "Community", "Blog", "Help Center", "Interview Guide"] },
    { title: "Company", links: ["About", "Careers", "Privacy", "Terms", "Contact"] },
  ];
}
