import { Injectable } from "@angular/core";
import { InterviewQuestion } from "../models";
import { Observable, of, delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class InterviewService {
  private mockQuestions: InterviewQuestion[] = [
    {
      id: "q1",
      question: "Your ASP.NET Core API suddenly starts returning 500 errors in production. How would you investigate it?",
      experienceLevel: "4-5 Years",
      experienceYears: "4-5",
      type: "Production Scenario",
      difficulty: "hard",
      technology: "ASP.NET Core",
      whyAsked: "This tests your real-world debugging skills and production incident response approach. The interviewer wants to see systematic problem-solving under pressure.",
      expectedAnswer: "Start by checking application logs and error tracking (e.g., Application Insights, Serilog). Look for the error pattern and time of onset. Check if a recent deployment caused the issue. Review server resources (CPU, memory, disk). Check database connectivity. Use structured logging to trace the request pipeline. Check if it's environment-specific (config, secrets). Implement circuit breakers if it's a downstream service issue.",
      realWorldExplanation: "In production, 500 errors can stem from many causes: unhandled exceptions, middleware failures, database connection exhaustion, memory leaks, or configuration issues. The key is to have proper observability (logs, metrics, traces) and follow a systematic approach rather than guessing.",
      codeExample: `// Enable detailed errors in development
if (env.IsDevelopment()) {
    app.UseDeveloperExceptionPage();
}
// Use structured logging
try {
    await _service.ProcessAsync(request);
} catch (Exception ex) {
    _logger.LogError(ex, "Failed to process request {RequestId}", request.Id);
    throw;
}`,
      commonMistakes: [
        "Jumping to conclusions without checking logs first",
        "Not checking if a recent deployment caused the issue",
        "Ignoring server resource metrics (CPU, memory, disk)",
        "Not having proper logging and monitoring in place",
        "Trying to fix the issue without understanding the root cause",
      ],
      followUpQuestions: [
        "How would you prevent this from happening again?",
        "What monitoring tools would you set up for early detection?",
        "How would you handle a database connection pool exhaustion scenario?",
      ],
      seniorDiscussion: "At a senior level, the interviewer expects you to discuss proactive monitoring, circuit breaker patterns (Polly), health checks, and graceful degradation. They want to see that you think about prevention, not just reaction. Discuss setting up alerts, runbooks, and post-mortem processes.",
      howToAnswer: "Structure your answer as a step-by-step investigation process. Start with immediate triage (is it affecting all users?), then move to diagnosis (logs, metrics, traces), then root cause analysis, and finally remediation and prevention. Mention specific tools you've used.",
      tags: ["production", "debugging", "asp.net-core", "error-handling"],
    },
    {
      id: "q2",
      question: "Explain how Dependency Injection works in ASP.NET Core and how you would register a service that needs to be created per HTTP request.",
      experienceLevel: "3-5 Years",
      experienceYears: "3-5",
      type: "Conceptual",
      difficulty: "medium",
      technology: "ASP.NET Core",
      whyAsked: "This is a fundamental concept in ASP.NET Core. The interviewer wants to verify you understand the DI container, service lifetimes, and common pitfalls like captive dependencies.",
      expectedAnswer: "ASP.NET Core has a built-in DI container. Services are registered in Program.cs with different lifetimes: Transient (created every time), Scoped (created once per HTTP request), and Singleton (created once for the application lifetime). For per-request services, use Scoped. Register with builder.Services.AddScoped<IMyService, MyService>(). The DI container resolves dependencies through constructor injection.",
      realWorldExplanation: "Scoped services are perfect for things like Entity Framework DbContext (each request gets its own context), Unit of Work, or request-specific data. The danger is 'captive dependencies' — injecting a Scoped service into a Singleton, which captures it for the app's lifetime.",
      codeExample: `// Program.cs
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddSingleton<ICacheService, CacheService>();

// Controller
public class OrdersController : ControllerBase {
    private readonly IUnitOfWork _uow;
    public OrdersController(IUnitOfWork uow) {
        _uow = uow;
    }
}`,
      commonMistakes: [
        "Injecting a Scoped service into a Singleton (captive dependency)",
        "Using Transient for services that hold state across a request",
        "Not disposing IDisposable services properly",
        "Registering everything as Singleton for 'performance'",
      ],
      followUpQuestions: [
        "What happens if you inject a Scoped service into a Singleton?",
        "How would you implement a custom DI lifetime?",
        "What is the difference between AddTransient and AddScoped in a background service?",
      ],
      seniorDiscussion: "Seniors should discuss advanced scenarios: keyed services in .NET 8, Scrutor for assembly scanning, factory-based registration, conditional registration, and how DI relates to testing (mocking, integration tests). Also discuss when to use third-party containers like Autofac.",
      howToAnswer: "Explain the three lifetimes clearly with examples. Mention the built-in container. Discuss captive dependencies as a gotcha. Show you understand the trade-offs of each lifetime.",
      tags: ["dependency-injection", "asp.net-core", "fundamentals"],
    },
    {
      id: "q3",
      question: "Write a SQL query to find the second highest salary in each department.",
      experienceLevel: "2-4 Years",
      experienceYears: "2-4",
      type: "Coding",
      difficulty: "medium",
      technology: "SQL",
      whyAsked: "This tests your SQL window function knowledge and ability to work with ranked data, which is essential for reporting and analytics.",
      expectedAnswer: "Use the DENSE_RANK() window function to rank salaries within each department, then filter for rank 2.",
      realWorldExplanation: "Window functions are powerful for analytics. DENSE_RANK handles ties gracefully — if two people share the highest salary, the next highest gets rank 2 (not 3). This is a common reporting need.",
      codeExample: `SELECT Department, EmployeeName, Salary
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
WHERE rnk = 2;`,
      commonMistakes: [
        "Using RANK() instead of DENSE_RANK() which skips ranks on ties",
        "Using MAX(Salary) with a subquery that doesn't handle ties",
        "Not using PARTITION BY for per-department ranking",
        "Forgetting to wrap the window function in a subquery before filtering",
      ],
      followUpQuestions: [
        "What's the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?",
        "How would you handle departments with only one employee?",
        "Can you do this without window functions?",
      ],
      seniorDiscussion: "At senior level, discuss performance implications of window functions vs correlated subqueries, indexing strategies for these queries, and when to use CTEs for readability.",
      howToAnswer: "Start with the window function approach as it's the cleanest. Explain DENSE_RANK vs RANK. Show the subquery wrapper pattern since you can't filter window functions directly in WHERE.",
      tags: ["sql", "window-functions", "coding"],
    },
    {
      id: "q4",
      question: "How would you design a rate limiting solution for a public API?",
      experienceLevel: "5-7 Years",
      experienceYears: "5-7",
      type: "System Design",
      difficulty: "hard",
      technology: "ASP.NET Core",
      whyAsked: "This evaluates your understanding of API protection, distributed systems, and performance trade-offs. Rate limiting is critical for public APIs.",
      expectedAnswer: "Discuss different rate limiting algorithms: Fixed Window, Sliding Window, Token Bucket, Leaky Bucket. For a distributed system, use Redis as the backing store. In ASP.NET Core 8, use the built-in RateLimiting middleware with custom policies. Consider per-user, per-IP, and global limits. Return 429 with Retry-After header.",
      realWorldExplanation: "Rate limiting protects your API from abuse, ensures fair usage, and prevents cascading failures. The built-in .NET 8 rate limiter supports fixed window, sliding window, token bucket, and concurrency limits.",
      codeExample: `// Program.cs - .NET 8 built-in rate limiter
builder.Services.AddRateLimiter(options => {
    options.AddFixedWindowLimiter("api", opt => {
        opt.PermitLimit = 100;
        opt.Window = TimeSpan.FromMinutes(1);
    });
    options.OnRejected = (ctx, ct) => {
        ctx.HttpContext.Response.StatusCode = 429;
        return new ValueTask();
    };
});
app.UseRateLimiter();`,
      commonMistakes: [
        "Not considering distributed scenarios (multiple server instances)",
        "Using in-memory rate limiting for multi-instance deployments",
        "Not returning proper 429 status with Retry-After header",
        "Not differentiating rate limits by user tier or API key",
      ],
      followUpQuestions: [
        "How would you handle rate limiting in a microservices architecture?",
        "What's the difference between token bucket and sliding window?",
        "How would you implement tiered rate limits for free vs paid users?",
      ],
      seniorDiscussion: "Discuss distributed rate limiting with Redis, global vs per-region limits, adaptive rate limiting based on server load, and integration with API gateways. Mention the importance of observability — tracking rate limit hits, adjusting limits based on usage patterns.",
      howToAnswer: "Start by asking clarifying questions (single server vs distributed? per-user or per-IP?). Explain the algorithms with trade-offs. Show the .NET 8 built-in solution. Discuss Redis for distributed scenarios. Mention 429 responses and headers.",
      tags: ["rate-limiting", "system-design", "api", "performance"],
    },
    {
      id: "q5",
      question: "Tell me about a challenging project you worked on. What was your role and how did you overcome the challenges?",
      experienceLevel: "3-5 Years",
      experienceYears: "3-5",
      type: "Project",
      difficulty: "medium",
      technology: "General",
      whyAsked: "This evaluates your ability to articulate technical work, take ownership, and demonstrate problem-solving in real projects. The STAR method is ideal here.",
      expectedAnswer: "Use the STAR method: Situation, Task, Action, Result. Describe the project context, your specific responsibility, the actions you took, and measurable outcomes. Be specific about technical decisions and trade-offs.",
      realWorldExplanation: "Interviewers want to see that you can explain complex work clearly, that you took meaningful ownership, and that you can reflect on outcomes. They're also evaluating communication skills.",
      commonMistakes: [
        "Being too vague about your specific contributions",
        "Not mentioning measurable results or impact",
        "Focusing only on technical details without the business context",
        "Not discussing what you learned or would do differently",
        "Taking credit for team work without acknowledging others",
      ],
      followUpQuestions: [
        "What would you do differently if you started this project today?",
        "How did you handle disagreements within the team?",
        "What was the most important technical decision you made?",
      ],
      seniorDiscussion: "At senior level, the interviewer expects discussion of architecture decisions, trade-offs, team leadership, stakeholder communication, and how you balanced technical debt with delivery timelines.",
      howToAnswer: "Pick a project where you had real ownership. Structure with STAR. Spend 30% on situation/task, 50% on actions, 20% on results. Quantify impact. Be honest about challenges and what you learned.",
      tags: ["project", "behavioral", "experience"],
    },
    {
      id: "q6",
      question: "What's the difference between Task.Run and Task.Factory.StartNew in C#?",
      experienceLevel: "2-3 Years",
      experienceYears: "2-3",
      type: "Conceptual",
      difficulty: "easy",
      technology: "C#",
      whyAsked: "This tests your understanding of async/await and the TPL (Task Parallel Library) in C#. It's a common question for mid-level developers.",
      expectedAnswer: "Task.Run is a simplified wrapper around Task.Factory.StartNew with sensible defaults. Task.Run uses the default task scheduler and TaskCreationOptions.DenyChildAttach. Task.Factory.StartNew gives you more control over task creation options, scheduler, and state, but requires more parameters and can be error-prone.",
      realWorldExplanation: "In practice, Task.Run is what you want 90% of the time for offloading CPU-bound work to the thread pool. Task.Factory.StartNew is for advanced scenarios where you need custom scheduling or specific creation options.",
      codeExample: `// Simple - preferred for most cases
await Task.Run(() => DoWork());

// Advanced - when you need control
await Task.Factory.StartNew(
    () => DoWork(),
    CancellationToken.None,
    TaskCreationOptions.LongRunning,
    TaskScheduler.Default
);`,
      commonMistakes: [
        "Using Task.Factory.StartNew when Task.Run is sufficient",
        "Not understanding that Task.Run defaults to DenyChildAttach",
        "Using Task.Run for IO-bound work instead of async/await",
        "Creating nested tasks unintentionally with StartNew",
      ],
      followUpQuestions: [
        "When would you use TaskCreationOptions.LongRunning?",
        "What is the default TaskScheduler?",
        "How does async/await relate to Task.Run?",
      ],
      seniorDiscussion: "Discuss thread pool exhaustion risks, when to use LongRunning (creates a dedicated thread), the dangers of async-over-sync (using Task.Run to wrap sync IO calls), and best practices for async in ASP.NET Core (avoid Task.Run in controllers).",
      howToAnswer: "Explain that Task.Run is the simpler, safer choice. Mention the defaults it sets. Explain when you'd need the extra control of StartNew. Emphasize that for IO-bound work, async/await is preferred over both.",
      tags: ["c#", "async", "task-parallel-library"],
    },
    {
      id: "q7",
      question: "How does Angular change detection work, and when would you use OnPush strategy?",
      experienceLevel: "3-5 Years",
      experienceYears: "3-5",
      type: "Conceptual",
      difficulty: "medium",
      technology: "Angular",
      whyAsked: "This tests your understanding of Angular's reactivity model and performance optimization, which is important for building scalable Angular apps.",
      expectedAnswer: "Angular uses zone.js to detect changes (events, timers, HTTP). Default change detection checks all components on every change. OnPush strategy only checks a component when its inputs change, an event handler fires, or an Observable emits. With signals (Angular 16+), change detection can be more granular.",
      realWorldExplanation: "OnPush is essential for performance in large apps. Combined with immutable data patterns and signals, it dramatically reduces the number of change detection cycles. This is especially important for components with complex templates.",
      codeExample: `@Component({
  selector: 'app-list',
  template: \`...*\`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  items = signal<Item[]>([]);
  
  addItem(item: Item) {
    this.items.update(list => [...list, item]);
  }
}`,
      commonMistakes: [
        "Mutating array/object inputs instead of creating new references",
        "Not understanding that OnPush doesn't mean no change detection",
        "Using OnPush without properly handling async updates",
        "Not leveraging signals for fine-grained reactivity",
      ],
      followUpQuestions: [
        "How do signals change the change detection model?",
        "What happens when you mutate an input with OnPush?",
        "How would you debug change detection issues?",
      ],
      seniorDiscussion: "Discuss the signal-based reactivity model in modern Angular, zoneless Angular, the impact on SSR, and how to architect components for optimal change detection. Mention ChangeDetectorRef.markForCheck() and its role.",
      howToAnswer: "Explain the default zone-based detection first. Then explain OnPush and when it triggers. Give a practical example of when to use it. Mention signals as the modern approach to fine-grained reactivity.",
      tags: ["angular", "change-detection", "performance"],
    },
    {
      id: "q8",
      question: "Your team needs to migrate a monolithic .NET application to microservices. How would you approach this?",
      experienceLevel: "5-7 Years",
      experienceYears: "5-7",
      type: "Architecture",
      difficulty: "hard",
      technology: "Microservices",
      whyAsked: "This evaluates your architectural thinking, understanding of distributed systems, and ability to plan a migration strategy. It's a common senior-level question.",
      expectedAnswer: "Follow the strangler fig pattern: identify bounded contexts, extract services incrementally, use an API gateway, implement service discovery, handle data consistency with saga/outbox patterns, and maintain backward compatibility. Don't do a big-bang rewrite.",
      realWorldExplanation: "Microservice migrations fail when teams try to rewrite everything at once. The strangler fig pattern allows gradual extraction while keeping the monolith running. Each extracted service must handle its own database, and data consistency across services requires careful event-driven design.",
      commonMistakes: [
        "Doing a big-bang rewrite instead of incremental migration",
        "Creating distributed monoliths (services tightly coupled via shared databases)",
        "Not addressing distributed data consistency early",
        "Underestimating operational complexity (monitoring, debugging, deployment)",
        "Not establishing clear service boundaries before starting",
      ],
      followUpQuestions: [
        "How would you handle distributed transactions?",
        "What service discovery approach would you use?",
        "How would you manage schema migrations across services?",
        "When would you decide NOT to extract a service?",
      ],
      seniorDiscussion: "Discuss DDD for identifying bounded contexts, the outbox pattern for reliable event publishing, CQRS for read/write separation, and the importance of observability in distributed systems. Address when microservices are NOT the right choice.",
      howToAnswer: "Start with the strangler fig pattern. Explain bounded context identification. Discuss data consistency (saga, outbox). Mention API gateway and service mesh. Emphasize incremental migration and operational readiness. End with when NOT to use microservices.",
      tags: ["microservices", "architecture", "migration", "system-design"],
    },
  ];

  getQuestions(filters?: {
    technology?: string;
    type?: string;
    difficulty?: string;
    experience?: string;
  }): Observable<InterviewQuestion[]> {
    let result = [...this.mockQuestions];
    if (filters?.technology && filters.technology !== "all")
      result = result.filter((q) => q.technology === filters.technology);
    if (filters?.type && filters.type !== "all")
      result = result.filter((q) => q.type === filters.type);
    if (filters?.difficulty && filters.difficulty !== "all")
      result = result.filter((q) => q.difficulty === filters.difficulty);
    if (filters?.experience && filters.experience !== "all")
      result = result.filter((q) => q.experienceYears === filters.experience);
    return of(result).pipe(delay(300));
  }

  getQuestionById(id: string): Observable<InterviewQuestion | undefined> {
    return of(this.mockQuestions.find((q) => q.id === id)).pipe(delay(200));
  }
}
