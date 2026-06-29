-- Supabase Schema for CS Ultimate Curriculum Tracker

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
-- NOTE: The following JSONB columns must exist for cloud sync to work.
-- If upgrading an existing DB, run the ALTER TABLE statements below.
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    progress JSONB DEFAULT '{}',
    sessions JSONB DEFAULT '[]',
    weekly_plans JSONB DEFAULT '{}',
    active_week_plan INTEGER,
    achievements JSONB DEFAULT '[]',
    total_study_time INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    last_study_date TEXT,
    mission_end_date TEXT,
    daily_study_hours INTEGER DEFAULT 4,
    daily_study_minutes INTEGER DEFAULT 0,
    daily_plans JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ⚠️  MIGRATION: If the profiles table already exists without these columns,
--     run the following in the Supabase SQL Editor:
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS progress JSONB DEFAULT '{}';
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS sessions JSONB DEFAULT '[]';
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weekly_plans JSONB DEFAULT '{}';
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_week_plan INTEGER;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS achievements JSONB DEFAULT '[]';
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_study_time INTEGER DEFAULT 0;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_study_date TEXT;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mission_end_date TEXT;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_study_hours INTEGER DEFAULT 4;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_study_minutes INTEGER DEFAULT 0;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_plans JSONB DEFAULT '{}';
-- Also add INSERT policy so upsert works:
-- CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Progress table
CREATE TABLE public.progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    topics_completed JSONB DEFAULT '[]',
    subtopics_completed JSONB DEFAULT '[]',
    projects_completed JSONB DEFAULT '[]',
    sessions_count INTEGER DEFAULT 0,
    total_minutes INTEGER DEFAULT 0,
    UNIQUE(user_id, subject_id)
);

-- Sessions table
CREATE TABLE public.sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    subject_id TEXT NOT NULL,
    phase_name TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Weekly Plans table
CREATE TABLE public.week_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    week INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    planned_subjects JSONB DEFAULT '[]',
    goals JSONB DEFAULT '[]',
    completed_goals JSONB DEFAULT '[]',
    UNIQUE(user_id, week)
);

-- Portfolio table
CREATE TABLE public.portfolios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    bio TEXT,
    tagline TEXT,
    skills JSONB DEFAULT '[]',
    links JSONB DEFAULT '{}',
    featured_projects JSONB DEFAULT '[]'
);

-- Messages (Inbox) table
CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_role TEXT CHECK (sender_role IN ('user', 'admin')),
    content TEXT NOT NULL,
    issue_type TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    reply_to UUID REFERENCES public.messages(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Plans table
CREATE TABLE public.daily_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    items JSONB DEFAULT '[]',
    UNIQUE(user_id, date)
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.week_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can CRUD own progress" ON public.progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own sessions" ON public.sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own achievements" ON public.achievements FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own week_plans" ON public.week_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own portfolios" ON public.portfolios FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own messages" ON public.messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own daily_plans" ON public.daily_plans FOR ALL USING (auth.uid() = user_id);
