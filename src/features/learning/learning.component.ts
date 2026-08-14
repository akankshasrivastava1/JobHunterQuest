import { Component, signal, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule,  BookOpen, Search, Filter, Clock, CheckCircle2, Circle} from "lucide-angular";
import { CourseService } from "../../core/services/mock-services";
import { Course } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { CourseCardComponent } from "../../shared/components/course-card.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";

@Component({
  selector: "app-learning",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, PageHeaderComponent, CourseCardComponent, ProgressBarComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Learning" subtitle="Courses and modules tailored to your career goals.">
        <div header-actions>
          <a routerLink="/roadmap" class="btn-outline !text-xs">
            <lucide-icon [img]="BookOpen" class="h-3.5 w-3.5"></lucide-icon>View Roadmap
          </a>
        </div>
      </app-page-header>

      <!-- Categories -->
      <div class="mb-6 flex flex-wrap gap-2">
        <button class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
          [class]="selectedCategory() === 'All' ? 'bg-brand-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400'"
          (click)="selectedCategory.set('All')">All</button>
        @for (cat of categories; track cat) {
          <button class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
            [class]="selectedCategory() === cat ? 'bg-brand-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400'"
            (click)="selectedCategory.set(cat)">{{ cat }}</button>
        }
      </div>

      <!-- Course Grid -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (course of filteredCourses(); track course.id) {
          <app-course-card [course]="course"></app-course-card>
        }
      </div>
    </div>
  `,
})
export class LearningComponent implements OnInit {
  BookOpen = BookOpen;

  private courseService = inject(CourseService);

  courses = signal<Course[]>([]);
  selectedCategory = signal("All");

  categories = [".NET & C#", "ASP.NET Core", "Entity Framework", "SQL Server", "Azure", "Angular", "React", "JavaScript", "Microservices", "DevOps", "Docker", "Kubernetes", "CI/CD"];

  ngOnInit() {
    this.courseService.getCourses().subscribe((c) => this.courses.set(c));
  }

  filteredCourses() {
    const cat = this.selectedCategory();
    if (cat === "All") return this.courses();
    return this.courses().filter((c) => c.category === cat || c.category.includes(cat));
  }
}
