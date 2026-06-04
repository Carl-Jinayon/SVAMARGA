export interface Project {
  name: string;
  description: string;
  level: string;
  outcome: string;
}

export interface Subject {
  id: string;
  name: string;
  hours: number;
  duration: string;
  description?: string;
  topics: string[];
  subtopics: Record<string, string[]>;
  projects: Project[];
  resources: Resource[];
  difficulty: 'Beginner' | 'Intermediate' | 'Hard' | 'Very Hard';
  prerequisites?: string[];
  commonMistakes: string[];
  selfCheck: string[];
  whenStuck: string;
}

export interface Phase {
  id: number;
  name: string;
  duration: string;
  hours: number;
  color: string;
  description: string;
  subjects: Subject[];
  mustComplete?: string[];
  niceToHave?: string[];
  interviewHabit?: string;
  capstone?: {
    name: string;
    description: string;
    requirements: string[];
  };
}

export interface Resource {
  name: string;
  type: 'Book' | 'Course' | 'Platform' | 'Interactive' | 'Video' | 'Docs' | 'Tool' | 'GitHub' | 'Website' | 'Game' | 'Zines' | 'YouTube/Book' | 'Community';
  cost: 'Free' | 'Paid' | 'Mixed';
  stars: 1 | 2 | 3 | 4 | 5;
  url?: string;
  notes?: string;
}

export interface Session {
  id: string;
  date: string;
  duration: number; // in minutes
  subjectId: string;
  phaseName: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  condition: 'milestone' | 'streak' | 'completion' | 'time';
}

export interface Progress {
  subjectId: string;
  completed: boolean;
  completedAt?: string;
  topicsCompleted: string[];
  subtopicsCompleted: string[];
  projectsCompleted: string[];
  sessionsCount: number;
  totalMinutes: number;
}

export interface WeekPlan {
  week: number;
  startDate: string;
  endDate: string;
  plannedSubjects: string[];
  goals: string[];
  completedGoals?: string[];
}

export interface Portfolio {
  bio: string;
  tagline: string;
  skills: string[];
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  featuredProjects: {
    name: string;
    description: string;
    url?: string;
  }[];
}

export interface Message {
  id: string;
  user_id: string;
  sender_role: 'user' | 'admin';
  content: string;
  issue_type?: string;
  created_at: string;
  is_read: boolean;
  reply_to?: string;
}

export interface DailyPlan {
  date: string;
  items: {
    id: string;
    type: 'phase' | 'subject' | 'topic' | 'subtopic';
    name: string;
    completed: boolean;
    parentId?: string;
    isSuggested?: boolean;
  }[];
}

export interface SessionTimer {
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  lastTick?: string;
}

export interface TrackerState {
  // Progress
  progress: Record<string, Progress>;
  sessions: Session[];
  
  // UI
  currentPhase: number;
  darkMode: boolean;
  
  // Goals & Plans
  weeklyPlans: Record<number, WeekPlan>;
  activeWeekPlan: number | null;
  achievements: Achievement[];
  
  // Portfolio
  portfolio: Portfolio;
  
  // Stats
  totalStudyTime: number;
  currentStreak: number;
  lastStudyDate?: string;

  // Mission
  missionEndDate: string | null;
  dailyPlans: Record<string, DailyPlan>;
  suggestedPlans: Record<string, DailyPlan>; // Added for suggested plans
  messages: Message[];
  sessionTimer: SessionTimer; // Added for session timer
}
