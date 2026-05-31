import { createClient } from '@supabase/supabase-js';

// Ensure we are reading from the environment variables correctly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables! Check your .env file.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

