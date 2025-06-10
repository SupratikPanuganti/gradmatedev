import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Student = {
  id: string;
  user_id: string;
  name: string | null;
  school: string | null;
  major: string | null;
  minor: string | null;
  gpa: string | null;
  resume_url: string | null;
  certifications: string[] | null;
  projects: string | null;
  created_at: string;
};

export type Lab = {
  id: string;
  school: string;
  name: string;
  research_area: string;
  description: string;
  created_at: string;
};

export type Professor = {
  id: string;
  lab_id: string;
  name: string;
  email: string;
  title: string;
};

export type EssayIdea = {
  id: string;
  student_id: string;
  title: string;
  description: string;
  personal_connection: string;
  key_points: string[];
  approach: string;
  created_at: string;
};

export type OutreachLog = {
  id: string;
  student_id: string;
  lab_id: string;
  professor_id: string;
  message: string;
  sent_at: string;
};
