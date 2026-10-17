import { Component, Input } from "@angular/core";
import {LucideAngularModule,  Clock, User, Bookmark} from "lucide-angular";
import { InterviewQuestion } from "../../core/models";
import { BadgeComponent } from "./badge.component";

@Component({
  selector: "app-interview-question-card",
  standalone: true,
  imports: [LucideAngularModule, BadgeComponent],
  template: `
    <div class="card-hover p-5">
      <div class="flex items-start justify-between gap-3">
        <div class="flex flex-wrap gap-1.5">
          <app-badge [variant]="difficultyVariant">{{ question.difficulty }}</app-badge>
          <app-badge variant="brand">{{ question.type }}</app-badge>
          <app-badge variant="neutral">{{ question.technology }}</app-badge>
        </div>
        <button class="btn-ghost !p-1.5">
          <lucide-icon [img]="Bookmark" class="h-4 w-4"></lucide-icon>
        </button>
      </div>

      <p class="mt-3 text-sm font-medium leading-relaxed text-surface-900 dark:text-surface-100">{{ question.question }}</p>

      <div class="mt-3 flex items-center gap-3 text-xs text-surface-500 dark:text-surface-400">
        <span class="flex items-center gap-1"><lucide-icon [img]="User" class="h-3.5 w-3.5"></lucide-icon>{{ question.experienceLevel }}</span>
        <span class="flex items-center gap-1"><lucide-icon [img]="Clock" class="h-3.5 w-3.5"></lucide-icon>{{ question.type }}</span>
      </div>

      <div class="mt-4 flex items-center gap-2 border-t border-surface-100 pt-3 dark:border-surface-800">
        <button class="btn-primary !text-xs !py-1.5">View Answer</button>
        <button class="btn-ghost !text-xs !py-1.5">Practice</button>
        <button class="btn-ghost !text-xs !py-1.5">Ask AI</button>
      </div>
    </div>
  `,
})
export class InterviewQuestionCardComponent {
  Bookmark = Bookmark;
  User = User;
  Clock = Clock;

  @Input() question!: InterviewQuestion;

  get difficultyVariant(): "success" | "warning" | "error" {
    if (this.question.difficulty === "easy") return "success";
    if (this.question.difficulty === "medium") return "warning";
    return "error";
  }
}
