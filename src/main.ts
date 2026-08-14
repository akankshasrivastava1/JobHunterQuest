import { Component, inject } from "@angular/core";
import { provideRouter, Routes, withInMemoryScrolling, RouterOutlet } from "@angular/router";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient, withFetch } from "@angular/common/http";

import { AppShellComponent } from "./layout/app-shell.component";
import { ToastContainerComponent } from "./shared/components/toast-container.component";

import { LandingComponent } from "./features/landing/landing.component";
import { LoginComponent } from "./features/auth/login.component";
import { RegisterComponent } from "./features/auth/register.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { AiJobSearchComponent } from "./features/jobs/ai-job-search.component";
import { JobDetailsComponent } from "./features/jobs/job-details.component";
import { JdAnalyzerComponent } from "./features/jobs/jd-analyzer.component";
import { ResumeComponent } from "./features/resume/resume.component";
import { InterviewPrepComponent } from "./features/interview/interview-prep.component";
import { QuestionDetailComponent } from "./features/interview/question-detail.component";
import { MockInterviewSetupComponent } from "./features/mock-interview/mock-interview-setup.component";
import { MockInterviewSessionComponent } from "./features/mock-interview/mock-interview-session.component";
import { MockInterviewResultComponent } from "./features/mock-interview/mock-interview-result.component";
import { ApplicationsComponent } from "./features/applications/applications.component";
import { LearningComponent } from "./features/learning/learning.component";
import { RoadmapComponent } from "./features/roadmap/roadmap.component";
import { PracticeComponent } from "./features/practice/practice.component";
import { CommunityComponent } from "./features/community/community.component";
import { CommunityDetailComponent } from "./features/community/community-detail.component";
import { CareerAssistantComponent } from "./features/career-assistant/career-assistant.component";
import { ProfileComponent } from "./features/profile/profile.component";
import { SettingsComponent } from "./features/settings/settings.component";
import { PricingComponent } from "./features/pricing/pricing.component";
import { AdminComponent } from "./features/admin/admin.component";

const routes: Routes = [
  { path: "", component: LandingComponent, title: "JobHunterQuest — Don't prepare for every interview. Prepare for YOUR interview." },
  { path: "login", component: LoginComponent, title: "Login — JobHunterQuest" },
  { path: "register", component: RegisterComponent, title: "Get Started — JobHunterQuest" },
  { path: "pricing", component: PricingComponent, title: "Pricing — JobHunterQuest" },
  { path: "admin", component: AdminComponent, title: "Admin — JobHunterQuest" },
  {
    path: "",
    component: AppShellComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, title: "Dashboard — JobHunterQuest" },
      { path: "jobs/ai-search", component: AiJobSearchComponent, title: "AI Job Search — JobHunterQuest" },
      { path: "jobs/analyze", component: JdAnalyzerComponent, title: "JD Analyzer — JobHunterQuest" },
      { path: "jobs/:id", component: JobDetailsComponent, title: "Job Details — JobHunterQuest" },
      { path: "resume", component: ResumeComponent, title: "Resume — JobHunterQuest" },
      { path: "interview", component: InterviewPrepComponent, title: "Interview Prep — JobHunterQuest" },
      { path: "interview/questions/:id", component: QuestionDetailComponent, title: "Question — JobHunterQuest" },
      { path: "mock-interview", component: MockInterviewSetupComponent, title: "Mock Interview — JobHunterQuest" },
      { path: "mock-interview/setup", component: MockInterviewSetupComponent, title: "Mock Interview Setup — JobHunterQuest" },
      { path: "mock-interview/session", component: MockInterviewSessionComponent, title: "Mock Interview Session — JobHunterQuest" },
      { path: "mock-interview/result", component: MockInterviewResultComponent, title: "Mock Interview Result — JobHunterQuest" },
      { path: "applications", component: ApplicationsComponent, title: "Applications — JobHunterQuest" },
      { path: "learning", component: LearningComponent, title: "Learning — JobHunterQuest" },
      { path: "roadmap", component: RoadmapComponent, title: "Roadmap — JobHunterQuest" },
      { path: "practice", component: PracticeComponent, title: "Practice — JobHunterQuest" },
      { path: "community", component: CommunityComponent, title: "Community — JobHunterQuest" },
      { path: "community/:id", component: CommunityDetailComponent, title: "Post — JobHunterQuest" },
      { path: "career-assistant", component: CareerAssistantComponent, title: "Career Assistant — JobHunterQuest" },
      { path: "profile", component: ProfileComponent, title: "Profile — JobHunterQuest" },
      { path: "settings", component: SettingsComponent, title: "Settings — JobHunterQuest" },
    ],
  },
  { path: "**", redirectTo: "" },
];

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `<router-outlet></router-outlet><app-toast-container></app-toast-container>`,
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "top" })),
    provideHttpClient(withFetch()),
  ],
});
