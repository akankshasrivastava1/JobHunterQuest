import { Component, Input } from "@angular/core";
import { Skill } from "../../core/models";

@Component({
  selector: "app-skill-tag",
  standalone: true,
  template: `
    <div
      class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      [class]="bgClass"
    >
      <span [class]="dotClass"></span>
      {{ skill.name }}
      @if (showProficiency) {
        <span class="text-surface-400 dark:text-surface-500">· {{ skill.proficiency }}</span>
      }
    </div>
  `,
})
export class SkillTagComponent {
  @Input() skill!: Skill;
  @Input() showProficiency = false;

  get bgClass(): string {
    const proficiencyColors: Record<string, string> = {
      expert: "bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300",
      advanced: "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300",
      intermediate: "bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-300",
      beginner: "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400",
    };
    return proficiencyColors[this.skill.proficiency] || proficiencyColors['beginner'];
  }

  get dotClass(): string {
    const dotColors: Record<string, string> = {
      expert: "bg-success-500",
      advanced: "bg-brand-500",
      intermediate: "bg-warning-500",
      beginner: "bg-surface-400",
    };
    return `h-1.5 w-1.5 rounded-full ${dotColors[this.skill.proficiency] || dotColors['beginner']}`;
  }
}
