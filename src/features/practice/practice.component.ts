import { Component, signal } from "@angular/core";
import {LucideAngularModule, 
  Code2, Database, Bug, Globe, Play, RotateCcw, CheckCircle2,
  XCircle, Terminal, FileCode} from "lucide-angular";
import { PageHeaderComponent } from "../../shared/components/page-header.component";

@Component({
  selector: "app-practice",
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent],
  template: `
    <div class="animate-fade-in">
      <app-page-header title="Practice" subtitle="Sharpen your coding, SQL, debugging, and API skills."></app-page-header>

      <!-- Tabs -->
      <div class="mb-6 flex gap-1 rounded-lg border border-surface-200 p-1 dark:border-surface-700">
        @for (tab of tabs; track tab.name) {
          <button class="flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors"
            [class]="activeTab() === tab.name ? 'bg-brand-600 text-white' : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'"
            (click)="activeTab.set(tab.name)">
            <lucide-icon [img]="tab.icon" class="h-3.5 w-3.5"></lucide-icon>
            <span class="hidden sm:inline">{{ tab.name }}</span>
          </button>
        }
      </div>

      <!-- Language Selector -->
      <div class="mb-4 flex items-center gap-2">
        <span class="text-xs text-surface-500">Language:</span>
        <div class="flex gap-1">
          @for (lang of languages; track lang) {
            <button class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
              [class]="selectedLang() === lang ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300' : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800'"
              (click)="selectedLang.set(lang)">{{ lang }}</button>
          }
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <!-- Editor -->
        <div class="lg:col-span-2">
          <div class="card overflow-hidden">
            <div class="flex items-center justify-between border-b border-surface-200 bg-surface-50 px-4 py-2.5 dark:border-surface-700 dark:bg-surface-800/50">
              <div class="flex items-center gap-2">
                <lucide-icon [img]="FileCode" class="h-4 w-4 text-brand-500"></lucide-icon>
                <span class="text-xs font-semibold text-surface-700 dark:text-surface-300">{{ activeTab() === 'SQL' ? 'query.sql' : 'solution.' + fileExt() }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="h-2.5 w-2.5 rounded-full bg-error-400"></div>
                <div class="h-2.5 w-2.5 rounded-full bg-warning-400"></div>
                <div class="h-2.5 w-2.5 rounded-full bg-success-400"></div>
              </div>
            </div>
            <div class="relative">
              <pre class="bg-surface-950 p-4 text-xs font-mono text-surface-300 overflow-x-auto min-h-[300px]"><code>{{ codeTemplate() }}</code></pre>
            </div>
            <div class="flex items-center justify-between border-t border-surface-200 p-3 dark:border-surface-700">
              <span class="text-xs text-surface-500">Mock editor — syntax highlighting only</span>
              <div class="flex gap-2">
                <button class="btn-ghost !text-xs"><lucide-icon [img]="RotateCcw" class="h-3.5 w-3.5"></lucide-icon>Reset</button>
                <button class="btn-primary !text-xs" (click)="runCode()">
                  <lucide-icon [img]="Play" class="h-3.5 w-3.5"></lucide-icon>Run
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="space-y-4">
          @if (activeTab() === 'SQL') {
            <div class="card p-4">
              <h3 class="mb-2 text-xs font-semibold text-surface-900 dark:text-surface-100">Database Schema</h3>
              <pre class="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-3 text-[10px] font-mono text-surface-600 dark:text-surface-400 overflow-x-auto">{{ schemaText }}</pre>
            </div>
          }

          <!-- Output -->
          <div class="card p-4">
            <div class="mb-2 flex items-center gap-2">
              <lucide-icon [img]="Terminal" class="h-4 w-4 text-surface-500"></lucide-icon>
              <h3 class="text-xs font-semibold text-surface-900 dark:text-surface-100">Output</h3>
            </div>
            @if (hasRun()) {
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-xs">
                  <lucide-icon [img]="CheckCircle2" class="h-4 w-4 text-success-500"></lucide-icon>
                  <span class="text-success-700 dark:text-success-300">All tests passed (3/3)</span>
                </div>
                <pre class="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-3 text-[10px] font-mono text-surface-600 dark:text-surface-400">{{ outputText }}</pre>
              </div>
            } @else {
              <p class="text-xs text-surface-400">Click "Run" to see output</p>
            }
          </div>

          <!-- Test Results -->
          @if (hasRun()) {
            <div class="card p-4">
              <h3 class="mb-2 text-xs font-semibold text-surface-900 dark:text-surface-100">Test Results</h3>
              <div class="space-y-1.5">
                @for (test of testResults; track test.name) {
                  <div class="flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1.5 text-surface-700 dark:text-surface-300">
                      <lucide-icon [img]="CheckCircle2" class="h-3.5 w-3.5 text-success-500"></lucide-icon>
                      {{ test.name }}
                    </span>
                    <span class="text-surface-500">{{ test.time }}</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PracticeComponent {
  RotateCcw = RotateCcw;
  Terminal = Terminal;
  FileCode = FileCode;
  CheckCircle2 = CheckCircle2;
  Play = Play;

  activeTab = signal("Coding");
  selectedLang = signal("C#");
  hasRun = signal(false);

  tabs = [
    { name: "Coding", icon: Code2 },
    { name: "SQL", icon: Database },
    { name: "Debugging", icon: Bug },
    { name: "API Practice", icon: Globe },
  ];

  languages = ["C#", "JavaScript", "TypeScript", "SQL"];

  schemaText = `Employees
  id INT PK
  name VARCHAR
  department VARCHAR
  salary DECIMAL
  hire_date DATE

Departments
  id INT PK
  name VARCHAR
  budget DECIMAL`;

  outputText = `| name    | department | salary  |
|---------|-----------|---------|
| Alice   | Engineering| 95000  |
| Bob     | Marketing  | 72000  |
| Charlie | Engineering| 88000  |

3 rows returned in 0.02s`;

  testResults = [
    { name: "Test 1: Basic query", time: "0.01s" },
    { name: "Test 2: Multiple departments", time: "0.02s" },
    { name: "Test 3: Edge case - empty dept", time: "0.01s" },
  ];

  codeTemplate(): string {
    if (this.activeTab() === "SQL") {
      return `-- Find the second highest salary in each department
SELECT Department, EmployeeName, Salary
FROM (
    SELECT 
        Department,
        EmployeeName,
        Salary,
        DENSE_RANK() OVER (
            PARTITION BY Department 
            ORDER BY Salary DESC
        ) as rnk
    FROM Employees
) ranked
WHERE rnk = 2;`;
    }
    if (this.selectedLang() === "C#") {
      return `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var map = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
            if (map.ContainsKey(complement)) {
                return new[] { map[complement], i };
            }
            map[nums[i]] = i;
        }
        return Array.Empty<int>();
    }
}`;
    }
    return `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`;
  }

  fileExt(): string {
    const exts: Record<string, string> = { "C#": "cs", JavaScript: "js", TypeScript: "ts", SQL: "sql" };
    return exts[this.selectedLang()] || "txt";
  }

  runCode() {
    this.hasRun.set(true);
  }
}
