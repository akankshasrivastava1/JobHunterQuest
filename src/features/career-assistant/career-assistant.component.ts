import { Component, signal, inject } from "@angular/core";
import {LucideAngularModule,  Sparkles, Send, MessageCircle, Zap, User} from "lucide-angular";
import { ChatMessage } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { AiBadgeComponent } from "../../shared/components/ai-badge.component";

@Component({
  selector: "app-career-assistant",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, AiBadgeComponent],
  template: `
    <div class="animate-fade-in flex flex-col" style="min-height: calc(100vh - 8rem);">
      <app-page-header title="Career Assistant" subtitle="Your personal AI career coach.">
        <div header-actions>
          <app-ai-badge label="AI Coach"></app-ai-badge>
        </div>
      </app-page-header>

      <div class="flex flex-1 flex-col rounded-2xl border border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900 overflow-hidden">
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4" style="max-height: 60vh;">
          @for (msg of messages(); track msg.id) {
            <div class="flex gap-3" [class]="msg.role === 'user' ? 'flex-row-reverse' : ''">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                [class]="msg.role === 'user' ? 'bg-surface-100 dark:bg-surface-800' : 'bg-gradient-to-br from-brand-500 to-accent-500'">
                @if (msg.role === 'user') {
                  <lucide-icon [img]="User" class="h-4 w-4 text-surface-500"></lucide-icon>
                } @else {
                  <lucide-icon [img]="Sparkles" class="h-4 w-4 text-white"></lucide-icon>
                }
              </div>
              <div class="max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm"
                [class]="msg.role === 'user'
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-50 text-surface-700 dark:bg-surface-800 dark:text-surface-300'">
                {{ msg.content }}
              </div>
            </div>
          }
          @if (thinking()) {
            <div class="flex gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
                <lucide-icon [img]="Sparkles" class="h-4 w-4 text-white"></lucide-icon>
              </div>
              <div class="rounded-xl bg-surface-50 px-3.5 py-2.5 dark:bg-surface-800">
                <div class="flex gap-1">
                  <div class="h-2 w-2 rounded-full bg-surface-400 animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="h-2 w-2 rounded-full bg-surface-400 animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="h-2 w-2 rounded-full bg-surface-400 animate-bounce" style="animation-delay: 300ms"></div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Suggested Prompts -->
        @if (messages().length <= 1) {
          <div class="border-t border-surface-200 p-3 dark:border-surface-800">
            <p class="mb-2 text-xs font-medium text-surface-500">Suggested prompts:</p>
            <div class="flex flex-wrap gap-2">
              @for (prompt of suggestedPrompts; track prompt) {
                <button class="rounded-full border border-surface-200 px-3 py-1.5 text-xs text-surface-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-surface-700 dark:text-surface-400 dark:hover:bg-brand-950 dark:hover:text-brand-300 transition-colors"
                  (click)="sendPrompt(prompt)">
                  {{ prompt }}
                </button>
              }
            </div>
          </div>
        }

        <!-- Input -->
        <div class="border-t border-surface-200 p-3 dark:border-surface-800">
          <div class="flex items-end gap-2">
            <textarea
              class="input-field min-h-[40px] max-h-[120px] resize-none text-sm"
              placeholder="Ask me anything about your career..."
              [(value)]="inputText"
              (keydown.enter)="onEnter($event)"
            ></textarea>
            <button class="btn-primary shrink-0 !p-2.5" (click)="send()" [disabled]="!inputText.trim()">
              <lucide-icon [img]="Send" class="h-4 w-4"></lucide-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CareerAssistantComponent {
  Send = Send;
  User = User;
  Sparkles = Sparkles;

  inputText = "";
  thinking = signal(false);
  messages = signal<ChatMessage[]>([
    {
      id: "m0",
      role: "assistant",
      content: "Hi! I'm your AI Career Assistant. I can help you with interview preparation, job matching, resume analysis, learning roadmaps, and career strategy. What would you like to work on today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  suggestedPrompts = [
    "Am I ready for this job?",
    "Analyze this JD",
    "Prepare me for a .NET interview",
    "Create a 7-day preparation plan",
    "Improve my project explanation",
    "What should I learn next?",
    "Why am I not getting shortlisted?",
  ];

  private responses: Record<string, string> = {
    "Am I ready for this job?": "Based on your profile (4 years experience, C#/ASP.NET Core/Angular/Azure), you're 82% ready for Senior .NET Developer roles. The main gaps are Kubernetes (high priority), System Design (high priority), and Azure Service Bus (medium priority). I'd recommend focusing on System Design first — it appears in 68% of matching job postings. Would you like me to create a targeted preparation plan?",
    "Analyze this JD": "I'd be happy to analyze a job description for you! You can paste the JD text or upload a file on the JD Analyzer page. I'll extract key requirements, compare them to your profile, identify skill gaps, and suggest preparation topics. Would you like to go there now?",
    "Prepare me for a .NET interview": "Great! For a .NET interview at your experience level (4 years), I recommend focusing on: 1) ASP.NET Core middleware & DI lifetimes, 2) Async/await and Task Parallel Library, 3) Entity Framework performance, 4) Production debugging scenarios, 5) Basic system design. I have 8 curated questions ready. Want to start with a mock interview or browse questions?",
    "Create a 7-day preparation plan": "Here's your 7-day plan for Senior .NET Developer interviews:\n\nDay 1-2: ASP.NET Core deep dive (DI, middleware, middleware pipeline)\nDay 3: SQL Server (window functions, query optimization)\nDay 4: System Design fundamentals (scalability, caching, load balancing)\nDay 5: Azure (App Service, Functions, Cosmos DB)\nDay 6: Mock interview (technical + system design)\nDay 7: Review weak areas + project explanation practice\n\nShall I set this up in your roadmap?",
    "Improve my project explanation": "To improve your project explanations, use the STAR method:\n\nSituation: What was the business problem?\nTask: What was your specific role?\nAction: What technical decisions did you make and why?\nResult: What was the measurable impact?\n\nKeep it to 2-3 minutes, focus on YOUR contributions, and always mention trade-offs you considered. Would you like to practice with a specific project?",
    "What should I learn next?": "Based on your target role (Senior .NET Developer) and current skill analysis, I recommend learning in this order:\n\n1. System Design (high impact — 68% of matching jobs require it)\n2. Microservices architecture (appears in 54% of matches)\n3. Azure advanced services (Service Bus, Event Grid)\n4. Docker & Kubernetes (needed for DevOps-ready roles)\n\nYour roadmap already has these phases. Want to start with System Design?",
    "Why am I not getting shortlisted?": "Looking at your profile and application history, here are likely reasons:\n\n1. Your resume is missing keywords: Kubernetes, System Design, Microservices\n2. Your ATS score is 82 — aim for 90+ by adding relevant keywords (only if you have genuine experience)\n3. You may be applying to roles requiring 5+ years when you have 4\n4. Consider highlighting Azure experience more prominently\n\nWould you like me to help optimize your resume for specific roles?",
  };

  sendPrompt(prompt: string) {
    this.inputText = prompt;
    this.send();
  }

  onEnter(event: Event) {
    event.preventDefault();
    this.send();
  }

  send() {
    const text = this.inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `m${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    this.messages.update((m) => [...m, userMsg]);
    this.inputText = "";
    this.thinking.set(true);

    setTimeout(() => {
      const response = this.responses[text] || "That's a great question! Based on your profile and goals, I'd recommend checking the dashboard for personalized recommendations. You can also explore the interview prep section for targeted practice questions, or start a mock interview to assess your readiness. Is there something specific you'd like to dive deeper into?";
      const aiMsg: ChatMessage = {
        id: `m${Date.now() + 1}`,
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      this.thinking.set(false);
      this.messages.update((m) => [...m, aiMsg]);
    }, 1500);
  }
}
