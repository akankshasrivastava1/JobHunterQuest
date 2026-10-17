import { Component, signal, inject, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {LucideAngularModule, 
  Brain, Sparkles, Mic, MicOff, Send, SkipForward,
  Clock, CheckCircle2, ChevronRight, X, Video} from "lucide-angular";
import { ToastService } from "../../core/services/toast.service";

@Component({
  selector: "app-mock-interview-session",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="animate-fade-in">
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Left: AI Interviewer -->
        <div class="lg:col-span-2">
          <div class="card overflow-hidden">
            <!-- AI Interviewer Header -->
            <div class="flex items-center gap-3 border-b border-surface-200 bg-gradient-to-r from-brand-50 to-accent-50 p-4 dark:border-surface-700 dark:from-brand-950/50 dark:to-accent-950/50">
              <div class="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white animate-pulse-glow">
                <lucide-icon [img]="Sparkles" class="h-6 w-6"></lucide-icon>
              </div>
              <div>
                <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">AI Interviewer</p>
                <p class="text-xs text-surface-500 dark:text-surface-400">{{ selectedType }} · {{ selectedDifficulty }}</p>
              </div>
              <div class="ml-auto flex items-center gap-2">
                <div class="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-surface-700 dark:bg-surface-800 dark:text-surface-300">
                  <lucide-icon [img]="Clock" class="h-3.5 w-3.5 text-brand-500"></lucide-icon>
                  {{ formatTime(elapsed()) }}
                </div>
                <button class="btn-ghost !p-1.5" (click)="endInterview()">
                  <lucide-icon [img]="X" class="h-4 w-4"></lucide-icon>
                </button>
              </div>
            </div>

            <!-- Question -->
            <div class="p-6">
              <div class="mb-2 flex items-center gap-2">
                <span class="badge-brand">Question {{ currentQuestion() }} of {{ totalQuestions }}</span>
                <span class="badge-neutral">{{ currentQuestionType }}</span>
              </div>
              <p class="text-base font-medium leading-relaxed text-surface-900 dark:text-surface-100">{{ currentQuestionText }}</p>
            </div>

            <!-- Answer Area -->
            <div class="border-t border-surface-200 p-4 dark:border-surface-700">
              <label class="mb-2 block text-xs font-medium text-surface-600 dark:text-surface-400">Your Answer</label>
              <textarea
                class="input-field min-h-[180px] resize-y text-sm"
                placeholder="Type your answer here or use voice recording..."
                [(value)]="answerText"
              ></textarea>

              <div class="mt-3 flex flex-wrap items-center gap-2">
                <button class="btn-secondary !text-xs" (click)="toggleRecording()">
                  <lucide-icon [img]="recording() ? MicOff : Mic" class="h-3.5 w-3.5" [class]="recording() ? 'text-error-500' : ''"></lucide-icon>
                  {{ recording() ? 'Stop Recording' : 'Start Recording' }}
                </button>
                <button class="btn-primary !text-xs" (click)="submitAnswer()" [disabled]="!answerText.trim()">
                  <lucide-icon [img]="Send" class="h-3.5 w-3.5"></lucide-icon>
                  Submit Answer
                </button>
                <button class="btn-ghost !text-xs" (click)="skipQuestion()">
                  <lucide-icon [img]="SkipForward" class="h-3.5 w-3.5"></lucide-icon>
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Progress -->
        <div class="space-y-4">
          <div class="card p-5">
            <h3 class="mb-4 text-sm font-semibold text-surface-900 dark:text-surface-100">Interview Progress</h3>
            <div class="space-y-2">
              @for (i of [].constructor(totalQuestions); track i; let q = $index) {
                <div class="flex items-center gap-2 text-xs">
                  <div class="flex h-6 w-6 items-center justify-center rounded-full" [class]="q < currentQuestion() - 1 ? 'bg-success-100 dark:bg-success-900' : q === currentQuestion() - 1 ? 'bg-brand-100 dark:bg-brand-900' : 'bg-surface-100 dark:bg-surface-800'">
                    @if (q < currentQuestion() - 1) {
                      <lucide-icon [img]="CheckCircle2" class="h-3.5 w-3.5 text-success-600"></lucide-icon>
                    } @else if (q === currentQuestion() - 1) {
                      <div class="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></div>
                    } @else {
                      <span class="text-surface-400">{{ q + 1 }}</span>
                    }
                  </div>
                  <span [class]="q === currentQuestion() - 1 ? 'font-medium text-surface-900 dark:text-surface-100' : 'text-surface-500'">Question {{ q + 1 }}</span>
                </div>
              }
            </div>
          </div>

          <div class="card p-5">
            <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Session Info</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between"><span class="text-surface-500">Type</span><span class="font-medium text-surface-700 dark:text-surface-300">{{ selectedType }}</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Difficulty</span><span class="font-medium capitalize text-surface-700 dark:text-surface-300">{{ selectedDifficulty }}</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Answered</span><span class="font-medium text-surface-700 dark:text-surface-300">{{ answeredCount() }} / {{ totalQuestions }}</span></div>
              <div class="flex justify-between"><span class="text-surface-500">Skipped</span><span class="font-medium text-surface-700 dark:text-surface-300">{{ skippedCount() }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MockInterviewSessionComponent implements OnInit, OnDestroy {
  Send = Send;
  Clock = Clock;
  X = X;
  CheckCircle2 = CheckCircle2;
  Mic = Mic;
  MicOff = MicOff;
  Sparkles = Sparkles;
  SkipForward = SkipForward;

  toast = inject(ToastService);
  private router = inject(Router);

  selectedType = "Technical";
  selectedDifficulty = "medium";
  totalQuestions = 10;
  currentQuestion = signal(1);
  answeredCount = signal(0);
  skippedCount = signal(0);
  recording = signal(false);
  elapsed = signal(0);
  answerText = "";

  questions = [
    "Explain how dependency injection works in ASP.NET Core and when you'd use Scoped vs Singleton lifetime.",
    "Your ASP.NET Core API starts returning 500 errors in production. Walk me through your investigation approach.",
    "How would you design a rate limiting solution for a public API?",
    "Explain the difference between Task.Run and async/await. When would you use each?",
    "Tell me about a challenging project you worked on and your role in it.",
    "How does Angular change detection work? When would you use OnPush strategy?",
    "Write a SQL query to find the second highest salary in each department.",
    "How would you approach migrating a monolithic application to microservices?",
    "Describe how you would implement caching in a .NET application.",
    "What's your approach to handling errors and exceptions in a production ASP.NET Core application?",
  ];

  questionTypes = ["Conceptual", "Production Scenario", "System Design", "Conceptual", "Project", "Conceptual", "Coding", "Architecture", "Practical", "Production Scenario"];

  currentQuestionText = "";
  currentQuestionType = "";
  private timerInterval: any;

  ngOnInit() {
    this.loadQuestion();
    this.timerInterval = setInterval(() => this.elapsed.update((t) => t + 1), 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  loadQuestion() {
    const idx = this.currentQuestion() - 1;
    this.currentQuestionText = this.questions[idx] || this.questions[0];
    this.currentQuestionType = this.questionTypes[idx] || "Technical";
    this.answerText = "";
  }

  toggleRecording() {
    this.recording.update((v) => !v);
    if (this.recording()) {
      this.toast.info("Recording started...");
    } else {
      this.toast.info("Recording stopped. Transcribing...");
    }
  }

  submitAnswer() {
    if (!this.answerText.trim()) return;
    this.answeredCount.update((c) => c + 1);
    this.toast.success("Answer submitted!");
    this.nextQuestion();
  }

  skipQuestion() {
    this.skippedCount.update((c) => c + 1);
    this.toast.warning("Question skipped.");
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestion() >= this.totalQuestions) {
      this.endInterview();
    } else {
      this.currentQuestion.update((c) => c + 1);
      this.loadQuestion();
    }
  }

  endInterview() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.toast.success("Interview complete! Generating your feedback...");
    setTimeout(() => this.router.navigate(["/mock-interview/result"]), 800);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
}
