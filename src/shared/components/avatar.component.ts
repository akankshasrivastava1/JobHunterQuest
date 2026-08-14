import { Component, Input } from "@angular/core";

@Component({
  selector: "app-avatar",
  standalone: true,
  template: `
    <div
      class="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500 font-semibold text-white"
      [class]="sizeClass"
    >
      {{ initials }}
    </div>
  `,
})
export class AvatarComponent {
  @Input() name = "";
  @Input() size: "xs" | "sm" | "md" | "lg" = "md";

  get initials(): string {
    return this.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  get sizeClass(): string {
    const sizes: Record<string, string> = {
      xs: "h-6 w-6 text-[10px]",
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-14 w-14 text-lg",
    };
    return sizes[this.size];
  }
}
