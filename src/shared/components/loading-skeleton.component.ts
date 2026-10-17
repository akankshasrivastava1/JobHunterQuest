import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loading-skeleton",
  standalone: true,
  template: `
    <div class="space-y-3">
      @for (i of items; track i) {
        <div class="skeleton h-4 w-full"></div>
      }
    </div>
  `,
})
export class LoadingSkeletonComponent {
  @Input() lines = 3;
  items: number[] = [];

  ngOnInit() {
    this.items = Array.from({ length: this.lines }, (_, i) => i);
  }
}
