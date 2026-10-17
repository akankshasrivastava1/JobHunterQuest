import { Component, signal, inject, OnInit } from "@angular/core";
import {LucideAngularModule, 
  Plus, LayoutGrid, List, Calendar, MapPin, Star,
  ChevronRight, MoreVertical, Bookmark} from "lucide-angular";
import { ApplicationService } from "../../core/services/mock-services";
import { ToastService } from "../../core/services/toast.service";
import { Application, ApplicationStatus } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { BadgeComponent } from "../../shared/components/badge.component";
import { AvatarComponent } from "../../shared/components/avatar.component";

@Component({
  selector: "app-applications",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, BadgeComponent, AvatarComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Application Tracker" subtitle="Track your job applications from saved to offer.">
        <div header-actions>
          <div class="flex gap-1 rounded-lg border border-surface-200 p-0.5 dark:border-surface-700">
            <button class="rounded-md px-2.5 py-1 text-xs font-medium" [class]="viewMode() === 'kanban' ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'text-surface-500'" (click)="viewMode.set('kanban')">
              <lucide-icon [img]="LayoutGrid" class="h-3.5 w-3.5"></lucide-icon>
            </button>
            <button class="rounded-md px-2.5 py-1 text-xs font-medium" [class]="viewMode() === 'list' ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'text-surface-500'" (click)="viewMode.set('list')">
              <lucide-icon [img]="List" class="h-3.5 w-3.5"></lucide-icon>
            </button>
          </div>
          <button class="btn-primary !text-xs" (click)="toast.info('Add application feature coming soon!')">
            <lucide-icon [img]="Plus" class="h-3.5 w-3.5"></lucide-icon>Add Application
          </button>
        </div>
      </app-page-header>

      <!-- Kanban View -->
      @if (viewMode() === 'kanban') {
        <div class="flex gap-4 overflow-x-auto pb-4">
          @for (col of columns; track col.status) {
            <div class="w-72 shrink-0">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full" [class]="col.dotColor"></span>
                  <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ col.label }}</span>
                  <span class="badge-neutral">{{ getApplicationsByStatus(col.status).length }}</span>
                </div>
              </div>
              <div class="space-y-2 min-h-[100px]">
                @for (app of getApplicationsByStatus(col.status); track app.id) {
                  <div class="card-hover cursor-grab p-3" draggable="true">
                    <div class="flex items-start justify-between">
                      <div class="flex items-center gap-2">
                        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-accent-100 text-xs font-bold text-brand-600 dark:from-brand-900 dark:to-accent-900 dark:text-brand-300">
                          {{ app.companyName.slice(0, 2).toUpperCase() }}
                        </div>
                        <div>
                          <p class="text-xs font-semibold text-surface-900 dark:text-surface-100">{{ app.jobTitle }}</p>
                          <p class="text-[10px] text-surface-500">{{ app.companyName }}</p>
                        </div>
                      </div>
                      <span class="text-xs font-bold" [class]="app.matchScore >= 85 ? 'text-success-600 dark:text-success-400' : 'text-brand-600 dark:text-brand-400'">{{ app.matchScore }}%</span>
                    </div>
                    <div class="mt-2 flex items-center gap-2 text-[10px] text-surface-500">
                      <span class="flex items-center gap-0.5"><lucide-icon [img]="MapPin" class="h-3 w-3"></lucide-icon>{{ app.location }}</span>
                      @if (app.appliedDate) {
                        <span class="flex items-center gap-0.5"><lucide-icon [img]="Calendar" class="h-3 w-3"></lucide-icon>{{ app.appliedDate }}</span>
                      }
                    </div>
                    @if (app.interviewDate) {
                      <div class="mt-2 rounded-md bg-brand-50 px-2 py-1 text-[10px] font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                        Interview: {{ app.interviewDate }}
                      </div>
                    }
                  </div>
                }
                @if (getApplicationsByStatus(col.status).length === 0) {
                  <div class="rounded-lg border border-dashed border-surface-200 p-4 text-center text-[10px] text-surface-400 dark:border-surface-700">
                    No applications
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- List View -->
      @if (viewMode() === 'list') {
        <div class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800/50">
                  <th class="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400">Job Title</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400 hidden md:table-cell">Company</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400 hidden lg:table-cell">Location</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400">Match</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                @for (app of applications(); track app.id) {
                  <tr class="border-b border-surface-100 hover:bg-surface-50 dark:border-surface-800 dark:hover:bg-surface-800/30">
                    <td class="px-4 py-3 font-medium text-surface-900 dark:text-surface-100">{{ app.jobTitle }}</td>
                    <td class="px-4 py-3 text-surface-600 dark:text-surface-400 hidden md:table-cell">{{ app.companyName }}</td>
                    <td class="px-4 py-3 text-surface-600 dark:text-surface-400 hidden lg:table-cell">{{ app.location }}</td>
                    <td class="px-4 py-3">
                      <span class="badge" [class]="statusBadgeClass(app.status)">{{ statusLabel(app.status) }}</span>
                    </td>
                    <td class="px-4 py-3">
                      <span class="font-bold" [class]="app.matchScore >= 85 ? 'text-success-600 dark:text-success-400' : 'text-brand-600 dark:text-brand-400'">{{ app.matchScore }}%</span>
                    </td>
                    <td class="px-4 py-3 text-surface-500 text-xs hidden md:table-cell">{{ app.appliedDate || '—' }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
})
export class ApplicationsComponent implements OnInit {
  Calendar = Calendar;
  List = List;
  LayoutGrid = LayoutGrid;
  MapPin = MapPin;
  Plus = Plus;

  private appService = inject(ApplicationService);
  toast = inject(ToastService);

  applications = signal<Application[]>([]);
  viewMode = signal<"kanban" | "list">("kanban");

  columns = [
    { status: "saved" as ApplicationStatus, label: "Saved", dotColor: "bg-surface-400" },
    { status: "applied" as ApplicationStatus, label: "Applied", dotColor: "bg-brand-500" },
    { status: "screening" as ApplicationStatus, label: "Screening", dotColor: "bg-accent-500" },
    { status: "technical" as ApplicationStatus, label: "Technical", dotColor: "bg-warning-500" },
    { status: "managerial" as ApplicationStatus, label: "Managerial", dotColor: "bg-warning-600" },
    { status: "hr" as ApplicationStatus, label: "HR", dotColor: "bg-brand-400" },
    { status: "offer" as ApplicationStatus, label: "Offer", dotColor: "bg-success-500" },
    { status: "rejected" as ApplicationStatus, label: "Rejected", dotColor: "bg-error-500" },
  ];

  ngOnInit() {
    this.appService.getApplications().subscribe((apps) => this.applications.set(apps));
  }

  getApplicationsByStatus(status: ApplicationStatus): Application[] {
    return this.applications().filter((a) => a.status === status);
  }

  statusLabel(status: ApplicationStatus): string {
    const labels: Record<ApplicationStatus, string> = {
      saved: "Saved", applied: "Applied", screening: "Screening",
      technical: "Technical", managerial: "Managerial", hr: "HR",
      offer: "Offer", rejected: "Rejected",
    };
    return labels[status];
  }

  statusBadgeClass(status: ApplicationStatus): string {
    const classes: Record<ApplicationStatus, string> = {
      saved: "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400",
      applied: "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300",
      screening: "bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300",
      technical: "bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300",
      managerial: "bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300",
      hr: "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300",
      offer: "bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300",
      rejected: "bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300",
    };
    return classes[status];
  }
}
