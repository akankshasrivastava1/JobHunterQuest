import { Injectable, signal } from "@angular/core";
import { ToastNotification } from "../models";

@Injectable({ providedIn: "root" })
export class ToastService {
  private readonly _toasts = signal<ToastNotification[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: ToastNotification["type"] = "info") {
    const id = `toast-${Date.now()}-${Math.random()}`;
    this._toasts.update((t) => [...t, { id, type, message }]);
    setTimeout(() => this.dismiss(id), 4000);
  }

  success(message: string) {
    this.show(message, "success");
  }

  error(message: string) {
    this.show(message, "error");
  }

  warning(message: string) {
    this.show(message, "warning");
  }

  info(message: string) {
    this.show(message, "info");
  }

  dismiss(id: string) {
    this._toasts.update((t) => t.filter((toast) => toast.id !== id));
  }
}
