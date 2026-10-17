import { Component, signal, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {LucideAngularModule, 
  Users, TrendingUp, Clock, MessageCircle, Eye, Bookmark,
  Plus, ArrowRight, Search, Flame, FileText, HelpCircle, BookOpen} from "lucide-angular";
import { CommunityService } from "../../core/services/mock-services";
import { CommunityPost } from "../../core/models";
import { PageHeaderComponent } from "../../shared/components/page-header.component";
import { AvatarComponent } from "../../shared/components/avatar.component";
import { BadgeComponent } from "../../shared/components/badge.component";

@Component({
  selector: "app-community",
  standalone: true,
  imports: [LucideAngularModule, RouterLink, PageHeaderComponent, AvatarComponent, BadgeComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Community" subtitle="Learn from fellow developers. Share experiences. Grow together.">
        <div header-actions>
          <button class="btn-primary !text-xs">
            <lucide-icon [img]="Plus" class="h-3.5 w-3.5"></lucide-icon>Ask Question
          </button>
        </div>
      </app-page-header>

      <!-- Tabs -->
      <div class="mb-6 flex gap-1 border-b border-surface-200 dark:border-surface-800">
        @for (tab of tabs; track tab) {
          <button class="relative border-b-2 px-4 py-2.5 text-xs font-medium transition-colors"
            [class]="activeTab() === tab ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'"
            (click)="activeTab.set(tab)">{{ tab }}</button>
        }
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Posts -->
        <div class="space-y-3 lg:col-span-2">
          @for (post of filteredPosts(); track post.id) {
            <a [routerLink]="['/community', post.id]" class="block">
              <div class="card-hover p-4">
                <div class="flex items-start gap-3">
                  <app-avatar [name]="post.authorName" size="sm"></app-avatar>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-surface-900 dark:text-surface-100">{{ post.authorName }}</span>
                      <span class="text-[10px] text-surface-500">{{ post.authorExperience }}</span>
                      <span class="text-[10px] text-surface-400">·</span>
                      <span class="text-[10px] text-surface-500">{{ post.postedDate }}</span>
                    </div>
                    <p class="mt-0.5 text-[10px] text-surface-500">{{ post.authorTitle }}</p>
                    <h3 class="mt-2 text-sm font-semibold text-surface-900 dark:text-surface-100">{{ post.title }}</h3>
                    <p class="mt-1 text-xs text-surface-600 dark:text-surface-400 line-clamp-2">{{ post.contentPreview }}</p>
                    <div class="mt-2 flex flex-wrap gap-1">
                      @for (tag of post.tags; track tag) {
                        <span class="badge-neutral">{{ tag }}</span>
                      }
                    </div>
                    <div class="mt-3 flex items-center gap-4 text-[11px] text-surface-500 dark:text-surface-400">
                      <span class="flex items-center gap-1"><lucide-icon [img]="TrendingUp" class="h-3 w-3"></lucide-icon>{{ post.upvotes }}</span>
                      <span class="flex items-center gap-1"><lucide-icon [img]="MessageCircle" class="h-3 w-3"></lucide-icon>{{ post.comments }}</span>
                      <span class="flex items-center gap-1"><lucide-icon [img]="Eye" class="h-3 w-3"></lucide-icon>{{ post.views }}</span>
                      @if (post.hasAcceptedAnswer) {
                        <span class="badge-success">Answered</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </a>
          }
        </div>

        <!-- Sidebar -->
        <div class="space-y-4">
          <div class="card p-4">
            <div class="flex items-center gap-2 mb-3">
              <lucide-icon [img]="Flame" class="h-4 w-4 text-warning-500"></lucide-icon>
              <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100">Trending Topics</h3>
            </div>
            <div class="space-y-2">
              @for (topic of trendingTopics; track topic) {
                <div class="flex items-center justify-between text-xs">
                  <span class="text-surface-700 dark:text-surface-300">{{ topic.name }}</span>
                  <span class="text-surface-400">{{ topic.posts }}</span>
                </div>
              }
            </div>
          </div>

          <div class="card p-4">
            <h3 class="mb-3 text-sm font-semibold text-surface-900 dark:text-surface-100">Community Guidelines</h3>
            <ul class="space-y-1.5 text-xs text-surface-600 dark:text-surface-400">
              <li>Be respectful and helpful</li>
              <li>Share real experiences</li>
              <li>Use descriptive titles</li>
              <li>Tag appropriately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CommunityComponent implements OnInit {
  Eye = Eye;
  MessageCircle = MessageCircle;
  Plus = Plus;
  Flame = Flame;
  TrendingUp = TrendingUp;

  private communityService = inject(CommunityService);

  posts = signal<CommunityPost[]>([]);
  activeTab = signal("Latest");

  tabs = ["Latest", "Trending", "Interview Experiences", "Questions", "Resources"];

  trendingTopics = [
    { name: "System Design", posts: "342 posts" },
    { name: "Interview Experience", posts: "218 posts" },
    { name: "Salary Discussion", posts: "156 posts" },
    { name: "Career Transition", posts: "98 posts" },
  ];

  ngOnInit() {
    this.communityService.getPosts().subscribe((p) => this.posts.set(p));
  }

  filteredPosts() {
    const tab = this.activeTab();
    if (tab === "Latest") return this.posts();
    if (tab === "Trending") return [...this.posts()].sort((a, b) => b.upvotes - a.upvotes);
    if (tab === "Interview Experiences") return this.posts().filter((p) => p.type === "experience");
    if (tab === "Questions") return this.posts().filter((p) => p.type === "question");
    if (tab === "Resources") return this.posts().filter((p) => p.type === "resource");
    return this.posts();
  }
}
