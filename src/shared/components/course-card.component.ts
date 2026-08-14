import { Component, Input } from "@angular/core";
import {LucideAngularModule,  BookOpen, CheckCircle2, Circle, Clock} from "lucide-angular";
import { Course } from "../../core/models";
import { ProgressBarComponent } from "./progress-bar.component";

@Component({
  selector: "app-course-card",
  standalone: true,
  imports: [LucideAngularModule, ProgressBarComponent],
  template: `
    <div class="card-hover group overflow-hidden">
      <div class="h-24 bg-gradient-to-br" [class]="course.thumbnailGradient">
        <div class="flex h-full items-center justify-center">
          <lucide-icon [img]="BookOpen" class="h-8 w-8 text-white/80"></lucide-icon>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 text-xs">
          <span class="badge-brand">{{ course.category }}</span>
          <span class="badge-neutral capitalize">{{ course.level }}</span>
        </div>
        <h3 class="mt-2 font-semibold text-surface-900 group-hover:text-brand-600 dark:text-surface-100 dark:group-hover:text-brand-400 transition-colors">{{ course.name }}</h3>
        <p class="mt-1 line-clamp-2 text-xs text-surface-500 dark:text-surface-400">{{ course.description }}</p>

        <div class="mt-3 flex items-center gap-3 text-xs text-surface-500 dark:text-surface-400">
          <span class="flex items-center gap-1"><lucide-icon [img]="BookOpen" class="h-3.5 w-3.5"></lucide-icon>{{ course.modules.length }} modules</span>
          <span class="flex items-center gap-1"><lucide-icon [img]="Clock" class="h-3.5 w-3.5"></lucide-icon>{{ course.estimatedTime }}</span>
        </div>

        @if (course.progress > 0) {
          <div class="mt-3">
            <app-progress-bar [value]="course.progress" [color]="course.progress === 100 ? 'success' : 'brand'" label="Progress"></app-progress-bar>
          </div>
        }
      </div>
    </div>
  `,
})
export class CourseCardComponent {
  Clock = Clock;
  BookOpen = BookOpen;

  @Input() course!: Course;
}
