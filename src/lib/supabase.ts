import { createClient } from '@supabase/supabase-js';

// Ensure we are reading from the environment variables correctly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// createClient() throws on an empty URL, which blanks the entire app because this
// module is imported by the store, which is imported by App.tsx. Fail loudly and
// legibly instead of surfacing a blank screen with a console error nobody reads.
//
// Note: this only works if .env sits in the PROJECT ROOT (next to vite.config.ts).
// A .env one directory up is invisible to Vite.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    [
      'Missing Supabase configuration.',
      '',
      'Expected a .env file in the project root (the folder containing vite.config.ts) with:',
      '',
      '  VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co',
      '  VITE_SUPABASE_ANON_KEY=<your anon / publishable key>',
      '',
      'Both values come from the Supabase dashboard: Project Settings -> API.',
      'Vite only reads .env from the project root — a .env in a parent directory is ignored.',
    ].join('\n')
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);