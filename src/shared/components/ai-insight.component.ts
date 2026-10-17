import { Component, Input } from "@angular/core";
import {LucideAngularModule,  Sparkles, Brain, TrendingUp, Target} from "lucide-angular";

@Component({
  selector: "app-ai-insight",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="ai-glow rounded-xl border border-brand-200/50 bg-gradient-to-br from-brand-50/80 to-accent-50/80 p-4 dark:border-brand-800/50 dark:from-brand-950/40 dark:to-accent-950/40">
      <div class="relative flex gap-3">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white">
          <lucide-icon [img]="iconComponent" class="h-4.5 w-4.5"></lucide-icon>
        </div>
        <div class="flex-1">
          <div class="mb-1 flex items-center gap-2">
            <span class="text-xs font-semibold text-brand-700 dark:text-brand-300">{{ label }}</span>
          </div>
          <p class="text-sm text-surface-700 dark:text-surface-300">{{ insight }}</p>
        </div>
      </div>
    </div>
  `,
})
export class AiInsightComponent {
  @Input() label = "AI Insight";
  @Input() insight = "";
  @Input() icon: "sparkles" | "brain" | "trending" | "target" = "sparkles";

  get iconComponent() {
    const icons = { sparkles: Sparkles, brain: Brain, trending: TrendingUp, target: Target };
    return icons[this.icon];
  }
}
