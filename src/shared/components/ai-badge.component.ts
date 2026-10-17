import { Component, Input } from "@angular/core";
import {LucideAngularModule,  Sparkles} from "lucide-angular";

@Component({
  selector: "app-ai-badge",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <span class="ai-badge">
      <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
      {{ label }}
    </span>
  `,
})
export class AiBadgeComponent {
  Sparkles = Sparkles;

  @Input() label = "AI Powered";
}
