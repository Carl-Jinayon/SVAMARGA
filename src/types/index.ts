export interface Subject {
  id: string;
  name: string;
  hours: number;
  duration: string;
  description?: string;
  topics: string[];
  projects: string[];
  resources: Resource[];
  difficulty: 'Beginner' | 'Intermediate' | 'Hard' | 'Very Hard';
  prerequisites?: string[];
}

export interface Phase {
  id: number;
  name: string;
  duration: string;
  hours: number;
  color: string;
  subjects: Subject[];
  description?: string;
}

export interface Resource {
  name: string;
  type: 'Book' | 'Course' | 'Platform' | 'Interactive' | 'Video' | 'Docs' | 'Tool' | 'GitHub' | 'Website' | 'Game' | 'Zines' | 'YouTube/Book' | 'Community';
  cost: 'Free' | 'Paid' | 'Mixed';
  stars: 1 | 2 | 3 | 4 | 5;
  url?: string;
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
  
  // Stats
  totalStudyTime: number;
  currentStreak: number;
  lastStudyDate?: string;
}