import { Component, Input } from "@angular/core";

export type BadgeVariant = "brand" | "success" | "warning" | "error" | "neutral";

@Component({
  selector: "app-badge",
  standalone: true,
  template: `<span [class]="variantClass"><ng-content></ng-content></span>`,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = "neutral";

  get variantClass(): string {
    const variants: Record<BadgeVariant, string> = {
      brand: "badge-brand",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
      neutral: "badge-neutral",
    };
    return variants[this.variant];
  }
}
