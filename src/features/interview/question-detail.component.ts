import { Component, signal, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {LucideAngularModule, 
  ArrowLeft, ArrowRight, Sparkles, BookOpen, Code2, AlertCircle,
  Lightbulb, MessageCircle, ChevronRight, Bookmark, Brain,
  CheckCircle2, XCircle, Target} from "lucide-angular";
import { InterviewService } from "../../core/services/interview.service";
import { InterviewQuestion } from "../../core/models";
import { BadgeComponent } from "../../shared/components/badge.component";
import { ProgressBarComponent } from "../../shared/components/progress-bar.component";

@Component({
  selector: "app-question-detail",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, BadgeComponent, ProgressBarComponent],
  template: `
    <div class="animate-fade-in">
      <a routerLink="/interview" class="mb-4 inline-flex items-center gap-1 text-sm text-surface-500 hover:text-surface-900 dark:hover:text-surface-100">
        <lucide-icon [img]="ArrowLeft" class="h-4 w-4"></lucide-icon> Back to Questions
      </a>

      @if (question()) {
        <!-- Progress -->
        <div class="mb-6 flex items-center gap-3">
          <div class="flex-1">
            <app-progress-bar [value]="65" label="Question Progress" color="brand"></app-progress-bar>
          </div>
          <span class="text-xs text-surface-500">3 of 8 answered</span>
        </div>

        <!-- Question -->
        <div class="card mb-6 p-6">
          <div class="mb-4 flex flex-wrap gap-1.5">
            <app-badge [variant]="question()!.difficulty === 'easy' ? 'success' : question()!.difficulty === 'medium' ? 'warning' : 'error'">{{ question()!.difficulty }}</app-badge>
            <app-badge variant="brand">{{ question()!.type }}</app-badge>
            <app-badge variant="neutral">{{ question()!.technology }}</app-badge>
            <app-badge variant="neutral">{{ question()!.experienceLevel }}</app-badge>
          </div>
          <h1 class="text-lg font-semibold leading-relaxed text-surface-900 dark:text-surface-100">{{ question()!.question }}</h1>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
            <!-- Why interviewer asks this -->
            <div class="card p-5">
              <div class="mb-2 flex items-center gap-2">
                <lucide-icon [img]="Target" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Why the interviewer asks this</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ question()!.whyAsked }}</p>
            </div>

            <!-- Expected Answer -->
            <div class="card p-5">
              <div class="mb-2 flex items-center gap-2">
                <lucide-icon [img]="BookOpen" class="h-4 w-4 text-success-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Expected Answer</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ question()!.expectedAnswer }}</p>
            </div>

            <!-- Real-world explanation -->
            <div class="card p-5">
              <div class="mb-2 flex items-center gap-2">
                <lucide-icon [img]="Lightbulb" class="h-4 w-4 text-warning-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Real-world Explanation</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ question()!.realWorldExplanation }}</p>
            </div>

            <!-- Code Example -->
            @if (question()!.codeExample) {
              <div class="card overflow-hidden">
                <div class="flex items-center gap-2 border-b border-surface-200 bg-surface-50 px-4 py-2.5 dark:border-surface-700 dark:bg-surface-800/50">
                  <lucide-icon [img]="Code2" class="h-4 w-4 text-accent-500"></lucide-icon>
                  <span class="text-xs font-semibold text-surface-700 dark:text-surface-300">Code Example</span>
                </div>
                <pre class="overflow-x-auto p-4 text-xs font-mono text-surface-700 dark:text-surface-300"><code>{{ question()!.codeExample }}</code></pre>
              </div>
            }

            <!-- Common Mistakes -->
            <div class="card p-5">
              <div class="mb-3 flex items-center gap-2">
                <lucide-icon [img]="XCircle" class="h-4 w-4 text-error-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Common Mistakes</h3>
              </div>
              <ul class="space-y-2">
                @for (mistake of question()!.commonMistakes; track mistake) {
                  <li class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                    <lucide-icon [img]="XCircle" class="mt-0.5 h-4 w-4 shrink-0 text-error-400"></lucide-icon>
                    {{ mistake }}
                  </li>
                }
              </ul>
            </div>

            <!-- How to Answer -->
            <div class="card p-5 border-brand-200 dark:border-brand-800">
              <div class="mb-2 flex items-center gap-2">
                <lucide-icon [img]="Sparkles" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">How to Answer in an Interview</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ question()!.howToAnswer }}</p>
            </div>

            <!-- Senior Discussion -->
            <div class="card p-5">
              <div class="mb-2 flex items-center gap-2">
                <lucide-icon [img]="Brain" class="h-4 w-4 text-brand-500"></lucide-icon>
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Senior-level Discussion</h3>
              </div>
              <p class="text-sm text-surface-700 dark:text-surface-300">{{ question()!.seniorDiscussion }}</p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Actions -->
            <div class="card p-4 space-y-2">
              <button class="btn-primary w-full"><lucide-icon [img]="MessageCircle" class="h-4 w-4"></lucide-icon>Practice Answer</button>
              <button class="btn-outline w-full"><lucide-icon [img]="Sparkles" class="h-4 w-4"></lucide-icon>Ask AI</button>
              <button class="btn-ghost w-full"><lucide-icon [img]="Bookmark" class="h-4 w-4"></lucide-icon>Add to Favorites</button>
              <a routerLink="/interview" class="btn-secondary w-full">
                Next Question <lucide-icon [img]="ArrowRight" class="h-4 w-4"></lucide-icon>
              </a>
            </div>

            <!-- Follow-up Questions -->
            <div class="card p-5">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Follow-up Questions</h3>
              <div class="space-y-2">
                @for (fq of question()!.followUpQuestions; track fq) {
                  <div class="flex items-start gap-2 rounded-lg bg-surface-50 p-3 text-xs text-surface-700 dark:bg-surface-800/50 dark:text-surface-300">
                    <lucide-icon [img]="ChevronRight" class="mt-0.5 h-3 w-3 shrink-0 text-brand-500"></lucide-icon>
                    {{ fq }}
                  </div>
                }
              </div>
            </div>

            <!-- Tags -->
            <div class="card p-5">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Tags</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (tag of question()!.tags; track tag) {
                  <span class="badge-neutral">{{ tag }}</span>
                }
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="card p-12 text-center">
          <p class="text-surface-500">Question not found.</p>
        </div>
      }
    </div>
  `,
})
export class QuestionDetailComponent implements OnInit {
  ArrowRight = ArrowRight;
  XCircle = XCircle;
  MessageCircle = MessageCircle;
  Bookmark = Bookmark;
  ArrowLeft = ArrowLeft;
  Code2 = Code2;
  ChevronRight = ChevronRight;
  Lightbulb = Lightbulb;
  BookOpen = BookOpen;
  Target = Target;
  Sparkles = Sparkles;
  Brain = Brain;

  private route = inject(ActivatedRoute);
  private interviewService = inject(InterviewService);

  question = signal<InterviewQuestion | undefined>(undefined);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.interviewService.getQuestionById(id).subscribe((q) => this.question.set(q));
  }
}
