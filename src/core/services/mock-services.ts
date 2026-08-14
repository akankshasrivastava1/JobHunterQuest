import { Injectable } from "@angular/core";
import { Resume, Application, Course, CommunityPost, MockInterview, LearningRoadmap, AdminMetrics } from "../models";
import { Observable, of, delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class ResumeService {
  private mockResumes: Resume[] = [
    {
      id: "r1",
      name: "Resume - .NET Developer",
      targetRole: "Senior .NET Developer",
      uploadedDate: "2024-01-15",
      atsScore: 82,
      skillsDetected: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "Azure", "Angular", "TypeScript", "Docker"],
      missingKeywords: ["Kubernetes", "Microservices", "System Design", "Redis", "gRPC", "Event-Driven Architecture"],
      keywordMatch: 78,
      experience: [
        { company: "TechCorp India", role: "Software Engineer", duration: "2021 - Present", description: "Building scalable web applications using ASP.NET Core and Angular." },
        { company: "StartUp Inc", role: "Junior Developer", duration: "2020 - 2021", description: "Developed REST APIs and worked on frontend features." },
      ],
      projects: [
        { name: "E-Commerce Platform", description: "Full-featured e-commerce platform with payment integration", technologies: ["ASP.NET Core", "Angular", "SQL Server"] },
        { name: "Task Management System", description: "Real-time task management with SignalR", technologies: ["ASP.NET Core", "SignalR", "Azure"] },
      ],
      education: [
        { degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2020" },
      ],
      formattingSuggestions: [
        "Add a professional summary at the top highlighting your target role",
        "Quantify your achievements with metrics (e.g., 'reduced API response time by 40%')",
        "Consider highlighting Kubernetes experience if you genuinely have worked with it",
        "Add links to your GitHub and LinkedIn profiles",
        "Use consistent date formatting throughout the resume",
      ],
      experienceAnalysis: "Your experience section is solid with relevant roles. Consider adding more quantified achievements to demonstrate impact. Your current role description could be more detailed with specific technologies and outcomes.",
      projectAnalysis: "Your projects are well-chosen and relevant. The e-commerce platform shows full-stack capability. Consider adding more details about your role, team size, and challenges overcome in each project.",
    },
    {
      id: "r2",
      name: "Resume - Full Stack Developer",
      targetRole: "Full Stack Developer",
      uploadedDate: "2024-02-01",
      atsScore: 75,
      skillsDetected: ["C#", "ASP.NET Core", "Angular", "TypeScript", "SQL Server", "HTML", "CSS"],
      missingKeywords: ["React", "Node.js", "GraphQL", "AWS", "CI/CD"],
      keywordMatch: 70,
      experience: [
        { company: "TechCorp India", role: "Software Engineer", duration: "2021 - Present", description: "Full stack development with .NET and Angular." },
      ],
      projects: [
        { name: "E-Commerce Platform", description: "Full-featured e-commerce platform", technologies: ["ASP.NET Core", "Angular", "SQL Server"] },
      ],
      education: [{ degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2020" }],
      formattingSuggestions: ["Highlight both frontend and backend skills equally", "Add frontend-specific project details"],
      experienceAnalysis: "Good full-stack experience. Consider highlighting frontend work more prominently.",
      projectAnalysis: "Projects demonstrate full-stack capability well.",
    },
    {
      id: "r3",
      name: "Resume - Azure Developer",
      targetRole: "Azure Cloud Developer",
      uploadedDate: "2024-02-10",
      atsScore: 68,
      skillsDetected: ["C#", "Azure", "ASP.NET Core", "Azure Functions"],
      missingKeywords: ["Terraform", "ARM Templates", "Azure DevOps", "Kubernetes", "Cosmos DB", "Event Grid"],
      keywordMatch: 65,
      experience: [
        { company: "TechCorp India", role: "Software Engineer", duration: "2021 - Present", description: "Cloud application development with Azure." },
      ],
      projects: [
        { name: "Cloud Migration Project", description: "Migrated on-premise app to Azure", technologies: ["Azure", "ASP.NET Core"] },
      ],
      education: [{ degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2020" }],
      formattingSuggestions: ["Add Azure certifications if you have them", "Highlight specific Azure services you've used"],
      experienceAnalysis: "Cloud experience is present but could be more detailed.",
      projectAnalysis: "Add more cloud-specific project details.",
    },
  ];

  getResumes(): Observable<Resume[]> {
    return of(this.mockResumes).pipe(delay(300));
  }

  getResumeById(id: string): Observable<Resume | undefined> {
    return of(this.mockResumes.find((r) => r.id === id)).pipe(delay(200));
  }
}

@Injectable({ providedIn: "root" })
export class ApplicationService {
  private mockApplications: Application[] = [
    { id: "a1", jobId: "j1", jobTitle: "Senior .NET Developer", companyName: "TechVerda Solutions", companyLogo: "", status: "technical", appliedDate: "2024-02-10", matchScore: 92, interviewDate: "2024-02-20", notes: "Technical round scheduled. Focus on microservices and system design.", location: "Bangalore", salary: "18-28 LPA" },
    { id: "a2", jobId: "j2", jobTitle: "Full Stack Developer", companyName: "CloudNative Labs", companyLogo: "", status: "screening", appliedDate: "2024-02-08", matchScore: 88, notes: "Initial screening call completed.", location: "Remote", salary: "15-24 LPA" },
    { id: "a3", jobId: "j3", jobTitle: "Azure Cloud Developer", companyName: "Skyline Technologies", companyLogo: "", status: "applied", appliedDate: "2024-02-12", matchScore: 85, notes: "Waiting for response.", location: "Pune", salary: "16-22 LPA" },
    { id: "a4", jobId: "j4", jobTitle: "Backend Developer", companyName: "DataFlow Systems", companyLogo: "", status: "saved", appliedDate: "", matchScore: 78, notes: "Good match, considering applying.", location: "Hyderabad", salary: "12-20 LPA" },
    { id: "a5", jobId: "j5", jobTitle: "Angular Developer", companyName: "PixelForge Studio", companyLogo: "", status: "hr", appliedDate: "2024-01-28", matchScore: 82, interviewDate: "2024-02-15", notes: "HR round scheduled for salary discussion.", location: "Remote", salary: "10-18 LPA" },
    { id: "a6", jobId: "j1", jobTitle: ".NET Developer", companyName: "NexusSoft", companyLogo: "", status: "offer", appliedDate: "2024-01-15", matchScore: 90, interviewDate: "2024-02-01", notes: "Received offer! 22 LPA. Reviewing.", location: "Bangalore", salary: "22 LPA" },
    { id: "a7", jobId: "j2", jobTitle: "Software Engineer", companyName: "ByteWave", companyLogo: "", status: "rejected", appliedDate: "2024-01-10", matchScore: 75, notes: "Rejected after technical round. Need to improve system design.", location: "Remote" },
    { id: "a8", jobId: "j3", jobTitle: "Backend Developer", companyName: "InfraTech", companyLogo: "", status: "managerial", appliedDate: "2024-02-05", matchScore: 86, interviewDate: "2024-02-18", notes: "Managerial round next week.", location: "Hyderabad", salary: "14-20 LPA" },
  ];

  getApplications(): Observable<Application[]> {
    return of(this.mockApplications).pipe(delay(300));
  }
}

@Injectable({ providedIn: "root" })
export class CourseService {
  private mockCourses: Course[] = [
    {
      id: "course1",
      name: "ASP.NET Core for Experienced Developers",
      category: "ASP.NET Core",
      level: "advanced",
      modules: [
        { id: "m1", name: "Web API Deep Dive", completed: true, duration: "45 min" },
        { id: "m2", name: "Middleware Pipeline", completed: true, duration: "30 min" },
        { id: "m3", name: "Dependency Injection Advanced", completed: true, duration: "40 min" },
        { id: "m4", name: "Authentication & JWT", completed: false, duration: "50 min" },
        { id: "m5", name: "Authorization Policies", completed: false, duration: "35 min" },
        { id: "m6", name: "Performance Optimization", completed: false, duration: "45 min" },
        { id: "m7", name: "Caching Strategies", completed: false, duration: "40 min" },
        { id: "m8", name: "Rate Limiting", completed: false, duration: "30 min" },
        { id: "m9", name: "API Versioning", completed: false, duration: "25 min" },
      ],
      progress: 33,
      estimatedTime: "6 hours",
      description: "Master advanced ASP.NET Core concepts for building production-grade web APIs and applications.",
      thumbnailGradient: "from-brand-500 to-accent-500",
    },
    {
      id: "course2",
      name: "Advanced SQL Server",
      category: "SQL Server",
      level: "advanced",
      modules: [
        { id: "m1", name: "Window Functions", completed: true, duration: "40 min" },
        { id: "m2", name: "Query Optimization", completed: false, duration: "50 min" },
        { id: "m3", name: "Indexing Strategies", completed: false, duration: "45 min" },
        { id: "m4", name: "Stored Procedures", completed: false, duration: "35 min" },
        { id: "m5", name: "Transaction Management", completed: false, duration: "40 min" },
      ],
      progress: 20,
      estimatedTime: "4 hours",
      description: "Deep dive into advanced SQL Server concepts for high-performance database operations.",
      thumbnailGradient: "from-success-500 to-accent-500",
    },
    {
      id: "course3",
      name: "Angular Masterclass",
      category: "Angular",
      level: "intermediate",
      modules: [
        { id: "m1", name: "Signals & Reactivity", completed: false, duration: "45 min" },
        { id: "m2", name: "Change Detection", completed: false, duration: "35 min" },
        { id: "m3", name: "Reactive Forms", completed: false, duration: "40 min" },
        { id: "m4", name: "Routing & Guards", completed: false, duration: "30 min" },
      ],
      progress: 0,
      estimatedTime: "5 hours",
      description: "Master modern Angular with signals, standalone components, and best practices.",
      thumbnailGradient: "from-error-500 to-warning-500",
    },
    {
      id: "course4",
      name: "Azure for Developers",
      category: "Azure",
      level: "intermediate",
      modules: [
        { id: "m1", name: "Azure App Service", completed: true, duration: "30 min" },
        { id: "m2", name: "Azure Functions", completed: false, duration: "40 min" },
        { id: "m3", name: "Cosmos DB", completed: false, duration: "45 min" },
        { id: "m4", name: "Azure Service Bus", completed: false, duration: "35 min" },
        { id: "m5", name: "Azure Key Vault", completed: false, duration: "25 min" },
      ],
      progress: 20,
      estimatedTime: "4 hours",
      description: "Learn to build and deploy cloud-native applications on Azure.",
      thumbnailGradient: "from-brand-400 to-brand-600",
    },
    {
      id: "course5",
      name: "Microservices Architecture",
      category: "Microservices",
      level: "advanced",
      modules: [
        { id: "m1", name: "Service Boundaries", completed: false, duration: "40 min" },
        { id: "m2", name: "API Gateway Pattern", completed: false, duration: "35 min" },
        { id: "m3", name: "Event-Driven Communication", completed: false, duration: "45 min" },
        { id: "m4", name: "Saga Pattern", completed: false, duration: "40 min" },
        { id: "m5", name: "Service Discovery", completed: false, duration: "30 min" },
      ],
      progress: 0,
      estimatedTime: "5 hours",
      description: "Understand microservices architecture patterns and when to apply them.",
      thumbnailGradient: "from-accent-500 to-brand-600",
    },
    {
      id: "course6",
      name: "Docker & Kubernetes Basics",
      category: "DevOps",
      level: "intermediate",
      modules: [
        { id: "m1", name: "Docker Fundamentals", completed: false, duration: "30 min" },
        { id: "m2", name: "Docker Compose", completed: false, duration: "25 min" },
        { id: "m3", name: "Kubernetes Concepts", completed: false, duration: "45 min" },
        { id: "m4", name: "Deploying to K8s", completed: false, duration: "40 min" },
      ],
      progress: 0,
      estimatedTime: "4 hours",
      description: "Get started with containerization and orchestration for modern applications.",
      thumbnailGradient: "from-surface-600 to-surface-800",
    },
  ];

  getCourses(): Observable<Course[]> {
    return of(this.mockCourses).pipe(delay(300));
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(this.mockCourses.find((c) => c.id === id)).pipe(delay(200));
  }
}

@Injectable({ providedIn: "root" })
export class CommunityService {
  private mockPosts: CommunityPost[] = [
    { id: "p1", authorName: "Rahul Verma", authorAvatar: "", authorExperience: "5 years", authorTitle: "Senior Developer", title: "My interview experience at Microsoft for SDE-2 role", contentPreview: "I recently went through the interview process at Microsoft for an SDE-2 position. Here's a detailed breakdown of all 5 rounds...", tags: ["interview-experience", "microsoft", "system-design"], upvotes: 234, comments: 45, views: 5600, postedDate: "2 days ago", type: "experience", hasAcceptedAnswer: false },
    { id: "p2", authorName: "Priya Patel", authorAvatar: "", authorExperience: "3 years", authorTitle: "Full Stack Developer", title: "How to explain a complex project in an interview?", contentPreview: "I always struggle with explaining my projects during interviews. What structure do you follow? Should I go technical first or start with the business problem?", tags: ["interview-prep", "projects", "career"], upvotes: 189, comments: 32, views: 3200, postedDate: "5 hours ago", type: "question", hasAcceptedAnswer: true },
    { id: "p3", authorName: "Arun Kumar", authorAvatar: "", authorExperience: "7 years", authorTitle: "Tech Lead", title: "System Design: Designing a URL Shortener like Bitly", contentPreview: "A comprehensive guide to designing a URL shortener service. We'll cover capacity estimation, API design, database schema, and scaling strategies...", tags: ["system-design", "architecture", "resources"], upvotes: 412, comments: 67, views: 12000, postedDate: "1 week ago", type: "resource", hasAcceptedAnswer: false },
    { id: "p4", authorName: "Sneha Reddy", authorAvatar: "", authorExperience: "4 years", authorTitle: ".NET Developer", title: "Best resources to learn Azure for .NET developers?", contentPreview: "I'm a .NET developer looking to get into Azure. What are the best learning resources, certifications, and projects to build?", tags: ["azure", "learning", "career"], upvotes: 156, comments: 28, views: 2800, postedDate: "1 day ago", type: "question", hasAcceptedAnswer: false },
    { id: "p5", authorName: "Vikram Singh", authorAvatar: "", authorExperience: "6 years", authorTitle: "Backend Engineer", title: "Microservices vs Monolith: When to choose what?", contentPreview: "There's a lot of hype around microservices, but when should you actually choose them over a monolith? Let me share my experience...", tags: ["architecture", "microservices", "discussion"], upvotes: 298, comments: 54, views: 6700, postedDate: "3 days ago", type: "post", hasAcceptedAnswer: false },
    { id: "p6", authorName: "Anjali Gupta", authorAvatar: "", authorExperience: "2 years", authorTitle: "Software Engineer", title: "My journey from 6 LPA to 24 LPA in 2 years", contentPreview: "I want to share my career journey and the steps I took to quadruple my salary in just 2 years. It involved a lot of learning, job hunting, and strategic moves...", tags: ["career", "salary", "job-search"], upvotes: 521, comments: 89, views: 15000, postedDate: "4 days ago", type: "post", hasAcceptedAnswer: false },
  ];

  getPosts(): Observable<CommunityPost[]> {
    return of(this.mockPosts).pipe(delay(300));
  }

  getPostById(id: string): Observable<CommunityPost | undefined> {
    return of(this.mockPosts.find((p) => p.id === id)).pipe(delay(200));
  }
}

@Injectable({ providedIn: "root" })
export class MockInterviewService {
  private mockSessions: MockInterview[] = [
    {
      id: "mi1",
      role: "Senior .NET Developer",
      technology: "ASP.NET Core",
      interviewType: "Technical",
      difficulty: "hard",
      totalQuestions: 10,
      completedDate: "2024-02-10",
      scores: { technical: 82, communication: 76, problemSolving: 88, projectUnderstanding: 80, overall: 82 },
      strengths: ["Strong understanding of dependency injection and middleware pipeline", "Clear explanation of async/await patterns", "Good practical knowledge of Entity Framework"],
      weakAreas: ["System design questions need more structured approach", "Could provide more specific examples from production experience"],
      missedPoints: ["Didn't mention circuit breaker pattern for resilience", "Missed discussing connection pooling for database performance"],
      betterAnswer: "For the rate limiting question, structure your answer by first clarifying requirements, then discussing algorithms (token bucket, sliding window), then implementation details, and finally monitoring and adjustment strategy.",
      recommendedTopics: ["System Design fundamentals", "Rate limiting and API protection", "Circuit breaker pattern with Polly", "Database connection pooling"],
      followUpQuestions: ["How would you handle distributed rate limiting across multiple instances?", "Explain the saga pattern for distributed transactions"],
    },
  ];

  getSessions(): Observable<MockInterview[]> {
    return of(this.mockSessions).pipe(delay(300));
  }

  getLatestSession(): Observable<MockInterview | undefined> {
    return of(this.mockSessions[0]).pipe(delay(200));
  }
}

@Injectable({ providedIn: "root" })
export class RoadmapService {
  private mockRoadmap: LearningRoadmap = {
    id: "rm1",
    title: "Your .NET Full Stack Roadmap",
    targetRole: "Senior .NET Developer",
    phases: [
      { id: "p1", name: "ASP.NET Core", order: 1, status: "completed", topics: ["Web API", "Middleware", "Dependency Injection", "Authentication"], progress: 100, estimatedTime: "2 weeks" },
      { id: "p2", name: "Advanced SQL", order: 2, status: "in-progress", topics: ["Window Functions", "Query Optimization", "Indexing", "Stored Procedures"], progress: 45, estimatedTime: "2 weeks" },
      { id: "p3", name: "Angular", order: 3, status: "in-progress", topics: ["Signals", "Change Detection", "Reactive Forms", "Routing"], progress: 20, estimatedTime: "3 weeks" },
      { id: "p4", name: "Azure", order: 4, status: "locked", topics: ["App Service", "Functions", "Cosmos DB", "Service Bus"], progress: 0, estimatedTime: "3 weeks" },
      { id: "p5", name: "Microservices", order: 5, status: "locked", topics: ["Service Boundaries", "API Gateway", "Event-Driven", "Saga Pattern"], progress: 0, estimatedTime: "4 weeks" },
      { id: "p6", name: "System Design", order: 6, status: "locked", topics: ["Scalability", "Load Balancing", "Caching", "CDN", "Database Sharding"], progress: 0, estimatedTime: "4 weeks" },
    ],
    aiRecommendation: "Based on your target Senior .NET Developer roles, focus on System Design and Azure next. 68% of matching job postings require System Design knowledge.",
  };

  getRoadmap(): Observable<LearningRoadmap> {
    return of(this.mockRoadmap).pipe(delay(300));
  }
}

@Injectable({ providedIn: "root" })
export class AdminService {
  private mockMetrics: AdminMetrics = {
    totalUsers: 12450,
    activeUsers: 8230,
    premiumUsers: 3120,
    jobsAnalyzed: 45600,
    mockInterviews: 12800,
    questionsPracticed: 89200,
    aiUsage: 234000,
  };

  getMetrics(): Observable<AdminMetrics> {
    return of(this.mockMetrics).pipe(delay(300));
  }
}
