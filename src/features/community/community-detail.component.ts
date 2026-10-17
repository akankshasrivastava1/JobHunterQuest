import { Component, signal, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {LucideAngularModule, 
  ArrowLeft, TrendingUp, MessageCircle, Eye, Bookmark,
  CheckCircle2, ChevronRight, ThumbsUp, CornerDownRight} from "lucide-angular";
import { CommunityService } from "../../core/services/mock-services";
import { CommunityPost } from "../../core/models";
import { AvatarComponent } from "../../shared/components/avatar.component";
import { BadgeComponent } from "../../shared/components/badge.component";

@Component({
  selector: "app-community-detail",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, AvatarComponent, BadgeComponent],
  template: `
    <div class="animate-fade-in">
      <a routerLink="/community" class="mb-4 inline-flex items-center gap-1 text-sm text-surface-500 hover:text-surface-900 dark:hover:text-surface-100">
        <lucide-icon [img]="ArrowLeft" class="h-4 w-4"></lucide-icon> Back to Community
      </a>

      @if (post()) {
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <!-- Post -->
            <div class="card p-6 mb-4">
              <div class="flex items-center gap-3 mb-4">
                <app-avatar [name]="post()!.authorName" size="md"></app-avatar>
                <div>
                  <p class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ post()!.authorName }}</p>
                  <p class="text-xs text-surface-500">{{ post()!.authorTitle }} · {{ post()!.authorExperience }}</p>
                </div>
                <span class="ml-auto text-xs text-surface-500">{{ post()!.postedDate }}</span>
              </div>

              <h1 class="text-xl font-bold text-surface-900 dark:text-surface-100">{{ post()!.title }}</h1>
              <p class="mt-3 text-sm text-surface-700 dark:text-surface-300 leading-relaxed">{{ post()!.contentPreview }}</p>

              <div class="mt-4 flex flex-wrap gap-1.5">
                @for (tag of post()!.tags; track tag) {
                  <span class="badge-neutral">{{ tag }}</span>
                }
              </div>

              <div class="mt-4 flex items-center gap-4 border-t border-surface-100 pt-4 dark:border-surface-800">
                <button class="flex items-center gap-1.5 text-xs font-medium text-surface-600 hover:text-brand-600 dark:text-surface-400">
                  <lucide-icon [img]="TrendingUp" class="h-4 w-4"></lucide-icon>
                  {{ post()!.upvotes }}
                </button>
                <span class="flex items-center gap-1.5 text-xs text-surface-500">
                  <lucide-icon [img]="MessageCircle" class="h-4 w-4"></lucide-icon>
                  {{ post()!.comments }} comments
                </span>
                <span class="flex items-center gap-1.5 text-xs text-surface-500">
                  <lucide-icon [img]="Eye" class="h-4 w-4"></lucide-icon>
                  {{ post()!.views }} views
                </span>
                <button class="ml-auto btn-ghost !p-1.5">
                  <lucide-icon [img]="Bookmark" class="h-4 w-4"></lucide-icon>
                </button>
              </div>
            </div>

            <!-- Answers -->
            <div class="mb-4">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">{{ answers.length }} Answers</h3>
              <div class="space-y-3">
                @for (answer of answers; track answer.id) {
                  <div class="card p-4" [class]="answer.accepted ? 'border-success-200 dark:border-success-800' : ''">
                    @if (answer.accepted) {
                      <div class="mb-2 flex items-center gap-1.5 text-xs font-medium text-success-600 dark:text-success-400">
                        <lucide-icon [img]="CheckCircle2" class="h-3.5 w-3.5"></lucide-icon>
                        Accepted Answer
                      </div>
                    }
                    <div class="flex items-center gap-2 mb-2">
                      <app-avatar [name]="answer.author" size="sm"></app-avatar>
                      <div>
                        <p class="text-xs font-semibold text-surface-900 dark:text-surface-100">{{ answer.author }}</p>
                        <p class="text-[10px] text-surface-500">{{ answer.role }}</p>
                      </div>
                    </div>
                    <p class="text-sm text-surface-700 dark:text-surface-300">{{ answer.content }}</p>
                    <div class="mt-3 flex items-center gap-3 text-xs text-surface-500">
                      <button class="flex items-center gap-1 hover:text-brand-600"><lucide-icon [img]="ThumbsUp" class="h-3.5 w-3.5"></lucide-icon>{{ answer.upvotes }}</button>
                      <button class="hover:text-surface-700 dark:hover:text-surface-300">Reply</button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Your Answer -->
            <div class="card p-4">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Your Answer</h3>
              <textarea class="input-field min-h-[120px] resize-y text-sm" placeholder="Write your answer..."></textarea>
              <button class="btn-primary mt-3 !text-xs">Post Answer</button>
            </div>
          </div>

          <!-- Related -->
          <div class="space-y-4">
            <div class="card p-4">
              <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Related Questions</h3>
              <div class="space-y-2">
                @for (rel of related; track rel) {
                  <a href="#" class="block rounded-lg p-2 hover:bg-surface-50 dark:hover:bg-surface-800/50">
                    <p class="text-xs font-medium text-surface-700 dark:text-surface-300">{{ rel }}</p>
                    <p class="text-[10px] text-surface-500 mt-0.5">3 answers</p>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class CommunityDetailComponent implements OnInit {
  TrendingUp = TrendingUp;
  Eye = Eye;
  CheckCircle2 = CheckCircle2;
  MessageCircle = MessageCircle;
  Bookmark = Bookmark;
  ArrowLeft = ArrowLeft;
  ThumbsUp = ThumbsUp;

  private route = inject(ActivatedRoute);
  private communityService = inject(CommunityService);

  post = signal<CommunityPost | undefined>(undefined);

  answers = [
    { id: "a1", author: "Vikram Singh", role: "Tech Lead · 6 years", content: "I use the STAR method: Situation, Task, Action, Result. Start with the business problem, explain your specific role, detail the technical decisions you made with trade-offs, and end with measurable outcomes. Keep it to 2-3 minutes.", upvotes: 45, accepted: true },
    { id: "a2", author: "Sneha Reddy", role: ".NET Developer · 4 years", content: "I always start with the problem statement, then explain why we chose certain technologies, and finally share the impact. The key is to be specific about YOUR contribution vs the team's.", upvotes: 23, accepted: false },
    { id: "a3", author: "Arun Kumar", role: "Senior Developer · 7 years", content: "Practice explaining it in under 2 minutes first. Then be ready for follow-up questions. Interviewers care more about your decision-making process than the final result.", upvotes: 18, accepted: false },
  ];

  related = [
    "How to handle when you don't know the answer in an interview?",
    "Best way to explain microservices project?",
    "How to discuss salary expectations?",
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.communityService.getPostById(id).subscribe((p) => this.post.set(p));
  }
}
