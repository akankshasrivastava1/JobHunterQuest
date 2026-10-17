export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  title: string;
  experienceYears: number;
  location: string;
  currentRole: string;
  targetRole: string;
  skills: Skill[];
  bio: string;
  profileCompleteness: number;
  plan: "free" | "pro" | "career";
}

export interface Skill {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  category: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  size: string;
  location: string;
  rating: number;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  workMode: "remote" | "hybrid" | "onsite";
  experienceMin: number;
  experienceMax: number;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  jobType: "full-time" | "contract" | "part-time";
  postedDate: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  techStack: string[];
  domain: string;
  sourceUrl: string;
}

export interface JobMatch {
  jobId: string;
  job: Job;
  matchScore: number;
  matchedSkills: string[];
  skillGaps: SkillGap[];
  matchBreakdown: {
    technical: number;
    experience: number;
    location: number;
    domain: number;
  };
  matchReasons: string[];
}

export interface SkillGap {
  skill: string;
  priority: "high" | "medium" | "low";
  level: "missing" | "weak";
}

export interface Resume {
  id: string;
  name: string;
  targetRole: string;
  uploadedDate: string;
  atsScore: number;
  skillsDetected: string[];
  missingKeywords: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  keywordMatch: number;
  formattingSuggestions: string[];
  experienceAnalysis: string;
  projectAnalysis: string;
}

export interface ResumeExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  technologies: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  experienceLevel: string;
  experienceYears: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  technology: string;
  whyAsked: string;
  expectedAnswer: string;
  realWorldExplanation: string;
  codeExample?: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  seniorDiscussion: string;
  howToAnswer: string;
  tags: string[];
}

export interface MockInterview {
  id: string;
  role: string;
  technology: string;
  interviewType: string;
  difficulty: string;
  totalQuestions: number;
  completedDate?: string;
  scores: {
    technical: number;
    communication: number;
    problemSolving: number;
    projectUnderstanding: number;
    overall: number;
  };
  strengths: string[];
  weakAreas: string[];
  missedPoints: string[];
  betterAnswer: string;
  recommendedTopics: string[];
  followUpQuestions: string[];
}

export interface MockInterviewConfig {
  role: string;
  experience: string;
  technology: string;
  interviewType: "technical" | "project" | "hr" | "managerial" | "system-design" | "full";
  difficulty: "easy" | "medium" | "hard";
  numberOfQuestions: number;
}

export interface MockInterviewSession {
  questionIndex: number;
  totalQuestions: number;
  question: string;
  questionType: string;
  elapsedSeconds: number;
}

export interface LearningRoadmap {
  id: string;
  title: string;
  targetRole: string;
  phases: RoadmapPhase[];
  aiRecommendation: string;
}

export interface RoadmapPhase {
  id: string;
  name: string;
  order: number;
  status: "completed" | "in-progress" | "locked";
  topics: string[];
  progress: number;
  estimatedTime: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  status: ApplicationStatus;
  appliedDate: string;
  matchScore: number;
  interviewDate?: string;
  notes: string;
  location: string;
  salary?: string;
}

export type ApplicationStatus =
  | "saved"
  | "applied"
  | "screening"
  | "technical"
  | "managerial"
  | "hr"
  | "offer"
  | "rejected";

export interface Course {
  id: string;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  modules: CourseModule[];
  progress: number;
  estimatedTime: string;
  description: string;
  thumbnailGradient: string;
}

export interface CourseModule {
  id: string;
  name: string;
  completed: boolean;
  duration: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorExperience: string;
  authorTitle: string;
  title: string;
  contentPreview: string;
  tags: string[];
  upvotes: number;
  comments: number;
  views: number;
  postedDate: string;
  type: "question" | "post" | "resource" | "experience";
  hasAcceptedAnswer: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface JobSearchPreferences {
  targetRole: string;
  location: string;
  experience: string;
  skills: string[];
  salaryMin?: number;
  workMode: "remote" | "hybrid" | "onsite" | "any";
  jobType: string;
  preferredCompanies: string[];
  noticePeriod: string;
}

export interface AIAnalysisStep {
  label: string;
  status: "pending" | "active" | "done";
}

export interface JDAnalysisResult {
  jobSummary: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequired: string;
  responsibilities: string[];
  techStack: string[];
  domain: string;
  location: string;
  workMode: string;
  salary?: string;
  matchPercentage: number;
  skillGaps: SkillGap[];
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  jobsAnalyzed: number;
  mockInterviews: number;
  questionsPracticed: number;
  aiUsage: number;
}

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
}
