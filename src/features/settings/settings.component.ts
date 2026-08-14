import { Component, signal, inject } from "@angular/core";
import {LucideAngularModule, 
  User, Bell, Sparkles, Shield, Lock, CreditCard,
  ChevronRight, Check} from "lucide-angular";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Settings" subtitle="Manage your account and preferences."></app-page-header>

      <div class="grid gap-6 lg:grid-cols-4">
        <!-- Settings Nav -->
        <div class="lg:col-span-1">
          <div class="card p-2 space-y-0.5">
            @for (tab of tabs; track tab) {
              <button class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left"
                [class]="activeTab() === tab.id ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'"
                (click)="activeTab.set(tab.id)">
                <lucide-icon [img]="tab.icon" class="h-4 w-4 shrink-0"></lucide-icon>
                {{ tab.label }}
              </button>
            }
          </div>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-3">
          @switch (activeTab()) {
            @case ('account') {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Account</h3>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-xs text-surface-500">Email</label>
                    <input class="input-field" value="akanksha@example.com" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs text-surface-500">Display Name</label>
                    <input class="input-field" value="Akanksha Sharma" />
                  </div>
                  <button class="btn-primary !text-xs" (click)="toast.success('Account updated!')">Save Changes</button>
                </div>
              </div>
            }
            @case ('notifications') {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Notifications</h3>
                <div class="space-y-3">
                  @for (notif of notifications; track notif.label) {
                    <div class="flex items-center justify-between border-b border-surface-100 pb-3 dark:border-surface-800 last:border-0">
                      <div>
                        <p class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ notif.label }}</p>
                        <p class="text-xs text-surface-500">{{ notif.desc }}</p>
                      </div>
                      <button
                        class="relative h-6 w-11 rounded-full transition-colors"
                        [class]="notif.enabled ? 'bg-brand-600' : 'bg-surface-200 dark:bg-surface-700'"
                        (click)="notif.enabled = !notif.enabled"
                      >
                        <span class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                          [style.transform]="notif.enabled ? 'translateX(22px)' : 'translateX(2px)'"></span>
                      </button>
                    </div>
                  }
                </div>
              </div>
            }
            @case ('ai') {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">AI Preferences</h3>
                <div class="space-y-3">
                  @for (pref of aiPrefs; track pref.label) {
                    <div class="flex items-center justify-between border-b border-surface-100 pb-3 dark:border-surface-800 last:border-0">
                      <div>
                        <p class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ pref.label }}</p>
                        <p class="text-xs text-surface-500">{{ pref.desc }}</p>
                      </div>
                      <button
                        class="relative h-6 w-11 rounded-full transition-colors"
                        [class]="pref.enabled ? 'bg-brand-600' : 'bg-surface-200 dark:bg-surface-700'"
                        (click)="pref.enabled = !pref.enabled"
                      >
                        <span class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                          [style.transform]="pref.enabled ? 'translateX(22px)' : 'translateX(2px)'"></span>
                      </button>
                    </div>
                  }
                </div>
              </div>
            }
            @case ('privacy') {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Privacy</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between border-b border-surface-100 pb-3 dark:border-surface-800">
                    <div>
                      <p class="text-sm font-medium text-surface-900 dark:text-surface-100">Profile Visibility</p>
                      <p class="text-xs text-surface-500">Who can see your profile</p>
                    </div>
                    <select class="input-field !w-auto !text-xs"><option>Public</option><option>Community only</option><option>Private</option></select>
                  </div>
                  <div class="flex items-center justify-between border-b border-surface-100 pb-3 dark:border-surface-800">
                    <div>
                      <p class="text-sm font-medium text-surface-900 dark:text-surface-100">Show in Search Results</p>
                      <p class="text-xs text-surface-500">Allow recruiters to find you</p>
                    </div>
                    <button class="relative h-6 w-11 rounded-full bg-brand-600">
                      <span class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow" style="transform: translateX(22px)"></span>
                    </button>
                  </div>
                </div>
              </div>
            }
            @case ('security') {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Security</h3>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-xs text-surface-500">Current Password</label>
                    <input type="password" class="input-field" placeholder="••••••••" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs text-surface-500">New Password</label>
                    <input type="password" class="input-field" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs text-surface-500">Confirm New Password</label>
                    <input type="password" class="input-field" placeholder="Confirm new password" />
                  </div>
                  <button class="btn-primary !text-xs" (click)="toast.success('Password updated!')">Update Password</button>
                  <div class="border-t border-surface-100 pt-4 dark:border-surface-800">
                    <p class="text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">Two-Factor Authentication</p>
                    <div class="flex items-center gap-2">
                      <span class="badge-success"><lucide-icon [img]="Check" class="h-3 w-3"></lucide-icon>Enabled</span>
                      <button class="btn-ghost !text-xs">Manage</button>
                    </div>
                  </div>
                </div>
              </div>
            }
            @case ('subscription') {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Subscription</h3>
                <div class="rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 p-4 dark:border-brand-800 dark:from-brand-950 dark:to-accent-950">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-bold text-brand-700 dark:text-brand-300">Pro Plan</p>
                      <p class="text-xs text-surface-600 dark:text-surface-400">$29/month · Renews on Mar 15, 2025</p>
                    </div>
                    <lucide-icon [img]="CreditCard" class="h-5 w-5 text-brand-500"></lucide-icon>
                  </div>
                </div>
                <div class="mt-4 flex gap-2">
                  <a href="/pricing" class="btn-outline !text-xs">Change Plan</a>
                  <button class="btn-ghost !text-xs" (click)="toast.warning('Cancellation requires confirmation')">Cancel Subscription</button>
                </div>
              </div>
            }
            @default {
              <div class="card p-5">
                <h3 class="mb-4 text-base font-semibold text-surface-900 dark:text-surface-100">Profile Settings</h3>
                <p class="text-sm text-surface-500">Profile and career preference settings.</p>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class SettingsComponent {
  CreditCard = CreditCard;
  Check = Check;

  toast = inject(ToastService);
  activeTab = signal("account");

  tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "ai", label: "AI Preferences", icon: Sparkles },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
    { id: "subscription", label: "Subscription", icon: CreditCard },
  ];

  notifications = [
    { label: "Job alerts", desc: "Get notified about new matching jobs", enabled: true },
    { label: "Interview reminders", desc: "Reminders for upcoming interviews", enabled: true },
    { label: "Learning reminders", desc: "Daily learning nudges", enabled: false },
    { label: "Application updates", desc: "Status changes on your applications", enabled: true },
    { label: "AI recommendations", desc: "Weekly AI-powered career insights", enabled: true },
  ];

  aiPrefs = [
    { label: "Personalized questions", desc: "AI generates questions based on your profile", enabled: true },
    { label: "Auto-analyze JD", desc: "Automatically analyze jobs you view", enabled: true },
    { label: "Smart recommendations", desc: "Get AI-suggested learning paths", enabled: true },
    { label: "Interview feedback", desc: "AI analysis of your mock interview answers", enabled: true },
  ];
}
