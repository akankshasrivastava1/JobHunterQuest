import { Injectable, signal, effect } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly _isDark = signal<boolean>(false);
  readonly isDark = this._isDark.asReadonly();

  constructor() {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this._isDark.set(saved ? saved === "dark" : prefersDark);

    effect(() => {
      const isDark = this._isDark();
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  toggle() {
    this._isDark.update((v) => !v);
  }
}
