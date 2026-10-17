import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div [class]="hover ? 'card-hover' : 'card'" [class.p-6]="padding">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() hover = false;
  @Input() padding = true;
}
