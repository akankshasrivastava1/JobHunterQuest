import { Component, signal, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule, 
  MessageSquare, Filter, Search, Bookmark, ChevronDown,
  Sparkles, Zap, FileText, BookOpen, Clock} from "lucide-angular";
import { InterviewService } from "../../core/services/interview.service";
import { InterviewQuestion } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { InterviewQuestionCardComponent } from "../../shared/components/interview-question-card.component";
import { BadgeComponent } from "../../shared/components/badge.component";

@Component({
  selector: "app-interview-prep",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, PageHeaderComponent, InterviewQuestionCardComponent, BadgeComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Prepare for your next interview" subtitle="Browse questions filtered by experience, technology, type, and difficulty.">
        <div header-actions>
          <a routerLink="/mock-interview" class="btn-primary !text-xs">
            <lucide-icon [img]="Sparkles" class="h-3.5 w-3.5"></lucide-icon>Mock Interview
          </a>
        </div>
      </app-page-header>

      <!-- Filters -->
      <div class="card mb-6 p-4">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label class="mb-1 block text-xs font-medium text-surface-600 dark:text-surface-400">Experience</label>
            <select class="input-field !text-sm" (change)="onFilterChange('experience', $event)">
              <option value="all">All Levels</option>
              <option value="1-2">1-2 Years</option>
              <option value="2-3">2-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5-7">5-7 Years</option>
              <option value="7-10">7-10 Years</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-surface-600 dark:text-surface-400">Technology</label>
            <select class="input-field !text-sm" (change)="onFilterChange('technology', $event)">
              <option value="all">All Technologies</option>
              <option>ASP.NET Core</option>
              <option>C#</option>
              <option>SQL</option>
              <option>Angular</option>
              <option>Microservices</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-surface-600 dark:text-surface-400">Question Type</label>
            <select class="input-field !text-sm" (change)="onFilterChange('type', $event)">
              <option value="all">All Types</option>
              <option>Conceptual</option>
              <option>Production Scenario</option>
              <option>Coding</option>
              <option>System Design</option>
              <option>Project</option>
              <option>Architecture</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-surface-600 dark:text-surface-400">Difficulty</label>
            <select class="input-field !text-sm" (change)="onFilterChange('difficulty', $event)">
              <option value="all">All Levels</option>
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mb-6 flex flex-wrap gap-3">
        <div class="flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-3 py-2 dark:border-surface-700 dark:bg-surface-900">
          <lucide-icon [img]="MessageSquare" class="h-4 w-4 text-brand-500"></lucide-icon>
          <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ questions().length }}</span>
          <span class="text-xs text-surface-500">questions</span>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-3 py-2 dark:border-surface-700 dark:bg-surface-900">
          <lucide-icon [img]="BookOpen" class="h-4 w-4 text-accent-500"></lucide-icon>
          <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">8</span>
          <span class="text-xs text-surface-500">technologies</span>
        </div>
      </div>

      <!-- Question Cards -->
      <div class="grid gap-4 lg:grid-cols-2">
        @for (q of questions(); track q.id) {
          <a [routerLink]="['/interview/questions', q.id]" class="block">
            <app-interview-question-card [question]="q"></app-interview-question-card>
          </a>
        }
      </div>

      @if (questions().length === 0) {
        <div class="card p-12 text-center">
          <lucide-icon [img]="Search" class="mx-auto h-10 w-10 text-surface-300"></lucide-icon>
          <p class="mt-3 text-sm text-surface-500">No questions match your filters. Try adjusting them.</p>
        </div>
      }
    </div>
  `,
})
export class InterviewPrepComponent implements OnInit {
  MessageSquare = MessageSquare;
  Search = Search;
  BookOpen = BookOpen;
  Sparkles = Sparkles;

  private interviewService = inject(InterviewService);

  questions = signal<InterviewQuestion[]>([]);
  filters = signal<{ technology?: string; type?: string; difficulty?: string; experience?: string }>({});

  ngOnInit() {
    this.loadQuestions();
  }

  onFilterChange(key: string, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filters.update((f) => ({ ...f, [key]: value }));
    this.loadQuestions();
  }

  private loadQuestions() {
    this.interviewService.getQuestions(this.filters()).subscribe((q) => this.questions.set(q));
  }
}
