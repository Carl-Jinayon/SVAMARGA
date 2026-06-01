import { create } from 'zustand';
import { TrackerState, Session, Achievement, WeekPlan, Portfolio, Message } from '../types/index';
import { curriculum } from '../data/curriculum';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface Store extends TrackerState {
  user: User | null;
  activeWeekPlan: number | null;
  setActiveWeekPlan: (week: number | null) => void;
  setUser: (user: User | null) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  syncWithCloud: () => Promise<void>;
  // ... (rest of the interface)
  // Progress actions
  toggleSubjectCompletion: (subjectId: string) => void;
  markTopicCompleted: (subjectId: string, topic: string) => void;
  markSubtopicCompleted: (subjectId: string, subtopic: string) => void;
  markProjectCompleted: (subjectId: string, project: string) => void;

  // Mission & Planner
  missionEndDate: string | null;
  setMissionEndDate: (date: string | null) => void;

  // Inbox
  messages: Message[];
  addMessage: (message: Message) => void;
  fetchMessages: () => Promise<void>;

  // Session actions
  addSession: (session: Omit<Session, 'id'>) => void;
  getSessions: (subjectId?: string) => Session[];
  getTotalMinutes: () => number;

  // UI actions
  toggleDarkMode: () => void;
  setCurrentPhase: (phaseId: number) => void;

  // Stats actions
  updateStreak: () => void;
  getOverallProgress: () => number;
  getCompletedSubjectsCount: () => number;
  getTotalSubjectsCount: () => number;

  // Weekly plans
  addWeeklyPlan: (week: number, plan: WeekPlan) => void;
  getWeeklyPlan: (week: number) => WeekPlan | undefined;

  // Achievements
  addAchievement: (achievement: Achievement) => void;
  getAchievements: () => Achievement[];

  // Storage
  loadFromStorage: () => void;
  saveToStorage: () => void;
  reset: () => void;
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  }
  return false;
};

const initialState: TrackerState = {
  progress: {},
  sessions: [],
  currentPhase: 1,
  darkMode: getInitialTheme(),
  weeklyPlans: {},
  activeWeekPlan: null,
  achievements: [],
  totalStudyTime: 0,
  currentStreak: 0,
  missionEndDate: null,
  messages: [],
  portfolio: {
    bio: '',
    tagline: '',
    skills: [],
    links: {},
    featuredProjects: [],
  },
};

export const useTrackerStore = create<Store>((set, get) => {
  const loadFromStorage = async () => {
    const saved = localStorage.getItem('tracker-state');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        set(data);
      } catch (e) {
        console.error('Failed to load from storage', e);
      }
    }

    // Check for session safely
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        set({ user: session.user });
        await get().syncWithCloud();
      }
    } catch (e) {
      console.warn('Supabase session check skipped: No connection.');
    }
  };

  return {
    ...initialState,
    user: null,

    updatePortfolio: (portfolio: Portfolio) => {
      set({ portfolio });
      get().saveToStorage();
    },

    saveToStorage: () => {
      const state = get();
      const data = {
        progress: state.progress,
        sessions: state.sessions,
        currentPhase: state.currentPhase,
        darkMode: state.darkMode,
        weeklyPlans: state.weeklyPlans,
        activeWeekPlan: state.activeWeekPlan,
        achievements: state.achievements,
        totalStudyTime: state.totalStudyTime,
        currentStreak: state.currentStreak,
        lastStudyDate: state.lastStudyDate,
        missionEndDate: state.missionEndDate,
        messages: state.messages,
        portfolio: state.portfolio,
      };
      localStorage.setItem('tracker-state', JSON.stringify(data));

      if (state.user) {
        get().syncWithCloud();
      }
    },

    setActiveWeekPlan: (week) => {
      set({ activeWeekPlan: week });
      get().saveToStorage();
    },

    setUser: (user) => set({ user }),

    signIn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) console.error('Sign in error:', error.message);
    },

    signOut: async () => {
      await supabase.auth.signOut();
      set({ user: null });
    },

    syncWithCloud: async () => {
      const { user, progress, sessions, weeklyPlans, activeWeekPlan, achievements, totalStudyTime, currentStreak, lastStudyDate } = get();
      if (!user) return;

      const data = {
        progress,
        sessions,
        weekly_plans: weeklyPlans,
        active_week_plan: activeWeekPlan,
        achievements,
        total_study_time: totalStudyTime,
        current_streak: currentStreak,
        last_study_date: lastStudyDate,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...data });

      if (error) {
        if (error.code === 'PGRST116') { // Row not found, might need to fetch instead of upsert if RLS is strict
           // This is handled by upsert usually, but let's log other errors
        } else {
          console.error('Sync error:', error.message);
        }
      }
    },

    // Progress actions
    toggleSubjectCompletion: (subjectId: string) => {
      set((state) => {
        const progress = { ...state.progress };
        if (!progress[subjectId]) {
          progress[subjectId] = {
            subjectId,
            completed: true,
            completedAt: new Date().toISOString(),
            topicsCompleted: [],
            subtopicsCompleted: [],
            projectsCompleted: [],
            sessionsCount: 0,
            totalMinutes: 0,
          };
        } else {
          progress[subjectId].completed = !progress[subjectId].completed;
          if (progress[subjectId].completed) {
            progress[subjectId].completedAt = new Date().toISOString();
          }
        }
        return { progress };
      });
      get().saveToStorage();
    },

    markTopicCompleted: (subjectId: string, topic: string) => {
      set((state) => {
        const progress = { ...state.progress };
        if (!progress[subjectId]) {
          progress[subjectId] = {
            subjectId,
            completed: false,
            topicsCompleted: [topic],
            subtopicsCompleted: [],
            projectsCompleted: [],
            sessionsCount: 0,
            totalMinutes: 0,
          };
        } else {
          const idx = progress[subjectId].topicsCompleted.indexOf(topic);
          if (idx > -1) {
            progress[subjectId].topicsCompleted = progress[subjectId].topicsCompleted.filter(t => t !== topic);
          } else {
            progress[subjectId].topicsCompleted = [...progress[subjectId].topicsCompleted, topic];
          }
        }
        return { progress };
      });
      get().saveToStorage();
    },

    markSubtopicCompleted: (subjectId: string, subtopic: string) => {
      set((state) => {
        const progress = { ...state.progress };
        if (!progress[subjectId]) {
          progress[subjectId] = {
            subjectId,
            completed: false,
            topicsCompleted: [],
            subtopicsCompleted: [subtopic],
            projectsCompleted: [],
            sessionsCount: 0,
            totalMinutes: 0,
          };
        } else {
          const idx = progress[subjectId].subtopicsCompleted.indexOf(subtopic);
          if (idx > -1) {
            progress[subjectId].subtopicsCompleted = progress[subjectId].subtopicsCompleted.filter(s => s !== subtopic);
          } else {
            progress[subjectId].subtopicsCompleted = [...progress[subjectId].subtopicsCompleted, subtopic];
          }
        }
        return { progress };
      });
      get().saveToStorage();
    },

    setMissionEndDate: (date: string | null) => {
      set({ missionEndDate: date });
      get().saveToStorage();
    },

    addMessage: (message: Message) => {
      set((state) => ({ messages: [message, ...state.messages] }));
    },

    fetchMessages: async () => {
      const { user } = get();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('inbox')
        .select('*')
        .or(`user_id.eq.${user.id},sender_role.eq.admin`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        set({ messages: data || [] });
      }
    },

    markProjectCompleted: (subjectId: string, project: string) => {
      set((state) => {
        const progress = { ...state.progress };
        if (!progress[subjectId]) {
          progress[subjectId] = {
            subjectId: subjectId,
            completed: false,
            topicsCompleted: [],
            subtopicsCompleted: [],
            projectsCompleted: [project],
            sessionsCount: 0,
            totalMinutes: 0,
          };
        } else {
          const idx = progress[subjectId].projectsCompleted.indexOf(project);
          if (idx > -1) {
            progress[subjectId].projectsCompleted.splice(idx, 1);
          } else {
            progress[subjectId].projectsCompleted.push(project);
          }
        }
        return { progress };
      });
      get().saveToStorage();
    },

    // Session actions
    addSession: (session: Omit<Session, 'id'>) => {
      set((state) => {
        const newSession: Session = {
          ...session,
          id: `session-${Date.now()}`,
        };
        const sessions = [...state.sessions, newSession];
        const totalStudyTime = sessions.reduce((sum, s) => sum + s.duration, 0);

        // Update progress for this subject
        const progress = { ...state.progress };
        if (!progress[session.subjectId]) {
          progress[session.subjectId] = {
            subjectId: session.subjectId,
            completed: false,
            topicsCompleted: [],
            subtopicsCompleted: [],
            projectsCompleted: [],
            sessionsCount: 1,
            totalMinutes: session.duration,
          };
        } else {
          progress[session.subjectId].sessionsCount += 1;
          progress[session.subjectId].totalMinutes += session.duration;
        }

        // Update streak
        const today = new Date().toDateString();
        const lastStudyDate = state.lastStudyDate;
        let currentStreak = state.currentStreak || 0;

        if (lastStudyDate !== today) {
          const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
          if (lastStudyDate === yesterday) {
            currentStreak += 1;
          } else {
            currentStreak = 1;
          }
        }

        return {
          sessions,
          totalStudyTime,
          progress,
          currentStreak,
          lastStudyDate: today,
        };
      });
      get().saveToStorage();
    },

    getSessions: (subjectId?: string) => {
      const state = get();
      if (subjectId) {
        return state.sessions.filter((s) => s.subjectId === subjectId);
      }
      return state.sessions;
    },

    getTotalMinutes: () => {
      return get().sessions.reduce((sum, s) => sum + s.duration, 0);
    },

    // UI actions
    toggleDarkMode: () => {
      set((state) => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDarkMode };
      });
    },

    setCurrentPhase: (phaseId: number) => {
      set({ currentPhase: phaseId });
    },

    // Stats
    updateStreak: () => {
      const state = get();
      const today = new Date().toDateString();
      if (state.lastStudyDate !== today) {
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
        if (state.lastStudyDate === yesterday) {
          set({ currentStreak: state.currentStreak + 1, lastStudyDate: today });
        } else {
          set({ currentStreak: 1, lastStudyDate: today });
        }
      }
      get().saveToStorage();
    },

    getOverallProgress: () => {
      const state = get();
      const allSubjects = curriculum.flatMap((p) => p.subjects);
      const totalSubjects = allSubjects.length;
      if (totalSubjects === 0) return 0;
      
      const completedCount = allSubjects.filter((s) => state.progress[s.id]?.completed).length;
      return Math.round((completedCount / totalSubjects) * 100);
    },

    getCompletedSubjectsCount: () => {
      const state = get();
      const allSubjects = curriculum.flatMap((p) => p.subjects);
      return allSubjects.filter((s) => state.progress[s.id]?.completed).length;
    },

    getTotalSubjectsCount: () => {
      return curriculum.flatMap((p) => p.subjects).length;
    },

    // Weekly plans
    addWeeklyPlan: (week: number, plan: WeekPlan) => {
      set((state) => ({
        weeklyPlans: { ...state.weeklyPlans, [week]: plan },
      }));
      get().saveToStorage();
    },

    getWeeklyPlan: (week: number) => {
      return get().weeklyPlans[week];
    },

    // Achievements
    addAchievement: (achievement: Achievement) => {
      set((state) => ({
        achievements: [...state.achievements, achievement],
      }));
      get().saveToStorage();
    },

    getAchievements: () => {
      return get().achievements;
    },

    // Storage
    loadFromStorage,

    reset: () => {
      localStorage.removeItem('tracker-state');
      localStorage.removeItem('theme');
      set(initialState);
    },
  };
});

// Initialize on app load
// Set up auth listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    useTrackerStore.getState().setUser(session.user);
    useTrackerStore.getState().syncWithCloud();
  } else if (event === 'SIGNED_OUT') {
    useTrackerStore.getState().setUser(null);
  }
});