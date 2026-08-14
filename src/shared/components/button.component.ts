import { Component, Input } from "@angular/core";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "app-button",
  standalone: true,
  template: `
    <button
      [class]="variantClass + ' ' + sizeClass"
      [disabled]="disabled"
      [type]="type"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() size: ButtonSize = "md";
  @Input() disabled = false;
  @Input() type: "button" | "submit" = "button";

  get variantClass(): string {
    const variants: Record<ButtonVariant, string> = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      outline: "btn-outline",
    };
    return variants[this.variant];
  }

  get sizeClass(): string {
    const sizes: Record<ButtonSize, string> = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    };
    return sizes[this.size];
  }
}
