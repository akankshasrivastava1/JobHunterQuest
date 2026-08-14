import { Injectable } from "@angular/core";
import { Job, JobMatch, SkillGap } from "../models";
import { Observable, of, delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class JobService {
  private mockJobs: Job[] = [
    {
      id: "j1",
      title: "Senior .NET Developer",
      companyId: "c1",
      companyName: "TechVerda Solutions",
      companyLogo: "",
      location: "Bangalore, India",
      workMode: "hybrid",
      experienceMin: 4,
      experienceMax: 7,
      salaryMin: 1800000,
      salaryMax: 2800000,
      salaryCurrency: "INR",
      jobType: "full-time",
      postedDate: "2 days ago",
      description: "We are looking for a Senior .NET Developer to join our backend team. You will be responsible for building scalable APIs, working with microservices architecture, and mentoring junior developers.",
      requiredSkills: ["C#", "ASP.NET Core", "SQL Server", "Azure", "Microservices"],
      preferredSkills: ["Docker", "Kubernetes", "Redis", "Event Driven Architecture"],
      responsibilities: [
        "Design and develop scalable REST APIs using ASP.NET Core",
        "Work with microservices architecture and event-driven systems",
        "Optimize SQL Server database queries and stored procedures",
        "Deploy and manage applications on Azure cloud",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with frontend teams and product managers",
      ],
      techStack: [".NET 8", "ASP.NET Core", "Entity Framework", "SQL Server", "Azure", "Docker"],
      domain: "FinTech",
      sourceUrl: "#",
    },
    {
      id: "j2",
      title: "Full Stack Developer",
      companyId: "c2",
      companyName: "CloudNative Labs",
      companyLogo: "",
      location: "Remote",
      workMode: "remote",
      experienceMin: 3,
      experienceMax: 6,
      salaryMin: 1500000,
      salaryMax: 2400000,
      salaryCurrency: "INR",
      jobType: "full-time",
      postedDate: "5 days ago",
      description: "Join our product team as a Full Stack Developer. You will work on building modern web applications using .NET backend and Angular frontend.",
      requiredSkills: ["C#", "ASP.NET Core", "Angular", "TypeScript", "SQL Server"],
      preferredSkills: ["Azure", "Docker", "NgRx", "Tailwind CSS"],
      responsibilities: [
        "Build full stack features end-to-end",
        "Develop Angular frontend components and services",
        "Create and maintain ASP.NET Core Web APIs",
        "Write unit and integration tests",
        "Participate in agile ceremonies",
      ],
      techStack: [".NET 8", "Angular 17", "TypeScript", "SQL Server", "Azure"],
      domain: "SaaS",
      sourceUrl: "#",
    },
    {
      id: "j3",
      title: "Azure Cloud Developer",
      companyId: "c3",
      companyName: "Skyline Technologies",
      companyLogo: "",
      location: "Pune, India",
      workMode: "hybrid",
      experienceMin: 3,
      experienceMax: 5,
      salaryMin: 1600000,
      salaryMax: 2200000,
      salaryCurrency: "INR",
      jobType: "full-time",
      postedDate: "1 day ago",
      description: "We need an Azure Cloud Developer to build and deploy cloud-native applications using Azure services and .NET.",
      requiredSkills: ["C#", "Azure", "ASP.NET Core", "Azure Functions", "Cosmos DB"],
      preferredSkills: ["Docker", "Kubernetes", "Terraform", "Event Grid"],
      responsibilities: [
        "Develop serverless applications using Azure Functions",
        "Implement cloud infrastructure using Infrastructure as Code",
        "Work with Cosmos DB and Azure SQL",
        "Monitor and optimize cloud application performance",
      ],
      techStack: [".NET 8", "Azure Functions", "Cosmos DB", "Service Bus", "Terraform"],
      domain: "Cloud Services",
      sourceUrl: "#",
    },
    {
      id: "j4",
      title: "Backend Developer",
      companyId: "c4",
      companyName: "DataFlow Systems",
      companyLogo: "",
      location: "Hyderabad, India",
      workMode: "onsite",
      experienceMin: 2,
      experienceMax: 5,
      salaryMin: 1200000,
      salaryMax: 2000000,
      salaryCurrency: "INR",
      jobType: "full-time",
      postedDate: "3 days ago",
      description: "Looking for a Backend Developer with strong experience in .NET and microservices to build high-performance APIs.",
      requiredSkills: ["C#", "ASP.NET Core", "SQL Server", "REST API", "Microservices"],
      preferredSkills: ["Docker", "Redis", "RabbitMQ", "gRPC"],
      responsibilities: [
        "Design and implement microservices architecture",
        "Build high-performance REST APIs",
        "Work with message queues and event-driven systems",
        "Optimize application performance and scalability",
      ],
      techStack: [".NET 8", "ASP.NET Core", "Docker", "RabbitMQ", "Redis"],
      domain: "Healthcare",
      sourceUrl: "#",
    },
    {
      id: "j5",
      title: "Angular Developer",
      companyId: "c5",
      companyName: "PixelForge Studio",
      companyLogo: "",
      location: "Remote",
      workMode: "remote",
      experienceMin: 2,
      experienceMax: 4,
      salaryMin: 1000000,
      salaryMax: 1800000,
      salaryCurrency: "INR",
      jobType: "full-time",
      postedDate: "1 week ago",
      description: "We are looking for an Angular Developer to build beautiful, responsive web applications for our enterprise clients.",
      requiredSkills: ["Angular", "TypeScript", "HTML", "CSS", "RxJS"],
      preferredSkills: ["NgRx", "Tailwind CSS", "Angular Material", "Jest"],
      responsibilities: [
        "Build reusable Angular components and services",
        "Implement responsive and accessible UI",
        "Write unit tests for Angular components",
        "Collaborate with designers and backend teams",
      ],
      techStack: ["Angular 17", "TypeScript", "RxJS", "Tailwind CSS", "Jest"],
      domain: "Agency",
      sourceUrl: "#",
    },
  ];

  getJobs(): Observable<Job[]> {
    return of(this.mockJobs).pipe(delay(300));
  }

  getJobById(id: string): Observable<Job | undefined> {
    return of(this.mockJobs.find((j) => j.id === id)).pipe(delay(200));
  }

  getJobMatches(): Observable<JobMatch[]> {
    return of(this.mockJobs.map((j) => this.generateMatch(j))).pipe(delay(500));
  }

  getJobMatch(jobId: string): Observable<JobMatch | undefined> {
    const job = this.mockJobs.find((j) => j.id === jobId);
    if (!job) return of(undefined).pipe(delay(200));
    return of(this.generateMatch(job)).pipe(delay(400));
  }

  private generateMatch(job: Job): JobMatch {
    const userSkills = ["C#", "ASP.NET Core", "Angular", "SQL Server", "Azure", "TypeScript", "Docker", "Microservices"];
    const matchedSkills = job.requiredSkills.filter((s) => userSkills.includes(s));
    const gaps: SkillGap[] = job.requiredSkills
      .filter((s) => !userSkills.includes(s))
      .map((s) => ({ skill: s, priority: "high" as const, level: "missing" as const }));
    job.preferredSkills
      .filter((s) => !userSkills.includes(s))
      .forEach((s) => gaps.push({ skill: s, priority: "medium" as const, level: "weak" as const }));

    const technical = Math.round((matchedSkills.length / job.requiredSkills.length) * 100);
    const experience = Math.min(100, Math.round((4 / job.experienceMax) * 100));
    const location = job.workMode === "remote" ? 100 : job.location.includes("Bangalore") ? 100 : 70;
    const domain = 80;
    const matchScore = Math.round((technical * 0.45 + experience * 0.25 + location * 0.15 + domain * 0.15));

    return {
      jobId: job.id,
      job,
      matchScore,
      matchedSkills,
      skillGaps: gaps,
      matchBreakdown: { technical, experience, location, domain },
      matchReasons: [
        `You have ${matchedSkills.length} of ${job.requiredSkills.length} required skills`,
        `Your ${4} years of experience is within the required range`,
        job.workMode === "remote" ? "This is a remote position matching your preference" : `Location matches your preference`,
        `You have relevant experience in the ${job.domain} domain`,
      ],
    };
  }
}
